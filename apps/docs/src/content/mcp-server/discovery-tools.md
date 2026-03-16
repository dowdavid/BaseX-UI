Four tools help agents find the right component before committing to a choice.

## list_components

Returns all 24 components with their name, category, and description. No arguments needed. Use this as a starting point when the agent doesn't know what's available.

```
→ list_components()

← [
    { "name": "Button", "category": "actions", "description": "..." },
    { "name": "Accordion", "category": "disclosure", "description": "..." },
    ...
  ]
```

## search_components

Fuzzy search across names, descriptions, and categories. Useful when the agent has a rough idea but doesn't know the exact component name.

```
→ search_components({ query: "dropdown" })

← [
    { "name": "Menu", "category": "forms", "description": "..." },
    { "name": "Combobox", "category": "forms", "description": "..." },
    { "name": "Autocomplete", "category": "forms", "description": "..." }
  ]
```

## get_component

The full manifest for a specific component. This is the source of truth — it includes every part, every prop on every part, data attributes, CSS variables, examples, related intents, and anti-patterns.

```
→ get_component({ name: "Accordion" })

← {
    "name": "Accordion",
    "category": "disclosure",
    "description": "...",
    "parts": [
      { "name": "Root", "props": [...] },
      { "name": "Item", "props": [{ "name": "value", "required": true, ... }] },
      { "name": "Header", "props": [...] },
      { "name": "Trigger", "props": [...] },
      { "name": "Panel", "props": [...] }
    ],
    "dataAttributes": [...],
    "cssVariables": [...],
    "examples": [...],
    "intents": [...],
    "antiPatterns": [...]
  }
```

Agents should call this after they've picked a component (via `resolve_intent` or `search_components`) and need the full spec to generate code.

## get_component_example

Returns usage examples for a component. Optionally filter by variant name to get a specific example (e.g., "basic", "multiple", "disabled").

```
→ get_component_example({ name: "Accordion" })

← // Basic accordion
   <Accordion.Root>
     <Accordion.Item value="section-1">
       <Accordion.Header>
         <Accordion.Trigger>Section</Accordion.Trigger>
       </Accordion.Header>
       <Accordion.Panel>Content</Accordion.Panel>
     </Accordion.Item>
   </Accordion.Root>

   // Multiple panels open
   ...
```

```
→ get_component_example({ name: "Accordion", variant: "disabled" })

← // Disabled accordion item
   ...
```

Use this when the agent needs a code reference to start from. The composition blueprints in `resolve_intent` are similar but shorter — examples here are more complete.
