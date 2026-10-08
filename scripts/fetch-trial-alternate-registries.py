"""Fetch the explicitly linked ISRCTN records; audit the other registry links without guessing IDs.

Run after fetch-trial-participation.ts, then rerun that script to fetch registry-declared NCT crossrefs.
Only selected study fields are redistributed; contact details and investigator fields are excluded.
"""
import hashlib
import argparse
import html
import json
import re
import time
import urllib.request
import xml.etree.ElementTree as ET
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "public/trial-participation"
OTHER = OUT / "other"
OTHER.mkdir(parents=True, exist_ok=True)
NS = {"s": "http://www.67bricks.com/isrctn"}
UA = "OnCo alternate trial registries (https://onco.cc; hello@onco.cc)"


def get(url):
    request = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(request, timeout=25) as response:
        return response.read().decode("utf-8"), response.geturl()


def text(element, path):
    item = element.find(path, NS)
    return "".join(item.itertext()) if item is not None else None


def selected(element, paths):
    return {key: value for key, path in paths.items() if (value := text(element, path)) is not None}


def capture_isrctn(registry_id):
    path = OTHER / f"{registry_id}.json"
    if path.exists():
        snapshot = json.loads(path.read_text())
        digest = hashlib.sha256(json.dumps(snapshot["study"], ensure_ascii=False, sort_keys=True, separators=(",", ":")).encode()).hexdigest()
        if snapshot["registryId"] != registry_id or digest != snapshot["studySha256"]:
            raise ValueError(f"Stored registry snapshot identifier/hash mismatch: {registry_id}")
        return snapshot
    api = f"https://www.isrctn.com/api/trial/{registry_id}/format/default"
    raw, _ = get(api)
    root = ET.fromstring(raw)
    trial = root.find("s:trial", NS)
    if trial is None or trial.attrib.get("publicIdentifierCanonical") != registry_id:
        raise ValueError("API did not return the requested registry identifier")
    participants = trial.find("s:participants", NS)
    if participants is None:
        raise ValueError("Registry participant module missing")
    data = selected(trial, {
        "title": "s:trialDescription/s:title", "scientificTitle": "s:trialDescription/s:scientificTitle",
        "acronym": "s:trialDescription/s:acronym", "hypothesis": "s:trialDescription/s:studyHypothesis",
        "primaryOutcome": "s:trialDescription/s:primaryOutcome", "secondaryOutcome": "s:trialDescription/s:secondaryOutcome",
        "intervention": "s:interventions/s:intervention", "condition": "s:conditions/s:condition",
        "studyDesign": "s:trialDesign/s:studyDesign", "overallEndDate": "s:trialDesign/s:overallEndDate",
        "clinicalTrialsGovNumber": "s:externalRefs/s:clinicalTrialsGovNumber",
    })
    data["lastUpdated"] = trial.attrib.get("lastUpdated")
    data["eligibility"] = selected(participants, {"inclusion": "s:inclusion", "exclusion": "s:exclusion", "ageRange": "s:ageRange", "gender": "s:gender", "participantType": "s:participantTypes/s:participantType"})
    data["recruitment"] = selected(participants, {key: f"s:{key}" for key in ["recruitmentStart", "recruitmentEnd", "recruitmentStatusOverride", "recruitmentStartStatusOverride", "targetEnrolment", "totalFinalEnrolment"]})
    data["countries"] = ["".join(e.itertext()) for e in participants.findall("s:recruitmentCountries/s:country", NS)]
    data["locations"] = [selected(e, {key: f"s:{key}" for key in ["name", "city", "state", "country", "zip"]}) for e in participants.findall("s:trialCentres/s:trialCentre", NS)]
    data["sponsors"] = [selected(e, {"organisation": "s:organisation", "sponsorType": "s:sponsorType", "rorId": "s:rorId"}) for e in root.findall("s:sponsor", NS)]
    data["funders"] = [selected(e, {"name": "s:name", "fundRef": "s:fundRef"}) for e in root.findall("s:funder", NS)]
    snapshot = {"registry": "ISRCTN", "registryId": registry_id, "source": f"https://www.isrctn.com/{registry_id}", "apiSource": api,
                "fetchedAt": datetime.now(timezone.utc).isoformat().replace("+00:00", "Z"), "license": "CC BY 4.0",
                "licenseSource": "https://www.isrctn.com/page/faqs#licence-to-post", "study": data,
                "studySha256": hashlib.sha256(json.dumps(data, ensure_ascii=False, sort_keys=True, separators=(",", ":")).encode()).hexdigest()}
    path.write_text(json.dumps(snapshot, ensure_ascii=False))
    return snapshot


def audit_other(url):
    raw, final_url = get(url)
    # This is an identity audit, not an ingestion of contacts or unverified-license registry text.
    result = {"source": url, "resolvedUrl": final_url, "fetchedAt": datetime.now(timezone.utc).isoformat().replace("+00:00", "Z")}
    if "umin.ac.jp" in url:
        def cell(label):
            for row in re.findall(r"<tr\b[^>]*>(.*?)</tr>", raw, flags=re.S | re.I):
                cells = re.findall(r"<t[dh]\b[^>]*>(.*?)</t[dh]>", row, flags=re.S | re.I)
                if len(cells) < 2:
                    continue
                heading = html.unescape(re.sub(r"<[^>]+>", "", cells[0])).strip()
                if heading.casefold() == label.casefold():
                    return html.unescape(re.sub(r"<[^>]+>", "", cells[1])).strip()
            return None
        result.update({"observedRegistryId": cell("Unique ID issued by UMIN"), "observedTitle": cell("Official scientific title of the study"), "status": "metadata-only-license-unverified"})
    elif "clinicaltrialsregister.eu" in url:
        result.update({"status": "linked-for-follow-up", "nctCandidates": sorted(set(re.findall(r"\bNCT\d{8}\b", raw)))})
    else:
        result["status"] = "linked-for-follow-up" if "anzctr.org.au" in final_url.lower() and "captcha" not in raw.lower() else "access-or-parser-unavailable"
    return result


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--inventory", help="Optional JSON inventory with original source link labels")
    options = parser.parse_args()
    label_inventory = {t["id"]: t["links"] for t in json.loads(Path(options.inventory).read_text())} if options.inventory else {}
    inventory = json.loads((OUT / "index.json").read_text())["canonicalTrials"]
    rows = {}
    cache = {}
    previous_path = OUT / "alternate-registries.json"
    previous = json.loads(previous_path.read_text())["trials"] if previous_path.exists() else {}
    for trial in [t for t in inventory if not t["ncts"] or t["id"] in previous]:
        old_mismatches = [dict(a, corrected=True) for a in previous.get(trial["id"], {}).get("sourceAudits", []) if a["status"] == "registry-identity-mismatch" and a["source"] not in trial["sources"]]
        row = {"name": trial["name"], "captures": [], "crossReferences": [], "sourceAudits": old_mismatches, "gaps": []}
        registries = [u for u in trial["sources"] if re.search(r"isrctn\.com|umin\.ac\.jp|anzctr\.org\.au|clinicaltrialsregister\.eu", u)]
        for url in dict.fromkeys(registries):
            try:
                match = re.search(r"isrctn\.com/(ISRCTN\d+)\b", url)
                if match:
                    registry_id = match[1]
                    if url not in cache:
                        cache[url] = capture_isrctn(registry_id)
                        time.sleep(0.35)
                    snapshot = cache[url]
                    data = snapshot["study"]
                    row["captures"].append({"registry": "ISRCTN", "registryId": registry_id, "source": url, "snapshot": f"/trial-participation/other/{registry_id}.json", "fetchedAt": snapshot["fetchedAt"], "lastUpdated": data["lastUpdated"], "title": data.get("title"), "hasEligibility": bool(data["eligibility"].get("inclusion") or data["eligibility"].get("exclusion")), "siteCount": len(data["locations"]), "sponsors": [s["organisation"] for s in data["sponsors"] if s.get("organisation")]})
                    for nct in re.findall(r"\bNCT\d{8}\b", data.get("clinicalTrialsGovNumber") or ""):
                        row["crossReferences"].append({"nct": nct, "source": url, "registryId": registry_id, "registryTitle": data.get("title")})
                else:
                    if url not in cache:
                        cache[url] = audit_other(url)
                        time.sleep(0.35)
                    audit = dict(cache[url])
                    # The source link's label carries the intended UMIN identifier.
                    labels = [l["label"] for l in label_inventory.get(trial["id"], trial.get("sourceLinks", [])) if l["url"] == url]
                    expected = re.findall(r"\bUMIN\d{9}\b", " ".join(labels))
                    if expected:
                        audit["expectedRegistryId"] = expected[0]
                        if not re.fullmatch(r"UMIN\d{9}", audit.get("observedRegistryId") or ""):
                            audit["status"] = "registry-identity-parser-unavailable"
                        elif audit["observedRegistryId"] != expected[0]:
                            audit["status"] = "registry-identity-mismatch"
                            row["gaps"].append("linked-registry-record-has-different-identifier")
                    row["sourceAudits"].append(audit)
            except Exception as error:
                row["sourceAudits"].append({"source": url, "status": "fetch-failed", "error": str(error)})
        if not registries:
            row["gaps"].append("no-explicit-registry-source")
        if not row["captures"]:
            row["gaps"].append("participation-details-not-captured")
        rows[trial["id"]] = row
        if len(rows) % 20 == 0:
            print(f"Audited {len(rows)} alternate/historical records", flush=True)
    result = {"source": "Explicit registry links on canonical OnCo records", "trials": rows}
    (OUT / "alternate-registries.json").write_text(json.dumps(result, ensure_ascii=False, indent=2))
    print(f"{len(rows)} audited; {sum(bool(r['captures']) for r in rows.values())} records captured from ISRCTN; {sum(len(r['crossReferences']) for r in rows.values())} declared NCT crossrefs", flush=True)


if __name__ == "__main__":
    main()
