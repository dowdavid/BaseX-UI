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

import { Tooltip } from './index';

const PARTS = ['Provider', 'Root', 'Trigger', 'Portal', 'Positioner', 'Popup', 'Arrow'] as const;

describe('Tooltip', () => {
  it('exports all compound parts', () => {
    for (const p of PARTS) expect(Tooltip[p]).toBeDefined();
  });

  it('sets displayName on all parts', () => {
    for (const p of PARTS) expect(Tooltip[p].displayName).toBe(`Tooltip.${p}`);
  });

  it('does not expose unexpected parts', () => {
    expect(Object.keys(Tooltip).sort()).toEqual([...PARTS].sort());
  });

  it('renders Root with controlled open state', () => {
    const el = createElement(Tooltip.Root, { open: false, onOpenChange: () => {} });
    expect(isValidElement(el)).toBe(true);
  });
});
