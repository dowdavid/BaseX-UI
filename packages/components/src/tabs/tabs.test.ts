import { vi, describe, it, expect } from 'vitest';

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

describe('Tabs', () => {
  it('exports all compound parts', () => {
    expect(Tabs.Root).toBeDefined();
    expect(Tabs.List).toBeDefined();
    expect(Tabs.Tab).toBeDefined();
    expect(Tabs.Panel).toBeDefined();
    expect(Tabs.Indicator).toBeDefined();
  });

  it('sets displayName on all parts', () => {
    expect(Tabs.Root.displayName).toBe('Tabs.Root');
    expect(Tabs.List.displayName).toBe('Tabs.List');
    expect(Tabs.Tab.displayName).toBe('Tabs.Tab');
    expect(Tabs.Panel.displayName).toBe('Tabs.Panel');
    expect(Tabs.Indicator.displayName).toBe('Tabs.Indicator');
  });

  it('does not expose unexpected parts', () => {
    const expectedParts = ['Root', 'List', 'Tab', 'Panel', 'Indicator'];
    expect(Object.keys(Tabs).sort()).toEqual(expectedParts.sort());
  });
});
