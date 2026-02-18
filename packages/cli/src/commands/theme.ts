import * as p from '@clack/prompts';
import { writeFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';
import { existsSync } from 'node:fs';
import { generateSemanticColors } from '@basex-ui/tokens/oklch';
import {
  radiusPresets,
  shadowPresets,
} from '@basex-ui/tokens/presets';

export async function runTheme(args: string[]) {
  const subcommand = args[0];

  switch (subcommand) {
    case 'create':
      await createTheme();
      break;
    case 'use':
      await useTheme(args[1]);
      break;
    case 'list':
      await listThemes();
      break;
    default:
      p.intro('basex-ui theme');
      p.log.info(`Subcommands:
  create      Create a new named theme
  use <name>  Switch active theme
  list        List saved themes`);
      p.outro('');
  }
}

async function createTheme() {
  p.intro('basex-ui theme create');

  const answers = await p.group(
    {
      themeName: () =>
        p.text({
          message: 'Theme name',
          placeholder: 'ocean',
          validate: (val) => {
            if (!val) return 'Theme name is required';
            if (!/^[a-zA-Z][a-zA-Z0-9_-]*$/.test(val)) {
              return 'Use letters, numbers, hyphens, and underscores only';
            }
            return undefined;
          },
        }),

      primaryColor: () =>
        p.select({
          message: 'Primary color',
          options: [
            { value: '#3B82F6', label: 'Blue' },
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
              return 'Please enter a valid 6-digit hex color';
            }
            return undefined;
          },
        });
      },

      radius: () =>
        p.select({
          message: 'Border radius',
          options: [
            { value: 'none' as const, label: 'None' },
            { value: 'sm' as const, label: 'Small' },
            { value: 'md' as const, label: 'Medium' },
            { value: 'lg' as const, label: 'Large' },
            { value: 'full' as const, label: 'Full' },
          ],
          initialValue: 'md' as const,
        }),

      shadows: () =>
        p.select({
          message: 'Shadows',
          options: [
            { value: 'none' as const, label: 'None' },
            { value: 'subtle' as const, label: 'Subtle' },
            { value: 'medium' as const, label: 'Medium' },
            { value: 'dramatic' as const, label: 'Dramatic' },
          ],
          initialValue: 'subtle' as const,
        }),
    },
    {
      onCancel: () => {
        p.cancel('Cancelled.');
        process.exit(0);
      },
    },
  );

  const cwd = process.cwd();
  const themesDir = join(cwd, 'src/themes');
  const resolvedColor =
    answers.primaryColor === 'custom'
      ? (answers.customColor as string)
      : answers.primaryColor;

  // Build overrides
  const overrides: Record<string, string> = {};
  Object.assign(overrides, generateSemanticColors(resolvedColor));
  Object.assign(overrides, radiusPresets[answers.radius]);
  Object.assign(overrides, shadowPresets[answers.shadows]);

  const entries = Object.entries(overrides)
    .map(([key, value]) => `    ${key}: '${value}',`)
    .join('\n');

  const themeContent = `import * as stylex from '@stylexjs/stylex';
import { tokens } from '@basex-ui/tokens';

export const ${answers.themeName}Light = stylex.createTheme(tokens, {
${entries}
});

export const ${answers.themeName}Dark = stylex.createTheme(tokens, {
    // Adjust dark mode values as needed
${entries}
});
`;

  if (!existsSync(themesDir)) {
    const { mkdir } = await import('node:fs/promises');
    await mkdir(themesDir, { recursive: true });
  }

  await writeFile(
    join(themesDir, `${answers.themeName}.stylex.ts`),
    themeContent,
  );

  p.log.success(`Theme "${answers.themeName}" created at src/themes/${answers.themeName}.stylex.ts`);
  p.outro('');
}

async function useTheme(name?: string) {
  p.intro('basex-ui theme use');

  if (!name) {
    p.log.error('Please specify a theme name: basex-ui theme use <name>');
    p.outro('');
    process.exit(1);
  }

  const cwd = process.cwd();
  const themesDir = join(cwd, 'src/themes');
  const themeFile = join(themesDir, `${name}.stylex.ts`);

  if (!existsSync(themeFile)) {
    p.log.error(`Theme "${name}" not found at ${themeFile}`);
    p.log.info('Run `basex-ui theme list` to see available themes.');
    p.outro('');
    process.exit(1);
  }

  p.log.success(`Active theme set to "${name}".`);
  p.log.info(`Import in your app:
  import { ${name}Light, ${name}Dark } from './themes/${name}.stylex';`);
  p.outro('');
}

async function listThemes() {
  p.intro('basex-ui theme list');

  const cwd = process.cwd();
  const themesDir = join(cwd, 'src/themes');

  if (!existsSync(themesDir)) {
    p.log.info('No themes directory found. Run `basex-ui init` first.');
    p.outro('');
    return;
  }

  try {
    const files = await readdir(themesDir);
    const themes = files
      .filter((f) => f.endsWith('.stylex.ts'))
      .map((f) => f.replace('.stylex.ts', ''));

    if (themes.length === 0) {
      p.log.info('No themes found. Run `basex-ui theme create` to make one.');
    } else {
      p.log.info(`Saved themes:\n${themes.map((t) => `  - ${t}`).join('\n')}`);
    }
  } catch {
    p.log.error('Could not read themes directory.');
  }

  p.outro('');
}
