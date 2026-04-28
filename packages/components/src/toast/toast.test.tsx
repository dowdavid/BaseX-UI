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

import { Toast, useToast } from './index';

const PARTS = [
  'Provider',
  'Portal',
  'Viewport',
  'Root',
  'Content',
  'Title',
  'Description',
  'Action',
  'Close',
] as const;

describe('Toast', () => {
  it('exports all compound parts', () => {
    for (const p of PARTS) expect(Toast[p]).toBeDefined();
  });

  it('sets displayName on all parts', () => {
    for (const p of PARTS) expect(Toast[p].displayName).toBe(`Toast.${p}`);
  });

  it('does not expose unexpected parts', () => {
    expect(Object.keys(Toast).sort()).toEqual([...PARTS].sort());
  });

  it('exports useToast hook', () => {
    expect(typeof useToast).toBe('function');
  });

  it('renders Provider as a valid React element', () => {
    const el = createElement(Toast.Provider, { timeout: 5000 });
    expect(isValidElement(el)).toBe(true);
  });
});
