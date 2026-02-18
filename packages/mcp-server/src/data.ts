import { intentsIndex } from '@basex-ui/intelligence';
import type { Intent, AntiPattern } from '@basex-ui/intelligence';

/**
 * Component registry — in production, this reads from scaffolded manifests.
 * For now, it's built from the bundled Button manifest.
 */

// Inline the button manifest data for the MCP server
const buttonManifest = {
  name: 'Button',
  description:
    'A styled button component for triggering actions. Built on Base UI Button with StyleX styling.',
  category: 'actions',
  baseComponent: '@base-ui/react/button',
  parts: ['root'],
  props: {
    variant: {
      type: "'solid' | 'outline' | 'ghost'",
      default: 'solid',
      description:
        'Visual style of the button. Solid has a filled background, outline has a border with transparent background, ghost has no border or background.',
    },
    color: {
      type: "'default' | 'secondary' | 'destructive'",
      default: 'default',
      description:
        'Color palette applied to the button. Default uses the primary color, secondary uses the secondary palette, destructive uses the destructive/danger palette.',
    },
    size: {
      type: "'sm' | 'md' | 'lg'",
      default: 'md',
      description:
        'Size of the button affecting height, padding, and font size.',
    },
    sx: {
      type: 'StyleXStyles',
      description:
        "StyleX styles for consumer overrides. Applied last for deterministic 'last style wins' behavior.",
    },
    disabled: {
      type: 'boolean',
      default: false,
      description:
        'Whether the button is disabled. Reduces opacity and disables pointer events.',
    },
  },
  variants: {
    variant: ['solid', 'outline', 'ghost'],
    color: ['default', 'secondary', 'destructive'],
    size: ['sm', 'md', 'lg'],
  },
  dataAttributes: {
    'data-disabled': 'Present when the button is disabled.',
  },
  examples: [
    {
      name: 'basic',
      description: 'Basic solid button',
      code: '<Button>Click me</Button>',
    },
    {
      name: 'variants',
      description: 'All three variants',
      code: '<>\n  <Button variant="solid">Solid</Button>\n  <Button variant="outline">Outline</Button>\n  <Button variant="ghost">Ghost</Button>\n</>',
    },
    {
      name: 'colors',
      description: 'Color variations',
      code: '<>\n  <Button color="default">Default</Button>\n  <Button color="secondary">Secondary</Button>\n  <Button color="destructive">Destructive</Button>\n</>',
    },
    {
      name: 'sizes',
      description: 'Size variations',
      code: '<>\n  <Button size="sm">Small</Button>\n  <Button size="md">Medium</Button>\n  <Button size="lg">Large</Button>\n</>',
    },
    {
      name: 'destructive-outline',
      description: 'Destructive outline button for less prominent dangerous actions',
      code: '<Button variant="outline" color="destructive">Remove</Button>',
    },
    {
      name: 'disabled',
      description: 'Disabled button',
      code: '<Button disabled>Unavailable</Button>',
    },
  ],
};

export interface ComponentInfo {
  name: string;
  description: string;
  category: string;
  baseComponent: string;
  parts: string[];
  props: Record<string, unknown>;
  variants: Record<string, string[]>;
  dataAttributes: Record<string, string>;
  examples: Array<{ name: string; description: string; code: string }>;
}

// Component registry
const components: Map<string, ComponentInfo> = new Map([
  ['button', buttonManifest],
]);

export function listComponents(): ComponentInfo[] {
  return Array.from(components.values());
}

export function getComponent(name: string): ComponentInfo | undefined {
  return components.get(name.toLowerCase());
}

export function searchComponents(query: string): ComponentInfo[] {
  const lower = query.toLowerCase();
  return Array.from(components.values()).filter(
    (c) =>
      c.name.toLowerCase().includes(lower) ||
      c.description.toLowerCase().includes(lower) ||
      c.category.toLowerCase().includes(lower),
  );
}

export function getIntents(): Intent[] {
  return intentsIndex.intents;
}

export function getAntiPatterns(): AntiPattern[] {
  return intentsIndex.antiPatterns;
}

// Token metadata for get_tokens tool
const TOKEN_CATEGORIES: Record<string, string[]> = {
  colors: [
    'colorPrimary', 'colorPrimaryHover', 'colorPrimaryActive', 'colorPrimaryContrast',
    'colorSecondary', 'colorSecondaryHover', 'colorSecondaryActive', 'colorSecondaryContrast',
    'colorDestructive', 'colorDestructiveHover', 'colorDestructiveActive', 'colorDestructiveContrast',
    'colorMuted', 'colorMutedForeground',
    'colorSurface', 'colorSurfaceRaised', 'colorSurfaceOverlay',
    'colorOverlay', 'colorBorder', 'colorBorderMuted',
    'colorText', 'colorTextMuted', 'colorTextInverse',
    'colorFocusRing', 'colorBackground',
  ],
  spacing: ['space1', 'space2', 'space3', 'space4', 'space5', 'space6', 'space8', 'space10', 'space12'],
  typography: [
    'fontFamilySans', 'fontFamilyMono',
    'fontSizeXs', 'fontSizeSm', 'fontSizeMd', 'fontSizeLg', 'fontSizeXl', 'fontSize2xl',
    'fontWeightNormal', 'fontWeightMedium', 'fontWeightSemibold', 'fontWeightBold',
    'lineHeightTight', 'lineHeightNormal', 'lineHeightRelaxed',
    'letterSpacingTight', 'letterSpacingNormal', 'letterSpacingWide',
  ],
  radius: ['radiusNone', 'radiusSm', 'radiusMd', 'radiusLg', 'radiusXl', 'radiusFull'],
  borders: ['borderWidthDefault', 'borderWidthThick'],
  shadows: ['shadowNone', 'shadowSm', 'shadowMd', 'shadowLg', 'shadowXl'],
  motion: [
    'motionDurationFast', 'motionDurationNormal', 'motionDurationSlow',
    'motionEaseOut', 'motionEaseInOut', 'motionEaseSpring',
  ],
};

export function getTokensByCategory(category?: string): Record<string, string[]> {
  if (category && category in TOKEN_CATEGORIES) {
    return { [category]: TOKEN_CATEGORIES[category]! };
  }
  return TOKEN_CATEGORIES;
}
