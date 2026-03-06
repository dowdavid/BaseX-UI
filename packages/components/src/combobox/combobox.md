# Combobox

A searchable select dropdown. Users must pick from a predefined list, with optional multi-select. Built on [Base UI Combobox](https://base-ui.com/react/components/combobox).

## Anatomy

```tsx
<Combobox.Root items={items}>
  <Combobox.Input placeholder="Select..." />
  <Combobox.Popup>
    <Combobox.Empty>No results.</Combobox.Empty>
    {(item) => (
      <Combobox.Item key={item.id} value={item}>
        <Combobox.ItemIndicator />
        {item.value}
      </Combobox.Item>
    )}
  </Combobox.Popup>
</Combobox.Root>
```

## Examples

### Basic

```tsx
const fruits = [
  { id: 1, value: 'Apple' },
  { id: 2, value: 'Banana' },
  { id: 3, value: 'Cherry' },
];

<Combobox.Root items={fruits}>
  <Combobox.Input placeholder="Select a fruit..." />
  <Combobox.Popup>
    <Combobox.Empty>No fruits found.</Combobox.Empty>
    {(fruit) => (
      <Combobox.Item key={fruit.id} value={fruit}>
        <Combobox.ItemIndicator />
        {fruit.value}
      </Combobox.Item>
    )}
  </Combobox.Popup>
</Combobox.Root>;
```

### Multi-select

In multi-select mode, selected items appear as removable pills inside the input area.

```tsx
<Combobox.Root items={fruits} multiple>
  <Combobox.Input placeholder="Select fruits..." />
  <Combobox.Popup>
    <Combobox.Empty>No results.</Combobox.Empty>
    {(fruit) => (
      <Combobox.Item key={fruit.id} value={fruit}>
        <Combobox.ItemIndicator />
        {fruit.value}
      </Combobox.Item>
    )}
  </Combobox.Popup>
</Combobox.Root>
```

### Grouped

```tsx
const produce = [
  {
    label: 'Fruits',
    items: [
      { id: 1, value: 'Apple' },
      { id: 2, value: 'Banana' },
    ],
  },
  {
    label: 'Vegetables',
    items: [
      { id: 3, value: 'Carrot' },
      { id: 4, value: 'Broccoli' },
    ],
  },
];

<Combobox.Root items={produce}>
  <Combobox.Input placeholder="Select produce..." />
  <Combobox.Popup>
    <Combobox.Empty>No results.</Combobox.Empty>
    {(group) => (
      <Combobox.Group key={group.label}>
        <Combobox.GroupLabel>{group.label}</Combobox.GroupLabel>
        {group.items.map((item) => (
          <Combobox.Item key={item.id} value={item}>
            <Combobox.ItemIndicator />
            {item.value}
          </Combobox.Item>
        ))}
      </Combobox.Group>
    )}
  </Combobox.Popup>
</Combobox.Root>;
```

### Sizes

```tsx
<Combobox.Root items={fruits} size="sm">...</Combobox.Root>
<Combobox.Root items={fruits} size="md">...</Combobox.Root>
<Combobox.Root items={fruits} size="lg">...</Combobox.Root>
```

## CSS Requirements

Popup animation and group separators require global CSS inside `@layer priority1`:

```css
@layer priority1 {
  .basex-combobox-popup {
    opacity: 1;
    transform: translateY(0);
    transition:
      opacity 150ms ease-out,
      transform 150ms ease-out;
  }
  .basex-combobox-popup[data-starting-style],
  .basex-combobox-popup[data-ending-style] {
    opacity: 0;
    transform: translateY(-4px);
  }
  .basex-combobox-group + .basex-combobox-group {
    border-top: 1px solid oklch(0.87 0 0 / 0.5);
    margin-top: 8px;
    padding-top: 8px;
  }
}
```

## API Reference

### Root

State container. No DOM element rendered.

| Prop                 | Type                            | Default                        | Description                             |
| -------------------- | ------------------------------- | ------------------------------ | --------------------------------------- |
| `items`              | `ItemValue[] \| Group[]`        | **required**                   | Items to display                        |
| `value`              | `Value \| Value[] \| null`      | —                              | Controlled selected value               |
| `defaultValue`       | `Value \| Value[] \| null`      | —                              | Initial value (uncontrolled)            |
| `onValueChange`      | `(value, details) => void`      | —                              | Selection change callback               |
| `multiple`           | `boolean`                       | `false`                        | Allow multiple selections               |
| `open`               | `boolean`                       | —                              | Controlled popup visibility             |
| `onOpenChange`       | `(open, details) => void`       | —                              | Popup open/close callback               |
| `onInputValueChange` | `(inputValue, details) => void` | —                              | Search input change callback            |
| `filter`             | `(itemValue, query) => boolean` | contains                       | Custom filter function                  |
| `autoHighlight`      | `boolean`                       | `false`                        | Auto-highlight first match              |
| `size`               | `'sm' \| 'md' \| 'lg'`          | `'md'`                         | Size of all parts                       |
| `getItemLabel`       | `(item) => string`              | `.label \| .value \| String()` | Convert item to display label for pills |
| `disabled`           | `boolean`                       | `false`                        | Disable all interactions                |

### Input

Main searchable input. In single-select mode, includes a chevron icon and clear button. In multi-select mode, renders a flex-wrap container with removable pills.

| Prop          | Type           | Default | Description                                                      |
| ------------- | -------------- | ------- | ---------------------------------------------------------------- |
| `placeholder` | `string`       | —       | Placeholder text (hidden when pills are present in multi-select) |
| `sx`          | `StyleXStyles` | —       | Consumer style overrides                                         |

### Popup

Dropdown panel (Portal + Positioner + List internalized).

| Prop | Type           | Default | Description              |
| ---- | -------------- | ------- | ------------------------ |
| `sx` | `StyleXStyles` | —       | Consumer style overrides |

### Item

A single selectable option.

| Prop       | Type           | Default      | Description              |
| ---------- | -------------- | ------------ | ------------------------ |
| `value`    | `any`          | **required** | Item value               |
| `disabled` | `boolean`      | `false`      | Disable this item        |
| `sx`       | `StyleXStyles` | —            | Consumer style overrides |

### ItemIndicator

Checkmark shown when item is selected. Always mounted to reserve space for consistent alignment.

| Prop | Type           | Default | Description              |
| ---- | -------------- | ------- | ------------------------ |
| `sx` | `StyleXStyles` | —       | Consumer style overrides |

### Clear

Button to reset selection. Built into Input by default; also available standalone.

| Prop | Type           | Default | Description              |
| ---- | -------------- | ------- | ------------------------ |
| `sx` | `StyleXStyles` | —       | Consumer style overrides |

### Empty

Shown when no items match the filter.

| Prop | Type           | Default | Description              |
| ---- | -------------- | ------- | ------------------------ |
| `sx` | `StyleXStyles` | —       | Consumer style overrides |

### Group

Groups related items. Adjacent groups get a separator border automatically via global CSS.

| Prop | Type           | Default | Description              |
| ---- | -------------- | ------- | ------------------------ |
| `sx` | `StyleXStyles` | —       | Consumer style overrides |

### GroupLabel

Heading for a group.

| Prop | Type           | Default | Description              |
| ---- | -------------- | ------- | ------------------------ |
| `sx` | `StyleXStyles` | —       | Consumer style overrides |
