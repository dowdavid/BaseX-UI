# @basex-ui/tokens

Design tokens for [BaseX UI](https://github.com/dowdavid/BaseX-UI) as StyleX variables. Colors (OKLCH), spacing, typography, motion, and radius — all themeable, all type-safe.

## Install

```bash
pnpm add @basex-ui/tokens @stylexjs/stylex
```

## Usage

```ts
import * as stylex from '@stylexjs/stylex';
import { tokens } from '@basex-ui/tokens';

const styles = stylex.create({
  card: {
    backgroundColor: tokens.colorBgSurface,
    padding: tokens.space4,
    borderRadius: tokens.radiusMd,
    color: tokens.colorTextPrimary,
  },
});
```

Subpath imports for OKLCH utilities and presets:

```ts
import { oklch } from '@basex-ui/tokens/oklch';
import { presets } from '@basex-ui/tokens/presets';
```

## What's included

- **Color tokens** — semantic (bg, text, border, accent) backed by an OKLCH palette
- **Spacing scale** — `space0` … `space24`
- **Typography** — font families, sizes, weights, line heights, tracking
- **Motion** — durations and easings
- **Radius** — `radiusSm` … `radiusFull`

Theme switching is handled by [`@basex-ui/styles`](../styles).

## License

MIT — see the [main repo](https://github.com/dowdavid/BaseX-UI).
