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

import { CheckboxGroup } from './index';

describe('CheckboxGroup', () => {
  it('exports Root', () => {
    expect(CheckboxGroup.Root).toBeDefined();
  });

  it('sets displayName', () => {
    expect(CheckboxGroup.Root.displayName).toBe('CheckboxGroup.Root');
  });

  it('does not expose unexpected parts', () => {
    expect(Object.keys(CheckboxGroup).sort()).toEqual(['Root']);
  });

  it('renders Root with controlled value', () => {
    const el = createElement(CheckboxGroup.Root, {
      value: ['a'],
      onValueChange: () => {},
      disabled: false,
    });
    expect(isValidElement(el)).toBe(true);
  });
});
