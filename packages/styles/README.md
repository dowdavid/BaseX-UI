# @basex-ui/styles

Themes and shared style utilities for [BaseX UI](https://github.com/dowdavid/BaseX-UI). Light and dark themes out of the box, plus `focusRing` and other utilities used across components.

## Install

```bash
pnpm add @basex-ui/styles @basex-ui/tokens @stylexjs/stylex
```

## Usage

Apply a theme to your app root:

```tsx
import * as stylex from '@stylexjs/stylex';
import { lightTheme, darkTheme } from '@basex-ui/styles';

function App({ dark }: { dark: boolean }) {
  return <div {...stylex.props(dark ? darkTheme : lightTheme)}>{/* ... */}</div>;
}
```

For portal-rendered components (Dialog, Drawer, Popover, Combobox), apply the theme to `<html>` or `<body>` so portals inherit the token values.

## Exports

- `lightTheme`, `darkTheme` — StyleX theme objects (binds to `@basex-ui/tokens`)
- `focusRing` — accessible focus outline used by all interactive components
- `capitalize` — small text utility

## License

MIT — see the [main repo](https://github.com/dowdavid/BaseX-UI).
