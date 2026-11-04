/** Schematic aliases for the records in src/data/machines-wave3.ts, kept apart so a client component can read them without bundling the records (TechThumb imports src/data/schematics.ts). */
/** Every new machine technology shares an existing base drawing of the same mechanism (values are base ids, never aliases). */
export const machineSchematicAliases3: Record<string, string> = {
  "upright-radiotherapy-positioning": "proton-therapy", "iort-systems": "intraoperative-radiotherapy", "electronic-brachytherapy-systems": "brachytherapy",
  "rotating-gamma-radiosurgery-systems": "sbrt", "oncology-infusion-chairs": "infusion-devices-vascular-access",
  "limb-cryocompression-devices": "frozen-gloves-compression-taxane", "manual-cold-caps": "scalp-cooling",
};
