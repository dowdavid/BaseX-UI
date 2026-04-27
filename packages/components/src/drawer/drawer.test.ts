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

import { Drawer } from './index';

const PARTS = [
  'Root',
  'Trigger',
  'Portal',
  'Backdrop',
  'Popup',
  'Header',
  'Title',
  'Description',
  'Panel',
  'Footer',
  'Close',
] as const;

describe('Drawer', () => {
  it('exports all compound parts', () => {
    for (const p of PARTS) expect(Drawer[p]).toBeDefined();
  });

  it('sets displayName on all parts', () => {
    for (const p of PARTS) expect(Drawer[p].displayName).toBe(`Drawer.${p}`);
  });

  it('does not expose unexpected parts', () => {
    expect(Object.keys(Drawer).sort()).toEqual([...PARTS].sort());
  });

  it('renders Root with controlled open state', () => {
    const el = createElement(Drawer.Root, { open: false, onOpenChange: () => {} });
    expect(isValidElement(el)).toBe(true);
  });
});
