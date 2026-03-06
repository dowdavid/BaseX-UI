# Meter

A visual indicator showing a scalar value within a known range. Built on [Base UI Meter](https://base-ui.com/react/components/meter).

## Anatomy

```tsx
<Meter.Root value={50}>
  <Meter.Label />
  <Meter.Value />
  <Meter.Track>
    <Meter.Indicator />
  </Meter.Track>
</Meter.Root>
```

- **Root** -- Container providing meter state (value, min, max) to child parts.
- **Label** -- An accessible label for the meter.
- **Value** -- Displays the formatted value.
- **Track** -- The background track.
- **Indicator** -- The filled portion proportional to the value.

## Examples

### Basic meter

```tsx
<Meter.Root value={65}>
  <Meter.Label>Storage</Meter.Label>
  <Meter.Track>
    <Meter.Indicator />
  </Meter.Track>
</Meter.Root>
```

### With value display

```tsx
<Meter.Root value={42} format={{ style: 'percent', maximumFractionDigits: 0 }}>
  <Meter.Label>Upload progress</Meter.Label>
  <Meter.Value />
  <Meter.Track>
    <Meter.Indicator />
  </Meter.Track>
</Meter.Root>
```

### Color variations

```tsx
<Meter.Root value={30}>
  <Meter.Track>
    <Meter.Indicator color="default" />
  </Meter.Track>
</Meter.Root>

<Meter.Root value={90}>
  <Meter.Track>
    <Meter.Indicator color="destructive" />
  </Meter.Track>
</Meter.Root>
```

### Size variations

```tsx
<Meter.Root value={50}>
  <Meter.Track size="sm"><Meter.Indicator /></Meter.Track>
</Meter.Root>

<Meter.Root value={50}>
  <Meter.Track size="md"><Meter.Indicator /></Meter.Track>
</Meter.Root>

<Meter.Root value={50}>
  <Meter.Track size="lg"><Meter.Indicator /></Meter.Track>
</Meter.Root>
```

## API Reference

### Meter.Root

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `number` | -- | **Required.** The current value of the meter. |
| `min` | `number` | `0` | The minimum value. |
| `max` | `number` | `100` | The maximum value. |
| `format` | `Intl.NumberFormatOptions` | -- | Formatting options for the value display. |
| `locale` | `string` | -- | Locale for number formatting. |
| `sx` | `StyleXStyles` | -- | StyleX styles for consumer overrides. |

### Meter.Label

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `sx` | `StyleXStyles` | -- | StyleX styles for consumer overrides. |

### Meter.Track

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Height of the track (sm=4px, md=8px, lg=12px). |
| `sx` | `StyleXStyles` | -- | StyleX styles for consumer overrides. |

### Meter.Indicator

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `color` | `'default' \| 'secondary' \| 'destructive'` | `'default'` | Color of the indicator bar. |
| `sx` | `StyleXStyles` | -- | StyleX styles for consumer overrides. |

### Meter.Value

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `sx` | `StyleXStyles` | -- | StyleX styles for consumer overrides. |

## When to Use

- Displaying a scalar measurement within a known range (disk usage, battery level)
- Showing quotas or capacity levels
- Visualizing thresholds or warning levels

## When NOT to Use

- **Task progress** -- use Progress for ongoing operations
- **Loading states** -- use Progress with indeterminate mode
- **Discrete ratings** -- use a rating component or radio group
