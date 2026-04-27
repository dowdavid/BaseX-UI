import { vi, describe, it, expect } from 'vitest';

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

import { Switch } from './index';

describe('Switch', () => {
  it('exports all compound parts', () => {
    expect(Switch.Root).toBeDefined();
    expect(Switch.Thumb).toBeDefined();
  });

  it('sets displayName on all parts', () => {
    expect(Switch.Root.displayName).toBe('Switch.Root');
    expect(Switch.Thumb.displayName).toBe('Switch.Thumb');
  });

  it('does not expose unexpected parts', () => {
    const expectedParts = ['Root', 'Thumb'];
    const actualParts = Object.keys(Switch);
    expect(actualParts.sort()).toEqual(expectedParts.sort());
  });
});
