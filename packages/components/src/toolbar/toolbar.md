# Toolbar

A container for grouping action buttons, links, and toggle controls with shared keyboard navigation. Implements the WAI-ARIA toolbar pattern: `role="toolbar"`, `aria-orientation`, and roving tabindex (one Tab stop, arrow keys move focus between items). Built on [Base UI Toolbar](https://base-ui.com/react/components/toolbar).

## Anatomy

```tsx
<Toolbar.Root>
  <Toolbar.Button />
  <Toolbar.Link />
  <Toolbar.Separator />
  <Toolbar.Group>
    <Toolbar.Button />
  </Toolbar.Group>
  <Toolbar.ToggleGroup>
    <Toolbar.ToggleItem />
  </Toolbar.ToggleGroup>
</Toolbar.Root>
```

- **Root** -- The toolbar container, renders `role="toolbar"`.
- **Button** -- A focusable action button.
- **Link** -- A focusable anchor.
- **Group** -- Visually groups related items (`role="group"`).
- **Separator** -- An accessible separator between items.
- **ToggleGroup** -- Groups `ToggleItem` buttons sharing pressed state.
- **ToggleItem** -- A two-state toggle button.

## Examples

### Basic action toolbar

```tsx
<Toolbar.Root>
  <Toolbar.Button>Save</Toolbar.Button>
  <Toolbar.Button>Undo</Toolbar.Button>
  <Toolbar.Separator />
  <Toolbar.Button>Publish</Toolbar.Button>
</Toolbar.Root>
```

### Formatting toolbar with toggle items

```tsx
<Toolbar.Root>
  <Toolbar.ToggleGroup multiple defaultValue={['bold']}>
    <Toolbar.ToggleItem value="bold">B</Toolbar.ToggleItem>
    <Toolbar.ToggleItem value="italic">I</Toolbar.ToggleItem>
    <Toolbar.ToggleItem value="underline">U</Toolbar.ToggleItem>
  </Toolbar.ToggleGroup>
  <Toolbar.Separator />
  <Toolbar.Link href="#docs">Docs</Toolbar.Link>
</Toolbar.Root>
```

### Vertical toolbar

```tsx
<Toolbar.Root orientation="vertical">
  <Toolbar.Button>Select</Toolbar.Button>
  <Toolbar.Button>Move</Toolbar.Button>
  <Toolbar.Separator />
  <Toolbar.Button>Delete</Toolbar.Button>
</Toolbar.Root>
```

## Keyboard

| Key                        | Behavior                                                  |
| -------------------------- | --------------------------------------------------------- |
| `Tab`                      | Moves focus into / out of the toolbar (single tab stop).  |
| `ArrowRight` / `ArrowLeft` | Moves focus between items (horizontal). RTL inverts axis. |
| `ArrowDown` / `ArrowUp`    | Moves focus between items (vertical).                     |
| `Home` / `End`             | Moves focus to the first / last item.                     |

## API Reference

### Toolbar.Root

| Prop          | Type                         | Default        | Description                                                               |
| ------------- | ---------------------------- | -------------- | ------------------------------------------------------------------------- |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Orientation of the toolbar. Drives `aria-orientation` and arrow-key axis. |
| `disabled`    | `boolean`                    | `false`        | Whether the entire toolbar is disabled.                                   |
| `loopFocus`   | `boolean`                    | `true`         | Whether arrow-key navigation wraps around.                                |
| `sx`          | `StyleXStyles`               | --             | StyleX styles for consumer overrides.                                     |

### Toolbar.Button

| Prop                    | Type           | Default | Description                                            |
| ----------------------- | -------------- | ------- | ------------------------------------------------------ |
| `disabled`              | `boolean`      | `false` | Whether the button is disabled.                        |
| `focusableWhenDisabled` | `boolean`      | `true`  | Whether a disabled button is still keyboard-focusable. |
| `sx`                    | `StyleXStyles` | --      | StyleX styles for consumer overrides.                  |

### Toolbar.Link

| Prop | Type           | Description                           |
| ---- | -------------- | ------------------------------------- |
| `sx` | `StyleXStyles` | StyleX styles for consumer overrides. |

### Toolbar.Group

| Prop       | Type           | Default | Description                           |
| ---------- | -------------- | ------- | ------------------------------------- |
| `disabled` | `boolean`      | `false` | Disables every item inside the group. |
| `sx`       | `StyleXStyles` | --      | StyleX styles for consumer overrides. |

### Toolbar.Separator

| Prop | Type           | Description                           |
| ---- | -------------- | ------------------------------------- |
| `sx` | `StyleXStyles` | StyleX styles for consumer overrides. |

### Toolbar.ToggleGroup

| Prop            | Type                                 | Default | Description                                                |
| --------------- | ------------------------------------ | ------- | ---------------------------------------------------------- |
| `value`         | `readonly string[]`                  | --      | Controlled list of pressed item values.                    |
| `defaultValue`  | `readonly string[]`                  | --      | Uncontrolled initial pressed values.                       |
| `onValueChange` | `(value: string[], details) => void` | --      | Fired when the pressed set changes.                        |
| `multiple`      | `boolean`                            | `false` | When `true`, multiple items can be pressed simultaneously. |
| `disabled`      | `boolean`                            | `false` | Disables every item in the group.                          |
| `sx`            | `StyleXStyles`                       | --      | StyleX styles for consumer overrides.                      |

### Toolbar.ToggleItem

| Prop             | Type           | Default | Description                                        |
| ---------------- | -------------- | ------- | -------------------------------------------------- |
| `value`          | `string`       | --      | **Required.** Identifier used by the parent group. |
| `pressed`        | `boolean`      | --      | Controlled pressed state.                          |
| `defaultPressed` | `boolean`      | `false` | Uncontrolled initial pressed state.                |
| `disabled`       | `boolean`      | `false` | Whether the toggle is disabled.                    |
| `sx`             | `StyleXStyles` | --      | StyleX styles for consumer overrides.              |

## When to Use

- A row (or column) of action buttons in an editor, canvas, or app header
- Formatting controls (bold/italic/underline) using `ToggleGroup` with `multiple`
- Mutually-exclusive controls (text alignment) using `ToggleGroup` without `multiple`
- Tool palettes — set `orientation="vertical"`

## When NOT to Use

- **Bar of dropdown menus** -- use Menubar
- **Site-wide top navigation** -- use NavigationMenu
- **A single toggle button** -- use Button with `aria-pressed`
