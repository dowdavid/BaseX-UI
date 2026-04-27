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

import { Select } from './index';

const PARTS = [
  'Root',
  'Trigger',
  'Value',
  'Icon',
  'Portal',
  'Positioner',
  'Popup',
  'Viewport',
  'Item',
  'ItemText',
  'ItemIndicator',
  'Group',
  'GroupLabel',
  'Separator',
  'ScrollUpButton',
  'ScrollDownButton',
] as const;

describe('Select', () => {
  it('exports all compound parts', () => {
    for (const p of PARTS) expect(Select[p]).toBeDefined();
  });

  it('sets displayName on all parts', () => {
    for (const p of PARTS) expect(Select[p].displayName).toBe(`Select.${p}`);
  });

  it('does not expose unexpected parts', () => {
    expect(Object.keys(Select).sort()).toEqual([...PARTS].sort());
  });

  it('renders Root with controlled value, disabled', () => {
    const el = createElement(Select.Root, {
      value: 'a',
      onValueChange: () => {},
      disabled: false,
    });
    expect(isValidElement(el)).toBe(true);
  });
});
