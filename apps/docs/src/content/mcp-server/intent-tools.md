Two tools connect the intelligence layer to agent workflows.

## resolve_intent

The core tool. Describe what you're building in plain English, get back a component recommendation with everything the agent needs to start generating code.

```
→ resolve_intent({ description: "confirm delete action" })

← {
    "recommendedComponent": "AlertDialog",
    "intent": "confirm-destructive-action",
    "reasoning": "AlertDialog is the correct component when a destructive or irreversible action requires explicit user confirmation before proceeding.",
    "composition": "<AlertDialog.Root>...",
    "confidence": 2,
    "import": "import { AlertDialog } from '@basex-ui/components';",
    "cssRequirements": "...",
    "requiredProps": [
      { "part": "Trigger", "prop": "render", "note": "..." }
    ]
  }
```

The response includes:

- **recommendedComponent** — The component name
- **intent** — Which specific intent matched (e.g., "confirm-destructive-action" vs "blocking-confirmation")
- **reasoning** — Why this component is the right choice
- **composition** — JSX blueprint showing correct structure
- **confidence** — Number of signal keyword matches (higher = stronger match)
- **import** — Exact import statement
- **cssRequirements** — Any global CSS needed (animations, etc.)
- **requiredProps** — Props the agent must include
- **warnings** — Anti-pattern warnings if any matched

If no intent matches, the tool returns a message suggesting the agent use `list_components` or be more specific. It never guesses.

## check_usage

Validates a component choice against 70 anti-pattern rules. Use this as a guardrail before generating code.

```
→ check_usage({ component: "Button", context: "navigate to settings" })

← {
    "warning": "Button may not be the right choice here.",
    "antiPatterns": [
      {
        "scenario": "Using Button for navigation or page linking",
        "reasoning": "Buttons trigger actions; links navigate. Using Button for navigation breaks semantics and accessibility.",
        "alternative": "Use an anchor tag or Link component for navigation. If it looks like a button, style the link."
      }
    ]
  }
```

When there are no warnings:

```
→ check_usage({ component: "AlertDialog", context: "confirm delete" })

← "No anti-pattern warnings for using AlertDialog in that context."
```

The agent should call `check_usage` whenever it has a component choice that didn't come from `resolve_intent` (which runs anti-pattern checking automatically). If the agent picked a component based on its own knowledge or from `search_components`, validate it here first.
