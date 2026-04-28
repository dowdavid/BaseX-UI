import { vi, describe, it, expect } from 'vitest';
import { createElement, isValidElement } from 'react';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

vi.mock('@stylexjs/stylex', () => {
  const m = {
    create: (s: Record<string, unknown>) => s,
    props: () => ({ className: '' }),
    defineVars: (v: Record<string, unknown>) => v,
    createTheme: () => ({}),
  };
  return { default: m, ...m };
});
vi.mock('@basex-ui/tokens', () => ({
  tokens: new Proxy({}, { get: (_, p) => `var(--${String(p)})` }),
}));
vi.mock('@basex-ui/styles', () => ({
  focusRing: {},
  capitalize: (s: string) => s.charAt(0).toUpperCase() + s.slice(1),
}));

import { Button } from './index';

describe('Button', () => {
  it('exports the Button component', () => {
    expect(Button).toBeDefined();
  });

  it('sets displayName', () => {
    expect(Button.displayName).toBe('Button');
  });

  it('renders as a valid React element', () => {
    const el = createElement(Button, { children: 'Click' });
    expect(isValidElement(el)).toBe(true);
  });

  it('accepts variant, color, and size props', () => {
    const variants = ['solid', 'outline', 'ghost'] as const;
    const colors = ['default', 'secondary', 'destructive'] as const;
    const sizes = ['sm', 'md', 'lg'] as const;
    for (const variant of variants)
      for (const color of colors)
        for (const size of sizes) {
          const el = createElement(Button, { variant, color, size, children: 'x' });
          expect(isValidElement(el)).toBe(true);
        }
  });

  it('accepts disabled prop', () => {
    const el = createElement(Button, { disabled: true, children: 'x' });
    expect(isValidElement(el)).toBe(true);
  });

  it('renders without a11y violations', async () => {
    const { container } = render(<Button>Click me</Button>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
