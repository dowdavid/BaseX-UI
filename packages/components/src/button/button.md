# Button

A styled button component for triggering actions. Built on [Base UI Button](https://base-ui.com/react/components/button) with StyleX styling.

## Import

```tsx
import { Button } from '@basex-ui/components/button';
```

## Anatomy

```tsx
<Button />
```

## Examples

### Basic

```tsx
<Button>Click me</Button>
```

### Variants

```tsx
<Button variant="solid">Solid</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
```

### Destructive

```tsx
<Button variant="solid" color="destructive">Delete</Button>
<Button variant="outline" color="destructive">Remove</Button>
```

### Sizes

```tsx
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
```

### With Style Overrides

```tsx
import * as stylex from '@stylexjs/stylex';

const overrides = stylex.create({
  wide: { paddingInline: '48px' },
});

<Button sx={overrides.wide}>Wide Button</Button>;
```

## Variant + Color Matrix

|               | `default`         | `secondary`         | `destructive`             |
| ------------- | ----------------- | ------------------- | ------------------------- |
| **`solid`**   | Filled primary bg | Filled secondary bg | Filled destructive bg     |
| **`outline`** | Border + text     | Border + text       | Destructive border + text |
| **`ghost`**   | Text only         | Text only           | Destructive text          |

## API Reference

### Root

The button element. Renders a `<button>` with StyleX styling and Base UI state management.

| Prop                    | Type                                        | Default     | Description                  |
| ----------------------- | ------------------------------------------- | ----------- | ---------------------------- |
| `variant`               | `'solid' \| 'outline' \| 'ghost'`           | `'solid'`   | Visual style                 |
| `color`                 | `'default' \| 'secondary' \| 'destructive'` | `'default'` | Color palette                |
| `size`                  | `'sm' \| 'md' \| 'lg'`                      | `'md'`      | Button size                  |
| `sx`                    | `StyleXStyles`                              | —           | Consumer style overrides     |
| `disabled`              | `boolean`                                   | `false`     | Disables the button          |
| `focusableWhenDisabled` | `boolean`                                   | `false`     | Keep focusable when disabled |

| Attribute       | Description                         |
| --------------- | ----------------------------------- |
| `data-disabled` | Present when the button is disabled |

## When to Use

- **Triggering an action** — form submission, saving data, confirming a dialog
- **Primary call-to-action** — the main action on a page or in a section
- **Destructive actions** — deleting, removing, or discarding with `color="destructive"`
- **Secondary actions** — less prominent actions with `variant="outline"` or `variant="ghost"`

## When NOT to Use

- **Navigation** — Use a link (`<a>`) or router Link component instead. Buttons trigger actions; links navigate.
- **Toggling state** — Use Toggle or Switch components which communicate on/off state to assistive technology.
- **Opening a menu** — Use Menu.Trigger which handles `aria-expanded`, `aria-haspopup`, and keyboard navigation.
- **Selecting options** — Use RadioGroup, ToggleGroup, or Select components.
