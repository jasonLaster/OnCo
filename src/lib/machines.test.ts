import { describe, expect, it } from "vitest";
import { graph } from "./graph";
import { MACHINE_FAMILIES } from "./kinds";
import { MACHINE_FAMILY_META, machineFamilies } from "./machines";

const g = graph();
const families = machineFamilies(g);
const listed = families.flatMap((f) => f.members.map((t) => t.id));
const technologies = g.kind("technology");

/** The 99 technologies /machines/ listed from its hand-typed list on 4 November 2026, before it gathered by rule. None may drop off. */
const LISTED_BEFORE_RULE = [
  "x-ray-radiography-fluoroscopy", "ct", "dual-energy-spectral-ct", "photon-counting-ct", "ultrasound", "ultrasound-elastography-ceus", "mri", "mri-field-strengths", "breast-mri-coils-abbreviated-mri", "mammography", "contrast-enhanced-mammography", "ai-mammography-screening", "pet", "pet-ct", "pet-mri", "total-body-pet-screening", "nuclear-medicine-hardware", "spect", "spect-ct", "intraoperative-mri-ct", "optical-imaging",
  "endoscopic-ultrasound-systems", "robotic-bronchoscopy", "capsule-endoscopy-systems", "ai-endoscopy-detection", "cystoscopy-turbt", "colposcopes-digital-cervical-screening", "dermoscopy-ai", "confocal-oct-skin-imaging",
  "c-arm-linac", "ring-gantry-linac", "tomotherapy", "mr-linac", "cyberknife", "gamma-knife", "zap-x", "biology-guided-radiotherapy", "radiosurgery-srs", "brachytherapy-afterloaders", "intraoperative-radiotherapy", "electron-beam-therapy-systems", "total-skin-electron-therapy", "superficial-radiotherapy", "lattice-radiotherapy", "flash-rt", "flash-research-accelerators", "cobalt-60-teletherapy",
  "treatment-planning-systems", "knowledge-based-planning", "oncology-information-systems", "in-room-imaging-systems", "patient-positioning-surface-guidance-systems", "surface-guided-radiotherapy", "respiratory-gating-tumour-tracking-systems", "respiratory-motion-management", "radiotherapy-qa-phantoms-dosimeters", "in-vivo-dosimetry",
  "proton-therapy", "proton-therapy-systems", "carbon-ion", "carbon-ion-synchrotrons", "bnct", "bnct-accelerator-systems",
  "thermal-ablation", "cryoablation-systems", "microwave-rf-ablation", "irreversible-electroporation", "electrochemotherapy", "electrochemotherapy-devices", "hifu-histotripsy", "bbb-focused-ultrasound", "transcranial-focused-ultrasound-systems", "litt", "litt-systems", "hyperthermia", "hyperthermia-systems", "magnetic-nanoparticle-hyperthermia", "photoimmunotherapy", "photodynamic-therapy-lasers", "hipec", "hipec-pipac-devices", "ttfields",
  "robotic-surgery", "surgical-robot-platforms", "fluorescence-guided-surgery", "intraoperative-fluorescence-imaging-systems", "sentinel-node", "gamma-probes-dose-calibrators",
  "pharmacy-automation", "closed-system-transfer-devices", "infusion-devices-vascular-access", "scalp-cooling",
  "whole-slide-scanners", "flow-cytometers", "spatial-biology-instruments", "next-gen-short-read-platforms", "long-read-sequencing", "medical-cyclotrons-synthesis-modules", "cyclotron-isotope-production",
];

describe("/machines/ gathers its families from the corpus", () => {
  it("lists every technology with a machine family, and no machine twice", () => {
    const marked = technologies.filter((t) => t.machineFamily).map((t) => t.id).sort();
    expect([...listed].sort()).toEqual(marked);
    expect(new Set(listed).size).toBe(listed.length);
  });

  it("files each machine under the family its record names", () => {
    for (const f of families) for (const t of f.members) expect(t.machineFamily, t.id).toBe(f.id);
  });

  it("gives every technology from a machines wave a family, so a new wave cannot be left off the page", () => {
    const missing = technologies.filter((t) => t.tags.some((x) => x.startsWith("machines-wave")) && !t.machineFamily).map((t) => t.id);
    expect(missing).toEqual([]);
  });

  it("keeps every machine the hand-typed list held, in the family it was in", () => {
    const missing = LISTED_BEFORE_RULE.filter((id) => !listed.includes(id));
    expect(missing).toEqual([]);
  });

  it("orders only by ids that are machines in that family, so the hand order cannot hide a record", () => {
    for (const f of MACHINE_FAMILIES) for (const id of MACHINE_FAMILY_META[f].order) {
      const t = g.get(id);
      expect(t?.kind === "technology" ? t.machineFamily : undefined, `${id} in the ${f} order`).toBe(f);
    }
  });

  it("keeps the families in their order and the hand-curated order inside each", () => {
    expect(families.map((f) => f.id)).toEqual(MACHINE_FAMILIES.filter((f) => families.some((x) => x.id === f)));
    for (const f of families) {
      const ranked = f.members.map((t) => t.id).filter((id) => f.order.includes(id));
      expect(ranked).toEqual(f.order.filter((id) => ranked.includes(id)));
    }
  });

  it("places the machines wave 3 types in their families", () => {
    const familyOf = (id: string) => families.find((f) => f.members.some((t) => t.id === id))?.id;
    expect(familyOf("upright-radiotherapy-positioning")).toBe("radiotherapy-guidance");
    expect(familyOf("iort-systems")).toBe("radiotherapy");
    expect(familyOf("electronic-brachytherapy-systems")).toBe("radiotherapy");
    expect(familyOf("rotating-gamma-radiosurgery-systems")).toBe("radiotherapy");
    expect(familyOf("oncology-infusion-chairs")).toBe("chemo-supportive");
    expect(familyOf("limb-cryocompression-devices")).toBe("chemo-supportive");
    expect(familyOf("manual-cold-caps")).toBe("chemo-supportive");
  });

  it("links the machine roadmaps to their families, each to one family", () => {
    const roadmapFamily = new Map<string, string[]>();
    for (const f of families) for (const r of f.roadmaps) roadmapFamily.set(r.id, [...(roadmapFamily.get(r.id) ?? []), f.id]);
    for (const ids of roadmapFamily.values()) expect(ids).toHaveLength(1);
    expect(roadmapFamily.get("linac-machines-roadmap")).toEqual(["radiotherapy"]);
    expect(roadmapFamily.get("mr-and-biology-guided-radiotherapy-roadmap")).toEqual(["radiotherapy"]);
    expect(roadmapFamily.get("brachytherapy-iort-machines-roadmap")).toEqual(["radiotherapy"]);
    expect(roadmapFamily.get("particle-therapy-machines-roadmap")).toEqual(["particle"]);
    expect(roadmapFamily.get("chemo-chair-comfort-devices-roadmap")).toEqual(["chemo-supportive"]);
  });
});
