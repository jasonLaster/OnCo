import { z } from "zod";

const nonempty = z.string().trim().min(1);
const entityId = z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/);
const source = z.object({ label: nonempty, url: z.string().url().refine(s => /^https?:\/\//.test(s), "A source must use HTTP or HTTPS") });

/** A check date is distinct from a source's publication/version or the event it describes. */
export const SourceObservationSchema = z.object({
  sources: z.array(source).min(1),
  checkedOn: z.iso.date(),
  sourceDate: z.iso.date().optional(),
  sourceVersion: nonempty.optional(),
});

/** Coexisting scoped statements, never a ladder of clinical usefulness. */
export const RegulatoryClaimSchema = SourceObservationSchema.extend({
  subject: z.object({ type: z.enum(["laboratory", "product", "test-system"]), name: nonempty }),
  claimType: z.enum(["laboratory-certification", "development-designation", "marketing-authorization", "clearance", "emergency-authorization", "conformity-mark", "registration-listing", "laboratory-developed", "research-use", "withdrawal", "other"]),
  authority: nonempty,
  jurisdiction: nonempty,
  /** Certification scope or exact product/intended-use scope, rather than just a gene name. */
  scope: nonempty,
  intendedUse: z.object({
    diseaseIds: z.array(entityId).optional(),
    therapyIds: z.array(entityId).optional(),
    specimen: nonempty.optional(),
    decisionRule: nonempty.optional(),
    setting: nonempty.optional(),
  }).optional(),
  statement: nonempty,
  effectiveOn: z.iso.date().optional(),
  endedOn: z.iso.date().optional(),
}).superRefine((claim, ctx) => {
  if (claim.claimType === "laboratory-certification" && claim.subject.type !== "laboratory") ctx.addIssue({ code: "custom", path: ["subject", "type"], message: "Laboratory certification describes a laboratory, not product authorization" });
  if (["marketing-authorization", "clearance", "emergency-authorization"].includes(claim.claimType) && claim.subject.type === "laboratory") ctx.addIssue({ code: "custom", path: ["subject", "type"], message: "Product authorization is separate from laboratory certification" });
  if (claim.effectiveOn && claim.endedOn && claim.endedOn < claim.effectiveOn) ctx.addIssue({ code: "custom", path: ["endedOn"], message: "An end date cannot precede the effective date" });
});
export type RegulatoryClaim = z.infer<typeof RegulatoryClaimSchema>;

/** These observations inherit the containing registry row's source, time and study hash. */
export const TrialFacilitySchema = z.object({
  facility: nonempty.optional(),
  status: nonempty.optional(),
  city: nonempty.optional(),
  state: nonempty.optional(),
  country: nonempty.optional(),
});

/** Local cohort/slot information needs a separate dated source, not an overall registry status. */
export const TrialCohortObservationSchema = SourceObservationSchema.extend({
  facility: nonempty,
  cohort: nonempty,
  availability: z.enum(["open", "closed", "waitlist", "not-stated"]),
  availableSlots: z.number().int().nonnegative().optional(),
  note: nonempty.optional(),
});

export const MechanismEvidenceSchema = SourceObservationSchema.extend({
  basis: z.enum(["observed", "hypothesis", "model-derived"]),
  /** Organism/model, cells, experimental conditions or population to which the statement applies. */
  context: nonempty,
  statement: nonempty,
  limitation: nonempty.optional(),
});
export type MechanismEvidence = z.infer<typeof MechanismEvidenceSchema>;

const chemicalIdentity = z.object({ name: nonempty, entityId: entityId.optional() });
export const PayloadLoadingObservationSchema = SourceObservationSchema.extend({
  quantity: z.literal("mean-count-per-antibody"),
  value: z.number().finite().nonnegative(),
  unit: z.enum(["payload-molecules/antibody", "radionuclide-atoms/antibody"]),
  /** Product/lot or material and assay context actually described by the source. */
  scope: nonempty,
  method: nonempty.optional(),
  distributionNote: nonempty.optional(),
});

export const PayloadComponentSchema = SourceObservationSchema.extend({
  /** Local component identity within this construct; not a new global corpus record. */
  id: entityId,
  cargoKind: z.enum(["small-molecule", "protein", "oligonucleotide", "radionuclide", "other"]),
  chemical: chemicalIdentity,
  mechanism: nonempty,
  classIds: z.array(entityId).optional(),
  molecularTargets: z.array(chemicalIdentity).optional(),
  attachedSpecies: nonempty.optional(),
  releasedSpecies: z.array(SourceObservationSchema.extend({ chemical: chemicalIdentity, context: nonempty })).optional(),
  loadingObservations: z.array(PayloadLoadingObservationSchema).optional(),
  note: nonempty.optional(),
}).superRefine((component, ctx) => {
  for (const [i, observation] of (component.loadingObservations ?? []).entries()) {
    const expected = component.cargoKind === "radionuclide" ? "radionuclide-atoms/antibody" : "payload-molecules/antibody";
    if (observation.unit !== expected) ctx.addIssue({ code: "custom", path: ["loadingObservations", i, "unit"], message: `Use ${expected} for this cargo kind; activity and absorbed dose are separate quantities` });
  }
});

export const ConjugateCompositionSchema = SourceObservationSchema.extend({
  deliveryTargetIds: z.array(entityId).optional(),
  payloads: z.array(PayloadComponentSchema).min(1),
  note: nonempty.optional(),
}).superRefine((composition, ctx) => {
  const seen = new Set<string>();
  for (const [i, component] of composition.payloads.entries()) {
    if (seen.has(component.id)) ctx.addIssue({ code: "custom", path: ["payloads", i, "id"], message: "Component ids must be unique within the construct" });
    seen.add(component.id);
  }
});
export type ConjugateComposition = z.infer<typeof ConjugateCompositionSchema>;
