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
  accordion: {
    name: 'Accordion',
    description: 'Collapsible panels for progressive content disclosure.',
    files: ['accordion.tsx', 'index.ts'],
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
    await writeFile(join(targetDir, 'button.tsx'), getButtonSource());
    await writeFile(
      join(targetDir, 'index.ts'),
      `export { Button } from './button';\nexport type { ButtonProps, ButtonVariant, ButtonColor, ButtonSize } from './button';\n`,
    );
    await writeFile(join(targetDir, 'manifest.json'), getButtonManifest());
    await writeFile(join(targetDir, 'button.md'), getButtonDocs());
  } else if (name === 'accordion') {
    await writeFile(join(targetDir, 'accordion.tsx'), getAccordionSource());
    await writeFile(
      join(targetDir, 'index.ts'),
      `export { Accordion } from './accordion';\nexport type {\n  AccordionRootProps,\n  AccordionItemProps,\n  AccordionHeaderProps,\n  AccordionTriggerProps,\n  AccordionPanelProps,\n} from './accordion';\n`,
    );
    await writeFile(join(targetDir, 'manifest.json'), getAccordionManifest());
    await writeFile(join(targetDir, 'accordion.md'), getAccordionDocs());
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

// --- Styles ---
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
    whiteSpace: 'nowrap',
    flexShrink: 0,
    textDecoration: 'none',
    transitionProperty: 'background-color, color, border-color, box-shadow, opacity, transform',
    transitionDuration: tokens.motionDurationFast,
    transitionTimingFunction: tokens.motionEaseOut,
    transform: {
      default: 'none',
      ':active': 'scale(0.98)',
    },
    outline: {
      default: 'none',
      ':focus-visible': \`2px solid \${tokens.colorFocusRing}\`,
    },
    outlineOffset: '2px',
  },

  // --- Variant axis (shape/fill) ---
  variantSolid: {
    backgroundColor: {
      default: tokens.colorPrimary,
      ':hover': tokens.colorPrimaryHover,
      ':active': tokens.colorPrimaryActive,
    },
    color: tokens.colorPrimaryContrast,
    borderColor: 'transparent',
  },
  variantOutline: {
    backgroundColor: {
      default: 'transparent',
      ':hover': tokens.colorMuted,
    },
    color: tokens.colorText,
    borderColor: tokens.colorBorder,
  },
  variantGhost: {
    backgroundColor: {
      default: 'transparent',
      ':hover': tokens.colorMuted,
    },
    color: tokens.colorText,
    borderColor: 'transparent',
  },

  // --- Compound: variant + color ---
  solidSecondary: {
    backgroundColor: {
      default: tokens.colorSecondary,
      ':hover': tokens.colorSecondaryHover,
      ':active': tokens.colorSecondaryActive,
    },
    color: tokens.colorSecondaryContrast,
  },
  solidDestructive: {
    backgroundColor: {
      default: tokens.colorDestructive,
      ':hover': tokens.colorDestructiveHover,
      ':active': tokens.colorDestructiveActive,
    },
    color: tokens.colorDestructiveContrast,
  },
  outlineDestructive: {
    backgroundColor: {
      default: 'transparent',
      ':hover': tokens.colorDestructiveMuted,
    },
    color: tokens.colorDestructive,
    borderColor: {
      default: tokens.colorBorder,
      ':hover': tokens.colorDestructive,
    },
  },
  ghostDestructive: {
    backgroundColor: {
      default: 'transparent',
      ':hover': tokens.colorDestructiveMuted,
    },
    color: tokens.colorDestructive,
  },

  // --- Size axis ---
  sizeSm: {
    height: '32px',
    paddingInline: tokens.space2h,
    fontSize: tokens.fontSizeSm,
    gap: tokens.space1h,
  },
  sizeMd: {
    height: '36px',
    paddingInline: tokens.space3,
    fontSize: tokens.fontSizeSm,
  },
  sizeLg: {
    height: '40px',
    paddingInline: tokens.space3h,
    fontSize: tokens.fontSizeMd,
  },

  // --- Disabled state (applied conditionally via Base UI state) ---
  disabled: {
    opacity: 0.64,
    pointerEvents: 'none',
    cursor: 'default',
  },
});

// --- Types ---
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

// --- Compound style lookup ---
type CompoundKey = \\\`\\\${ButtonVariant}_\\\${ButtonColor}\\\`;
const compoundStyles: Partial<Record<CompoundKey, keyof typeof styles>> = {
  solid_secondary: 'solidSecondary',
  solid_destructive: 'solidDestructive',
  outline_destructive: 'outlineDestructive',
  ghost_destructive: 'ghostDestructive',
};

// --- Component ---
export const Button = forwardRef<HTMLElement, ButtonProps>(
  (
    { variant = 'solid', color = 'default', size = 'md', sx, ...props },
    ref,
  ) => {
    const variantKey = \\\`variant\\\${capitalize(variant)}\\\` as const;
    const sizeKey = \\\`size\\\${capitalize(size)}\\\` as const;
    const compoundKey: CompoundKey = \\\`\\\${variant}_\\\${color}\\\`;
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
  return (
    JSON.stringify(
      {
        name: 'Button',
        description:
          'A styled button component for triggering actions. Built on Base UI Button with StyleX styling.',
        category: 'actions',
        baseComponent: '@base-ui/react/button',
        anatomy: '<Button />',
        parts: {
          Root: {
            element: 'button',
            description:
              'The button element. Renders a <button> with StyleX styling and Base UI state management.',
            props: {
              variant: {
                type: "'solid' | 'outline' | 'ghost'",
                default: 'solid',
                description: 'Visual style of the button.',
              },
              color: {
                type: "'default' | 'secondary' | 'destructive'",
                default: 'default',
                description: 'Color palette applied to the button.',
              },
              size: {
                type: "'sm' | 'md' | 'lg'",
                default: 'md',
                description: 'Size of the button affecting height, padding, and font size.',
              },
              sx: { type: 'StyleXStyles', description: 'StyleX styles for consumer overrides.' },
              disabled: {
                type: 'boolean',
                default: false,
                description: 'Whether the button is disabled.',
              },
              focusableWhenDisabled: {
                type: 'boolean',
                default: false,
                description: 'Whether the button remains focusable when disabled.',
              },
            },
            dataAttributes: {
              'data-disabled': 'Present when the button is disabled.',
            },
          },
        },
        cssRequirements: null,
        variants: {
          variant: ['solid', 'outline', 'ghost'],
          color: ['default', 'secondary', 'destructive'],
          size: ['sm', 'md', 'lg'],
        },
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
    ) + '\n'
  );
}

function getButtonDocs(): string {
  return `# Button

A styled button component for triggering actions. Built on Base UI Button with StyleX styling.

## Import
\`\`\`tsx
import { Button } from './components/ui/button';
\`\`\`

## Anatomy
\`\`\`tsx
<Button />
\`\`\`

## API Reference

### Root

The button element. Renders a \`<button>\`.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | 'solid' \\| 'outline' \\| 'ghost' | 'solid' | Visual style |
| color | 'default' \\| 'secondary' \\| 'destructive' | 'default' | Color palette |
| size | 'sm' \\| 'md' \\| 'lg' | 'md' | Button size |
| sx | StyleXStyles | — | Style overrides |
| disabled | boolean | false | Disables the button |
| focusableWhenDisabled | boolean | false | Keep focusable when disabled |

| Attribute | Description |
|-----------|-------------|
| data-disabled | Present when the button is disabled |

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

function getAccordionSource(): string {
  return `import { Accordion as BaseAccordion } from '@base-ui/react/accordion';
import * as stylex from '@stylexjs/stylex';
import { tokens } from '@basex-ui/tokens';
import { forwardRef } from 'react';
import type { StyleXStyles } from '@stylexjs/stylex';

// --- Chevron Icon ---
function ChevronIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M4 6L8 10L12 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// --- Styles ---
const styles = stylex.create({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },

  item: {
    borderBottomWidth: tokens.borderWidthDefault,
    borderBottomStyle: 'solid',
    borderBottomColor: tokens.colorBorder,
  },

  header: {
    display: 'flex',
    margin: 0,
  },

  trigger: {
    display: 'flex',
    flex: 1,
    alignItems: 'start',
    justifyContent: 'space-between',
    gap: tokens.space4,
    paddingBlock: tokens.space4,
    fontFamily: tokens.fontFamilySans,
    fontWeight: tokens.fontWeightMedium,
    fontSize: tokens.fontSizeSm,
    lineHeight: tokens.lineHeightNormal,
    color: tokens.colorText,
    backgroundColor: 'transparent',
    borderWidth: 0,
    borderStyle: 'none',
    borderRadius: tokens.radiusMd,
    cursor: 'pointer',
    textAlign: 'start',
    transitionProperty: 'all',
    transitionDuration: tokens.motionDurationFast,
    transitionTimingFunction: tokens.motionEaseOut,
    outline: {
      default: 'none',
      ':focus-visible': \\\`3px solid \\\${tokens.colorFocusRing}\\\`,
    },
  },

  chevron: {
    flexShrink: 0,
    width: '16px',
    height: '16px',
    opacity: 0.8,
    transform: 'translateY(2px) rotate(var(--accordion-chevron-rotation, 0deg))',
    transitionProperty: 'transform',
    transitionDuration: tokens.motionDurationNormal,
    transitionTimingFunction: tokens.motionEaseInOut,
  },

  panel: {
    fontSize: tokens.fontSizeSm,
    color: tokens.colorTextMuted,
  },
  panelContent: {
    paddingTop: 0,
    paddingBottom: tokens.space4,
    paddingInline: 0,
  },

  disabled: {
    opacity: 0.64,
    pointerEvents: 'none',
    cursor: 'default',
  },
});

// --- Types ---
export interface AccordionRootProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof BaseAccordion.Root>,
    'className'
  > {
  sx?: StyleXStyles;
}

export interface AccordionItemProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof BaseAccordion.Item>,
    'className'
  > {
  sx?: StyleXStyles;
}

export interface AccordionHeaderProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof BaseAccordion.Header>,
    'className'
  > {
  sx?: StyleXStyles;
}

export interface AccordionTriggerProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof BaseAccordion.Trigger>,
    'className'
  > {
  sx?: StyleXStyles;
}

export interface AccordionPanelProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof BaseAccordion.Panel>,
    'className'
  > {
  sx?: StyleXStyles;
}

// --- Components ---

const Root = forwardRef<HTMLDivElement, AccordionRootProps>(
  ({ sx, ...props }, ref) => (
    <BaseAccordion.Root
      ref={ref}
      {...props}
      className={(state) =>
        stylex.props(
          styles.root,
          state.disabled && styles.disabled,
          sx,
        ).className ?? ''
      }
    />
  ),
);
Root.displayName = 'Accordion.Root';

const Item = forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ sx, ...props }, ref) => (
    <BaseAccordion.Item
      ref={ref}
      {...props}
      className={(state) =>
        stylex.props(
          styles.item,
          state.disabled && styles.disabled,
          sx,
        ).className ?? ''
      }
    />
  ),
);
Item.displayName = 'Accordion.Item';

const Header = forwardRef<HTMLHeadingElement, AccordionHeaderProps>(
  ({ sx, ...props }, ref) => (
    <BaseAccordion.Header
      ref={ref}
      {...props}
      className={stylex.props(styles.header, sx).className ?? ''}
    />
  ),
);
Header.displayName = 'Accordion.Header';

const Trigger = forwardRef<HTMLButtonElement, AccordionTriggerProps>(
  ({ children, sx, ...props }, ref) => (
    <BaseAccordion.Trigger
      ref={ref}
      {...props}
      className={(state) =>
        stylex.props(
          styles.trigger,
          state.disabled && styles.disabled,
          sx,
        ).className ?? ''
      }
      style={(state) => ({
        '--accordion-chevron-rotation': state.open ? '180deg' : '0deg',
      } as React.CSSProperties)}
    >
      {children}
      <ChevronIcon {...stylex.props(styles.chevron)} />
    </BaseAccordion.Trigger>
  ),
);
Trigger.displayName = 'Accordion.Trigger';

const Panel = forwardRef<HTMLDivElement, AccordionPanelProps>(
  ({ children, sx, ...props }, ref) => (
    <BaseAccordion.Panel
      keepMounted
      ref={ref}
      {...props}
      className={() =>
        \\\`basex-accordion-panel \\\${stylex.props(styles.panel, sx).className ?? ''}\\\`
      }
    >
      <div {...stylex.props(styles.panelContent)}>{children}</div>
    </BaseAccordion.Panel>
  ),
);
Panel.displayName = 'Accordion.Panel';

// --- Public API ---
export const Accordion = { Root, Item, Header, Trigger, Panel };
`;
}

function getAccordionManifest(): string {
  return (
    JSON.stringify(
      {
        name: 'Accordion',
        description:
          'A set of collapsible panels with headings for progressive content disclosure.',
        category: 'layout',
        baseComponent: '@base-ui/react/accordion',
        anatomy:
          '<Accordion.Root>\n  <Accordion.Item>\n    <Accordion.Header>\n      <Accordion.Trigger />\n    </Accordion.Header>\n    <Accordion.Panel />\n  </Accordion.Item>\n</Accordion.Root>',
        parts: {
          Root: {
            element: 'div',
            description: 'Container that groups all accordion items.',
            props: {
              value: { type: 'string[]', description: 'Controlled value of expanded items.' },
              defaultValue: {
                type: 'string[]',
                description: 'Initial expanded items for uncontrolled mode.',
              },
              onValueChange: {
                type: '(value: string[]) => void',
                description: 'Callback fired when items expand or collapse.',
              },
              multiple: {
                type: 'boolean',
                default: false,
                description: 'Allow multiple panels open simultaneously.',
              },
              disabled: {
                type: 'boolean',
                default: false,
                description: 'Disable all accordion items.',
              },
              sx: { type: 'StyleXStyles', description: 'StyleX styles for consumer overrides.' },
            },
            dataAttributes: { 'data-disabled': 'Present when the accordion is disabled.' },
          },
          Item: {
            element: 'div',
            description: 'Groups a header with its collapsible panel.',
            props: {
              value: {
                type: 'string',
                required: true,
                description: 'Unique value identifying this item.',
              },
              disabled: { type: 'boolean', default: false, description: 'Disable this item.' },
              sx: { type: 'StyleXStyles', description: 'StyleX styles for consumer overrides.' },
            },
            dataAttributes: {
              'data-open': 'Present when the panel is expanded.',
              'data-disabled': 'Present when the item is disabled.',
              'data-index': 'Position number of the item.',
            },
          },
          Header: {
            element: 'h3',
            description: 'Heading wrapper for accessibility.',
            props: {
              sx: { type: 'StyleXStyles', description: 'StyleX styles for consumer overrides.' },
            },
            dataAttributes: {
              'data-open': 'Present when the parent item is expanded.',
              'data-disabled': 'Present when the parent item is disabled.',
            },
          },
          Trigger: {
            element: 'button',
            description: 'Button that toggles the panel open and closed.',
            props: {
              sx: { type: 'StyleXStyles', description: 'StyleX styles for consumer overrides.' },
            },
            dataAttributes: {
              'data-open': 'Present when the parent item is expanded.',
              'data-disabled': 'Present when the parent item is disabled.',
            },
          },
          Panel: {
            element: 'div',
            description: 'Collapsible content area with animated height transition.',
            props: {
              keepMounted: {
                type: 'boolean',
                default: true,
                description: 'Keep element in DOM while closed (for animation).',
              },
              sx: { type: 'StyleXStyles', description: 'StyleX styles for consumer overrides.' },
            },
            dataAttributes: {
              'data-open': 'Present when the panel is expanded.',
              'data-starting-style': 'Present when animating open.',
              'data-ending-style': 'Present when animating closed.',
            },
          },
        },
        cssRequirements: {
          description: 'Panel height animation requires global CSS rules inside @layer priority1.',
          css: '@layer priority1 {\n  .basex-accordion-panel {\n    height: var(--accordion-panel-height);\n    overflow: hidden;\n    transition: height 200ms cubic-bezier(0.4, 0, 0.2, 1);\n  }\n  .basex-accordion-panel[data-starting-style],\n  .basex-accordion-panel[data-ending-style] {\n    height: 0;\n  }\n}',
        },
        intents: [
          {
            intent: 'collapsible-sections',
            signals: ['accordion', 'collapse', 'expand', 'sections', 'FAQ', 'collapsible'],
          },
          {
            intent: 'show-hide-content',
            signals: ['show more', 'reveal', 'toggle content', 'expandable'],
          },
        ],
        avoidWhen: [
          { scenario: 'Switching between views', alternative: 'Use Tabs' },
          { scenario: 'Single collapsible section', alternative: 'Use Collapsible' },
          { scenario: 'Step-by-step wizard', alternative: 'Use Stepper' },
        ],
      },
      null,
      2,
    ) + '\n'
  );
}

function getAccordionDocs(): string {
  return `# Accordion

A set of collapsible panels for progressive content disclosure.

## Import
\`\`\`tsx
import { Accordion } from './components/ui/accordion';
\`\`\`

## Anatomy
\`\`\`tsx
<Accordion.Root>
  <Accordion.Item>
    <Accordion.Header>
      <Accordion.Trigger />
    </Accordion.Header>
    <Accordion.Panel />
  </Accordion.Item>
</Accordion.Root>
\`\`\`

## CSS Requirements

Panel height animation requires global CSS inside \`@layer priority1\`:

\`\`\`css
@layer priority1 {
  .basex-accordion-panel {
    height: var(--accordion-panel-height);
    overflow: hidden;
    transition: height 200ms cubic-bezier(0.4, 0, 0.2, 1);
  }
  .basex-accordion-panel[data-starting-style],
  .basex-accordion-panel[data-ending-style] {
    height: 0;
  }
}
\`\`\`

## API Reference

### Root
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| multiple | boolean | false | Allow multiple panels open |
| disabled | boolean | false | Disable all items |
| value | string[] | — | Controlled expanded items |
| defaultValue | string[] | — | Initial expanded items |
| onValueChange | (value: string[]) => void | — | Change callback |
| sx | StyleXStyles | — | Style overrides |

### Item
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| value | string | **required** | Unique item identifier |
| disabled | boolean | false | Disable this item |
| sx | StyleXStyles | — | Style overrides |

### Header
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| sx | StyleXStyles | — | Style overrides |

### Trigger
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| sx | StyleXStyles | — | Style overrides |

### Panel
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| keepMounted | boolean | true | Keep in DOM while closed |
| sx | StyleXStyles | — | Style overrides |

## When to Use
- Collapsible sections (settings, sidebars)
- FAQ lists
- Progressive disclosure

## When NOT to Use
- Switching between views — use Tabs
- Single collapsible section — use Collapsible
- Step-by-step wizard — use Stepper
`;
}
