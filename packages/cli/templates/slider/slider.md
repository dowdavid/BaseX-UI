# Slider

An accessible range input that lets users pick a single value or a range from a continuous scale. Built on [Base UI Slider](https://base-ui.com/react/components/slider).

## Anatomy

```tsx
<Slider.Root defaultValue={50}>
  <Slider.Label />
  <Slider.Value />
  <Slider.Control>
    <Slider.Track>
      <Slider.Indicator />
      <Slider.Thumb />
    </Slider.Track>
  </Slider.Control>
</Slider.Root>
```

- **Root** -- Owns slider state (value, min, max, step, orientation).
- **Label** -- Visible label.
- **Value** -- Displays the current value(s) using `format`/`locale` from Root.
- **Control** -- Interactive surface; captures pointer drag.
- **Track** -- The unfilled background.
- **Indicator** -- Filled portion between min and value (or between two thumbs).
- **Thumb** -- The draggable handle. Render multiple `Thumb`s with `index` for a range slider.

## Examples

### Basic

```tsx
<Slider.Root defaultValue={40}>
  <Slider.Label>Volume</Slider.Label>
  <Slider.Control>
    <Slider.Track>
      <Slider.Indicator />
      <Slider.Thumb />
    </Slider.Track>
  </Slider.Control>
</Slider.Root>
```

### Controlled with value display

```tsx
const [value, setValue] = useState(40);

<Slider.Root value={value} onValueChange={(v) => setValue(v as number)}>
  <Slider.Label>Brightness</Slider.Label>
  <Slider.Value />
  <Slider.Control>
    <Slider.Track>
      <Slider.Indicator />
      <Slider.Thumb />
    </Slider.Track>
  </Slider.Control>
</Slider.Root>;
```

### Range (multi-value)

```tsx
<Slider.Root defaultValue={[25, 75]} minStepsBetweenValues={1}>
  <Slider.Label>Price</Slider.Label>
  <Slider.Value />
  <Slider.Control>
    <Slider.Track>
      <Slider.Indicator />
      <Slider.Thumb index={0} />
      <Slider.Thumb index={1} />
    </Slider.Track>
  </Slider.Control>
</Slider.Root>
```

### Vertical

```tsx
<Slider.Root orientation="vertical" defaultValue={60}>
  <Slider.Control>
    <Slider.Track>
      <Slider.Indicator />
      <Slider.Thumb />
    </Slider.Track>
  </Slider.Control>
</Slider.Root>
```

### Inside a Field

```tsx
<Field.Root>
  <Field.Label>Quality</Field.Label>
  <Slider.Root defaultValue={50}>
    <Slider.Control>
      <Slider.Track>
        <Slider.Indicator />
        <Slider.Thumb />
      </Slider.Track>
    </Slider.Control>
  </Slider.Root>
  <Field.Description>Lower values save bandwidth.</Field.Description>
</Field.Root>
```

## Keyboard

| Key                 | Action                                      |
| ------------------- | ------------------------------------------- |
| `Arrow Left/Down`   | Decrement by `step` (RTL: increments)       |
| `Arrow Right/Up`    | Increment by `step` (RTL: decrements)       |
| `Page Down`         | Decrement by a larger step (10 \* step)     |
| `Page Up`           | Increment by a larger step (10 \* step)     |
| `Home`              | Jump to `min`                               |
| `End`               | Jump to `max`                               |
| `Tab` / `Shift+Tab` | Move focus between thumbs in a range slider |

## API Reference

### Slider.Root

| Prop                    | Type                              | Default        | Description                                                  |
| ----------------------- | --------------------------------- | -------------- | ------------------------------------------------------------ |
| `value`                 | `number \| readonly number[]`     | --             | Controlled value. Pass an array for a range slider.          |
| `defaultValue`          | `number \| readonly number[]`     | --             | Uncontrolled initial value.                                  |
| `onValueChange`         | `(value, event, details) => void` | --             | Fires while dragging or pressing keys.                       |
| `onValueCommitted`      | `(value, event, details) => void` | --             | Fires on release / keyboard commit.                          |
| `min`                   | `number`                          | `0`            | Minimum allowed value.                                       |
| `max`                   | `number`                          | `100`          | Maximum allowed value.                                       |
| `step`                  | `number`                          | `1`            | Increment between values.                                    |
| `minStepsBetweenValues` | `number`                          | `0`            | Minimum step gap between adjacent thumbs.                    |
| `orientation`           | `'horizontal' \| 'vertical'`      | `'horizontal'` | Slider axis.                                                 |
| `disabled`              | `boolean`                         | `false`        | Disable interaction.                                         |
| `name`                  | `string`                          | --             | Form name.                                                   |
| `format`                | `Intl.NumberFormatOptions`        | --             | Formatting applied to displayed values and `aria-valuetext`. |
| `locale`                | `string`                          | --             | Locale for formatting.                                       |
| `sx`                    | `StyleXStyles`                    | --             | StyleX overrides.                                            |

### Slider.Label

| Prop | Type           | Default | Description       |
| ---- | -------------- | ------- | ----------------- |
| `sx` | `StyleXStyles` | --      | StyleX overrides. |

### Slider.Value

| Prop       | Type                               | Default | Description                                          |
| ---------- | ---------------------------------- | ------- | ---------------------------------------------------- |
| `children` | `(formatted, values) => ReactNode` | --      | Optional render fn to customise the displayed value. |
| `sx`       | `StyleXStyles`                     | --      | StyleX overrides.                                    |

### Slider.Control

| Prop | Type           | Default | Description       |
| ---- | -------------- | ------- | ----------------- |
| `sx` | `StyleXStyles` | --      | StyleX overrides. |

Data attributes: `data-orientation`, `data-disabled`, `data-dragging`.

### Slider.Track

| Prop   | Type                   | Default | Description                                                           |
| ------ | ---------------------- | ------- | --------------------------------------------------------------------- |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'`  | Track thickness — sm=4px, md=8px, lg=12px (matches Progress / Meter). |
| `sx`   | `StyleXStyles`         | --      | StyleX overrides.                                                     |

### Slider.Indicator

| Prop    | Type                                        | Default     | Description       |
| ------- | ------------------------------------------- | ----------- | ----------------- |
| `color` | `'default' \| 'secondary' \| 'destructive'` | `'default'` | Fill color.       |
| `sx`    | `StyleXStyles`                              | --          | StyleX overrides. |

### Slider.Thumb

| Prop               | Type                                        | Default     | Description                                                                      |
| ------------------ | ------------------------------------------- | ----------- | -------------------------------------------------------------------------------- |
| `index`            | `number`                                    | --          | Required for range sliders — corresponds to the index in the value array.        |
| `color`            | `'default' \| 'secondary' \| 'destructive'` | `'default'` | Border color.                                                                    |
| `getAriaLabel`     | `(index: number) => string`                 | --          | Returns `aria-label` for the underlying input — important for unlabelled thumbs. |
| `getAriaValueText` | `(formatted, value, index) => string`       | --          | Returns `aria-valuetext`.                                                        |
| `disabled`         | `boolean`                                   | `false`     | Disable this thumb.                                                              |
| `sx`               | `StyleXStyles`                              | --          | StyleX overrides.                                                                |

## When to Use

- Choosing a single number from a continuous range when rough position matters more than precision (volume, brightness).
- Picking a min/max bracket (price range, date range filter).
- Vertical "fader" controls (mixers, lighting).

## When NOT to Use

- **Precise numeric input** -- use `NumberField`.
- **Read-only value display** -- use `Progress` (task progress) or `Meter` (scalar measurement).
- **2–7 discrete choices** -- use `Radio` or `ToggleGroup`.
- **On/off toggle** -- use `Switch`.

## RTL

Slider mirrors automatically when wrapped in `dir="rtl"`. The visual fill anchors to the trailing edge and `Arrow Left/Right` swap their increment direction to match the visual axis. No code changes are required.
