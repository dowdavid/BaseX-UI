# ToggleGroup

A group of two-state toggle buttons. Supports single-select (radiogroup semantics) and multi-select (group semantics) modes with roving tabindex keyboard navigation.

Built on [Base UI ToggleGroup](https://base-ui.com/react/components/toggle-group) and [Toggle](https://base-ui.com/react/components/toggle).

> **Note**: ToggleGroup currently implements its `Item` inline. Once the standalone `Toggle` package lands, `Item` will be refactored to import that primitive so the two share a contract.

## Anatomy

```tsx
<ToggleGroup.Root type="single" defaultValue="a">
  <ToggleGroup.Item value="a">A</ToggleGroup.Item>
  <ToggleGroup.Item value="b">B</ToggleGroup.Item>
  <ToggleGroup.Item value="c">C</ToggleGroup.Item>
</ToggleGroup.Root>
```

- **Root** -- Container managing pressed state. Exposes `role="radiogroup"` in single mode and `role="group"` in multiple mode.
- **Item** -- An individual two-state toggle button.

## Single vs multiple

- `type="single"` (default) -- one or zero items pressed; `value` is `string | null`.
- `type="multiple"` -- any combination pressed; `value` is `string[]`.

The `onValueChange` signature matches the type:

```tsx
// single
onValueChange={(value: string | null) => ...}

// multiple
onValueChange={(value: string[]) => ...}
```

## Examples

### Single-select (segmented control)

```tsx
<ToggleGroup.Root type="single" defaultValue="list">
  <ToggleGroup.Item value="list">List</ToggleGroup.Item>
  <ToggleGroup.Item value="grid">Grid</ToggleGroup.Item>
  <ToggleGroup.Item value="board">Board</ToggleGroup.Item>
</ToggleGroup.Root>
```

### Multi-select (formatting toolbar)

```tsx
<ToggleGroup.Root type="multiple" defaultValue={['bold']}>
  <ToggleGroup.Item value="bold">B</ToggleGroup.Item>
  <ToggleGroup.Item value="italic">I</ToggleGroup.Item>
  <ToggleGroup.Item value="underline">U</ToggleGroup.Item>
</ToggleGroup.Root>
```

### Vertical orientation

```tsx
<ToggleGroup.Root type="single" orientation="vertical" defaultValue="a">
  <ToggleGroup.Item value="a">A</ToggleGroup.Item>
  <ToggleGroup.Item value="b">B</ToggleGroup.Item>
</ToggleGroup.Root>
```

### Controlled

```tsx
const [view, setView] = useState<string | null>('list');

<ToggleGroup.Root type="single" value={view} onValueChange={setView}>
  <ToggleGroup.Item value="list">List</ToggleGroup.Item>
  <ToggleGroup.Item value="grid">Grid</ToggleGroup.Item>
</ToggleGroup.Root>;
```

### With icons

```tsx
import { AlignLeft, AlignCenter, AlignRight } from 'lucide-react';

<ToggleGroup.Root type="single" defaultValue="left">
  <ToggleGroup.Item value="left" aria-label="Align left">
    <AlignLeft size={16} aria-hidden="true" />
  </ToggleGroup.Item>
  <ToggleGroup.Item value="center" aria-label="Align center">
    <AlignCenter size={16} aria-hidden="true" />
  </ToggleGroup.Item>
  <ToggleGroup.Item value="right" aria-label="Align right">
    <AlignRight size={16} aria-hidden="true" />
  </ToggleGroup.Item>
</ToggleGroup.Root>;
```

## Keyboard

| Key                        | Action                                                |
| -------------------------- | ----------------------------------------------------- |
| `Tab`                      | Moves focus into / out of the group (roving tabindex) |
| `ArrowRight` / `ArrowDown` | Moves focus to next item (matches orientation)        |
| `ArrowLeft` / `ArrowUp`    | Moves focus to previous item                          |
| `Home` / `End`             | Moves focus to first / last item                      |
| `Space` / `Enter`          | Toggles the focused item                              |

In RTL contexts (`dir="rtl"`), horizontal arrow keys are reversed automatically by Base UI.

## API Reference

### ToggleGroup.Root

| Prop            | Type                                                            | Default        | Description                                                  |
| --------------- | --------------------------------------------------------------- | -------------- | ------------------------------------------------------------ |
| `type`          | `'single' \| 'multiple'`                                        | `'single'`     | Selection mode.                                              |
| `value`         | `string \| null \| string[]`                                    | --             | Controlled pressed value.                                    |
| `defaultValue`  | `string \| null \| string[]`                                    | --             | Uncontrolled initial pressed value.                          |
| `onValueChange` | `(value: string \| null) => void` / `(value: string[]) => void` | --             | Callback when pressed value changes; signature matches type. |
| `orientation`   | `'horizontal' \| 'vertical'`                                    | `'horizontal'` | Layout and arrow-key direction.                              |
| `disabled`      | `boolean`                                                       | `false`        | Disables every item in the group.                            |
| `loopFocus`     | `boolean`                                                       | `true`         | Whether arrow-key focus wraps at the ends.                   |
| `sx`            | `StyleXStyles`                                                  | --             | StyleX overrides.                                            |

#### Data attributes (Root)

| Attribute          | Description                         |
| ------------------ | ----------------------------------- |
| `data-disabled`    | Present when the group is disabled. |
| `data-orientation` | `'horizontal'` or `'vertical'`.     |
| `data-multiple`    | Present when type is `'multiple'`.  |

### ToggleGroup.Item

| Prop       | Type           | Default | Description                                       |
| ---------- | -------------- | ------- | ------------------------------------------------- |
| `value`    | `string`       | --      | **Required.** Unique value identifying this item. |
| `disabled` | `boolean`      | `false` | Disables this item only.                          |
| `sx`       | `StyleXStyles` | --      | StyleX overrides.                                 |

#### Data attributes (Item)

| Attribute        | Description                       |
| ---------------- | --------------------------------- |
| `data-pressed`   | Present when the item is pressed. |
| `data-unpressed` | Present when not pressed.         |
| `data-disabled`  | Present when disabled.            |

## When to Use

- Mutually exclusive views (list / grid / board) -- use `type="single"`
- Formatting toolbars (bold / italic / underline) -- use `type="multiple"`
- Compact filter chip rows
- Alignment / orientation pickers

## When NOT to Use

- **Single on/off button** -- use `Toggle`
- **Tab-like switching with associated panels** -- use `Tabs`
- **Form-submitted single-choice value** -- use `Radio`
- **Form-submitted multi-choice value** -- use `CheckboxGroup`
