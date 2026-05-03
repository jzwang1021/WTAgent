// Common unit conversions for wind turbine engineering

export const units = {
  /** kN to N */
  kNtoN: (v: number) => v * 1000,
  /** N to kN */
  NtokN: (v: number) => v / 1000,
  /** MPa to Pa */
  MPaToPa: (v: number) => v * 1e6,
  /** Pa to MPa */
  PaToMPa: (v: number) => v / 1e6,
  /** kN·m to N·m */
  kNmToNm: (v: number) => v * 1000,
  /** N·m to kN·m */
  NmTokNm: (v: number) => v / 1000,
  /** m to mm */
  mToMm: (v: number) => v * 1000,
  /** mm to m */
  mmToM: (v: number) => v / 1000,
  /** t (metric ton) to kg */
  tToKg: (v: number) => v * 1000,
  /** kg to t */
  kgToT: (v: number) => v / 1000,
  /** rad/s to Hz */
  radsToHz: (v: number) => v / (2 * Math.PI),
  /** Hz to rad/s */
  hzToRads: (v: number) => v * 2 * Math.PI,
  /** rpm to Hz */
  rpmToHz: (v: number) => v / 60,
  /** Hz to rpm */
  hzToRpm: (v: number) => v * 60,
} as const;

/** Format a number with units for display */
export function formatWithUnit(value: number, unit: string, decimals = 2): string {
  return `${value.toFixed(decimals)} ${unit}`;
}
