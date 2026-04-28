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

import { Form } from './index';

describe('Form', () => {
  it('exports the Form component', () => {
    expect(Form).toBeDefined();
  });

  it('sets displayName', () => {
    expect(Form.displayName).toBe('Form');
  });

  it('renders as a valid React element', () => {
    expect(isValidElement(createElement(Form, { onSubmit: () => {} }))).toBe(true);
  });

  it('accepts errors prop for server validation', () => {
    const el = createElement(Form, { errors: { email: 'Required' } });
    expect(isValidElement(el)).toBe(true);
  });
});
