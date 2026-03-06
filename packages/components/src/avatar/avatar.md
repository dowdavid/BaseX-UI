# Avatar

A circular image or fallback representing a user or entity. Built on [Base UI Avatar](https://base-ui.com/react/components/avatar) with StyleX styling.

## Import

```tsx
import { Avatar } from '@basex-ui/components/avatar';
```

## Anatomy

```tsx
<Avatar.Root>
  <Avatar.Image />
  <Avatar.Fallback />
</Avatar.Root>
```

## Examples

### Image Avatar

```tsx
<Avatar.Root>
  <Avatar.Image src="/photo.jpg" alt="Jane Doe" />
  <Avatar.Fallback>JD</Avatar.Fallback>
</Avatar.Root>
```

### Initials Fallback

```tsx
<Avatar.Root>
  <Avatar.Fallback>AB</Avatar.Fallback>
</Avatar.Root>
```

### Icon Fallback

```tsx
<Avatar.Root>
  <Avatar.Fallback>
    <UserIcon />
  </Avatar.Fallback>
</Avatar.Root>
```

### Broken Image Fallback

When the `src` fails to load, Base UI automatically hides the Image and shows the Fallback.

```tsx
<Avatar.Root>
  <Avatar.Image src="/broken.jpg" alt="Missing" />
  <Avatar.Fallback>?</Avatar.Fallback>
</Avatar.Root>
```

### Custom Size via `sx`

```tsx
import * as stylex from '@stylexjs/stylex';

const overrides = stylex.create({
  large: { width: '64px', height: '64px', fontSize: '1.25rem' },
});

<Avatar.Root sx={overrides.large}>
  <Avatar.Image src="/photo.jpg" alt="Jane Doe" />
  <Avatar.Fallback>JD</Avatar.Fallback>
</Avatar.Root>;
```

## API Reference

### Root

Outer container — a 40px circle with overflow hidden. Renders a `<span>`.

| Prop | Type           | Default | Description     |
| ---- | -------------- | ------- | --------------- |
| `sx` | `StyleXStyles` | —       | Style overrides |

### Image

The avatar image. Hidden automatically when the image fails to load. Renders an `<img>`.

| Prop  | Type           | Default | Description            |
| ----- | -------------- | ------- | ---------------------- |
| `src` | `string`       | —       | Image source URL       |
| `alt` | `string`       | —       | Alt text for the image |
| `sx`  | `StyleXStyles` | —       | Style overrides        |

### Fallback

Content displayed when no image is provided or the image fails to load. Renders a `<span>`.

| Prop | Type           | Default | Description     |
| ---- | -------------- | ------- | --------------- |
| `sx` | `StyleXStyles` | —       | Style overrides |

## When to Use

- **User profiles** — displaying a user's photo next to their name
- **Initials badge** — showing letter initials when no photo is available
- **Anonymous placeholder** — a generic icon for unknown or system users

## When NOT to Use

- **Non-identity images** — Use a plain `<img>` for product photos, thumbnails, or landscapes.
- **Large hero images** — Avatar is 40px by default. Use a dedicated hero/banner component for large visuals.
- **Selectable user lists** — Avatar is presentational. Wrap it inside a Checkbox, Radio, or Listbox item for interactive selection.
