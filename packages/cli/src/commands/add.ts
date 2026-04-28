import * as p from '@clack/prompts';
import { writeFile, mkdir, readFile, readdir } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

// Resolve the templates directory relative to this file.
// At runtime from compiled dist/commands/add.js: ../../templates → packages/cli/templates/
// In Vitest (source src/commands/add.ts): ../../templates → packages/cli/templates/
function getTemplatesDir(): string {
  const url = import.meta.url;
  if (url.startsWith('file:')) {
    return fileURLToPath(new URL('../../templates', url));
  }
  // Vitest jsdom environment: import.meta.url may be http://localhost/...
  // Fall back to resolving from process.cwd() using the package structure.
  // The templates/ directory is always at the same level as src/ or dist/.
  return resolve(process.cwd(), 'packages/cli/templates');
}

// Available components registry — all 36 components.
// Descriptions sourced from each component's manifest.json.
const COMPONENTS: Record<
  string,
  {
    name: string;
    description: string;
    files: string[];
    dependencies: string[];
    requiresPortal?: boolean;
  }
> = {
  accordion: {
    name: 'Accordion',
    description:
      'A set of collapsible panels with headings for progressive content disclosure. Built on Base UI Accordion with StyleX styling.',
    files: ['accordion.tsx', 'index.ts'],
    dependencies: [],
  },
  'alert-dialog': {
    name: 'AlertDialog',
    description:
      'A modal dialog that requires explicit user acknowledgment. Used for destructive or irreversible actions. Built on Base UI AlertDialog with StyleX styling.',
    files: ['alert-dialog.tsx', 'index.ts'],
    dependencies: [],
    requiresPortal: true,
  },
  autocomplete: {
    name: 'Autocomplete',
    description:
      'A text input with a filterable suggestion dropdown. Built on Base UI Autocomplete with StyleX styling. Input-only style with built-in clear button.',
    files: ['autocomplete.tsx', 'index.ts'],
    dependencies: [],
    requiresPortal: true,
  },
  avatar: {
    name: 'Avatar',
    description:
      'A circular image or fallback representing a user or entity. Built on Base UI Avatar with StyleX styling.',
    files: ['avatar.tsx', 'index.ts'],
    dependencies: [],
  },
  button: {
    name: 'Button',
    description:
      'A styled button component for triggering actions. Built on Base UI Button with StyleX styling.',
    files: ['button.tsx', 'index.ts'],
    dependencies: [],
  },
  checkbox: {
    name: 'Checkbox',
    description:
      'A control that allows the user to toggle between checked, unchecked, and optionally indeterminate states. Built on Base UI Checkbox with StyleX styling.',
    files: ['checkbox.tsx', 'index.ts'],
    dependencies: [],
  },
  'checkbox-group': {
    name: 'CheckboxGroup',
    description:
      'A container that provides shared state to a series of checkboxes, managing a value array of checked item names. Supports a parent checkbox for select-all behavior. Built on Base UI CheckboxGroup with StyleX styling.',
    files: ['checkbox-group.tsx', 'index.ts'],
    dependencies: [],
  },
  collapsible: {
    name: 'Collapsible',
    description:
      'A single collapsible section with a trigger button and an animated content panel. Built on Base UI Collapsible with StyleX styling.',
    files: ['collapsible.tsx', 'index.ts'],
    dependencies: [],
  },
  combobox: {
    name: 'Combobox',
    description:
      'A searchable select dropdown. Users must pick from a predefined list, with optional multi-select. Built on Base UI Combobox with StyleX styling.',
    files: ['combobox.tsx', 'index.ts'],
    dependencies: [],
    requiresPortal: true,
  },
  'context-menu': {
    name: 'ContextMenu',
    description:
      'A right-click (or long-press on touch) context menu, supporting items, checkbox items, radio items, submenus, and keyboard navigation. Built on Base UI ContextMenu with StyleX styling.',
    files: ['context-menu.tsx', 'index.ts'],
    dependencies: [],
    requiresPortal: true,
  },
  dialog: {
    name: 'Dialog',
    description:
      'A general-purpose modal overlay for displaying content, forms, or interactive flows. Dismissible via backdrop click or Escape. Supports Header/Panel/Footer layout, scroll indicators, nested stacking, and an optional close button. Built on Base UI Dialog with StyleX styling.',
    files: ['dialog.tsx', 'index.ts'],
    dependencies: [],
    requiresPortal: true,
  },
  drawer: {
    name: 'Drawer',
    description:
      'A slide-out panel anchored to a screen edge for supplementary content, navigation, or forms. Supports swipe-to-dismiss, snap points, and nested drawers. Built on Base UI Drawer with StyleX styling.',
    files: ['drawer.tsx', 'index.ts'],
    dependencies: [],
    requiresPortal: true,
  },
  field: {
    name: 'Field',
    description:
      'A form field wrapper that connects a label, description, input control, and validation error message with proper accessibility attributes. Built on Base UI Field with StyleX styling.',
    files: ['field.tsx', 'index.ts'],
    dependencies: [],
  },
  fieldset: {
    name: 'Fieldset',
    description:
      'A semantic grouping container for related form fields with an accessible legend. Built on Base UI Fieldset with StyleX styling.',
    files: ['fieldset.tsx', 'index.ts'],
    dependencies: [],
  },
  form: {
    name: 'Form',
    description:
      'An enhanced form element that provides server-side validation error management for Field components. Built on Base UI Form with StyleX styling.',
    files: ['form.tsx', 'index.ts'],
    dependencies: [],
  },
  input: {
    name: 'Input',
    description:
      'A standalone styled text input that automatically integrates with Field for validation. Built on Base UI Input with StyleX styling.',
    files: ['input.tsx', 'index.ts'],
    dependencies: [],
  },
  menu: {
    name: 'Menu',
    description:
      'A dropdown menu triggered by a button, supporting items, checkbox items, radio items, submenus, and keyboard navigation. Built on Base UI Menu with StyleX styling.',
    files: ['menu.tsx', 'index.ts'],
    dependencies: [],
    requiresPortal: true,
  },
  menubar: {
    name: 'Menubar',
    description:
      'A horizontal container for multiple menus, providing keyboard navigation between menu triggers. Built on Base UI Menubar with StyleX styling.',
    files: ['menubar.tsx', 'index.ts'],
    dependencies: [],
    requiresPortal: true,
  },
  meter: {
    name: 'Meter',
    description:
      'A visual indicator showing a scalar value within a known range. Built on Base UI Meter with StyleX styling.',
    files: ['meter.tsx', 'index.ts'],
    dependencies: [],
  },
  'navigation-menu': {
    name: 'NavigationMenu',
    description:
      'A site navigation component with hover-triggered dropdown content panels. Built on Base UI NavigationMenu with StyleX styling.',
    files: ['navigation-menu.tsx', 'index.ts'],
    dependencies: [],
    requiresPortal: true,
  },
  'number-field': {
    name: 'NumberField',
    description:
      'A numeric input with increment and decrement buttons. Built on Base UI NumberField with StyleX styling.',
    files: ['number-field.tsx', 'index.ts'],
    dependencies: [],
  },
  popover: {
    name: 'Popover',
    description:
      'A floating content panel that appears next to a trigger element. Built on Base UI Popover with StyleX styling.',
    files: ['popover.tsx', 'index.ts'],
    dependencies: [],
    requiresPortal: true,
  },
  'preview-card': {
    name: 'PreviewCard',
    description:
      'A hover-triggered card that shows a preview of linked content. Built on Base UI PreviewCard with StyleX styling.',
    files: ['preview-card.tsx', 'index.ts'],
    dependencies: [],
    requiresPortal: true,
  },
  progress: {
    name: 'Progress',
    description:
      'A progress bar showing determinate or indeterminate task completion. Built on Base UI Progress with StyleX styling.',
    files: ['progress.tsx', 'index.ts'],
    dependencies: [],
  },
  radio: {
    name: 'Radio',
    description:
      'A radio button group for single-select choices. Built on Base UI Radio and RadioGroup with StyleX styling.',
    files: ['radio.tsx', 'index.ts'],
    dependencies: [],
  },
  'scroll-area': {
    name: 'ScrollArea',
    description:
      'A scrollable region with custom-styled scrollbars overlaid on native scroll. Native scrolling, keyboard navigation, touch gestures, and RTL are preserved; only the scrollbar visuals are replaced. Scrollbars fade in on hover/scroll and respect prefers-reduced-motion. Built on Base UI ScrollArea with StyleX styling.',
    files: ['scroll-area.tsx', 'index.ts'],
    dependencies: [],
  },
  select: {
    name: 'Select',
    description:
      'A native-feeling single-value dropdown. User clicks the trigger, picks one option from a list. Keyboard typeahead, listbox ARIA, alignItemWithTrigger positioning. Built on Base UI Select with StyleX styling.',
    files: ['select.tsx', 'index.ts'],
    dependencies: [],
    requiresPortal: true,
  },
  separator: {
    name: 'Separator',
    description:
      'A thin visual divider between content groups. Built on Base UI Separator with StyleX styling.',
    files: ['separator.tsx', 'index.ts'],
    dependencies: [],
  },
  slider: {
    name: 'Slider',
    description:
      'An accessible range input that lets users pick a single value or a range from a continuous scale. Built on Base UI Slider with StyleX styling.',
    files: ['slider.tsx', 'index.ts'],
    dependencies: [],
  },
  switch: {
    name: 'Switch',
    description:
      'A control that toggles a setting on or off, taking effect immediately. Built on Base UI Switch with StyleX styling.',
    files: ['switch.tsx', 'index.ts'],
    dependencies: [],
  },
  tabs: {
    name: 'Tabs',
    description:
      'An accessible tab interface that organizes content into selectable panels. Built on Base UI Tabs with StyleX styling.',
    files: ['tabs.tsx', 'index.ts'],
    dependencies: [],
  },
  toast: {
    name: 'Toast',
    description:
      "Ephemeral, accessible notification messages. Auto-dismiss with pause-on-hover/focus, swipe-to-dismiss on touch, queue stacking, screen-reader announcements (polite by default, urgent for type='error'), and respects prefers-reduced-motion. Imperative API via the useToast() hook. Built on Base UI Toast with StyleX styling.",
    files: ['toast.tsx', 'index.ts'],
    dependencies: [],
    requiresPortal: true,
  },
  toggle: {
    name: 'Toggle',
    description:
      'A two-state button that can be on or off. Communicates pressed state to assistive technology via aria-pressed. Built on Base UI Toggle with StyleX styling that mirrors Button.',
    files: ['toggle.tsx', 'index.ts'],
    dependencies: [],
  },
  'toggle-group': {
    name: 'ToggleGroup',
    description:
      'A group of two-state toggle buttons. Supports single-select (radiogroup semantics) and multi-select (group semantics) modes with roving tabindex keyboard navigation. Built on Base UI ToggleGroup with StyleX styling.',
    files: ['toggle-group.tsx', 'index.ts'],
    dependencies: [],
  },
  toolbar: {
    name: 'Toolbar',
    description:
      'A container for grouping action buttons, links, and toggle controls with shared keyboard navigation. Implements the WAI-ARIA toolbar pattern with roving tabindex. Built on Base UI Toolbar with StyleX styling.',
    files: ['toolbar.tsx', 'index.ts'],
    dependencies: [],
  },
  tooltip: {
    name: 'Tooltip',
    description:
      'A small, non-interactive label that appears on hover or focus to describe a UI element. Built on Base UI Tooltip with StyleX styling.',
    files: ['tooltip.tsx', 'index.ts'],
    dependencies: [],
  },
};

export async function runAdd(args: string[]) {
  const componentName = args[0]?.toLowerCase();

  p.intro('basex-ui add');

  if (!componentName) {
    p.log.error('Please specify a component: basex-ui add <component>');
    p.log.info(`Available: ${Object.keys(COMPONENTS).join(', ')}`);
    p.outro('');
    process.exit(1);
  }

  const component = COMPONENTS[componentName];
  if (!component) {
    p.log.error(`Unknown component: ${componentName}`);
    p.log.info(`Available: ${Object.keys(COMPONENTS).join(', ')}`);
    p.outro('');
    process.exit(1);
  }

  const cwd = process.cwd();
  const targetDir = join(cwd, 'src/components/ui', componentName);

  if (existsSync(targetDir)) {
    const overwrite = await p.confirm({
      message: `${component.name} already exists. Overwrite?`,
      initialValue: false,
    });

    if (p.isCancel(overwrite) || !overwrite) {
      p.cancel('Cancelled.');
      return;
    }
  }

  const s = p.spinner();
  s.start(`Scaffolding ${component.name}...`);

  try {
    await mkdir(targetDir, { recursive: true });

    // Scaffold component files from bundled templates
    await scaffoldComponent(componentName, targetDir);

    // Update intents.json if it exists
    await updateIntents(cwd, componentName);

    // Update llms.txt if it exists
    await updateLlmsTxt(cwd, componentName);

    s.stop(`${component.name} scaffolded.`);
  } catch (error) {
    s.stop(`Failed to scaffold ${component.name}.`);
    throw error;
  }

  p.log.success(`Added ${component.name} to src/components/ui/${componentName}/`);
  p.log.info(`Import: import { ${component.name} } from './components/ui/${componentName}';`);

  // Print portal note
  if (component.requiresPortal) {
    p.log.warn(
      "This component uses portals. Add `import '@basex-ui/styles/themes'` and apply a theme class to `<html>` for correct rendering.",
    );
  }

  // Print CSS requirements if present (read from the manifest that was just scaffolded)
  await printCssRequirements(targetDir, componentName);

  p.outro('');
}

async function scaffoldComponent(name: string, targetDir: string) {
  const templateDir = join(getTemplatesDir(), name);

  // Read all files in the template directory — no hardcoded filenames
  let files: string[];
  try {
    files = await readdir(templateDir);
  } catch {
    throw new Error(
      `Template directory not found for "${name}". Run \`pnpm build\` in the CLI package to regenerate templates.`,
    );
  }

  for (const file of files) {
    const content = await readFile(join(templateDir, file), 'utf8');
    await writeFile(join(targetDir, file), content, 'utf8');
  }
}

async function printCssRequirements(targetDir: string, _name: string) {
  const manifestPath = join(targetDir, 'manifest.json');
  if (!existsSync(manifestPath)) return;

  try {
    const raw = await readFile(manifestPath, 'utf8');
    const manifest = JSON.parse(raw) as {
      cssRequirements?: { description?: string; css?: string } | null;
    };

    if (manifest.cssRequirements?.css) {
      p.log.warn('CSS required — add the following to your global stylesheet manually:');
      p.log.message(manifest.cssRequirements.css);
      if (manifest.cssRequirements.description) {
        p.log.info(manifest.cssRequirements.description);
      }
    }
  } catch {
    // Ignore parse errors — non-fatal
  }
}

async function updateIntents(cwd: string, componentName: string) {
  const intentsPath = join(cwd, 'src/components/intents.json');
  if (!existsSync(intentsPath)) return;

  const templateManifestPath = join(getTemplatesDir(), componentName, 'manifest.json');
  if (!existsSync(templateManifestPath)) return;

  try {
    const [manifestRaw, intentsRaw] = await Promise.all([
      readFile(templateManifestPath, 'utf8'),
      readFile(intentsPath, 'utf8'),
    ]);

    const manifest = JSON.parse(manifestRaw) as { intents?: Array<{ intent: string }> };
    const newIntents: Array<{ intent: string }> = manifest.intents ?? [];

    if (newIntents.length === 0) return;

    const existing = JSON.parse(intentsRaw) as Array<{ intent: string }>;
    const existingKeys = new Set(existing.map((i) => i.intent));

    // Merge — dedup by intent field
    const merged = [...existing, ...newIntents.filter((i) => !existingKeys.has(i.intent))];

    await writeFile(intentsPath, JSON.stringify(merged, null, 2) + '\n', 'utf8');
  } catch {
    // Ignore parse errors — non-fatal
  }
}

async function updateLlmsTxt(cwd: string, componentName: string) {
  const llmsPath = join(cwd, 'llms.txt');
  if (!existsSync(llmsPath)) return;

  const mdPath = join(getTemplatesDir(), componentName, `${componentName}.md`);
  if (!existsSync(mdPath)) return;

  try {
    const [llmsContent, mdContent] = await Promise.all([
      readFile(llmsPath, 'utf8'),
      readFile(mdPath, 'utf8'),
    ]);

    // Derive a display name from the component name (e.g. "navigation-menu" → "NavigationMenu")
    const displayName = componentName
      .split('-')
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join('');

    const header = `\n## ${displayName}\n\n`;
    const updated = llmsContent + header + mdContent;

    await writeFile(llmsPath, updated, 'utf8');
  } catch {
    // Ignore read/write errors — non-fatal
  }
}
