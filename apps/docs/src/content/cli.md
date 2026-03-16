The CLI is the developer-facing counterpart to the MCP server. While agents interact through MCP tools, developers use four CLI commands to set up projects, scaffold components, and manage themes.

```bash
pnpm add -D @basex-ui/cli
```

## init

Interactive setup wizard with a built-in theme builder. Walks you through color mode, primary color, radius, border width, shadows, font family, and spacing density.

```bash
npx basex-ui init
```

Pass `--defaults` to skip prompts and use the default theme:

```bash
npx basex-ui init --defaults
```

## add

Scaffold a component into your project. Creates the component files in `src/components/ui/<component>/` and updates the intents index.

```bash
npx basex-ui add button
npx basex-ui add accordion
npx basex-ui add dialog
```

If an `llms.txt` file exists in the project root, the CLI updates it with the new component's context. This keeps the LLM context file in sync with what's installed.

## theme

Create and manage named themes.

```bash
# Create a new theme interactively
npx basex-ui theme create

# Switch to a named theme
npx basex-ui theme use dark

# List saved themes
npx basex-ui theme list
```

Themes are generated using `@basex-ui/tokens/oklch` — you provide a hex color and the CLI generates a full semantic palette using OKLCH color space for perceptually uniform lightness steps.

## list

Show all available components with their installation status. Checks `src/components/ui/` to see what's already in your project.

```bash
npx basex-ui list
```
