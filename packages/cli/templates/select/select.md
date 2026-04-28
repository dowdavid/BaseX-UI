# Select

A native-feeling single-value dropdown. Click the trigger, pick one option from the list. Keyboard typeahead, arrow/Home/End navigation, listbox ARIA, and trigger-aligned positioning.

## Anatomy

```
<Select.Root>
  <Select.Trigger>
    <Select.Value placeholder="Select..." />
    <Select.Icon />
  </Select.Trigger>
  <Select.Portal>
    <Select.Positioner>
      <Select.ScrollUpButton />
      <Select.Popup>
        <Select.Viewport>
          <Select.Group>
            <Select.GroupLabel>Group</Select.GroupLabel>
            <Select.Item value="a">
              <Select.ItemIndicator />
              <Select.ItemText>Option A</Select.ItemText>
            </Select.Item>
          </Select.Group>
          <Select.Separator />
        </Select.Viewport>
      </Select.Popup>
      <Select.ScrollDownButton />
    </Select.Positioner>
  </Select.Portal>
</Select.Root>
```

## Examples

### Basic

```tsx
<Select.Root>
  <Select.Trigger>
    <Select.Value placeholder="Pick a fruit" />
    <Select.Icon />
  </Select.Trigger>
  <Select.Portal>
    <Select.Positioner>
      <Select.Popup>
        <Select.Viewport>
          <Select.Item value="apple">
            <Select.ItemIndicator />
            <Select.ItemText>Apple</Select.ItemText>
          </Select.Item>
          <Select.Item value="banana">
            <Select.ItemIndicator />
            <Select.ItemText>Banana</Select.ItemText>
          </Select.Item>
        </Select.Viewport>
      </Select.Popup>
    </Select.Positioner>
  </Select.Portal>
</Select.Root>
```

### Controlled

```tsx
const [value, setValue] = useState<string | null>('apple');

<Select.Root value={value} onValueChange={setValue}>
  ...
</Select.Root>;
```

### Inside a Field

```tsx
<Field.Root name="role">
  <Field.Label>Role</Field.Label>
  <Select.Root name="role">
    <Select.Trigger>
      <Select.Value placeholder="Pick a role" />
      <Select.Icon />
    </Select.Trigger>
    <Select.Portal>
      <Select.Positioner>
        <Select.Popup>
          <Select.Viewport>
            <Select.Item value="admin">
              <Select.ItemIndicator />
              <Select.ItemText>Admin</Select.ItemText>
            </Select.Item>
          </Select.Viewport>
        </Select.Popup>
      </Select.Positioner>
    </Select.Portal>
  </Select.Root>
  <Field.Description>Determines access level.</Field.Description>
</Field.Root>
```

### Grouped with separators

```tsx
<Select.Root>
  <Select.Trigger>
    <Select.Value placeholder="Pick produce" />
    <Select.Icon />
  </Select.Trigger>
  <Select.Portal>
    <Select.Positioner>
      <Select.Popup>
        <Select.Viewport>
          <Select.Group>
            <Select.GroupLabel>Fruit</Select.GroupLabel>
            <Select.Item value="apple">
              <Select.ItemIndicator />
              <Select.ItemText>Apple</Select.ItemText>
            </Select.Item>
          </Select.Group>
          <Select.Separator />
          <Select.Group>
            <Select.GroupLabel>Vegetable</Select.GroupLabel>
            <Select.Item value="carrot">
              <Select.ItemIndicator />
              <Select.ItemText>Carrot</Select.ItemText>
            </Select.Item>
          </Select.Group>
        </Select.Viewport>
      </Select.Popup>
    </Select.Positioner>
  </Select.Portal>
</Select.Root>
```

### Long list with scroll buttons

```tsx
<Select.Root>
  <Select.Trigger>
    <Select.Value placeholder="Pick a country" />
    <Select.Icon />
  </Select.Trigger>
  <Select.Portal>
    <Select.Positioner>
      <Select.ScrollUpButton />
      <Select.Popup>
        <Select.Viewport>
          {countries.map((c) => (
            <Select.Item key={c} value={c}>
              <Select.ItemIndicator />
              <Select.ItemText>{c}</Select.ItemText>
            </Select.Item>
          ))}
        </Select.Viewport>
      </Select.Popup>
      <Select.ScrollDownButton />
    </Select.Positioner>
  </Select.Portal>
</Select.Root>
```

## CSS Requirements

Add to your global stylesheet inside `@layer priority1`:

```css
@layer priority1 {
  .basex-select-popup {
    opacity: 1;
    transform: translateY(0);
    transition:
      opacity 150ms ease-out,
      transform 150ms ease-out;
  }
  .basex-select-popup[data-starting-style],
  .basex-select-popup[data-ending-style] {
    opacity: 0;
    transform: translateY(-4px);
  }
  @media (prefers-reduced-motion: reduce) {
    .basex-select-popup,
    .basex-select-popup[data-starting-style],
    .basex-select-popup[data-ending-style] {
      transition: none;
      transform: none;
    }
  }
}
```

## API Reference

### Root

| Prop                | Type                                              | Default | Description                                            |
| ------------------- | ------------------------------------------------- | ------- | ------------------------------------------------------ |
| `value`             | `Value \| null`                                   | —       | Controlled selected value.                             |
| `defaultValue`      | `Value \| null`                                   | —       | Initial selected value (uncontrolled).                 |
| `onValueChange`     | `(value, details) => void`                        | —       | Fires when the selection changes.                      |
| `open`              | `boolean`                                         | —       | Controlled open state.                                 |
| `defaultOpen`       | `boolean`                                         | `false` | Initial open state.                                    |
| `onOpenChange`      | `(open, details) => void`                         | —       | Fires when the popup opens/closes.                     |
| `name`              | `string`                                          | —       | Form field name. Renders a hidden input.               |
| `required`          | `boolean`                                         | `false` | Mark required for native form validation.              |
| `disabled`          | `boolean`                                         | `false` | Disable the entire select.                             |
| `readOnly`          | `boolean`                                         | `false` | Prevent value changes.                                 |
| `modal`             | `boolean`                                         | `true`  | Lock scroll and disable outside pointer when open.     |
| `items`             | `Record<string, ReactNode> \| { label, value }[]` | —       | Optional item map for `<Select.Value>` label lookup.   |
| `itemToStringLabel` | `(value) => string`                               | —       | Convert object values to a display string.             |
| `itemToStringValue` | `(value) => string`                               | —       | Convert object values to a string for form submission. |
| `size`              | `'sm' \| 'md' \| 'lg'`                            | `'md'`  | Trigger and item size. Matches Combobox sizes.         |

### Trigger

| Prop       | Type           | Default | Description       |
| ---------- | -------------- | ------- | ----------------- |
| `disabled` | `boolean`      | `false` | Disable trigger.  |
| `sx`       | `StyleXStyles` | —       | StyleX overrides. |

#### Data attributes

- `data-popup-open` — popup open
- `data-disabled` — trigger disabled
- `data-readonly` — readonly
- `data-placeholder` — no value selected

### Value

| Prop          | Type                   | Default | Description                          |
| ------------- | ---------------------- | ------- | ------------------------------------ |
| `placeholder` | `ReactNode`            | —       | Shown when no value is selected.     |
| `children`    | `(value) => ReactNode` | —       | Custom format for the trigger label. |
| `sx`          | `StyleXStyles`         | —       | StyleX overrides.                    |

### Icon

| Prop | Type           | Default | Description       |
| ---- | -------------- | ------- | ----------------- |
| `sx` | `StyleXStyles` | —       | StyleX overrides. |

Defaults to a Lucide ChevronDown icon scaled to the current size.

### Positioner

| Prop                   | Type           | Default | Description                                                  |
| ---------------------- | -------------- | ------- | ------------------------------------------------------------ |
| `alignItemWithTrigger` | `boolean`      | `true`  | Overlap the trigger so the selected item aligns. Mouse only. |
| `side` / `align`       | (Base UI)      | —       | Forwarded to Base UI positioning.                            |
| `sideOffset`           | `number`       | `6`     | Distance from anchor (pre-set).                              |
| `sx`                   | `StyleXStyles` | —       | StyleX overrides.                                            |

#### CSS variables (set on Positioner)

- `--anchor-width`, `--anchor-height`
- `--available-height`, `--available-width`
- `--transform-origin`

### Popup / Viewport

| Prop | Type           | Default | Description       |
| ---- | -------------- | ------- | ----------------- |
| `sx` | `StyleXStyles` | —       | StyleX overrides. |

`Viewport` is the scrollable list container (Base UI's `Select.List`).

#### Popup data attributes

- `data-open` / `data-closed`
- `data-starting-style` / `data-ending-style`
- `data-side`

### Item

| Prop       | Type           | Default | Description                                          |
| ---------- | -------------- | ------- | ---------------------------------------------------- |
| `value`    | `any`          | —       | Required. The selectable value.                      |
| `label`    | `string`       | —       | Typeahead label override (defaults to text content). |
| `disabled` | `boolean`      | `false` | Disable this item.                                   |
| `sx`       | `StyleXStyles` | —       | StyleX overrides.                                    |

#### Data attributes

- `data-highlighted`, `data-selected`, `data-disabled`

### ItemText / ItemIndicator / Group / GroupLabel / Separator

All accept `sx?: StyleXStyles`. `ItemIndicator` defaults to a Lucide Check icon and is `keepMounted` so its space is reserved.

### ScrollUpButton / ScrollDownButton

| Prop | Type           | Default | Description       |
| ---- | -------------- | ------- | ----------------- |
| `sx` | `StyleXStyles` | —       | StyleX overrides. |

Hover regions inside the popup that auto-scroll the viewport when content overflows. Hidden on touch input.

## When to Use

- A short or medium list of mutually exclusive options inside a form.
- The user knows what they want; no need to filter by typing arbitrary text.

## When NOT to Use

- Long, searchable option lists → use `Combobox`.
- Free-form input with suggestions → use `Autocomplete`.
- Multi-select → use `Combobox` with `multiple` or `CheckboxGroup`.
- Two or three visible-at-a-glance options → use `Radio` or `ToggleGroup`.
