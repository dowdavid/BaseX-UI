BaseX-UI is an open-source component library built on Base UI and StyleX, with an MCP server that gives AI agents direct access to component specs at build time.

## Motivation

Agents writing frontend code work from documentation. They read it, interpret it, guess at prop names, hallucinate imports. The bigger the library, the more room for error. BaseX-UI inverts that. Instead of publishing docs and hoping agents parse them correctly, it ships structured metadata and an MCP server with 10 tools agents can call before they write a single line.

An agent describes what it needs in plain language. The server returns the correct component, composition blueprint, exact imports, required props, animation presets, and anti-pattern warnings. No interpretation required.

## Architecture

React → Base UI (accessibility primitives) → StyleX (build-time CSS) → MCP Server (intelligence layer)

Base UI provides unstyled, accessible primitives. If you've used Radix, the mental model is similar, but Base UI gives you more control when building a system on top rather than consuming prebuilt components. No opinionated styles to override.

StyleX handles all styling through build-time extraction and atomic class deduplication. Styles are colocated with components, compiled at build, and deduplicated across the entire bundle. The output is a single flat CSS file regardless of how many components you use.

MCP Server is the intelligence layer. It resolves natural language intent to component specs, detects anti-patterns (using Button where Link is needed), and returns structured JSON an agent can act on without ambiguity.

## Component metadata

Every component ships with a metadata object containing:

```ts
{
  name: string
  description: string
  whenToUse: string[]
  composesWith: string[]
  antiPatterns: string[]
  props: PropSpec[]
  animationPresets: string[]
}
```

This metadata powers the MCP server's responses. When an agent queries for a component, it gets back typed, structured data rather than prose. The difference: documentation is interpretable guidance. Structured metadata is actionable instruction.

## Stack

React, TypeScript, Base UI, StyleX. No runtime CSS. No class name conflicts. No specificity wars. Styles are deterministic and atomic.
