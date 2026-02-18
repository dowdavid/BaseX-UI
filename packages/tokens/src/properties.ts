/**
 * CSS @property registrations for animatable tokens.
 *
 * Key tokens registered with @property so they can be animated/transitioned:
 * - Color tokens (for smooth theme transitions)
 * - Radius tokens (for morphing effects)
 * - Shadow tokens (for elevation transitions)
 *
 * Call registerProperties() in your app entry point to enable these.
 */

const COLOR_PROPERTIES = [
  '--colorPrimary',
  '--colorPrimaryHover',
  '--colorPrimaryActive',
  '--colorPrimaryContrast',
  '--colorSecondary',
  '--colorSecondaryHover',
  '--colorSecondaryActive',
  '--colorSecondaryContrast',
  '--colorDestructive',
  '--colorDestructiveHover',
  '--colorDestructiveActive',
  '--colorDestructiveContrast',
  '--colorMuted',
  '--colorMutedForeground',
  '--colorSurface',
  '--colorSurfaceRaised',
  '--colorSurfaceOverlay',
  '--colorOverlay',
  '--colorBorder',
  '--colorBorderMuted',
  '--colorText',
  '--colorTextMuted',
  '--colorTextInverse',
  '--colorFocusRing',
  '--colorBackground',
] as const;

const LENGTH_PROPERTIES = [
  '--radiusSm',
  '--radiusMd',
  '--radiusLg',
  '--radiusXl',
  '--radiusFull',
] as const;

/**
 * Generate a CSS string with all @property rules.
 * Inject this into a <style> element or use in a stylesheet.
 */
export function generatePropertyRegistrations(): string {
  const rules: string[] = [];

  for (const prop of COLOR_PROPERTIES) {
    rules.push(`@property ${prop} {
  syntax: '<color>';
  inherits: true;
  initial-value: transparent;
}`);
  }

  for (const prop of LENGTH_PROPERTIES) {
    rules.push(`@property ${prop} {
  syntax: '<length>';
  inherits: true;
  initial-value: 0px;
}`);
  }

  return rules.join('\n\n');
}

/**
 * Register CSS @property rules at runtime.
 * Call this once in your app entry point.
 */
export function registerProperties(): void {
  if (typeof document === 'undefined') return;
  if (typeof CSS === 'undefined' || !('registerProperty' in CSS)) return;

  for (const prop of COLOR_PROPERTIES) {
    try {
      CSS.registerProperty({
        name: prop,
        syntax: '<color>',
        inherits: true,
        initialValue: 'transparent',
      });
    } catch {
      // Already registered — ignore
    }
  }

  for (const prop of LENGTH_PROPERTIES) {
    try {
      CSS.registerProperty({
        name: prop,
        syntax: '<length>',
        inherits: true,
        initialValue: '0px',
      });
    } catch {
      // Already registered — ignore
    }
  }
}
