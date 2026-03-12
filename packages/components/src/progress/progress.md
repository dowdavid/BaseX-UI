# Progress

A progress bar showing determinate or indeterminate task completion. Built on [Base UI Progress](https://base-ui.com/react/components/progress).

## Anatomy

```tsx
<Progress.Root value={50}>
  <Progress.Label />
  <Progress.Value />
  <Progress.Track>
    <Progress.Indicator />
  </Progress.Track>
</Progress.Root>
```

- **Root** -- Container providing progress state (value, min, max) to child parts.
- **Label** -- An accessible label for the progress bar.
- **Value** -- Displays the formatted value.
- **Track** -- The background track.
- **Indicator** -- The filled portion proportional to the value.

## Examples

### Basic progress

```tsx
<Progress.Root value={65}>
  <Progress.Label>Upload</Progress.Label>
  <Progress.Track>
    <Progress.Indicator />
  </Progress.Track>
</Progress.Root>
```

### With value display

```tsx
<Progress.Root value={42}>
  <Progress.Label>Processing</Progress.Label>
  <Progress.Value />
  <Progress.Track>
    <Progress.Indicator />
  </Progress.Track>
</Progress.Root>
```

### Indeterminate

```tsx
<Progress.Root value={null}>
  <Progress.Label>Loading...</Progress.Label>
  <Progress.Track>
    <Progress.Indicator />
  </Progress.Track>
</Progress.Root>
```

### Color variations

```tsx
<Progress.Root value={30}>
  <Progress.Track>
    <Progress.Indicator color="default" />
  </Progress.Track>
</Progress.Root>

<Progress.Root value={90}>
  <Progress.Track>
    <Progress.Indicator color="destructive" />
  </Progress.Track>
</Progress.Root>
```

### Size variations

```tsx
<Progress.Root value={50}>
  <Progress.Track size="sm"><Progress.Indicator /></Progress.Track>
</Progress.Root>

<Progress.Root value={50}>
  <Progress.Track size="lg"><Progress.Indicator /></Progress.Track>
</Progress.Root>
```

## CSS Requirements

```css
@layer priority1 {
  .basex-progress-indicator[data-indeterminate] {
    width: 40% !important;
    animation: basex-progress-indeterminate 1.5s ease-in-out infinite;
  }
  @keyframes basex-progress-indeterminate {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(250%);
    }
  }
}
```

## API Reference

### Progress.Root

| Prop     | Type                       | Default | Description                                          |
| -------- | -------------------------- | ------- | ---------------------------------------------------- |
| `value`  | `number \| null`           | --      | **Required.** Current value. `null` = indeterminate. |
| `min`    | `number`                   | `0`     | The minimum value.                                   |
| `max`    | `number`                   | `100`   | The maximum value.                                   |
| `format` | `Intl.NumberFormatOptions` | --      | Formatting options for the value display.            |
| `locale` | `string`                   | --      | Locale for number formatting.                        |
| `sx`     | `StyleXStyles`             | --      | StyleX styles for consumer overrides.                |

#### Data attributes

| Attribute            | Description                 |
| -------------------- | --------------------------- |
| `data-indeterminate` | Present when value is null. |

### Progress.Label

| Prop | Type           | Default | Description                           |
| ---- | -------------- | ------- | ------------------------------------- |
| `sx` | `StyleXStyles` | --      | StyleX styles for consumer overrides. |

### Progress.Track

| Prop   | Type                   | Default | Description                                    |
| ------ | ---------------------- | ------- | ---------------------------------------------- |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'`  | Height of the track (sm=4px, md=8px, lg=12px). |
| `sx`   | `StyleXStyles`         | --      | StyleX styles for consumer overrides.          |

### Progress.Indicator

| Prop    | Type                                        | Default     | Description                           |
| ------- | ------------------------------------------- | ----------- | ------------------------------------- |
| `color` | `'default' \| 'secondary' \| 'destructive'` | `'default'` | Color of the indicator bar.           |
| `sx`    | `StyleXStyles`                              | --          | StyleX styles for consumer overrides. |

#### Data attributes

| Attribute            | Description                 |
| -------------------- | --------------------------- |
| `data-indeterminate` | Present when value is null. |

### Progress.Value

| Prop | Type           | Default | Description                           |
| ---- | -------------- | ------- | ------------------------------------- |
| `sx` | `StyleXStyles` | --      | StyleX styles for consumer overrides. |

## When to Use

- Showing progress of file uploads, form submissions, or data processing
- Indeterminate loading states when duration is unknown
- Task completion visualization

## When NOT to Use

- **Static measurements** -- use Meter for disk usage, battery level, etc.
- **Spinner loading** -- use a spinner for compact inline loading
- **Multi-step wizards** -- use a stepper for discrete steps
