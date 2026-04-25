# Tabs

An accessible tab interface that organizes content into selectable panels. Built on [Base UI Tabs](https://base-ui.com/react/components/tabs).

## Anatomy

```tsx
<Tabs.Root>
  <Tabs.List>
    <Tabs.Tab value="a">Tab A</Tabs.Tab>
    <Tabs.Tab value="b">Tab B</Tabs.Tab>
    <Tabs.Indicator />
  </Tabs.List>
  <Tabs.Panel value="a">Panel A</Tabs.Panel>
  <Tabs.Panel value="b">Panel B</Tabs.Panel>
</Tabs.Root>
```

- **Root** -- Container providing state and orientation context.
- **List** -- The tab strip (`role="tablist"`).
- **Tab** -- An individual tab button (`role="tab"`, with `aria-controls` / `aria-selected`).
- **Panel** -- The content panel for a tab (`role="tabpanel"`).
- **Indicator** -- An optional animated indicator that aligns to the active tab.

## Examples

### Basic

```tsx
<Tabs.Root defaultValue="overview">
  <Tabs.List>
    <Tabs.Tab value="overview">Overview</Tabs.Tab>
    <Tabs.Tab value="details">Details</Tabs.Tab>
    <Tabs.Tab value="activity">Activity</Tabs.Tab>
    <Tabs.Indicator />
  </Tabs.List>
  <Tabs.Panel value="overview">Overview content</Tabs.Panel>
  <Tabs.Panel value="details">Details content</Tabs.Panel>
  <Tabs.Panel value="activity">Activity content</Tabs.Panel>
</Tabs.Root>
```

### Vertical

```tsx
<Tabs.Root orientation="vertical" defaultValue="profile">
  <Tabs.List>
    <Tabs.Tab value="profile">Profile</Tabs.Tab>
    <Tabs.Tab value="account">Account</Tabs.Tab>
    <Tabs.Indicator />
  </Tabs.List>
  <Tabs.Panel value="profile">Profile fields</Tabs.Panel>
  <Tabs.Panel value="account">Account fields</Tabs.Panel>
</Tabs.Root>
```

### Manual activation

```tsx
<Tabs.Root defaultValue="a">
  <Tabs.List activationMode="manual">
    <Tabs.Tab value="a">A</Tabs.Tab>
    <Tabs.Tab value="b">B</Tabs.Tab>
    <Tabs.Indicator />
  </Tabs.List>
  <Tabs.Panel value="a">A</Tabs.Panel>
  <Tabs.Panel value="b">B</Tabs.Panel>
</Tabs.Root>
```

### With form content

```tsx
<Tabs.Root defaultValue="step1">
  <Tabs.List activationMode="manual">
    <Tabs.Tab value="step1">Profile</Tabs.Tab>
    <Tabs.Tab value="step2">Address</Tabs.Tab>
    <Tabs.Indicator />
  </Tabs.List>
  <Tabs.Panel value="step1">
    <Field.Root>
      <Field.Label>Name</Field.Label>
      <Field.Control />
    </Field.Root>
  </Tabs.Panel>
  <Tabs.Panel value="step2">
    <Field.Root>
      <Field.Label>City</Field.Label>
      <Field.Control />
    </Field.Root>
  </Tabs.Panel>
</Tabs.Root>
```

## Keyboard

| Key                        | Behavior                                                           |
| -------------------------- | ------------------------------------------------------------------ |
| `Tab`                      | Move focus into the tab list.                                      |
| `ArrowLeft` / `ArrowRight` | Move focus between tabs (horizontal). RTL-safe.                    |
| `ArrowUp` / `ArrowDown`    | Move focus between tabs (vertical).                                |
| `Home` / `End`             | Move focus to the first/last tab.                                  |
| `Enter` / `Space`          | Activate the focused tab (required only with `manual` activation). |

With `activationMode="automatic"` (default) tabs activate on focus. With `activationMode="manual"`, focus and activation are decoupled — preferred when panels contain forms.

## Reduced motion

The indicator transitions are wired through standard CSS transitions; consumers can opt their app into `prefers-reduced-motion` overrides via the global stylesheet:

```css
@media (prefers-reduced-motion: reduce) {
  .basex-tabs-indicator {
    transition-duration: 0ms !important;
  }
}
```

## API Reference

### Tabs.Root

| Prop            | Type                            | Default        | Description                              |
| --------------- | ------------------------------- | -------------- | ---------------------------------------- |
| `value`         | `string \| number \| null`      | --             | The active tab value (controlled).       |
| `defaultValue`  | `string \| number \| null`      | `0`            | The initially active tab (uncontrolled). |
| `onValueChange` | `(value, eventDetails) => void` | --             | Callback when the active tab changes.    |
| `orientation`   | `'horizontal' \| 'vertical'`    | `'horizontal'` | Layout flow direction.                   |
| `sx`            | `StyleXStyles`                  | --             | StyleX styles for consumer overrides.    |

### Tabs.List

| Prop             | Type                      | Default       | Description                                                          |
| ---------------- | ------------------------- | ------------- | -------------------------------------------------------------------- |
| `activationMode` | `'automatic' \| 'manual'` | `'automatic'` | Whether tabs activate on focus (`automatic`) or only on Enter/Space. |
| `loopFocus`      | `boolean`                 | `true`        | Whether arrow-key focus loops at the ends of the list.               |
| `sx`             | `StyleXStyles`            | --            | StyleX styles for consumer overrides.                                |

### Tabs.Tab

| Prop       | Type               | Default | Description                           |
| ---------- | ------------------ | ------- | ------------------------------------- |
| `value`    | `string \| number` | --      | Required. Identifies this tab.        |
| `disabled` | `boolean`          | `false` | Whether the tab is disabled.          |
| `sx`       | `StyleXStyles`     | --      | StyleX styles for consumer overrides. |

#### Data attributes

| Attribute          | Description                       |
| ------------------ | --------------------------------- |
| `data-selected`    | Present when the tab is active.   |
| `data-disabled`    | Present when the tab is disabled. |
| `data-orientation` | Reflects the orientation.         |

### Tabs.Panel

| Prop          | Type               | Default | Description                                    |
| ------------- | ------------------ | ------- | ---------------------------------------------- |
| `value`       | `string \| number` | --      | Required. The tab value this panel belongs to. |
| `keepMounted` | `boolean`          | `false` | Keep the panel mounted in the DOM when hidden. |
| `sx`          | `StyleXStyles`     | --      | StyleX styles for consumer overrides.          |

### Tabs.Indicator

| Prop                    | Type           | Default | Description                                         |
| ----------------------- | -------------- | ------- | --------------------------------------------------- |
| `renderBeforeHydration` | `boolean`      | `false` | Render before React hydrates to reduce SSR flicker. |
| `sx`                    | `StyleXStyles` | --      | StyleX styles for consumer overrides.               |

#### CSS Variables

The Indicator reads positioning vars from Base UI:

| Variable              | Description                                       |
| --------------------- | ------------------------------------------------- |
| `--active-tab-left`   | Distance of active tab from the left of the list. |
| `--active-tab-top`    | Distance of active tab from the top of the list.  |
| `--active-tab-width`  | Width of the active tab.                          |
| `--active-tab-height` | Height of the active tab.                         |

## When to Use

- Switching between sibling content panels at the same level of hierarchy.
- Settings or preference sections grouped vertically.
- Surface-level views of an entity (Overview / Activity / Comments).

## When NOT to Use

- **Sequential steps that must be completed in order** -- use a stepper.
- **Site navigation between pages** -- use NavigationMenu.
- **Many sections or long labels** -- use Accordion or a sidebar.
