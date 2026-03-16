`resolveIntent` takes a plain-English description of what you're building and returns the best matching component, why it's the right choice, and a composition blueprint showing how to structure it.

## Usage

```tsx
import { resolveIntent } from '@basex-ui/intelligence';

const result = resolveIntent('a FAQ section with expandable answers');
```

Returns:

```json
{
  "intent": {
    "intent": "faq-list",
    "component": "Accordion",
    "signals": ["FAQ", "questions", "answers", "help", "Q&A", "knowledge base"],
    "reasoning": "FAQ lists are a classic accordion pattern — each question is a trigger, each answer is a panel. Use single-open mode to keep focus.",
    "composition": "<Accordion.Root>..."
  },
  "score": 3,
  "warnings": []
}
```

## How scoring works

Each of the 61 intents has a set of signal keywords. The description is matched against every signal, and the intent with the most keyword hits wins.

```
Description: "confirm delete"
    │
    ▼
Button/trigger-action    signals: [button, click, submit, action, trigger, CTA]        → 0 hits
Button/destructive       signals: [delete, remove, destroy, danger, discard, erase]    → 1 hit
AlertDialog/confirm-dest signals: [confirm delete, are you sure, destructive confirm]  → 2 hits ✓
```

The scoring is intentionally simple. Signal keywords are handcrafted per intent, not ML-generated. This means the system is predictable — you can read the intents file and know exactly what will match.

## 61 intents across 24 components

Every component has between 1 and 5 intents covering its primary use cases:

| Component | Example intents |
|-----------|----------------|
| Button | trigger-action, confirm-action, cancel-action, destructive-action, secondary-action |
| Accordion | collapsible-sections, show-hide-content, faq-list |
| AlertDialog | confirm-destructive-action, blocking-confirmation, discard-unsaved-changes |
| Dialog | display-detail-overlay, modal-form, settings-panel |
| Drawer | mobile-navigation, side-panel, filter-panel |
| Input | text-input, search-input, url-input |
| Checkbox | toggle-option, agree-to-terms, multi-select-list |
| Radio | exclusive-selection, plan-picker, setting-choice |
| Menu | context-menu, action-menu, dropdown-menu |

## Composition blueprints

Every intent includes a `composition` field — a JSX snippet showing the recommended component structure. This is the template agents should start from.

```tsx
// Intent: confirm-destructive-action
<AlertDialog.Root>
  <AlertDialog.Trigger render={<Button variant="outline" color="destructive">Delete</Button>} />
  <AlertDialog.Portal>
    <AlertDialog.Backdrop />
    <AlertDialog.Popup>
      <AlertDialog.Title>Delete this item?</AlertDialog.Title>
      <AlertDialog.Description>This action cannot be undone.</AlertDialog.Description>
      <AlertDialog.Actions>
        <AlertDialog.Close render={<Button variant="ghost">Cancel</Button>} />
        <AlertDialog.Close render={<Button color="destructive">Delete</Button>} onClick={handleDelete} />
      </AlertDialog.Actions>
    </AlertDialog.Popup>
  </AlertDialog.Portal>
</AlertDialog.Root>
```

The composition isn't just an example. It's the correct structure for that intent, including the right variant, color, and nesting. Agents can use it directly.

## Confidence and fallbacks

The `score` field tells you how many signal keywords matched. Higher is better, but there's no absolute threshold. A score of 1 means a weak match — the agent should consider asking for clarification. A score of 3+ is a strong recommendation.

If no intents match at all, `resolveIntent` returns `null`. The agent should fall back to `list_components` or `search_components` instead of guessing.
