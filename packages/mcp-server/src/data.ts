import { intentsIndex, animationPresets } from '@basex-ui/intelligence';
import type { Intent, AntiPattern, AnimationPreset } from '@basex-ui/intelligence';

// ---------------------------------------------------------------------------
// Component manifests — imported from source-of-truth manifest.json files.
//
// NEW COMPONENT REGISTRATION (3 steps here + 1 in tsconfig.json):
//   1. Add import:  import fooManifest from '../../components/src/foo/manifest.json';
//   2. Add to type: export type ComponentManifest = ... | typeof fooManifest;
//   3. Add to Map:  ['foo', fooManifest],
//   4. In tsconfig.json → include: add "../components/src/foo/manifest.json"
//   5. Add animation presets in getComponentSetup() → presetMap below
//
// Full checklist: docs/new-component-checklist.md
// ---------------------------------------------------------------------------

import buttonManifest from '../../components/src/button/manifest.json';
import accordionManifest from '../../components/src/accordion/manifest.json';
import alertDialogManifest from '../../components/src/alert-dialog/manifest.json';
import autocompleteManifest from '../../components/src/autocomplete/manifest.json';
import avatarManifest from '../../components/src/avatar/manifest.json';
import checkboxManifest from '../../components/src/checkbox/manifest.json';
import checkboxGroupManifest from '../../components/src/checkbox-group/manifest.json';
import collapsibleManifest from '../../components/src/collapsible/manifest.json';
import comboboxManifest from '../../components/src/combobox/manifest.json';
import dialogManifest from '../../components/src/dialog/manifest.json';
import drawerManifest from '../../components/src/drawer/manifest.json';
import fieldManifest from '../../components/src/field/manifest.json';
import fieldsetManifest from '../../components/src/fieldset/manifest.json';
import formManifest from '../../components/src/form/manifest.json';
import inputManifest from '../../components/src/input/manifest.json';
import menuManifest from '../../components/src/menu/manifest.json';
import menubarManifest from '../../components/src/menubar/manifest.json';
import meterManifest from '../../components/src/meter/manifest.json';
import navigationMenuManifest from '../../components/src/navigation-menu/manifest.json';
import numberFieldManifest from '../../components/src/number-field/manifest.json';
import popoverManifest from '../../components/src/popover/manifest.json';
import previewCardManifest from '../../components/src/preview-card/manifest.json';
import progressManifest from '../../components/src/progress/manifest.json';
import radioManifest from '../../components/src/radio/manifest.json';
import scrollAreaManifest from '../../components/src/scroll-area/manifest.json';

export type ComponentManifest =
  | typeof buttonManifest
  | typeof accordionManifest
  | typeof alertDialogManifest
  | typeof autocompleteManifest
  | typeof avatarManifest
  | typeof checkboxManifest
  | typeof checkboxGroupManifest
  | typeof collapsibleManifest
  | typeof comboboxManifest
  | typeof dialogManifest
  | typeof drawerManifest
  | typeof fieldManifest
  | typeof fieldsetManifest
  | typeof formManifest
  | typeof inputManifest
  | typeof menuManifest
  | typeof menubarManifest
  | typeof meterManifest
  | typeof navigationMenuManifest
  | typeof numberFieldManifest
  | typeof popoverManifest
  | typeof previewCardManifest
  | typeof progressManifest
  | typeof radioManifest
  | typeof scrollAreaManifest;

const components = new Map<string, ComponentManifest>([
  ['button', buttonManifest],
  ['accordion', accordionManifest],
  ['alert-dialog', alertDialogManifest],
  ['autocomplete', autocompleteManifest],
  ['avatar', avatarManifest],
  ['checkbox', checkboxManifest],
  ['checkbox-group', checkboxGroupManifest],
  ['collapsible', collapsibleManifest],
  ['combobox', comboboxManifest],
  ['dialog', dialogManifest],
  ['drawer', drawerManifest],
  ['field', fieldManifest],
  ['fieldset', fieldsetManifest],
  ['form', formManifest],
  ['input', inputManifest],
  ['menu', menuManifest],
  ['menubar', menubarManifest],
  ['meter', meterManifest],
  ['navigation-menu', navigationMenuManifest],
  ['number-field', numberFieldManifest],
  ['popover', popoverManifest],
  ['preview-card', previewCardManifest],
  ['progress', progressManifest],
  ['radio', radioManifest],
  ['scroll-area', scrollAreaManifest],
] as [string, ComponentManifest][]);

// ---------------------------------------------------------------------------
// Component queries
// ---------------------------------------------------------------------------

export function listComponents(): Array<{
  name: string;
  description: string;
  category: string;
}> {
  return Array.from(components.values()).map((c) => ({
    name: c.name,
    description: c.description,
    category: c.category,
  }));
}

export function getComponent(name: string): ComponentManifest | undefined {
  return components.get(name.toLowerCase());
}

export function searchComponents(query: string): ComponentManifest[] {
  const lower = query.toLowerCase();
  return Array.from(components.values()).filter(
    (c) =>
      c.name.toLowerCase().includes(lower) ||
      c.description.toLowerCase().includes(lower) ||
      c.category.toLowerCase().includes(lower),
  );
}

// ---------------------------------------------------------------------------
// Component setup — surfaces CSS requirements, imports, and required props
// ---------------------------------------------------------------------------

export interface ComponentSetup {
  name: string;
  import: string;
  cssRequirements: { description: string; css: string } | null;
  requiredProps: Array<{ part: string; prop: string; type: string; description: string }>;
  animationPresets: Array<{ interaction: string; preset: string }>;
}

export function getComponentSetup(name: string): ComponentSetup | null {
  const manifest = getComponent(name);
  if (!manifest) return null;

  // Build import path
  const importPath = `import { ${manifest.name} } from '@basex-ui/components/${manifest.name.toLowerCase()}';`;

  // Extract CSS requirements (new per-part manifests have this)
  const cssReqs =
    'cssRequirements' in manifest
      ? ((manifest as Record<string, unknown>).cssRequirements as {
          description: string;
          css: string;
        } | null)
      : null;

  // Extract required props from per-part manifests
  const requiredProps: ComponentSetup['requiredProps'] = [];
  if ('parts' in manifest && typeof manifest.parts === 'object' && !Array.isArray(manifest.parts)) {
    const parts = manifest.parts as Record<
      string,
      { props?: Record<string, { type?: string; required?: boolean; description?: string }> }
    >;
    for (const [partName, partDef] of Object.entries(parts)) {
      if (partDef.props) {
        for (const [propName, propDef] of Object.entries(partDef.props)) {
          if (propDef.required) {
            requiredProps.push({
              part: partName,
              prop: propName,
              type: propDef.type ?? 'unknown',
              description: propDef.description ?? '',
            });
          }
        }
      }
    }
  }

  // Map component to animation presets — add entry for each new component
  // Presets: State (100ms, hover/focus), Expand (200ms, height), Move (200ms, transform), Enter (200ms, appear), Exit (100ms, disappear)
  const presetMap: Record<string, Array<{ interaction: string; preset: string }>> = {
    button: [
      { interaction: 'hover/focus/active color', preset: 'State' },
      { interaction: ':active scale', preset: 'State' },
    ],
    accordion: [
      { interaction: 'trigger hover/focus', preset: 'State' },
      { interaction: 'chevron rotation', preset: 'Move' },
      { interaction: 'panel expand/collapse', preset: 'Expand' },
    ],
    'alert-dialog': [
      { interaction: 'backdrop fade in/out', preset: 'Enter' },
      { interaction: 'popup scale/fade in', preset: 'Enter' },
      { interaction: 'popup scale/fade out', preset: 'Exit' },
    ],
    autocomplete: [
      { interaction: 'input focus ring', preset: 'State' },
      { interaction: 'clear button hover', preset: 'State' },
      { interaction: 'popup fade/slide in', preset: 'Enter' },
      { interaction: 'popup fade/slide out', preset: 'Exit' },
      { interaction: 'item highlight', preset: 'State' },
    ],
    avatar: [],
    checkbox: [{ interaction: 'indicator appear/disappear', preset: 'State' }],
    'checkbox-group': [],
    collapsible: [
      { interaction: 'trigger hover/focus', preset: 'State' },
      { interaction: 'chevron rotation', preset: 'Move' },
      { interaction: 'panel expand/collapse', preset: 'Expand' },
    ],
    combobox: [
      { interaction: 'trigger focus ring', preset: 'State' },
      { interaction: 'clear button hover', preset: 'State' },
      { interaction: 'popup fade/slide in', preset: 'Enter' },
      { interaction: 'popup fade/slide out', preset: 'Exit' },
      { interaction: 'item highlight', preset: 'State' },
    ],
    dialog: [
      { interaction: 'backdrop fade in/out', preset: 'Enter' },
      { interaction: 'popup scale/fade in', preset: 'Enter' },
      { interaction: 'popup scale/fade out', preset: 'Exit' },
      { interaction: 'nested stagger (parent recedes)', preset: 'Move' },
      { interaction: 'close button hover', preset: 'State' },
      { interaction: 'scroll indicators', preset: 'State' },
    ],
    drawer: [
      { interaction: 'backdrop fade in/out', preset: 'Enter' },
      { interaction: 'popup slide in', preset: 'Enter' },
      { interaction: 'popup slide out', preset: 'Exit' },
      { interaction: 'close button hover', preset: 'State' },
    ],
    field: [{ interaction: 'control focus ring', preset: 'State' }],
    fieldset: [],
    form: [],
    input: [{ interaction: 'focus ring', preset: 'State' }],
    menu: [
      { interaction: 'trigger hover/focus', preset: 'State' },
      { interaction: 'popup scale/fade in', preset: 'Enter' },
      { interaction: 'popup scale/fade out', preset: 'Exit' },
      { interaction: 'item highlight', preset: 'State' },
    ],
    menubar: [],
    meter: [{ interaction: 'indicator width transition', preset: 'Move' }],
    'navigation-menu': [
      { interaction: 'trigger hover/focus', preset: 'State' },
      { interaction: 'popup fade/slide in', preset: 'Enter' },
      { interaction: 'popup fade/slide out', preset: 'Exit' },
      { interaction: 'content crossfade', preset: 'Enter' },
    ],
    'number-field': [
      { interaction: 'button hover', preset: 'State' },
      { interaction: 'input focus ring', preset: 'State' },
    ],
    popover: [
      { interaction: 'popup scale/fade in', preset: 'Enter' },
      { interaction: 'popup scale/fade out', preset: 'Exit' },
      { interaction: 'close button hover', preset: 'State' },
    ],
    'preview-card': [
      { interaction: 'popup fade/slide in', preset: 'Enter' },
      { interaction: 'popup fade/slide out', preset: 'Exit' },
    ],
    progress: [
      { interaction: 'indicator width transition', preset: 'Move' },
      { interaction: 'indeterminate animation', preset: 'Move' },
    ],
    radio: [{ interaction: 'indicator appear/disappear', preset: 'State' }],
    'scroll-area': [
      { interaction: 'scrollbar fade in (hover/scroll)', preset: 'State' },
      { interaction: 'scrollbar fade out', preset: 'State' },
      { interaction: 'thumb hover color', preset: 'State' },
    ],
  };

  return {
    name: manifest.name,
    import: importPath,
    cssRequirements: cssReqs,
    requiredProps,
    animationPresets: presetMap[name.toLowerCase()] ?? [],
  };
}

// ---------------------------------------------------------------------------
// Re-exports for MCP tools
// ---------------------------------------------------------------------------

export { animationPresets };
export type { Intent, AntiPattern, AnimationPreset };

export function getIntents(): Intent[] {
  return intentsIndex.intents;
}

export function getAntiPatterns(): AntiPattern[] {
  return intentsIndex.antiPatterns;
}

// Token metadata for get_tokens tool
const TOKEN_CATEGORIES: Record<string, string[]> = {
  colors: [
    'colorPrimary',
    'colorPrimaryHover',
    'colorPrimaryActive',
    'colorPrimaryContrast',
    'colorSecondary',
    'colorSecondaryHover',
    'colorSecondaryActive',
    'colorSecondaryContrast',
    'colorDestructive',
    'colorDestructiveHover',
    'colorDestructiveActive',
    'colorDestructiveContrast',
    'colorMuted',
    'colorMutedForeground',
    'colorSurface',
    'colorSurfaceRaised',
    'colorSurfaceOverlay',
    'colorOverlay',
    'colorBorder',
    'colorBorderMuted',
    'colorText',
    'colorTextMuted',
    'colorTextInverse',
    'colorFocusRing',
    'colorBackground',
  ],
  spacing: [
    'space1',
    'space2',
    'space3',
    'space4',
    'space5',
    'space6',
    'space8',
    'space10',
    'space12',
  ],
  typography: [
    'fontFamilySans',
    'fontFamilyMono',
    'fontSizeXs',
    'fontSizeSm',
    'fontSizeMd',
    'fontSizeLg',
    'fontSizeXl',
    'fontSize2xl',
    'fontSizeLabel',
    'fontSizeBody',
    'fontSizeSubhead',
    'fontSizeTitle',
    'fontWeightNormal',
    'fontWeightMedium',
    'fontWeightSemibold',
    'fontWeightBold',
    'lineHeightTight',
    'lineHeightNormal',
    'lineHeightRelaxed',
    'letterSpacingTight',
    'letterSpacingNormal',
    'letterSpacingWide',
    'letterSpacingLabel',
  ],
  radius: ['radiusNone', 'radiusSm', 'radiusMd', 'radiusLg', 'radiusXl', 'radiusFull'],
  borders: ['borderWidthDefault', 'borderWidthThick'],
  shadows: ['shadowNone', 'shadowSm', 'shadowMd', 'shadowLg', 'shadowXl'],
  motion: [
    'motionDurationFast',
    'motionDurationNormal',
    'motionDurationSlow',
    'motionEaseOut',
    'motionEaseInOut',
    'motionEaseSpring',
  ],
};

export function getTokensByCategory(category?: string): Record<string, string[]> {
  if (category && category in TOKEN_CATEGORIES) {
    return { [category]: TOKEN_CATEGORIES[category]! };
  }
  return TOKEN_CATEGORIES;
}
