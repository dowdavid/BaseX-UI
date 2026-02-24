# Contributing to BaseX UI

## Prerequisites

- Node.js >= 20
- pnpm >= 9

## Setup

```bash
git clone https://github.com/daviddow/BaseX-UI.git
cd BaseX-UI
pnpm install
pnpm build
```

## Development Workflow

```bash
pnpm dev          # Watch mode (all packages)
pnpm build        # Build all packages
pnpm test         # Run tests in watch mode
pnpm test:ci      # Run tests once
pnpm lint         # Lint
pnpm format       # Format with Prettier
pnpm format:check # Check formatting
pnpm typecheck    # TypeScript type checking
```

The playground app (`apps/playground`) is a Vite dev sandbox for testing components locally.

## Adding a New Component

Follow the checklist in [`docs/new-component-checklist.md`](docs/new-component-checklist.md). Template files are in `packages/components/src/_template/`.

Key integration points:

1. Component source + barrel export + tsup entry + package.json subpath
2. `manifest.json` with per-part structure
3. `{name}.md` documentation with per-part API reference
4. Update `intents.json` with component intents and anti-patterns
5. Register in `mcp-server/src/data.ts`
6. Add to CLI (`packages/cli/src/commands/add.ts` and `list.ts`)
7. Playground demo

## Commit Conventions

Use concise, descriptive commit messages. Reference issues where applicable.

## Code Style

- Prettier handles formatting (runs in CI)
- ESLint handles linting (runs in CI)
- Existing style: single quotes, trailing commas, 2-space indentation, 100 char line width
