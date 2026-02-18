# BaseX UI — Foundation Design

## Overview

BaseX UI is an open-source, AI-first, copy-paste component library built on Base UI (`@base-ui/react`) and styled with StyleX (`@stylexjs/stylex`). It follows the shadcn/ui distribution model — a CLI scaffolds fully-owned components into the consumer's project — but with a fundamentally different styling architecture and a Component Intelligence Protocol that makes AI coding agents first-class consumers.

## Key Decisions (from brainstorming)

1. **Project name**: BaseX UI — package scope `@basex-ui/*`, CLI command `npx basex-ui`
2. **State styling**: className callback with conditional StyleX (`stylex.props()` inside Base UI's `className={(state) => ...}` callback)
3. **Color system**: Separate `variant` (shape/fill) and `color` (palette) axes — composable, no combinatorial explosion
4. **Color values**: Minimal set — `default`, `secondary`, `destructive` — extensible later

## Architecture

### Monorepo Structure (pnpm workspaces)

```
basex-ui/
├── package.json
├── pnpm-workspace.yaml
├── tsconfig.base.json
├── .npmrc
├── packages/
│   ├── tokens/          # stylex.defineVars, presets, OKLCH generator
│   ├── styles/          # base themes (light + dark), shared utilities
│   ├── components/      # Base UI + StyleX wrappers + manifests + docs
│   ├── intelligence/    # intents.json, cross-component anti-patterns
│   ├── mcp-server/      # MCP server (Node.js, stdio)
│   └── cli/             # scaffolding CLI tool
└── apps/
    ├── docs/            # documentation site (Vite + React)
    └── playground/      # dev sandbox (Vite + React)
```

### Build Tooling

- **tsup** for all packages
- **`@stylexjs/babel-plugin`** integrated into tsup for StyleX packages
- **TypeScript** strict mode with project references
- **`@clack/prompts`** for CLI interactive prompts
- **`@modelcontextprotocol/sdk`** for the MCP server

## Component Pattern

Every styled component follows this exact pattern. Zero deviations.

```tsx
import { Button as BaseButton } from '@base-ui/react/button';
import * as stylex from '@stylexjs/stylex';
import { tokens } from '@basex-ui/tokens';
import type { StyleXStyles } from '@stylexjs/stylex';
import { forwardRef } from 'react';

// --- Styles ---
const styles = stylex.create({
  root: { /* base styles using tokens */ },
  // variant axis (shape/fill)
  variantSolid: { /* filled background */ },
  variantOutline: { /* border, transparent bg */ },
  variantGhost: { /* no border, no bg */ },
  // color axis (palette)
  colorDefault: { /* colorPrimary-based */ },
  colorDestructive: { /* colorDestructive-based */ },
  colorSecondary: { /* colorSecondary-based */ },
  // size axis
  sizeSm: { /* compact */ },
  sizeMd: { /* default */ },
  sizeLg: { /* generous */ },
  // states (applied via className callback)
  pressed: { /* scale/opacity shift */ },
  disabled: { /* reduced opacity, no pointer */ },
  focusVisible: { /* focus ring */ },
});

// --- Types ---
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'solid' | 'outline' | 'ghost';
  color?: 'default' | 'destructive' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  sx?: StyleXStyles;
}

// --- Component ---
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'solid', color = 'default', size = 'md', sx, ...props }, ref) => (
    <BaseButton.Root
      ref={ref}
      {...props}
      className={(state) =>
        stylex.props(
          styles.root,
          styles[`variant${capitalize(variant)}`],
          styles[`color${capitalize(color)}`],
          styles[`size${capitalize(size)}`],
          state.pressed && styles.pressed,
          state.disabled && styles.disabled,
          state.focusVisible && styles.focusVisible,
          sx,
        ).className
      }
    />
  )
);
```

### Key aspects:
- `stylex.props()` inside className callback for state-based styling
- `sx` prop goes last for deterministic "last style wins" consumer overrides
- Style key naming convention: `variant{Value}`, `color{Value}`, `size{Value}` — predictable for agents
- Compound components re-export unstyled Base UI parts directly

## Token System

### Token Categories

All tokens defined with `stylex.defineVars`. Names must be self-documenting (pass the "would an AI use it correctly?" test).

**Colors** (OKLCH-based, semantic aliases):
- `colorPrimary`, `colorPrimaryHover`, `colorPrimaryActive`, `colorPrimaryContrast`
- `colorSecondary`, `colorSecondaryHover`, `colorSecondaryActive`, `colorSecondaryContrast`
- `colorDestructive`, `colorDestructiveHover`, `colorDestructiveActive`, `colorDestructiveContrast`
- `colorMuted`, `colorMutedForeground`
- `colorSurface`, `colorSurfaceRaised`, `colorSurfaceOverlay`
- `colorOverlay` (backdrop)
- `colorBorder`, `colorBorderMuted`
- `colorText`, `colorTextMuted`, `colorTextInverse`
- `colorFocusRing`
- `colorBackground`

**Spacing** (consistent scale):
- `space1` (4px), `space2` (8px), `space3` (12px), `space4` (16px), `space5` (20px), `space6` (24px), `space8` (32px), `space10` (40px), `space12` (48px)

**Typography**:
- `fontFamilySans`, `fontFamilyMono`
- `fontSizeXs`, `fontSizeSm`, `fontSizeMd`, `fontSizeLg`, `fontSizeXl`, `fontSize2xl`
- `fontWeightNormal`, `fontWeightMedium`, `fontWeightSemibold`, `fontWeightBold`
- `lineHeightTight`, `lineHeightNormal`, `lineHeightRelaxed`
- `letterSpacingTight`, `letterSpacingNormal`, `letterSpacingWide`

**Border Radius**:
- `radiusNone`, `radiusSm`, `radiusMd`, `radiusLg`, `radiusXl`, `radiusFull`

**Border Width**:
- `borderWidthDefault`, `borderWidthThick`

**Shadows**:
- `shadowNone`, `shadowSm`, `shadowMd`, `shadowLg`, `shadowXl`

**Motion**:
- `motionDurationFast` (100ms), `motionDurationNormal` (200ms), `motionDurationSlow` (400ms)
- `motionEaseOut`, `motionEaseInOut`, `motionEaseSpring`

### Presets

Each configurable dimension has named presets — objects of token overrides ready for `stylex.createTheme`. The CLI maps interactive selections to these presets.

- **Radius**: `none` | `sm` | `md` (default) | `lg` | `full`
- **Shadows**: `none` | `subtle` (default) | `medium` | `dramatic`
- **Border width**: `none` | `thin` (default) | `medium` | `thick`
- **Spacing density**: `compact` | `default` | `spacious`

### OKLCH Palette Generator

Utility function: takes a hex color, converts to OKLCH, generates a full palette (50-950 lightness steps) plus semantic aliases (`colorPrimary`, `colorPrimaryHover`, `colorPrimaryContrast`, etc.). The CLI uses this for custom primary color selection.

### CSS @property Registrations

Key tokens registered with `@property` so they can be animated/transitioned:
- Color tokens (for smooth theme transitions)
- Radius tokens (for morphing effects)
- Shadow tokens (for elevation transitions)

## Theme System

- Light and dark themes via `stylex.createTheme`
- Theme switching produces smooth transitions via `@property` registered tokens
- Named themes saved in `themes/` directory
- Multiple named themes supported, switchable via CLI
- `prefers-color-scheme` respected by default

## Component Intelligence Protocol

Three layers, per component:

### Layer 1: Intents
Map developer intent to component choice. Each intent includes signals (keywords), reasoning (why this component), and composition (blueprint).

### Layer 2: Anti-patterns (avoidWhen)
Scenarios where the component should NOT be used, with reasoning and correct alternatives.

### Layer 3: Composition Guidance
Concise blueprints showing how components compose for each intent.

### Per-component files:
- `manifest.json` — machine-readable: parts, props, variants, data attributes, CSS variables, tokens, intents, avoidWhen, examples
- `[component].md` — human-readable: consistent structure with "When to Use" / "When NOT to Use" sections

### Library-level index:
- `intents.json` — aggregated index of all intents across all components (in `packages/intelligence`)

## MCP Server

`packages/mcp-server` — Node.js stdio server using `@modelcontextprotocol/sdk`.

**Tools:**
- `list_components()` — all installed components with categories and descriptions
- `search_components({ query })` — search across names, descriptions, categories
- `get_component({ name })` — full manifest for a component
- `get_component_example({ name, variant? })` — specific usage example
- `resolve_intent({ description })` — describe what you're building, get recommended component with reasoning
- `check_usage({ component, context })` — check for anti-pattern warnings
- `get_tokens({ category? })` — design tokens, optionally filtered
- `get_theme_example({ theme })` — theme creation/application example

## CLI

`packages/cli` — `npx basex-ui <command>`

### `basex-ui init`
Interactive 7-question theme builder + project setup:
1. Color mode (Both / Light / Dark)
2. Primary color (Default Blue / Purple / Green / Orange / Red / Custom hex)
3. Border radius (None / Small / Default Medium / Large / Full)
4. Border width (None / Default Thin / Medium / Thick)
5. Shadows (None / Default Subtle / Medium / Dramatic)
6. Font family (Default System / Inter / Geist / Custom)
7. Spacing density (Compact / Default / Spacious)

Then: name the theme, scaffold everything.

Sets up: token files, named theme file, StyleX config, portal setup, component registry directory, MCP server, `.mcp.json`, `.cursor/rules/basex-ui.mdc`, `CLAUDE.md`, `llms.txt`, empty `intents.json`.

`--defaults` flag skips all prompts.

### `basex-ui add [component]`
Scaffolds component + manifest + docs, resolves dependencies, updates `intents.json` and `llms.txt`.

### `basex-ui theme create`
Run the theme builder again for additional named themes.

### `basex-ui theme use <name>`
Switch active theme.

### `basex-ui theme list`
Show all saved themes.

### `basex-ui list`
Show available/installed components.

## Agent Configuration Files (installed by CLI)

- `.mcp.json` — MCP server registration (auto-detected by Claude Code, Cursor, Windsurf)
- `.cursor/rules/basex-ui.mdc` — Cursor rules: workflow (resolve_intent first), token reference, anti-patterns
- `CLAUDE.md` — Claude Code instructions: same workflow adapted for Claude Code
- `llms.txt` — top-level docs index for LLM consumption

## First Implementation Scope

1. Monorepo structure with pnpm workspaces
2. `packages/tokens` — full token system with presets and OKLCH palette generator
3. `packages/styles` — base light + dark themes, shared utilities
4. Agent config templates (Cursor rules, CLAUDE.md, .mcp.json, llms.txt)
5. `packages/components` — Button component (first component, demonstrates full pattern)
   - Fetch Base UI Button docs first
   - Implement with className callback pattern
   - variant (solid/outline/ghost) + color (default/secondary/destructive) + size (sm/md/lg)
   - manifest.json with intents and avoidWhen
   - button.md with When to Use / When NOT to Use
6. `packages/intelligence` — intents.json populated with Button intents
7. `packages/mcp-server` — full toolset reading from Button manifest
8. `packages/cli` — interactive init flow with theme builder
