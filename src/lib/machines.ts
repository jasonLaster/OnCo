import type { Graph } from "./graph";
import { MACHINE_FAMILIES, type MachineFamily } from "./kinds";
import type { Roadmap, Technology } from "./schema";

/**
 * Who is on /machines/, gathered from the corpus by a stated rule.
 *
 * Until 4 November 2026 the page listed the technology ids an agent had typed into the page, so the seven machine
 * types of src/data/machines-wave3.ts did not appear and every later one would have needed a code edit: the typed-list
 * failure src/lib/members.ts fixed on the biomarker pages.
 *
 * The rules, from structured fields only (never text):
 *
 * - **Members.** A technology record is a machine when it carries `machineFamily`, and it is listed once, under that
 *   family. Nothing else puts a record on the page. src/lib/machines.test.ts holds that every technology from a
 *   machines wave (a `machines-wave*` tag) carries the field, so a new wave cannot be left off by forgetting it.
 * - **Order.** Families in the order of MACHINE_FAMILIES. Within a family, the ids in `order` first, in that order (the
 *   hand-curated sequence the page had, which reads from the everyday machine to the specialised one), then any other
 *   member by name. `order` only sorts: an id in it with no `machineFamily` does not appear, and the test fails.
 * - **Roadmaps.** A roadmap is a family's chain of development when more than half of the technologies it names are
 *   machines, and it is shown with the family that holds the most of them (the earlier family on a tie).
 */

export type MachineFamilyMeta = { id: MachineFamily; name: string; icon: string; blurb: string; order: string[] };

export const MACHINE_FAMILY_META: Record<MachineFamily, MachineFamilyMeta> = {
  imaging: { id: "imaging", name: "Imaging scanners", icon: "imaging", blurb: "How tumours are found, staged and measured.", order: ["x-ray-radiography-fluoroscopy", "ct", "dual-energy-spectral-ct", "photon-counting-ct", "ultrasound", "ultrasound-elastography-ceus", "mri", "mri-field-strengths", "breast-mri-coils-abbreviated-mri", "mammography", "contrast-enhanced-mammography", "ai-mammography-screening", "pet", "pet-ct", "pet-mri", "total-body-pet-screening", "nuclear-medicine-hardware", "spect", "spect-ct", "intraoperative-mri-ct", "optical-imaging"] },
  endoscopy: { id: "endoscopy", name: "Endoscopes and clinic imaging", icon: "early-detection", blurb: "Scopes, capsules and cameras that look inside the gut, airway, cervix and skin.", order: ["endoscopic-ultrasound-systems", "robotic-bronchoscopy", "capsule-endoscopy-systems", "ai-endoscopy-detection", "cystoscopy-turbt", "colposcopes-digital-cervical-screening", "dermoscopy-ai", "confocal-oct-skin-imaging"] },
  radiotherapy: { id: "radiotherapy", name: "Radiotherapy machines", icon: "radiation", blurb: "Photon and electron beams, from the everyday linac to dedicated radiosurgery units.", order: ["c-arm-linac", "ring-gantry-linac", "tomotherapy", "mr-linac", "cyberknife", "gamma-knife", "rotating-gamma-radiosurgery-systems", "zap-x", "biology-guided-radiotherapy", "radiosurgery-srs", "brachytherapy-afterloaders", "electronic-brachytherapy-systems", "intraoperative-radiotherapy", "iort-systems", "electron-beam-therapy-systems", "total-skin-electron-therapy", "superficial-radiotherapy", "lattice-radiotherapy", "flash-rt", "flash-research-accelerators", "cobalt-60-teletherapy"] },
  "radiotherapy-guidance": { id: "radiotherapy-guidance", name: "Radiotherapy guidance and quality", icon: "radiation", blurb: "The planning software, cameras, imagers, record systems and dosimeters that make a beam accurate.", order: ["treatment-planning-systems", "knowledge-based-planning", "oncology-information-systems", "in-room-imaging-systems", "patient-positioning-surface-guidance-systems", "upright-radiotherapy-positioning", "surface-guided-radiotherapy", "respiratory-gating-tumour-tracking-systems", "respiratory-motion-management", "radiotherapy-qa-phantoms-dosimeters", "in-vivo-dosimetry"] },
  particle: { id: "particle", name: "Particle therapy", icon: "radiation", blurb: "Protons, carbon ions and neutrons: the machines that stop inside the tumour.", order: ["proton-therapy", "proton-therapy-systems", "carbon-ion", "carbon-ion-synchrotrons", "bnct", "bnct-accelerator-systems"] },
  ablation: { id: "ablation", name: "Ablation and energy devices", icon: "devices", blurb: "Heat, cold, sound, light, electric pulses and fields delivered through a needle or from outside.", order: ["thermal-ablation", "cryoablation-systems", "microwave-rf-ablation", "irreversible-electroporation", "electrochemotherapy", "electrochemotherapy-devices", "hifu-histotripsy", "bbb-focused-ultrasound", "transcranial-focused-ultrasound-systems", "litt", "litt-systems", "hyperthermia", "hyperthermia-systems", "magnetic-nanoparticle-hyperthermia", "photoimmunotherapy", "photodynamic-therapy-lasers", "hipec", "hipec-pipac-devices", "ttfields"] },
  surgical: { id: "surgical", name: "Surgical machines", icon: "surgery", blurb: "Robots, navigation, cameras and probes in the operating theatre.", order: ["robotic-surgery", "surgical-robot-platforms", "fluorescence-guided-surgery", "intraoperative-fluorescence-imaging-systems", "sentinel-node", "gamma-probes-dose-calibrators"] },
  "chemo-supportive": { id: "chemo-supportive", name: "Chemotherapy delivery and supportive devices", icon: "chemotherapy", blurb: "Pharmacy robots, sealed connectors, pumps, chairs, cooling caps and limb cooling around the chemotherapy chair.", order: ["pharmacy-automation", "closed-system-transfer-devices", "infusion-devices-vascular-access", "oncology-infusion-chairs", "scalp-cooling", "manual-cold-caps", "limb-cryocompression-devices"] },
  laboratory: { id: "laboratory", name: "Laboratory and production", icon: "diagnostics", blurb: "The instruments behind pathology, blood tests, sequencing and tracer supply.", order: ["whole-slide-scanners", "flow-cytometers", "spatial-biology-instruments", "next-gen-short-read-platforms", "long-read-sequencing", "medical-cyclotrons-synthesis-modules", "cyclotron-isotope-production"] },
};

export type GatheredFamily = MachineFamilyMeta & { members: Technology[]; roadmaps: Roadmap[] };

/** Every machine family with its members and chains of development, by the rules above. Families with no member are kept out. */
export function machineFamilies(g: Graph): GatheredFamily[] {
  const techs = g.kind("technology");
  const byFamily = new Map<MachineFamily, Technology[]>(MACHINE_FAMILIES.map((f) => [f, []]));
  for (const t of techs) if (t.machineFamily) byFamily.get(t.machineFamily)!.push(t);
  const familyOf = new Map<string, MachineFamily>(techs.filter((t) => t.machineFamily).map((t) => [t.id, t.machineFamily!]));

  const roadmapsOf = new Map<MachineFamily, Roadmap[]>(MACHINE_FAMILIES.map((f) => [f, []]));
  for (const r of g.kind("roadmap")) {
    const named = [...new Set(r.technologies)];
    const machines = named.filter((id) => familyOf.has(id));
    if (!machines.length || machines.length * 2 <= named.length) continue;
    const count = new Map<MachineFamily, number>();
    for (const id of machines) count.set(familyOf.get(id)!, (count.get(familyOf.get(id)!) ?? 0) + 1);
    const top = MACHINE_FAMILIES.reduce<MachineFamily | null>((best, f) => ((count.get(f) ?? 0) > (best ? count.get(best) ?? 0 : 0) ? f : best), null);
    if (top) roadmapsOf.get(top)!.push(r);
  }

  return MACHINE_FAMILIES.map((f) => {
    const meta = MACHINE_FAMILY_META[f];
    const rank = new Map(meta.order.map((id, i) => [id, i]));
    const members = byFamily.get(f)!.sort((a, b) => (rank.get(a.id) ?? Infinity) - (rank.get(b.id) ?? Infinity) || a.name.localeCompare(b.name));
    const roadmaps = roadmapsOf.get(f)!.sort((a, b) => a.name.localeCompare(b.name));
    return { ...meta, members, roadmaps };
  }).filter((f) => f.members.length > 0);
}
