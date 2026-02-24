# ComponentName

One-sentence description.

## Anatomy

```
<ComponentName.Root>
  <ComponentName.PartA />
  <ComponentName.PartB />
</ComponentName.Root>
```

## Examples

### Basic usage

```tsx
<ComponentName.Root>...</ComponentName.Root>
```

## CSS Requirements

> If the component has animated properties (height, transform, opacity) driven
> by Base UI data attributes, add the required global CSS here. Otherwise delete
> this section.

```css
@layer priority1 {
  .basex-componentname-part {
    /* animated properties here */
  }
}
```

## API Reference

### Root

| Prop | Type           | Default | Description      |
| ---- | -------------- | ------- | ---------------- |
| `sx` | `StyleXStyles` | —       | StyleX overrides |

#### Data attributes

| Attribute       | Description           |
| --------------- | --------------------- |
| `data-disabled` | Present when disabled |

## When to Use

- Use case 1
- Use case 2

## When NOT to Use

- Misuse scenario — use AlternativeComponent instead
