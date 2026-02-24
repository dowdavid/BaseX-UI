/**
 * OKLCH Palette Generator
 *
 * Takes a hex color, converts to OKLCH, generates a full palette (50-950
 * lightness steps) plus semantic aliases (colorPrimary, colorPrimaryHover,
 * colorPrimaryContrast, etc.). The CLI uses this for custom primary color selection.
 */

// --- Hex to sRGB ---
function hexToRgb(hex: string): [number, number, number] {
  const clean = hex.replace('#', '');
  const r = parseInt(clean.slice(0, 2), 16) / 255;
  const g = parseInt(clean.slice(2, 4), 16) / 255;
  const b = parseInt(clean.slice(4, 6), 16) / 255;
  return [r, g, b];
}

// --- sRGB to Linear RGB ---
function srgbToLinear(c: number): number {
  return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

// --- Linear RGB to XYZ (D65) ---
function linearRgbToXyz(r: number, g: number, b: number): [number, number, number] {
  const x = 0.4124564 * r + 0.3575761 * g + 0.1804375 * b;
  const y = 0.2126729 * r + 0.7151522 * g + 0.072175 * b;
  const z = 0.0193339 * r + 0.119192 * g + 0.9503041 * b;
  return [x, y, z];
}

// --- XYZ to OKLab ---
function xyzToOklab(x: number, y: number, z: number): [number, number, number] {
  const l_ = 0.8189330101 * x + 0.3618667424 * y - 0.1288597137 * z;
  const m_ = 0.0329845436 * x + 0.9293118715 * y + 0.0361456387 * z;
  const s_ = 0.0482003018 * x + 0.2643662691 * y + 0.633851707 * z;

  const l_c = Math.cbrt(l_);
  const m_c = Math.cbrt(m_);
  const s_c = Math.cbrt(s_);

  const L = 0.2104542553 * l_c + 0.793617785 * m_c - 0.0040720468 * s_c;
  const a = 1.9779984951 * l_c - 2.428592205 * m_c + 0.4505937099 * s_c;
  const bVal = 0.0259040371 * l_c + 0.7827717662 * m_c - 0.808675766 * s_c;

  return [L, a, bVal];
}

// --- OKLab to OKLCH ---
function oklabToOklch(L: number, a: number, b: number): [number, number, number] {
  const C = Math.sqrt(a * a + b * b);
  let h = (Math.atan2(b, a) * 180) / Math.PI;
  if (h < 0) h += 360;
  return [L, C, h];
}

/**
 * Convert a hex color to OKLCH values.
 */
export function hexToOklch(hex: string): { l: number; c: number; h: number } {
  const [r, g, b] = hexToRgb(hex);
  const [lr, lg, lb] = [srgbToLinear(r), srgbToLinear(g), srgbToLinear(b)];
  const [x, y, z] = linearRgbToXyz(lr, lg, lb);
  const [L, a, bVal] = xyzToOklab(x, y, z);
  const [l, c, h] = oklabToOklch(L, a, bVal);
  return { l, c, h };
}

/**
 * Format OKLCH values as a CSS oklch() string.
 */
export function formatOklch(l: number, c: number, h: number): string {
  return `oklch(${l.toFixed(3)} ${c.toFixed(3)} ${h.toFixed(1)})`;
}

/**
 * Lightness steps for palette generation.
 * Maps step name to target OKLCH lightness.
 */
const PALETTE_STEPS = {
  50: 0.97,
  100: 0.93,
  200: 0.87,
  300: 0.78,
  400: 0.68,
  500: 0.55,
  600: 0.48,
  700: 0.4,
  800: 0.32,
  900: 0.25,
  950: 0.18,
} as const;

export type PaletteStep = keyof typeof PALETTE_STEPS;

/**
 * Generate a full OKLCH palette from a hex color.
 * Returns an object mapping step numbers to oklch() CSS strings.
 */
export function generatePalette(hex: string): Record<PaletteStep, string> {
  const { c, h } = hexToOklch(hex);

  const palette = {} as Record<PaletteStep, string>;
  for (const [step, lightness] of Object.entries(PALETTE_STEPS)) {
    // Scale chroma: reduce for very light/dark steps, maintain for mid-range
    const chromaScale = lightness > 0.85 ? 0.3 : lightness < 0.3 ? 0.6 : 1.0;
    palette[Number(step) as PaletteStep] = formatOklch(lightness, c * chromaScale, h);
  }

  return palette;
}

/**
 * Generate semantic color aliases from a hex color.
 * Returns token overrides ready for stylex.createTheme.
 */
export function generateSemanticColors(hex: string): {
  colorPrimary: string;
  colorPrimaryHover: string;
  colorPrimaryActive: string;
  colorPrimaryContrast: string;
} {
  const palette = generatePalette(hex);

  return {
    colorPrimary: palette[500],
    colorPrimaryHover: palette[600],
    colorPrimaryActive: palette[700],
    colorPrimaryContrast: formatOklch(0.98, 0, 0),
  };
}

export { PALETTE_STEPS };
