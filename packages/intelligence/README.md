# @basex-ui/intelligence

Intent resolution, anti-pattern detection, and animation presets for [BaseX UI](https://github.com/dowdavid/BaseX-UI). Powers the [`@basex-ui/mcp-server`](../mcp-server) and is usable directly in any agent or tool.

## Install

```bash
pnpm add @basex-ui/intelligence
```

## Usage

```ts
import { intentsIndex, animationPresets } from '@basex-ui/intelligence';

// Resolve a natural-language description to a component
const match = intentsIndex.intents.find((i) => i.signals.some((s) => userPrompt.includes(s)));

// Find an animation preset by use case
const preset = animationPresets.find((p) => p.useFor.includes('accordion panels'));
```

## What's included

- **`intentsIndex`** — natural-language → component mapping with reasoning and composition blueprints
- **Anti-patterns** — known misuses (e.g., "Accordion for multi-step wizard") with suggested alternatives
- **`animationPresets`** — named presets (State, Expand, Move, …) tied to motion tokens

Intent and anti-pattern data ship as `intents.json` and is consumed by both the MCP server and the docs site.

## License

MIT — see the [main repo](https://github.com/dowdavid/BaseX-UI).
