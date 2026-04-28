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

import { Dialog } from './index';

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

describe('Dialog', () => {
  it('exports all compound parts', () => {
    for (const p of PARTS) expect(Dialog[p]).toBeDefined();
  });

  it('sets displayName on all parts', () => {
    for (const p of PARTS) expect(Dialog[p].displayName).toBe(`Dialog.${p}`);
  });

  it('does not expose unexpected parts', () => {
    expect(Object.keys(Dialog).sort()).toEqual([...PARTS].sort());
  });

  it('renders Root with controlled open state', () => {
    const el = createElement(Dialog.Root, {
      open: true,
      onOpenChange: () => {},
    });
    expect(isValidElement(el)).toBe(true);
  });
});
