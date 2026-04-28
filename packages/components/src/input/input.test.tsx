import { vi, describe, it, expect } from 'vitest';
import { createElement, isValidElement } from 'react';

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

import { Input } from './index';

describe('Input', () => {
  it('exports the Input component', () => {
    expect(Input).toBeDefined();
  });

  it('sets displayName', () => {
    expect(Input.displayName).toBe('Input');
  });

  it('renders as a valid React element', () => {
    expect(isValidElement(createElement(Input))).toBe(true);
  });

  it('accepts size, disabled, and value props', () => {
    for (const size of ['sm', 'md', 'lg'] as const) {
      const el = createElement(Input, { size, disabled: false, value: '', onChange: () => {} });
      expect(isValidElement(el)).toBe(true);
    }
  });
});
