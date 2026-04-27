## What is Base-X UI?

Base-X UI is a component library built on [Base UI](https://base-ui.com) (headless) and [StyleX](https://stylexjs.com) (atomic CSS-in-JS). It provides accessible, themeable components with design tokens for colors, spacing, typography, motion, and radius.

## Installation

```bash
pnpm add @basex-ui/components @basex-ui/tokens @basex-ui/styles @stylexjs/stylex react react-dom
```

`react`, `react-dom`, and `@stylexjs/stylex` are peer dependencies — include them if your project doesn't already.

## Quick start

```tsx
import { Button } from '@basex-ui/components';
import { lightTheme } from '@basex-ui/styles';
import * as stylex from '@stylexjs/stylex';

function App() {
  return (
    <div {...stylex.props(lightTheme)}>
      <Button>Click me</Button>
    </div>
  );
}
```
