# BaseX UI — Claude Code Instructions

## Component Workflow

When building UI, follow this workflow:

1. **Resolve intent first** — use the `basex-ui` MCP server's `resolve_intent` tool to find the right component
2. **Check for anti-patterns** — use `check_usage` before implementing
3. **Get full API** — use `get_component` for props, variants, and examples
4. **Use design tokens** — use `get_tokens` for the token reference; never hardcode values

## Styling

- All styles use StyleX (`@stylexjs/stylex`)
- Import tokens: `import { tokens } from '@basex-ui/tokens'`
- Import themes: `import { lightTheme, darkTheme } from '@basex-ui/styles'`
- Override component styles via the `sx` prop
- Custom styles: `const styles = stylex.create({ ... })` referencing tokens

## File Structure

- Components: `src/components/ui/` — BaseX UI components scaffolded here
- Tokens: `src/tokens/` — design token definitions
- Themes: `src/themes/` — named theme files

## Key Rules

- Never use raw CSS color/spacing/typography values — always use tokens
- Button is for actions, not navigation (use Link for navigation)
- Use the `sx` prop for deterministic style overrides
- Prefer semantic token names (`colorPrimary`) over palette steps
