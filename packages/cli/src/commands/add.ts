import * as p from '@clack/prompts';
import { writeFile, mkdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { existsSync } from 'node:fs';

// Available components registry
const COMPONENTS: Record<
  string,
  {
    name: string;
    description: string;
    files: string[];
    dependencies: string[];
  }
> = {
  button: {
    name: 'Button',
    description: 'A styled button for triggering actions.',
    files: ['button.tsx', 'index.ts'],
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

    // Scaffold component files
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
  p.outro('');
}

async function scaffoldComponent(name: string, targetDir: string) {
  if (name === 'button') {
    await writeFile(
      join(targetDir, 'button.tsx'),
      getButtonSource(),
    );
    await writeFile(
      join(targetDir, 'index.ts'),
      `export { Button } from './button';\nexport type { ButtonProps, ButtonVariant, ButtonColor, ButtonSize } from './button';\n`,
    );
    await writeFile(
      join(targetDir, 'manifest.json'),
      getButtonManifest(),
    );
    await writeFile(
      join(targetDir, 'button.md'),
      getButtonDocs(),
    );
  }
}

async function updateIntents(cwd: string, _componentName: string) {
  const intentsPath = join(cwd, 'src/components/intents.json');
  if (!existsSync(intentsPath)) return;

  try {
    const raw = await readFile(intentsPath, 'utf8');
    const data = JSON.parse(raw);
    // In a full implementation, merge component-specific intents
    // For now, just ensure the file is valid
    await writeFile(intentsPath, JSON.stringify(data, null, 2) + '\n');
  } catch {
    // Ignore parse errors
  }
}

async function updateLlmsTxt(cwd: string, _componentName: string) {
  const llmsPath = join(cwd, 'llms.txt');
  if (!existsSync(llmsPath)) return;
  // In a full implementation, append component docs to llms.txt
}

function getButtonSource(): string {
  return `import { Button as BaseButton } from '@base-ui/react/button';
import * as stylex from '@stylexjs/stylex';
import { tokens } from '@basex-ui/tokens';
import { capitalize } from '@basex-ui/styles';
import { forwardRef } from 'react';
import type { StyleXStyles } from '@stylexjs/stylex';

const styles = stylex.create({
  root: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: tokens.space2,
    fontFamily: tokens.fontFamilySans,
    fontWeight: tokens.fontWeightMedium,
    lineHeight: tokens.lineHeightTight,
    borderStyle: 'solid',
    borderWidth: tokens.borderWidthDefault,
    borderColor: 'transparent',
    borderRadius: tokens.radiusMd,
    cursor: 'pointer',
    userSelect: 'none',
    textDecoration: 'none',
    transitionProperty: 'background-color, color, border-color, box-shadow, opacity, transform',
    transitionDuration: tokens.motionDurationFast,
    transitionTimingFunction: tokens.motionEaseOut,
    transform: { default: 'none', ':active': 'scale(0.98)' },
    outline: { default: 'none', ':focus-visible': \`2px solid \${tokens.colorFocusRing}\` },
    outlineOffset: '2px',
  },
  variantSolid: {
    backgroundColor: { default: tokens.colorPrimary, ':hover': tokens.colorPrimaryHover, ':active': tokens.colorPrimaryActive },
    color: tokens.colorPrimaryContrast,
    borderColor: 'transparent',
  },
  variantOutline: {
    backgroundColor: { default: 'transparent', ':hover': tokens.colorMuted },
    color: tokens.colorText,
    borderColor: tokens.colorBorder,
  },
  variantGhost: {
    backgroundColor: { default: 'transparent', ':hover': tokens.colorMuted },
    color: tokens.colorText,
    borderColor: 'transparent',
  },
  solidSecondary: {
    backgroundColor: { default: tokens.colorSecondary, ':hover': tokens.colorSecondaryHover, ':active': tokens.colorSecondaryActive },
    color: tokens.colorSecondaryContrast,
  },
  solidDestructive: {
    backgroundColor: { default: tokens.colorDestructive, ':hover': tokens.colorDestructiveHover, ':active': tokens.colorDestructiveActive },
    color: tokens.colorDestructiveContrast,
  },
  outlineDestructive: {
    color: tokens.colorDestructive,
    borderColor: tokens.colorDestructive,
  },
  ghostDestructive: {
    color: tokens.colorDestructive,
  },
  sizeSm: { height: '32px', paddingInline: tokens.space3, fontSize: tokens.fontSizeSm },
  sizeMd: { height: '40px', paddingInline: tokens.space4, fontSize: tokens.fontSizeSm },
  sizeLg: { height: '48px', paddingInline: tokens.space6, fontSize: tokens.fontSizeMd },
  disabled: { opacity: 0.5, pointerEvents: 'none', cursor: 'default' },
});

export type ButtonVariant = 'solid' | 'outline' | 'ghost';
export type ButtonColor = 'default' | 'secondary' | 'destructive';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps
  extends Omit<React.ComponentPropsWithoutRef<typeof BaseButton>, 'className'> {
  variant?: ButtonVariant;
  color?: ButtonColor;
  size?: ButtonSize;
  sx?: StyleXStyles;
  children?: React.ReactNode;
}

type CompoundKey = \`\${ButtonVariant}_\${ButtonColor}\`;
const compoundStyles: Partial<Record<CompoundKey, keyof typeof styles>> = {
  solid_secondary: 'solidSecondary',
  solid_destructive: 'solidDestructive',
  outline_destructive: 'outlineDestructive',
  ghost_destructive: 'ghostDestructive',
};

export const Button = forwardRef<HTMLElement, ButtonProps>(
  ({ variant = 'solid', color = 'default', size = 'md', sx, ...props }, ref) => {
    const variantKey = \`variant\${capitalize(variant)}\` as const;
    const sizeKey = \`size\${capitalize(size)}\` as const;
    const compoundKey: CompoundKey = \`\${variant}_\${color}\`;
    const compoundStyleKey = compoundStyles[compoundKey];

    return (
      <BaseButton
        ref={ref}
        {...props}
        className={(state) =>
          stylex.props(
            styles.root,
            styles[variantKey],
            compoundStyleKey != null && styles[compoundStyleKey],
            styles[sizeKey],
            state.disabled && styles.disabled,
            sx,
          ).className ?? ''
        }
      />
    );
  },
);

Button.displayName = 'Button';
`;
}

function getButtonManifest(): string {
  return JSON.stringify(
    {
      name: 'Button',
      description: 'A styled button component for triggering actions.',
      category: 'actions',
      variants: { variant: ['solid', 'outline', 'ghost'], color: ['default', 'secondary', 'destructive'], size: ['sm', 'md', 'lg'] },
      intents: [
        { intent: 'trigger-action', signals: ['button', 'click', 'submit', 'action'] },
        { intent: 'destructive-action', signals: ['delete', 'remove', 'destroy', 'danger'] },
      ],
      avoidWhen: [
        { scenario: 'Navigation', alternative: 'Use Link component' },
        { scenario: 'Toggle state', alternative: 'Use Toggle or Switch' },
      ],
    },
    null,
    2,
  ) + '\n';
}

function getButtonDocs(): string {
  return `# Button

A styled button for triggering actions.

## Import
\`\`\`tsx
import { Button } from './components/ui/button';
\`\`\`

## Props
| Prop | Type | Default |
|------|------|---------|
| variant | 'solid' \\| 'outline' \\| 'ghost' | 'solid' |
| color | 'default' \\| 'secondary' \\| 'destructive' | 'default' |
| size | 'sm' \\| 'md' \\| 'lg' | 'md' |
| sx | StyleXStyles | — |

## When to Use
- Triggering actions (submit, save, confirm)
- Primary calls-to-action
- Destructive actions with \`color="destructive"\`

## When NOT to Use
- Navigation — use Link
- Toggling state — use Toggle/Switch
- Opening menus — use Menu.Trigger
`;
}
