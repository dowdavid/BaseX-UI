import { vi, describe, it, expect } from 'vitest';
import { createElement, isValidElement } from 'react';

vi.mock('@stylexjs/stylex', () => {
  const m = {
    create: (s: Record<string, unknown>) => s,
    props: () => ({ className: '' }),
    defineVars: (v: Record<string, unknown>) => v,
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

import { Field } from './index';

const PARTS = ['Root', 'Label', 'Description', 'Error', 'Control', 'Validity'] as const;

describe('Field', () => {
  it('exports all compound parts', () => {
    for (const p of PARTS) expect(Field[p]).toBeDefined();
  });

  it('sets displayName on all parts', () => {
    for (const p of PARTS) expect(Field[p].displayName).toBe(`Field.${p}`);
  });

  it('does not expose unexpected parts', () => {
    expect(Object.keys(Field).sort()).toEqual([...PARTS].sort());
  });

  it('renders Root with name and disabled', () => {
    const el = createElement(Field.Root, { name: 'email', disabled: false });
    expect(isValidElement(el)).toBe(true);
  });
});
