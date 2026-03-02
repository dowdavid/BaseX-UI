# BaseX UI

Accessible React components built on [Base UI](https://base-ui.com) and [StyleX](https://stylexjs.com), designed for AI agents to use.

Most component libraries assume a human is reading the docs. BaseX UI ships with an intelligence layer and MCP server so AI agents can discover components, resolve intent from natural language, detect anti-patterns, and generate production code without hallucinating props or picking the wrong component.

**[Live Playground](https://basex-playground.vercel.app)**

## What makes this different

**Intelligence layer** — Agents describe what they want ("a FAQ section with expandable answers") and the system returns the right component, composition blueprint, required props, and anti-pattern warnings.

**MCP server** — 10 tools for component discovery, intent resolution, token lookup, animation presets, and usage validation. Agents go from intent to code without reading a single docs page.

**Design tokens** — Colors, spacing, typography, motion, and radius as StyleX variables. Light and dark themes out of the box.

**Opinionated defaults, full customization** — Every component accepts an `sx` prop for StyleX overrides.

## Packages

| Package | Description |
| --- | --- |
| `@basex-ui/components` | Accessible React components on Base UI + StyleX |
| `@basex-ui/intelligence` | AI intent resolution and anti-pattern detection |
| `@basex-ui/mcp-server` | MCP server for AI agent component discovery |
| `@basex-ui/tokens` | Design tokens as StyleX variables |
| `@basex-ui/styles` | Theme definitions (light/dark) and utilities |
| `@basex-ui/cli` | CLI for scaffolding BaseX UI into projects |

## Quick Start

```bash
pnpm add @basex-ui/components @basex-ui/tokens @basex-ui/styles
```

Or use the CLI:

```bash
npm install -g @basex-ui/cli
basex-ui add button
```

## Agent Integration

Add the MCP server to your agent's config:

```json
{
  "mcpServers": {
    "basex-ui": {
      "command": "npx",
      "args": ["@basex-ui/mcp-server"]
    }
  }
}
```

The agent can then call tools like `resolve_intent`, `get_component`, `check_usage`, and `get_tokens` to build UI with full context.

## Development

```bash
pnpm install
pnpm build
pnpm dev        # watch mode
pnpm test       # run tests
```

## Monorepo Structure

```
packages/
  components/    — React components
  intelligence/  — AI intent resolution
  mcp-server/    — MCP server
  tokens/        — Design tokens (StyleX variables)
  styles/        — Themes + utilities
  cli/           — CLI tool
apps/
  playground/    — Live component sandbox
```

> **ESM-only** — All packages ship ES modules exclusively.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for development setup and guidelines.

## License

[MIT](LICENSE)
