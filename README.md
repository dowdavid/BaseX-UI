# BaseX UI

Accessible React components built on [Base UI](https://base-ui.com) and styled with [StyleX](https://stylexjs.com). Opinionated defaults, full customization via the `sx` prop.

## Packages

| Package                  | Description                                                             |
| ------------------------ | ----------------------------------------------------------------------- |
| `@basex-ui/tokens`       | Design tokens as StyleX variables (colors, spacing, typography, motion) |
| `@basex-ui/styles`       | Theme definitions (light/dark) and utilities                            |
| `@basex-ui/components`   | Accessible React components on Base UI + StyleX                         |
| `@basex-ui/intelligence` | AI intent resolution and animation presets                              |
| `@basex-ui/mcp-server`   | MCP server for AI agent component discovery                             |
| `@basex-ui/cli`          | CLI for scaffolding BaseX UI into projects                              |

## Quick Start

```bash
# Install the CLI
npm install -g @basex-ui/cli

# Add a component to your project
basex-ui add button
```

Or install packages directly:

```bash
pnpm add @basex-ui/components @basex-ui/tokens @basex-ui/styles
```

## Development

```bash
pnpm install
pnpm build
pnpm dev        # watch mode
pnpm test       # run tests
pnpm lint       # lint
```

## Monorepo Structure

```
packages/
  tokens/        — Design tokens (StyleX variables)
  styles/        — Themes + utilities
  components/    — React components
  intelligence/  — AI intent resolution
  mcp-server/    — MCP server
  cli/           — CLI tool
apps/
  playground/    — Vite dev sandbox
```

> **ESM-only** — All packages ship ES modules exclusively.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for development setup and guidelines.

## License

[MIT](LICENSE)
