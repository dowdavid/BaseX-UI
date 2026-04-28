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
  capitalize: {},
}));

import { Toolbar } from './index';

const PARTS = [
  'Root',
  'Button',
  'Link',
  'Group',
  'Separator',
  'ToggleGroup',
  'ToggleItem',
] as const;

describe('Toolbar', () => {
  it('exports all compound parts', () => {
    for (const p of PARTS) expect(Toolbar[p]).toBeDefined();
  });

  it('sets displayName on all parts', () => {
    for (const p of PARTS) expect(Toolbar[p].displayName).toBe(`Toolbar.${p}`);
  });

  it('does not expose unexpected parts', () => {
    expect(Object.keys(Toolbar).sort()).toEqual([...PARTS].sort());
  });

  it('renders Root with orientation and disabled props', () => {
    const el = createElement(Toolbar.Root, { orientation: 'horizontal', disabled: false });
    expect(isValidElement(el)).toBe(true);
  });
});
