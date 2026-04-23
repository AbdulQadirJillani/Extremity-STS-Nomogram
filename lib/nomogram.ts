// =============================================================================
// Extremity STS Nomogram — Model Parameters
// Fine-Gray competing risks model
// Development: SEER 2004-2012 (n = 7,840)
// Shrinkage factor: 0.9713
// H0 recalibrated post-shrinkage via reference patient method
// =============================================================================

export const H0_3YR = 0.014408;
export const H0_5YR = 0.020739;

// Shrunken beta coefficients (ln SHR scale)
export const BETA: Record<string, number> = {
  // Age (continuous, per year)
  age: 0.009950,

  // Histological subtype (reference: Leiomyosarcoma)
  lipo_lg: -1.7148,
  lipo_hg: -0.4005,
  mfh: -0.1863,
  ss: 0.3001,
  rms: 0.3646,
  mpnst: 0.3646,
  fs: -0.4943,
  has: 0.7930,
  es: 0.1484,
  ccs: 0.5481,
  myxo: -0.5268,
  nos: 0.5306,

  // Grade (reference: Grade I)
  g2: 0.5068,
  hg: 1.2384,

  // Tumour size (continuous, per cm)
  size: 0.0677,

  // Stage (reference: Localised)
  ext: 0.2776,
  nodes: 0.8502,
  both: 0.8020,

  // Surgery (reference: Local excision)
  pr: -0.0305,
  re: -0.0513,

  // Radiation (reference: No)
  rad: 0.1133,

  // Sex (reference: Male)
  female: -0.1165,

  // Primary site (reference: Lower limb)
  upper: -0.0834,
};

export interface NomogramInputs {
  age: number;
  sex: "m" | "f";
  histo: string;
  grade: "g1" | "g2" | "hg";
  size: number;
  stage: "loc" | "ext" | "nodes" | "both";
  surg: "le" | "pr" | "re";
  rad: boolean;
  site: "l" | "u";
}

export interface NomogramResult {
  lp: number;
  cif3: number;
  cif5: number;
  tier3: RiskTier;
  tier5: RiskTier;
}

export type RiskTier = "low" | "mod" | "high" | "vhigh";

export function computeRisk(s: NomogramInputs): NomogramResult {
  let lp = 0;

  // Age
  lp += BETA.age * s.age;

  // Histology
  if (s.histo !== "lms") lp += BETA[s.histo] ?? 0;

  // Grade
  if (s.grade === "g2") lp += BETA.g2;
  if (s.grade === "hg") lp += BETA.hg;

  // Size
  lp += BETA.size * s.size;

  // Stage
  if (s.stage === "ext") lp += BETA.ext;
  if (s.stage === "nodes") lp += BETA.nodes;
  if (s.stage === "both") lp += BETA.both;

  // Surgery
  if (s.surg === "pr") lp += BETA.pr;
  if (s.surg === "re") lp += BETA.re;

  // Radiation
  if (s.rad) lp += BETA.rad;

  // Sex
  if (s.sex === "f") lp += BETA.female;

  // Site
  if (s.site === "u") lp += BETA.upper;

  const expLP = Math.exp(lp);
  const cif3 = (1 - Math.exp(-H0_3YR * expLP)) * 100;
  const cif5 = (1 - Math.exp(-H0_5YR * expLP)) * 100;

  return {
    lp,
    cif3,
    cif5,
    tier3: getRiskTier(cif3),
    tier5: getRiskTier(cif5),
  };
}

function getRiskTier(v: number): RiskTier {
  if (v < 10) return "low";
  if (v < 25) return "mod";
  if (v < 45) return "high";
  return "vhigh";
}

export const TIER_STYLES: Record<
  RiskTier,
  { color: string; bg: string; border: string; label: string }
> = {
  low:   { color: "#16875c", bg: "#e6f5ef", border: "#a8dbc5", label: "Low risk" },
  mod:   { color: "#b85c00", bg: "#fef3e6", border: "#f0c88a", label: "Moderate risk" },
  high:  { color: "#c0341c", bg: "#fdecea", border: "#f0a898", label: "High risk" },
  vhigh: { color: "#8b1414", bg: "#fce4e4", border: "#e89090", label: "Very high risk" },
};

// Histology options
export const HISTO_OPTIONS = [
  { value: "lms",     label: "Leiomyosarcoma (reference)" },
  { value: "lipo_lg", label: "Liposarcoma, well-differentiated" },
  { value: "lipo_hg", label: "Liposarcoma, dediff./myxoid/pleomorphic" },
  { value: "mfh",     label: "MFH / Undifferentiated pleomorphic sarcoma" },
  { value: "ss",      label: "Synovial sarcoma" },
  { value: "rms",     label: "Rhabdomyosarcoma" },
  { value: "mpnst",   label: "Malignant peripheral nerve sheath tumour" },
  { value: "fs",      label: "Fibrosarcoma / Myxofibrosarcoma" },
  { value: "has",     label: "Haemangiosarcoma" },
  { value: "es",      label: "Epithelioid sarcoma" },
  { value: "ccs",     label: "Clear cell sarcoma" },
  { value: "myxo",    label: "Myxosarcoma" },
  { value: "nos",     label: "Other / Not otherwise specified" },
];

export const DEFAULT_INPUTS: NomogramInputs = {
  age: 57,
  sex: "m",
  histo: "lms",
  grade: "g1",
  size: 6.7,
  stage: "loc",
  surg: "le",
  rad: false,
  site: "l",
};
