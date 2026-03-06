# Autocomplete — Component Design

## Overview

Autocomplete is a text input with a filterable suggestion dropdown. Built on `@base-ui/react/autocomplete` (which is a thin wrapper around Combobox with text-input semantics). Input-only style — no dropdown trigger button. Built-in clear button appears when input has text.

## Parts & Anatomy

```
<Autocomplete.Root items={items}>
  <Autocomplete.Input />
  <Autocomplete.Popup>
    <Autocomplete.Empty />
    <Autocomplete.Item />
    <Autocomplete.Group>
      <Autocomplete.GroupLabel />
      <Autocomplete.Item />
    </Autocomplete.Group>
  </Autocomplete.Popup>
</Autocomplete.Root>
```

- **Root**: No DOM — state container with filtering config
- **Input**: `<input>` — text input with built-in Clear button (appears when input has text)
- **Popup**: `<div>` — dropdown. Portal + Positioner + List internalized
- **Item**: `<div>` — each suggestion row
- **Empty**: `<div>` — shown when no items match the filter
- **Group**: `<div>` — groups related items
- **GroupLabel**: `<div>` — heading for a group

Internalized (consumer never sees):

- Portal, Positioner, List, Status, Clear

Skipped:

- Trigger, Icon, Arrow, Backdrop, Row, Collection, Separator, Value

## Design Decisions

1. **Input-only**: No dropdown trigger/chevron. Clean search-box style (Google/GitHub pattern).
2. **Clear built-in**: X button rendered inside Input automatically when there's text. Consumer doesn't compose it.
3. **Portal + Positioner + List internal**: Wrapped inside Popup. Consumer just puts Items inside Popup.
4. **Status internal**: Screen reader announcements rendered inside Root automatically.
5. **Size axis** (`sm | md | lg`): Aligns with Button's height scale (32/36/40px). Set on Root, cascades to Input, Items, Empty, and GroupLabel via context. Like Button, size is a fundamental layout axis — needed for inline pairing with other sized components.

## Visual Design

- **Input**: Bordered (`colorBorder`), `radiusMd`, `fontSizeSm`, focus ring. Clear button as subtle icon on the right.
- **Popup**: `colorSurface`, `radiusMd`, `shadowMd`, 1px border (`colorBorderMuted`), 4px gap below input. Max-height with overflow scroll.
- **Item**: Padded row, `fontSizeSm`, `colorText`. Highlighted: `colorMuted` background. Cursor pointer.
- **Empty**: Centered muted text, `fontSizeSm`, padding matches items.
- **GroupLabel**: `fontSizeXs`, `fontWeightMedium`, `colorTextMuted`, uppercase.

## Animation (Global CSS)

Popup fade + slide-down on open, fade + slide-up on close.

```css
@layer priority1 {
  .basex-autocomplete-popup {
    opacity: 1;
    transform: translateY(0);
    transition:
      opacity 150ms ease-out,
      transform 150ms ease-out;
  }
  .basex-autocomplete-popup[data-starting-style],
  .basex-autocomplete-popup[data-ending-style] {
    opacity: 0;
    transform: translateY(-4px);
  }
}
```

## Props

| Part       | Props                                                                                                                                                                             | Notes                                                 |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------- |
| Root       | `items`, `value`, `defaultValue`, `onValueChange`, `open`, `defaultOpen`, `onOpenChange`, `mode`, `filter`, `filteredItems`, `autoHighlight`, `limit`, `disabled`, `name`, `size` | Pass-through to Base UI + `size` cascades via context |
| Input      | `sx`, `placeholder`, `startAddon`                                                                                                                                                 | Wraps Base UI Input + Clear internally                |
| Popup      | `sx`                                                                                                                                                                              | Portal + Positioner + List internal                   |
| Item       | `sx`, `value`, `disabled`                                                                                                                                                         | Each suggestion row                                   |
| Empty      | `sx`                                                                                                                                                                              | No-results message                                    |
| Group      | `sx`                                                                                                                                                                              | Groups related items                                  |
| GroupLabel | `sx`                                                                                                                                                                              | Group heading                                         |

## Usage Examples

### Basic

```tsx
const fruits = [
  { id: 1, value: 'Apple' },
  { id: 2, value: 'Banana' },
  { id: 3, value: 'Cherry' },
];

<Autocomplete.Root items={fruits}>
  <Autocomplete.Input placeholder="Search fruits..." />
  <Autocomplete.Popup>
    <Autocomplete.Empty>No fruits found.</Autocomplete.Empty>
    {(fruit) => (
      <Autocomplete.Item key={fruit.id} value={fruit}>
        {fruit.value}
      </Autocomplete.Item>
    )}
  </Autocomplete.Popup>
</Autocomplete.Root>;
```

### Grouped

```tsx
<Autocomplete.Root items={groupedItems}>
  <Autocomplete.Input placeholder="Search produce..." />
  <Autocomplete.Popup>
    <Autocomplete.Empty>No results.</Autocomplete.Empty>
    {(group) => (
      <Autocomplete.Group key={group.label}>
        <Autocomplete.GroupLabel>{group.label}</Autocomplete.GroupLabel>
        {group.items.map((item) => (
          <Autocomplete.Item key={item.id} value={item}>
            {item.value}
          </Autocomplete.Item>
        ))}
      </Autocomplete.Group>
    )}
  </Autocomplete.Popup>
</Autocomplete.Root>
```

## Checklist Reference

Follow `docs/new-component-checklist.md` for all implementation steps.
