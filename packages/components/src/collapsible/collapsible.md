# Collapsible

A single collapsible section with a trigger button and an animated content panel. Built on [Base UI Collapsible](https://base-ui.com/react/components/collapsible) with StyleX styling.

## Import

```tsx
import { Collapsible } from '@basex-ui/components/collapsible';
```

## Anatomy

```tsx
<Collapsible.Root>
  <Collapsible.Trigger />
  <Collapsible.Panel />
</Collapsible.Root>
```

## Examples

### Basic

```tsx
<Collapsible.Root>
  <Collapsible.Trigger>Toggle content</Collapsible.Trigger>
  <Collapsible.Panel>
    This content can be expanded and collapsed by clicking the trigger above.
  </Collapsible.Panel>
</Collapsible.Root>
```

### Default Open

```tsx
<Collapsible.Root defaultOpen>
  <Collapsible.Trigger>Details (open)</Collapsible.Trigger>
  <Collapsible.Panel>
    This panel starts open and can be collapsed by clicking the trigger.
  </Collapsible.Panel>
</Collapsible.Root>
```

### Disabled

```tsx
<Collapsible.Root disabled>
  <Collapsible.Trigger>Cannot toggle</Collapsible.Trigger>
  <Collapsible.Panel>This panel cannot be opened or closed.</Collapsible.Panel>
</Collapsible.Root>
```

## CSS Requirements

Panel height animation requires global CSS rules inside `@layer priority1`. StyleX cannot target `[data-starting-style]` / `[data-ending-style]` data attributes, so these rules must live in the consumer's global stylesheet.

```css
@layer priority1 {
  .basex-collapsible-panel {
    height: var(--collapsible-panel-height);
    overflow: hidden;
    transition: height 200ms cubic-bezier(0.4, 0, 0.2, 1);
  }
  .basex-collapsible-panel[data-starting-style],
  .basex-collapsible-panel[data-ending-style] {
    height: 0;
  }
}
```

## API Reference

### Root

Container that manages open/closed state. Renders a `<div>`.

| Prop            | Type                       | Default | Description                    |
| --------------- | -------------------------- | ------- | ------------------------------ |
| `open`          | `boolean`                  | —       | Controlled open state          |
| `defaultOpen`   | `boolean`                  | `false` | Initial open state             |
| `onOpenChange`  | `(open: boolean) => void`  | —       | Open state change callback     |
| `disabled`      | `boolean`                  | `false` | Disable the collapsible        |
| `sx`            | `StyleXStyles`             | —       | Style overrides                |

| Attribute       | Description                              |
| --------------- | ---------------------------------------- |
| `data-disabled` | Present when the collapsible is disabled |

### Trigger

Button that toggles the panel. Includes a built-in chevron icon that rotates on open. Renders a `<button>`.

| Prop | Type           | Default | Description     |
| ---- | -------------- | ------- | --------------- |
| `sx` | `StyleXStyles` | —       | Style overrides |

| Attribute         | Description                           |
| ----------------- | ------------------------------------- |
| `data-panel-open` | Present when the panel is expanded    |
| `data-disabled`   | Present when the collapsible is disabled |

### Panel

Collapsible content area with animated height transition. Renders a `<div>`. Uses `keepMounted` internally for smooth close animation.

| Prop               | Type           | Default | Description                                        |
| ------------------ | -------------- | ------- | -------------------------------------------------- |
| `keepMounted`      | `boolean`      | `true`  | Keep element in DOM while closed (for animation)   |
| `hiddenUntilFound` | `boolean`      | `false` | Allow browser page search to find hidden content   |
| `sx`               | `StyleXStyles` | —       | Style overrides                                    |

| Attribute             | Description                                |
| --------------------- | ------------------------------------------ |
| `data-open`           | Present when the panel is expanded         |
| `data-starting-style` | Present when the panel is animating open   |
| `data-ending-style`   | Present when the panel is animating closed |

| CSS Variable                 | Description                                |
| ---------------------------- | ------------------------------------------ |
| `--collapsible-panel-height` | The panel's content height, set by Base UI |
| `--collapsible-panel-width`  | The panel's content width, set by Base UI  |

## When to Use

- **Single collapsible section** — a standalone toggle for showing/hiding content
- **Progressive disclosure** — hiding details until the user explicitly requests them
- **Expandable details** — additional information that doesn't need to be visible by default

## When NOT to Use

- **Multiple collapsible sections** — Use Accordion instead. Accordion manages a group of sections with keyboard navigation.
- **Switching between views** — Use Tabs instead. Collapsible reveals content in place; Tabs switch between distinct panels.
