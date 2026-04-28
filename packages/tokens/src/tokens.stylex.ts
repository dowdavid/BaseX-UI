import * as stylex from '@stylexjs/stylex';

/**
 * BaseX UI Design Tokens
 *
 * All tokens defined with stylex.defineVars. Names are self-documenting
 * so AI agents can use them correctly without additional context.
 */
export const tokens = stylex.defineVars({
  // --- Colors (OKLCH-based, semantic aliases) ---

  // Primary palette — Sodium Orange (#FF6B1A)
  colorPrimary: 'oklch(0.703 0.198 43.4)',
  colorPrimaryHover: 'oklch(0.738 0.171 46.0)',
  colorPrimaryActive: 'oklch(0.454 0.123 44.0)',
  colorPrimaryContrast: 'oklch(1 0 0)',

  // Secondary palette
  colorSecondary: 'oklch(0.55 0.05 260)',
  colorSecondaryHover: 'oklch(0.50 0.06 260)',
  colorSecondaryActive: 'oklch(0.45 0.07 260)',
  colorSecondaryContrast: 'oklch(0.98 0 0)',

  // Destructive palette
  colorDestructive: 'oklch(0.55 0.22 25)',
  colorDestructiveHover: 'oklch(0.50 0.24 25)',
  colorDestructiveActive: 'oklch(0.45 0.26 25)',
  colorDestructiveContrast: 'oklch(0.98 0 0)',
  colorDestructiveMuted: 'oklch(0.55 0.22 25 / 0.1)',
  // Foreground variant for destructive text on neutral surfaces (menus, fields,
  // ghost/outline buttons). Distinct from `colorDestructive` (used as bg fill).
  colorDestructiveText: 'oklch(0.45 0.22 25)',

  // Success palette
  colorSuccess: 'oklch(0.65 0.17 145)',
  colorSuccessContrast: 'oklch(0.98 0 0)',
  // Foreground variant for success text on neutral surfaces.
  colorSuccessText: 'oklch(0.45 0.17 145)',

  // Muted
  colorMuted: 'oklch(0.93 0.005 260)',
  colorMutedForeground: 'oklch(0.45 0.02 260)',

  // Surfaces
  colorSurface: 'oklch(0.99 0 0)',
  colorSurfaceRaised: 'oklch(1 0 0)',
  colorSurfaceOverlay: 'oklch(1 0 0)',

  // Overlay backdrop
  colorOverlay: 'oklch(0.15 0 0 / 0.6)',

  // Borders
  colorBorder: 'oklch(0.75 0.01 260)',
  colorBorderMuted: 'oklch(0.85 0.01 260)',
  // Stronger border for form-field outlines (input, select, checkbox unchecked,
  // etc.) — needs WCAG 1.4.11 (3:1) against the surface.
  colorBorderStrong: 'oklch(0.7 0.01 260)',
  // Border for floating surfaces (popover, tooltip, menu, select listbox, etc.)
  // — distinct from in-popup separators.
  colorPopoverBorder: 'oklch(0.78 0.01 260)',
  // Empty-track color for slider, progress, meter.
  colorTrack: 'oklch(0.88 0.005 260)',

  // Text
  colorText: 'oklch(0.15 0.02 260)',
  colorTextMuted: 'oklch(0.45 0.01 260)',
  colorIcon: 'oklch(0.6 0.01 260)',
  colorTextPlaceholder: 'oklch(0.62 0.01 260)',
  colorTextInverse: 'oklch(0.98 0 0)',

  // Focus — neutral gray, not blue (matches COSS UI approach)
  colorFocusRing: 'oklch(0.7 0 0)',

  // Background
  colorBackground: '#ffffff',

  // --- Spacing (consistent scale) ---
  space1: '4px',
  space1h: '6px',
  space2: '8px',
  space2h: '10px',
  space3: '12px',
  space3h: '14px',
  space4: '16px',
  space5: '20px',
  space6: '24px',
  space8: '32px',
  space10: '40px',
  space12: '48px',

  // --- Typography ---

  // Font families
  // Note: fontFamilySans intentionally resolves to the Geist Mono stack so the
  // entire component surface shares a single monospace voice. Kept as a named
  // token to preserve existing component references (zero-diff switch).
  fontFamilySans:
    "'Geist Mono', ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, 'Liberation Mono', monospace",
  fontFamilyMono:
    "'Geist Mono', ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, 'Liberation Mono', monospace",

  // Font sizes (base scale)
  fontSizeXs: '0.75rem',
  fontSizeSm: '0.875rem',
  fontSizeMd: '1rem',
  fontSizeLg: '1.125rem',
  fontSizeXl: '1.25rem',
  fontSize2xl: '1.5rem',

  // Typography scale (portfolio-aligned: label / body / subhead / title)
  fontSizeLabel: '10px',
  fontSizeBody: '14px',
  fontSizeSubhead: '18px',
  fontSizeTitle: '22px',

  // Font weights
  fontWeightNormal: '400',
  fontWeightMedium: '500',
  fontWeightSemibold: '600',
  fontWeightBold: '700',

  // Line heights
  lineHeightTight: '1.25',
  lineHeightNormal: '1.5',
  lineHeightRelaxed: '1.75',

  // Letter spacing
  letterSpacingTight: '-0.025em',
  letterSpacingNormal: '0em',
  letterSpacingWide: '0.025em',
  letterSpacingLabel: '0.2em',

  // --- Border Radius ---
  // Flattened to 0 across the board — BaseX UI uses squared corners system-wide.
  radiusNone: '0px',
  radiusSm: '0px',
  radiusMd: '0px',
  radiusLg: '0px',
  radiusXl: '0px',
  radiusFull: '0px',

  // --- Border Width ---
  borderWidthDefault: '1px',
  borderWidthThick: '2px',

  // --- Shadows ---
  shadowNone: 'none',
  shadowSm: '0 1px 2px 0 oklch(0.15 0 0 / 0.05)',
  shadowMd: '0 4px 6px -1px oklch(0.15 0 0 / 0.07), 0 2px 4px -2px oklch(0.15 0 0 / 0.05)',
  shadowLg: '0 10px 15px -3px oklch(0.15 0 0 / 0.08), 0 4px 6px -4px oklch(0.15 0 0 / 0.05)',
  shadowXl: '0 20px 25px -5px oklch(0.15 0 0 / 0.1), 0 8px 10px -6px oklch(0.15 0 0 / 0.05)',

  // --- Motion ---
  motionDurationFast: '100ms',
  motionDurationNormal: '200ms',
  motionDurationSlow: '400ms',
  motionEaseOut: 'cubic-bezier(0, 0, 0.2, 1)',
  motionEaseInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  motionEaseSpring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
});

export type TokenVars = typeof tokens;
