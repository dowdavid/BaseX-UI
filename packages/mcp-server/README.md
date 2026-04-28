# @basex-ui/mcp-server

Model Context Protocol server for [BaseX UI](https://github.com/dowdavid/BaseX-UI). Lets AI agents discover components, resolve intent from natural language, look up tokens, and validate usage — all without reading docs pages.

## Install

```bash
pnpm add @basex-ui/mcp-server
```

## Configure your agent

Add to your MCP client config (Claude Desktop, Cursor, or any MCP-compatible agent):

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

The server runs over stdio. No HTTP, no API keys.

## Tools

| Tool                    | Purpose                                          |
| ----------------------- | ------------------------------------------------ |
| `list_components`       | Browse all 36 components                         |
| `search_components`     | Fuzzy search by name/category/description        |
| `get_component`         | Full manifest with parts, props, examples        |
| `get_component_example` | Usage examples, optionally by variant            |
| `resolve_intent`        | Natural language → component recommendation      |
| `check_usage`           | Validate component choice against anti-patterns  |
| `get_tokens`            | Design tokens by category                        |
| `get_theme_example`     | Theme setup code (light, dark, custom)           |
| `get_animation`         | Animation presets by name or use case            |
| `get_component_setup`   | Pre-generation requirements: imports, CSS, props |

## Typical agent flow

```
1. resolve_intent("FAQ with expandable answers")
2. get_component_setup("Accordion")
3. get_component("Accordion")
4. get_tokens("spacing")
5. check_usage("Accordion", "<context>")
```

By step 3, the agent has everything needed to generate correct code.

## License

MIT — see the [main repo](https://github.com/dowdavid/BaseX-UI).
