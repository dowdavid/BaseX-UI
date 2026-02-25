# Autocomplete

A text input with a filterable suggestion dropdown. Input-only style with a built-in clear button that appears when the input has text.

## Anatomy

```
<Autocomplete.Root items={items}>
  <Autocomplete.Input />
  <Autocomplete.Popup>
    <Autocomplete.Empty />
    <Autocomplete.Item />
  </Autocomplete.Popup>
</Autocomplete.Root>
```

## Examples

### Basic search

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
</Autocomplete.Root>
```

### Grouped suggestions

```tsx
const produce = [
  { label: 'Fruits', items: [{ id: 1, value: 'Apple' }, { id: 2, value: 'Banana' }] },
  { label: 'Vegetables', items: [{ id: 3, value: 'Carrot' }, { id: 4, value: 'Broccoli' }] },
];

<Autocomplete.Root items={produce}>
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

### Auto-highlight first match

```tsx
<Autocomplete.Root items={items} autoHighlight>
  <Autocomplete.Input placeholder="Start typing..." />
  <Autocomplete.Popup>
    <Autocomplete.Empty>No results.</Autocomplete.Empty>
    {(item) => (
      <Autocomplete.Item key={item.id} value={item}>
        {item.value}
      </Autocomplete.Item>
    )}
  </Autocomplete.Popup>
</Autocomplete.Root>
```

### Small size

```tsx
<Autocomplete.Root items={items} size="sm">
  <Autocomplete.Input placeholder="Search..." />
  <Autocomplete.Popup>
    <Autocomplete.Empty>No results.</Autocomplete.Empty>
    {(item) => (
      <Autocomplete.Item key={item.id} value={item}>
        {item.value}
      </Autocomplete.Item>
    )}
  </Autocomplete.Popup>
</Autocomplete.Root>
```

### Start addon (search icon)

```tsx
<Autocomplete.Root items={items}>
  <Autocomplete.Input startAddon={<SearchIcon />} placeholder="Search..." />
  <Autocomplete.Popup>
    <Autocomplete.Empty>No results.</Autocomplete.Empty>
    {(item) => (
      <Autocomplete.Item key={item.id} value={item}>
        {item.value}
      </Autocomplete.Item>
    )}
  </Autocomplete.Popup>
</Autocomplete.Root>
```

### Async search

```tsx
function AsyncSearch() {
  const [results, setResults] = React.useState([]);

  async function handleValueChange(value: string) {
    const response = await fetch(`/api/search?q=${value}`);
    setResults(await response.json());
  }

  return (
    <Autocomplete.Root
      items={results}
      filteredItems={results}
      onValueChange={handleValueChange}
    >
      <Autocomplete.Input placeholder="Search..." />
      <Autocomplete.Popup>
        <Autocomplete.Empty>No results.</Autocomplete.Empty>
        {(item) => (
          <Autocomplete.Item key={item.id} value={item}>
            {item.label}
          </Autocomplete.Item>
        )}
      </Autocomplete.Popup>
    </Autocomplete.Root>
  );
}
```

## CSS Requirements

Popup fade and slide animation requires global CSS inside `@layer priority1`:

```css
@layer priority1 {
  .basex-autocomplete-popup {
    opacity: 1;
    transform: translateY(0);
    transition: opacity 150ms ease-out, transform 150ms ease-out;
  }
  .basex-autocomplete-popup[data-starting-style],
  .basex-autocomplete-popup[data-ending-style] {
    opacity: 0;
    transform: translateY(-4px);
  }
}
```

## API Reference

### Root

| Prop              | Type                                                     | Default  | Description                                      |
| ----------------- | -------------------------------------------------------- | -------- | ------------------------------------------------ |
| `items`           | `ItemValue[] \| Group[]`                                 | —        | Items or grouped items to display                |
| `value`           | `string`                                                 | —        | Controlled input value                           |
| `defaultValue`    | `string`                                                 | —        | Initial input value for uncontrolled mode        |
| `onValueChange`   | `(value: string, details: ChangeEventDetails) => void`   | —        | Callback when input value changes                |
| `open`            | `boolean`                                                | —        | Controlled popup visibility                      |
| `defaultOpen`     | `boolean`                                                | `false`  | Initial popup state                              |
| `onOpenChange`    | `(open: boolean, details: ChangeEventDetails) => void`   | —        | Callback when popup opens or closes              |
| `mode`            | `'list' \| 'both' \| 'inline' \| 'none'`                | `'list'` | Filtering and inline autocompletion behavior     |
| `filter`          | `(itemValue, query, itemToString?) => boolean`           | —        | Custom filter function                           |
| `filteredItems`   | `any[] \| Group[]`                                       | —        | Externally filtered items (for async search)     |
| `autoHighlight`   | `boolean \| 'always'`                                    | `false`  | Auto-highlight first matching item               |
| `limit`           | `number`                                                 | `-1`     | Max visible items (-1 unlimited)                 |
| `disabled`        | `boolean`                                                | `false`  | Disable all interactions                         |
| `name`            | `string`                                                 | —        | Form field name                                  |
| `size`            | `'sm' \| 'md' \| 'lg'`                                  | `'md'`   | Size of input and dropdown (sm=32, md=36, lg=40px) |

### Input

| Prop          | Type           | Default | Description                                    |
| ------------- | -------------- | ------- | ---------------------------------------------- |
| `placeholder` | `string`       | —       | Placeholder text                               |
| `startAddon`  | `ReactNode`    | —       | Icon or element at the start of the input      |
| `sx`          | `StyleXStyles` | —       | StyleX overrides                               |

#### Data attributes

| Attribute         | Description                             |
| ----------------- | --------------------------------------- |
| `data-popup-open` | Present when suggestion popup is open   |
| `data-disabled`   | Present when input is disabled          |
| `data-readonly`   | Present when input is read-only         |
| `data-required`   | Present when input is required          |
| `data-focused`    | Present when input is focused           |
| `data-filled`     | Present when input has a value          |

### Popup

| Prop | Type           | Default | Description      |
| ---- | -------------- | ------- | ---------------- |
| `sx` | `StyleXStyles` | —       | StyleX overrides |

#### Data attributes

| Attribute             | Description                            |
| --------------------- | -------------------------------------- |
| `data-open`           | Present when the popup is open         |
| `data-closed`         | Present when the popup is closed       |
| `data-starting-style` | Present during entrance animation      |
| `data-ending-style`   | Present during exit animation          |
| `data-side`           | Positioned side (top/bottom/left/right)|
| `data-empty`          | Present when no items match            |

#### CSS variables

| Variable             | Description                          |
| -------------------- | ------------------------------------ |
| `--anchor-width`     | Width of the input element           |
| `--anchor-height`    | Height of the input element          |
| `--available-height` | Available height for the popup       |
| `--available-width`  | Available width for the popup        |
| `--transform-origin` | Computed transform origin            |

### Item

| Prop       | Type           | Default | Description      |
| ---------- | -------------- | ------- | ---------------- |
| `value`    | `any`          | —       | Item value       |
| `disabled` | `boolean`      | `false` | Disable item     |
| `sx`       | `StyleXStyles` | —       | StyleX overrides |

#### Data attributes

| Attribute          | Description                               |
| ------------------ | ----------------------------------------- |
| `data-highlighted` | Present when item has keyboard/pointer focus |
| `data-selected`    | Present when item matches input value     |
| `data-disabled`    | Present when item is disabled             |

### Empty

| Prop | Type           | Default | Description      |
| ---- | -------------- | ------- | ---------------- |
| `sx` | `StyleXStyles` | —       | StyleX overrides |

### Group

| Prop | Type           | Default | Description      |
| ---- | -------------- | ------- | ---------------- |
| `sx` | `StyleXStyles` | —       | StyleX overrides |

### GroupLabel

| Prop | Type           | Default | Description      |
| ---- | -------------- | ------- | ---------------- |
| `sx` | `StyleXStyles` | —       | StyleX overrides |

## When to Use

- Search inputs with filtered suggestions (search bars, tag search)
- Command palettes and quick-action menus
- Any text input where suggestions help but free-form text is allowed

## When NOT to Use

- User must select from a fixed set — use Select or Combobox instead
- Multiple selections needed (chips/tags) — use Combobox with `multiple`
- Simple text input without suggestions — use Input directly
