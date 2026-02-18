import * as p from '@clack/prompts';
import { writeFile, mkdir } from 'node:fs/promises';
import { join } from 'node:path';
import { existsSync } from 'node:fs';
import { generateSemanticColors } from '@basex-ui/tokens/oklch';
import {
  radiusPresets,
  shadowPresets,
  borderWidthPresets,
  spacingDensityPresets,
} from '@basex-ui/tokens/presets';

interface InitOptions {
  colorMode: 'both' | 'light' | 'dark';
  primaryColor: string;
  radius: keyof typeof radiusPresets;
  borderWidth: keyof typeof borderWidthPresets;
  shadows: keyof typeof shadowPresets;
  fontFamily: string;
  spacingDensity: keyof typeof spacingDensityPresets;
  themeName: string;
}

const DEFAULT_OPTIONS: InitOptions = {
  colorMode: 'both',
  primaryColor: '#3B82F6', // Blue
  radius: 'md',
  borderWidth: 'thin',
  shadows: 'subtle',
  fontFamily: 'system',
  spacingDensity: 'default',
  themeName: 'default',
};

export async function runInit(args: string[]) {
  const useDefaults = args.includes('--defaults');
  const cwd = process.cwd();

  p.intro('basex-ui init');

  let options: InitOptions;

  if (useDefaults) {
    p.log.info('Using default configuration.');
    options = DEFAULT_OPTIONS;
  } else {
    const answers = await p.group(
      {
        colorMode: () =>
          p.select({
            message: '1. Color mode',
            options: [
              { value: 'both' as const, label: 'Both (light + dark)', hint: 'recommended' },
              { value: 'light' as const, label: 'Light only' },
              { value: 'dark' as const, label: 'Dark only' },
            ],
            initialValue: 'both' as const,
          }),

        primaryColor: () =>
          p.select({
            message: '2. Primary color',
            options: [
              { value: '#3B82F6', label: 'Default Blue', hint: 'recommended' },
              { value: '#8B5CF6', label: 'Purple' },
              { value: '#22C55E', label: 'Green' },
              { value: '#F97316', label: 'Orange' },
              { value: '#EF4444', label: 'Red' },
              { value: 'custom', label: 'Custom hex...' },
            ],
          }),

        customColor: ({ results }) => {
          if (results.primaryColor !== 'custom') return Promise.resolve(undefined);
          return p.text({
            message: 'Enter a hex color (e.g. #8B5CF6)',
            placeholder: '#8B5CF6',
            validate: (val) => {
              if (!/^#[0-9a-fA-F]{6}$/.test(val)) {
                return 'Please enter a valid 6-digit hex color (e.g. #8B5CF6)';
              }
              return undefined;
            },
          });
        },

        radius: () =>
          p.select({
            message: '3. Border radius',
            options: [
              { value: 'none' as const, label: 'None', hint: '0px' },
              { value: 'sm' as const, label: 'Small', hint: '4px' },
              { value: 'md' as const, label: 'Default Medium', hint: '8px' },
              { value: 'lg' as const, label: 'Large', hint: '12px' },
              { value: 'full' as const, label: 'Full', hint: 'pill' },
            ],
            initialValue: 'md' as const,
          }),

        borderWidth: () =>
          p.select({
            message: '4. Border width',
            options: [
              { value: 'none' as const, label: 'None' },
              { value: 'thin' as const, label: 'Default Thin', hint: '1px' },
              { value: 'medium' as const, label: 'Medium', hint: '1.5px' },
              { value: 'thick' as const, label: 'Thick', hint: '2px' },
            ],
            initialValue: 'thin' as const,
          }),

        shadows: () =>
          p.select({
            message: '5. Shadows',
            options: [
              { value: 'none' as const, label: 'None' },
              { value: 'subtle' as const, label: 'Default Subtle' },
              { value: 'medium' as const, label: 'Medium' },
              { value: 'dramatic' as const, label: 'Dramatic' },
            ],
            initialValue: 'subtle' as const,
          }),

        fontFamily: () =>
          p.select({
            message: '6. Font family',
            options: [
              { value: 'system', label: 'Default System', hint: 'system-ui' },
              { value: 'inter', label: 'Inter' },
              { value: 'geist', label: 'Geist' },
              { value: 'custom', label: 'Custom...' },
            ],
          }),

        customFont: ({ results }) => {
          if (results.fontFamily !== 'custom') return Promise.resolve(undefined);
          return p.text({
            message: 'Enter font family name',
            placeholder: 'Inter',
          });
        },

        spacingDensity: () =>
          p.select({
            message: '7. Spacing density',
            options: [
              { value: 'compact' as const, label: 'Compact' },
              { value: 'default' as const, label: 'Default' },
              { value: 'spacious' as const, label: 'Spacious' },
            ],
            initialValue: 'default' as const,
          }),

        themeName: () =>
          p.text({
            message: 'Name this theme',
            placeholder: 'default',
            defaultValue: 'default',
          }),
      },
      {
        onCancel: () => {
          p.cancel('Setup cancelled.');
          process.exit(0);
        },
      },
    );

    const resolvedColor =
      answers.primaryColor === 'custom'
        ? (answers.customColor as string)
        : answers.primaryColor;

    const resolvedFont =
      answers.fontFamily === 'custom'
        ? (answers.customFont as string)
        : answers.fontFamily;

    options = {
      colorMode: answers.colorMode,
      primaryColor: resolvedColor,
      radius: answers.radius,
      borderWidth: answers.borderWidth,
      shadows: answers.shadows,
      fontFamily: resolvedFont,
      spacingDensity: answers.spacingDensity,
      themeName: answers.themeName,
    };
  }

  const s = p.spinner();
  s.start('Scaffolding BaseX UI...');

  try {
    await scaffold(cwd, options);
    s.stop('Scaffolding complete.');
  } catch (error) {
    s.stop('Scaffolding failed.');
    throw error;
  }

  p.log.success(`Theme "${options.themeName}" created.`);
  p.log.info(`Next steps:
  1. Add a component: npx basex-ui add button
  2. Configure your build tool for StyleX
  3. Wrap your app with the theme provider`);

  p.outro('Happy building!');
}

async function scaffold(cwd: string, options: InitOptions) {
  // Create directory structure
  const dirs = [
    'src/components/ui',
    'src/tokens',
    'src/themes',
    '.cursor/rules',
  ];

  for (const dir of dirs) {
    const fullPath = join(cwd, dir);
    if (!existsSync(fullPath)) {
      await mkdir(fullPath, { recursive: true });
    }
  }

  // Generate token overrides from options
  const tokenOverrides = buildTokenOverrides(options);

  // Write token file
  await writeFile(
    join(cwd, 'src/tokens/tokens.stylex.ts'),
    generateTokensFile(tokenOverrides),
  );

  // Write theme file
  await writeFile(
    join(cwd, 'src/themes', `${options.themeName}.stylex.ts`),
    generateThemeFile(options.themeName, tokenOverrides, options.colorMode),
  );

  // Write agent config files
  await writeFile(
    join(cwd, '.mcp.json'),
    getMcpConfig(),
  );

  if (!existsSync(join(cwd, '.cursor/rules'))) {
    await mkdir(join(cwd, '.cursor/rules'), { recursive: true });
  }
  await writeFile(
    join(cwd, '.cursor/rules/basex-ui.mdc'),
    getCursorRules(),
  );

  await writeFile(
    join(cwd, 'CLAUDE.md'),
    getClaudeMd(),
  );

  await writeFile(
    join(cwd, 'llms.txt'),
    getLlmsTxt(),
  );

  // Write empty intents.json for the project
  await writeFile(
    join(cwd, 'src/components/intents.json'),
    JSON.stringify({ version: '0.1.0', intents: [], antiPatterns: [] }, null, 2) + '\n',
  );
}

function buildTokenOverrides(options: InitOptions): Record<string, string> {
  const overrides: Record<string, string> = {};

  // Primary color
  const colors = generateSemanticColors(options.primaryColor);
  Object.assign(overrides, colors);

  // Radius preset
  const radiusOverride = radiusPresets[options.radius];
  Object.assign(overrides, radiusOverride);

  // Border width preset
  const borderOverride = borderWidthPresets[options.borderWidth];
  Object.assign(overrides, borderOverride);

  // Shadow preset
  const shadowOverride = shadowPresets[options.shadows];
  Object.assign(overrides, shadowOverride);

  // Spacing density preset
  const spacingOverride = spacingDensityPresets[options.spacingDensity];
  Object.assign(overrides, spacingOverride);

  // Font family
  const fontMap: Record<string, string> = {
    system:
      "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
    inter: "'Inter', system-ui, sans-serif",
    geist: "'Geist', system-ui, sans-serif",
  };
  const fontValue = fontMap[options.fontFamily] ?? `'${options.fontFamily}', system-ui, sans-serif`;
  overrides.fontFamilySans = fontValue;

  return overrides;
}

function generateTokensFile(overrides: Record<string, string>): string {
  const entries = Object.entries(overrides)
    .map(([key, value]) => `  ${key}: '${value}',`)
    .join('\n');

  return `import * as stylex from '@stylexjs/stylex';
import { tokens } from '@basex-ui/tokens';

/**
 * Project token overrides.
 * Generated by \`basex-ui init\`. Edit to customize.
 */
export const projectTokenOverrides = {
${entries}
} as const;
`;
}

function generateThemeFile(
  name: string,
  overrides: Record<string, string>,
  colorMode: string,
): string {
  const entries = Object.entries(overrides)
    .map(([key, value]) => `    ${key}: '${value}',`)
    .join('\n');

  let imports = `import * as stylex from '@stylexjs/stylex';
import { tokens } from '@basex-ui/tokens';`;

  let exports = '';

  if (colorMode === 'both' || colorMode === 'light') {
    exports += `
/**
 * ${name} theme (light).
 * Apply to a root element: <div {...stylex.props(${name}Light)}>
 */
export const ${name}Light = stylex.createTheme(tokens, {
${entries}
});
`;
  }

  if (colorMode === 'both' || colorMode === 'dark') {
    exports += `
/**
 * ${name} theme (dark).
 * Apply to a root element: <div {...stylex.props(${name}Dark)}>
 */
export const ${name}Dark = stylex.createTheme(tokens, {
    // Dark mode overrides — adjust these for your dark palette
${entries}
});
`;
  }

  return `${imports}\n${exports}`;
}

function getMcpConfig(): string {
  return JSON.stringify(
    {
      mcpServers: {
        'basex-ui': {
          command: 'npx',
          args: ['basex-ui-mcp'],
          type: 'stdio',
        },
      },
    },
    null,
    2,
  ) + '\n';
}

function getCursorRules(): string {
  return `---
description: BaseX UI component library workflow and conventions
globs: ["**/*.tsx", "**/*.ts"]
alwaysApply: false
---

# BaseX UI — Agent Rules

## Workflow

When building UI with BaseX UI components:

1. **Always start with \`resolve_intent\`** — describe what you're building and let the MCP server recommend the right component.
2. **Check anti-patterns with \`check_usage\`** — before using a component, verify it's the right choice for your context.
3. **Use \`get_component\`** for full API reference — props, variants, examples.
4. **Use \`get_tokens\`** for design token reference — never hardcode colors, spacing, or other design values.

## Styling Convention

- All styles use StyleX (\`@stylexjs/stylex\`)
- Reference design tokens from \`@basex-ui/tokens\` — never use raw CSS values
- Use the \`sx\` prop for component style overrides (applied last, deterministic)

## Anti-Patterns

- Do NOT use Button for navigation — use a Link component
- Do NOT use Button for toggling state — use Toggle or Switch
- Do NOT use Button for opening menus — use Menu.Trigger
- Do NOT hardcode CSS values — use design tokens
`;
}

function getClaudeMd(): string {
  return `# BaseX UI — Claude Code Instructions

## Component Workflow

1. **Resolve intent first** — use the \`basex-ui\` MCP server's \`resolve_intent\` tool
2. **Check for anti-patterns** — use \`check_usage\` before implementing
3. **Get full API** — use \`get_component\` for props, variants, and examples
4. **Use design tokens** — use \`get_tokens\`; never hardcode values

## Styling

- All styles use StyleX (\`@stylexjs/stylex\`)
- Import tokens: \`import { tokens } from '@basex-ui/tokens'\`
- Import themes: \`import { lightTheme, darkTheme } from '@basex-ui/styles'\`
- Override component styles via the \`sx\` prop

## Key Rules

- Never use raw CSS color/spacing/typography values — always use tokens
- Button is for actions, not navigation (use Link for navigation)
- Use the \`sx\` prop for deterministic style overrides
`;
}

function getLlmsTxt(): string {
  return `# BaseX UI

> An AI-first, copy-paste component library built on Base UI and StyleX.

## MCP Server

Tools: resolve_intent, get_component, check_usage, get_tokens, list_components, search_components, get_component_example, get_theme_example.

## Components

### Button
Variants: solid, outline, ghost. Colors: default, secondary, destructive. Sizes: sm, md, lg.
\`\`\`tsx
import { Button } from './components/ui/button';
<Button variant="solid" color="default" size="md">Click me</Button>
\`\`\`

## Design Tokens

From \`@basex-ui/tokens\`. Categories: colors, spacing, typography, radius, borders, shadows, motion.
`;
}
