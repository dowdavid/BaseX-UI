/**
 * Token presets — objects of token overrides ready for stylex.createTheme.
 * The CLI maps interactive selections to these presets.
 */

// --- Radius Presets ---
export const radiusPresets = {
  none: {
    radiusNone: '0px',
    radiusSm: '0px',
    radiusMd: '0px',
    radiusLg: '0px',
    radiusXl: '0px',
    radiusFull: '0px',
  },
  sm: {
    radiusSm: '2px',
    radiusMd: '4px',
    radiusLg: '6px',
    radiusXl: '8px',
  },
  md: {},
  lg: {
    radiusSm: '6px',
    radiusMd: '12px',
    radiusLg: '16px',
    radiusXl: '24px',
  },
  full: {
    radiusSm: '9999px',
    radiusMd: '9999px',
    radiusLg: '9999px',
    radiusXl: '9999px',
    radiusFull: '9999px',
  },
} as const;

// --- Shadow Presets ---
export const shadowPresets = {
  none: {
    shadowSm: 'none',
    shadowMd: 'none',
    shadowLg: 'none',
    shadowXl: 'none',
  },
  subtle: {},
  medium: {
    shadowSm: '0 1px 3px 0 oklch(0.15 0 0 / 0.08)',
    shadowMd: '0 4px 8px -1px oklch(0.15 0 0 / 0.1), 0 2px 4px -2px oklch(0.15 0 0 / 0.06)',
    shadowLg: '0 12px 20px -4px oklch(0.15 0 0 / 0.12), 0 4px 8px -4px oklch(0.15 0 0 / 0.06)',
    shadowXl: '0 24px 32px -6px oklch(0.15 0 0 / 0.14), 0 10px 14px -6px oklch(0.15 0 0 / 0.06)',
  },
  dramatic: {
    shadowSm: '0 2px 4px 0 oklch(0.15 0 0 / 0.12)',
    shadowMd: '0 6px 12px -2px oklch(0.15 0 0 / 0.15), 0 3px 6px -3px oklch(0.15 0 0 / 0.1)',
    shadowLg: '0 16px 28px -6px oklch(0.15 0 0 / 0.18), 0 6px 10px -5px oklch(0.15 0 0 / 0.08)',
    shadowXl: '0 30px 40px -8px oklch(0.15 0 0 / 0.22), 0 12px 18px -8px oklch(0.15 0 0 / 0.08)',
  },
} as const;

// --- Border Width Presets ---
export const borderWidthPresets = {
  none: {
    borderWidthDefault: '0px',
    borderWidthThick: '0px',
  },
  thin: {},
  medium: {
    borderWidthDefault: '1.5px',
    borderWidthThick: '3px',
  },
  thick: {
    borderWidthDefault: '2px',
    borderWidthThick: '4px',
  },
} as const;

// --- Spacing Density Presets ---
export const spacingDensityPresets = {
  compact: {
    space1: '2px',
    space2: '4px',
    space3: '8px',
    space4: '12px',
    space5: '16px',
    space6: '20px',
    space8: '24px',
    space10: '32px',
    space12: '40px',
  },
  default: {},
  spacious: {
    space1: '6px',
    space2: '12px',
    space3: '16px',
    space4: '20px',
    space5: '24px',
    space6: '32px',
    space8: '40px',
    space10: '48px',
    space12: '64px',
  },
} as const;

export type RadiusPreset = keyof typeof radiusPresets;
export type ShadowPreset = keyof typeof shadowPresets;
export type BorderWidthPreset = keyof typeof borderWidthPresets;
export type SpacingDensityPreset = keyof typeof spacingDensityPresets;
