import { vi, describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { createElement, isValidElement } from 'react';
import { Menubar } from './index';

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

describe('Menubar', () => {
  it('exports the Menubar component', () => {
    expect(Menubar).toBeDefined();
  });

  it('sets displayName', () => {
    expect(Menubar.displayName).toBe('Menubar');
  });

  it('renders as a valid React element', () => {
    expect(isValidElement(createElement(Menubar))).toBe(true);
  });

  it('renders without a11y violations', async () => {
    const { container } = render(<Menubar aria-label="Navigation" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
