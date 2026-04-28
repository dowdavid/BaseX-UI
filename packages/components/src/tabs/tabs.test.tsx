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

import { Tabs } from './index';

const PARTS = ['Root', 'List', 'Tab', 'Panel', 'Indicator'] as const;

describe('Tabs', () => {
  it('exports all compound parts', () => {
    for (const p of PARTS) expect(Tabs[p]).toBeDefined();
  });

  it('sets displayName on all parts', () => {
    for (const p of PARTS) expect(Tabs[p].displayName).toBe(`Tabs.${p}`);
  });

  it('does not expose unexpected parts', () => {
    expect(Object.keys(Tabs).sort()).toEqual([...PARTS].sort());
  });

  it('renders nested compound structure', () => {
    const el = createElement(Tabs.Root, {
      defaultValue: 'a',
      orientation: 'horizontal',
      children: [
        createElement(Tabs.List, {
          key: 'l',
          children: createElement(Tabs.Tab, { value: 'a', children: 'A' }),
        }),
        createElement(Tabs.Panel, { key: 'p', value: 'a', children: 'Content' }),
      ],
    });
    expect(isValidElement(el)).toBe(true);
  });
});
