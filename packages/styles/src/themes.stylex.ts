import * as stylex from '@stylexjs/stylex';
import { tokens } from '@basex-ui/tokens';

/**
 * Light theme — the default. Uses the base token values,
 * so only tokens that differ from defaults need overrides.
 */
export const lightTheme = stylex.createTheme(tokens, {
  // Light theme matches the defaults in tokens.stylex.ts.
  // Explicitly listed here for clarity and as the canonical reference.
  colorPrimary: 'oklch(0.55 0.2 250)',
  colorPrimaryHover: 'oklch(0.50 0.22 250)',
  colorPrimaryActive: 'oklch(0.45 0.24 250)',
  colorPrimaryContrast: 'oklch(0.98 0 0)',

  colorSecondary: 'oklch(0.55 0.05 260)',
  colorSecondaryHover: 'oklch(0.50 0.06 260)',
  colorSecondaryActive: 'oklch(0.45 0.07 260)',
  colorSecondaryContrast: 'oklch(0.98 0 0)',

  colorDestructive: 'oklch(0.55 0.22 25)',
  colorDestructiveHover: 'oklch(0.50 0.24 25)',
  colorDestructiveActive: 'oklch(0.45 0.26 25)',
  colorDestructiveContrast: 'oklch(0.98 0 0)',
  colorDestructiveMuted: 'oklch(0.55 0.22 25 / 0.1)',

  colorMuted: 'oklch(0.93 0.005 260)',
  colorMutedForeground: 'oklch(0.45 0.02 260)',

  colorSurface: 'oklch(0.99 0 0)',
  colorSurfaceRaised: 'oklch(1 0 0)',
  colorSurfaceOverlay: 'oklch(1 0 0)',

  colorOverlay: 'oklch(0.15 0 0 / 0.6)',

  colorBorder: 'oklch(0.85 0.01 260)',
  colorBorderMuted: 'oklch(0.91 0.005 260)',

  colorText: 'oklch(0.15 0.02 260)',
  colorTextMuted: 'oklch(0.45 0.02 260)',
  colorTextInverse: 'oklch(0.98 0 0)',

  colorFocusRing: 'oklch(0.55 0.2 250)',
  colorBackground: 'oklch(0.97 0.005 260)',

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

  fontFamilySans: "'TikTok Sans', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
  fontFamilyMono: "ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, 'Liberation Mono', monospace",
  fontSizeXs: '0.75rem',
  fontSizeSm: '0.875rem',
  fontSizeMd: '1rem',
  fontSizeLg: '1.125rem',
  fontSizeXl: '1.25rem',
  fontSize2xl: '1.5rem',
  fontWeightNormal: '400',
  fontWeightMedium: '500',
  fontWeightSemibold: '600',
  fontWeightBold: '700',
  lineHeightTight: '1.25',
  lineHeightNormal: '1.5',
  lineHeightRelaxed: '1.75',
  letterSpacingTight: '-0.025em',
  letterSpacingNormal: '0em',
  letterSpacingWide: '0.025em',

  radiusNone: '0px',
  radiusSm: '4px',
  radiusMd: '8px',
  radiusLg: '12px',
  radiusXl: '16px',
  radiusFull: '9999px',

  borderWidthDefault: '1px',
  borderWidthThick: '2px',

  shadowNone: 'none',
  shadowSm: '0 1px 2px 0 oklch(0.15 0 0 / 0.05)',
  shadowMd: '0 4px 6px -1px oklch(0.15 0 0 / 0.07), 0 2px 4px -2px oklch(0.15 0 0 / 0.05)',
  shadowLg: '0 10px 15px -3px oklch(0.15 0 0 / 0.08), 0 4px 6px -4px oklch(0.15 0 0 / 0.05)',
  shadowXl: '0 20px 25px -5px oklch(0.15 0 0 / 0.1), 0 8px 10px -6px oklch(0.15 0 0 / 0.05)',

  motionDurationFast: '100ms',
  motionDurationNormal: '200ms',
  motionDurationSlow: '400ms',
  motionEaseOut: 'cubic-bezier(0, 0, 0.2, 1)',
  motionEaseInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  motionEaseSpring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
});

/**
 * Dark theme — inverted color semantics for dark mode.
 * Surfaces are dark, text is light, colors shift for contrast on dark backgrounds.
 */
export const darkTheme = stylex.createTheme(tokens, {
  // Primary — lighter on dark backgrounds
  colorPrimary: 'oklch(0.70 0.18 250)',
  colorPrimaryHover: 'oklch(0.75 0.20 250)',
  colorPrimaryActive: 'oklch(0.65 0.16 250)',
  colorPrimaryContrast: 'oklch(0.15 0 0)',

  // Secondary — lighter on dark backgrounds
  colorSecondary: 'oklch(0.70 0.04 260)',
  colorSecondaryHover: 'oklch(0.75 0.05 260)',
  colorSecondaryActive: 'oklch(0.65 0.03 260)',
  colorSecondaryContrast: 'oklch(0.15 0 0)',

  // Destructive — lighter on dark backgrounds
  colorDestructive: 'oklch(0.65 0.20 25)',
  colorDestructiveHover: 'oklch(0.70 0.22 25)',
  colorDestructiveActive: 'oklch(0.60 0.18 25)',
  colorDestructiveContrast: 'oklch(0.15 0 0)',
  colorDestructiveMuted: 'oklch(0.65 0.20 25 / 0.15)',

  // Muted
  colorMuted: 'oklch(0.25 0.01 260)',
  colorMutedForeground: 'oklch(0.65 0.02 260)',

  // Surfaces — dark
  colorSurface: 'oklch(0.20 0.01 260)',
  colorSurfaceRaised: 'oklch(0.24 0.01 260)',
  colorSurfaceOverlay: 'oklch(0.26 0.01 260)',

  // Overlay — darker backdrop
  colorOverlay: 'oklch(0.05 0 0 / 0.8)',

  // Borders — subtle on dark
  colorBorder: 'oklch(0.35 0.01 260)',
  colorBorderMuted: 'oklch(0.28 0.005 260)',

  // Text — light on dark
  colorText: 'oklch(0.93 0.005 260)',
  colorTextMuted: 'oklch(0.65 0.02 260)',
  colorTextInverse: 'oklch(0.15 0.02 260)',

  // Focus
  colorFocusRing: 'oklch(0.70 0.18 250)',

  // Background
  colorBackground: 'oklch(0.16 0.01 260)',

  // Non-color tokens stay the same
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

  fontFamilySans: "'TikTok Sans', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
  fontFamilyMono: "ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, 'Liberation Mono', monospace",
  fontSizeXs: '0.75rem',
  fontSizeSm: '0.875rem',
  fontSizeMd: '1rem',
  fontSizeLg: '1.125rem',
  fontSizeXl: '1.25rem',
  fontSize2xl: '1.5rem',
  fontWeightNormal: '400',
  fontWeightMedium: '500',
  fontWeightSemibold: '600',
  fontWeightBold: '700',
  lineHeightTight: '1.25',
  lineHeightNormal: '1.5',
  lineHeightRelaxed: '1.75',
  letterSpacingTight: '-0.025em',
  letterSpacingNormal: '0em',
  letterSpacingWide: '0.025em',

  radiusNone: '0px',
  radiusSm: '4px',
  radiusMd: '8px',
  radiusLg: '12px',
  radiusXl: '16px',
  radiusFull: '9999px',

  borderWidthDefault: '1px',
  borderWidthThick: '2px',

  // Shadows — slightly lighter opacity for dark mode
  shadowNone: 'none',
  shadowSm: '0 1px 2px 0 oklch(0 0 0 / 0.3)',
  shadowMd: '0 4px 6px -1px oklch(0 0 0 / 0.4), 0 2px 4px -2px oklch(0 0 0 / 0.3)',
  shadowLg: '0 10px 15px -3px oklch(0 0 0 / 0.4), 0 4px 6px -4px oklch(0 0 0 / 0.3)',
  shadowXl: '0 20px 25px -5px oklch(0 0 0 / 0.5), 0 8px 10px -6px oklch(0 0 0 / 0.3)',

  motionDurationFast: '100ms',
  motionDurationNormal: '200ms',
  motionDurationSlow: '400ms',
  motionEaseOut: 'cubic-bezier(0, 0, 0.2, 1)',
  motionEaseInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  motionEaseSpring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
});
