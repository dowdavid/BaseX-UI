# Separator

A thin visual divider between content groups. Built on [Base UI Separator](https://base-ui.com/react/components/separator) with StyleX styling.

## Import

```tsx
import { Separator } from '@basex-ui/components/separator';
```

## Anatomy

```tsx
<Separator.Root />
```

## Examples

### Horizontal

```tsx
<Separator.Root />
```

### Vertical (inside a flex row)

```tsx
<div style={{ display: 'flex', alignItems: 'center', height: 24, gap: 12 }}>
  <span>Left</span>
  <Separator.Root orientation="vertical" />
  <span>Right</span>
</div>
```

### Decorative

When the separator is purely visual and doesn't convey structure, set `decorative` to expose `role="none"` to assistive technology.

```tsx
<Separator.Root decorative />
```

## API Reference

### Root

A 1px line that adapts to its orientation. Uses the `colorBorderMuted` token to match in-component dividers (e.g. Menu, Sidebar). Renders a `<div>` with `role="separator"` by default, or `role="none"` when `decorative`.

| Prop          | Type                         | Default        | Description                                                                                 |
| ------------- | ---------------------------- | -------------- | ------------------------------------------------------------------------------------------- |
| `orientation` | `"horizontal" \| "vertical"` | `"horizontal"` | Direction of the separator. Vertical separators stretch to the height of their flex parent. |
| `decorative`  | `boolean`                    | `false`        | When true, removes semantic role from accessibility tree (`role="none"`).                   |
| `sx`          | `StyleXStyles`               | —              | Style overrides.                                                                            |

## When to Use

- **Section dividers** — between settings groups, list groups, toolbar groups
- **Inline dividers** — between inline metadata (e.g. `Author · 5 min read`)
- **Visual breathing room** — when whitespace alone isn't enough hierarchy

## When NOT to Use

- **Section headings** — Use a heading element; a Separator is not a substitute for structure.
- **Card or panel borders** — Use the container's own border instead.
- **List item delimiters that are themselves interactive** — Use a list with proper semantics.
