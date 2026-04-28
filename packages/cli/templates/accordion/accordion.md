# Accordion

A set of collapsible panels with headings for progressive content disclosure. Built on [Base UI Accordion](https://base-ui.com/react/components/accordion) with StyleX styling.

## Import

```tsx
import { Accordion } from '@basex-ui/components/accordion';
```

## Anatomy

```tsx
<Accordion.Root>
  <Accordion.Item>
    <Accordion.Header>
      <Accordion.Trigger />
    </Accordion.Header>
    <Accordion.Panel />
  </Accordion.Item>
</Accordion.Root>
```

## Examples

### Basic

```tsx
<Accordion.Root>
  <Accordion.Item value="item-1">
    <Accordion.Header>
      <Accordion.Trigger>Section 1</Accordion.Trigger>
    </Accordion.Header>
    <Accordion.Panel>Content for section 1</Accordion.Panel>
  </Accordion.Item>
  <Accordion.Item value="item-2">
    <Accordion.Header>
      <Accordion.Trigger>Section 2</Accordion.Trigger>
    </Accordion.Header>
    <Accordion.Panel>Content for section 2</Accordion.Panel>
  </Accordion.Item>
</Accordion.Root>
```

### Multiple Open

```tsx
<Accordion.Root multiple>
  <Accordion.Item value="item-1">
    <Accordion.Header>
      <Accordion.Trigger>Section 1</Accordion.Trigger>
    </Accordion.Header>
    <Accordion.Panel>Content for section 1</Accordion.Panel>
  </Accordion.Item>
  <Accordion.Item value="item-2">
    <Accordion.Header>
      <Accordion.Trigger>Section 2</Accordion.Trigger>
    </Accordion.Header>
    <Accordion.Panel>Content for section 2</Accordion.Panel>
  </Accordion.Item>
</Accordion.Root>
```

### Default Expanded

```tsx
<Accordion.Root defaultValue={['item-1']}>
  <Accordion.Item value="item-1">
    <Accordion.Header>
      <Accordion.Trigger>Open by default</Accordion.Trigger>
    </Accordion.Header>
    <Accordion.Panel>This panel starts open</Accordion.Panel>
  </Accordion.Item>
</Accordion.Root>
```

### With Style Overrides

```tsx
import * as stylex from '@stylexjs/stylex';

const overrides = stylex.create({
  outlined: {
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'var(--colorBorder)',
    borderRadius: '0',
  },
});

<Accordion.Root>
  <Accordion.Item value="item-1" sx={overrides.outlined}>
    <Accordion.Header>
      <Accordion.Trigger>Custom styled</Accordion.Trigger>
    </Accordion.Header>
    <Accordion.Panel>Overridden with sx prop</Accordion.Panel>
  </Accordion.Item>
</Accordion.Root>;
```

## CSS Requirements

Panel height animation requires global CSS rules inside `@layer priority1`. StyleX cannot target `[data-starting-style]` / `[data-ending-style]` data attributes, so these rules must live in the consumer's global stylesheet.

```css
@layer priority1 {
  .basex-accordion-panel {
    height: var(--accordion-panel-height);
    overflow: hidden;
    transition: height 200ms cubic-bezier(0.4, 0, 0.2, 1);
  }
  .basex-accordion-panel[data-starting-style],
  .basex-accordion-panel[data-ending-style] {
    height: 0;
  }
}
```

## API Reference

### Root

Groups all accordion items. Renders a `<div>`.

| Prop            | Type                     | Default | Description                               |
| --------------- | ------------------------ | ------- | ----------------------------------------- |
| `multiple`      | `boolean`                | `false` | Allow multiple panels open simultaneously |
| `disabled`      | `boolean`                | `false` | Disable all items                         |
| `value`         | `any[]`                  | —       | Controlled expanded items                 |
| `defaultValue`  | `any[]`                  | —       | Initial expanded items                    |
| `onValueChange` | `(value: any[]) => void` | —       | Expansion change callback                 |
| `sx`            | `StyleXStyles`           | —       | Style overrides                           |

| Attribute       | Description                            |
| --------------- | -------------------------------------- |
| `data-disabled` | Present when the accordion is disabled |

### Item

Groups a header with its collapsible panel. Renders a `<div>`.

| Prop       | Type           | Default      | Description                        |
| ---------- | -------------- | ------------ | ---------------------------------- |
| `value`    | `any`          | **required** | Unique value identifying this item |
| `disabled` | `boolean`      | `false`      | Disable this item                  |
| `sx`       | `StyleXStyles` | —            | Style overrides                    |

| Attribute       | Description                        |
| --------------- | ---------------------------------- |
| `data-open`     | Present when the panel is expanded |
| `data-disabled` | Present when the item is disabled  |
| `data-index`    | Position number of the item        |

### Header

Heading wrapper for accessibility. Renders an `<h3>`.

| Prop | Type           | Default | Description     |
| ---- | -------------- | ------- | --------------- |
| `sx` | `StyleXStyles` | —       | Style overrides |

| Attribute       | Description                                      |
| --------------- | ------------------------------------------------ |
| `data-open`     | Present when the parent item's panel is expanded |
| `data-disabled` | Present when the parent item is disabled         |

### Trigger

Button that toggles the panel. Includes a built-in chevron icon that rotates on open. Renders a `<button>`.

| Prop | Type           | Default | Description     |
| ---- | -------------- | ------- | --------------- |
| `sx` | `StyleXStyles` | —       | Style overrides |

| Attribute       | Description                                      |
| --------------- | ------------------------------------------------ |
| `data-open`     | Present when the parent item's panel is expanded |
| `data-disabled` | Present when the parent item is disabled         |

### Panel

Collapsible content area with animated height transition. Renders a `<div>`. Uses `keepMounted` internally for smooth close animation.

| Prop          | Type           | Default | Description                                      |
| ------------- | -------------- | ------- | ------------------------------------------------ |
| `keepMounted` | `boolean`      | `true`  | Keep element in DOM while closed (for animation) |
| `sx`          | `StyleXStyles` | —       | Style overrides                                  |

| Attribute             | Description                                |
| --------------------- | ------------------------------------------ |
| `data-open`           | Present when the panel is expanded         |
| `data-starting-style` | Present when the panel is animating open   |
| `data-ending-style`   | Present when the panel is animating closed |

| CSS Variable               | Description                                |
| -------------------------- | ------------------------------------------ |
| `--accordion-panel-height` | The panel's content height, set by Base UI |

## When to Use

- **Collapsible sections** — organizing long content into expandable groups (settings, sidebars)
- **FAQ lists** — question/answer pairs where only one is visible at a time
- **Progressive disclosure** — hiding details until the user explicitly requests them

## When NOT to Use

- **Switching between views** — Use Tabs instead. Accordion reveals content in place; Tabs switch between distinct panels.
- **Single collapsible section** — Use Collapsible directly. Accordion is for groups of related sections.
- **Step-by-step wizard** — Accordion doesn't communicate sequential progress. Build a dedicated stepper.
