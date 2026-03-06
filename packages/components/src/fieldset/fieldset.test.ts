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

import { Fieldset } from './index';

describe('Fieldset', () => {
  it('exports all compound parts', () => {
    expect(Fieldset.Root).toBeDefined();
    expect(Fieldset.Legend).toBeDefined();
  });

  it('sets displayName on all parts', () => {
    expect(Fieldset.Root.displayName).toBe('Fieldset.Root');
    expect(Fieldset.Legend.displayName).toBe('Fieldset.Legend');
  });

  it('does not expose unexpected parts', () => {
    const expectedParts = ['Root', 'Legend'];
    const actualParts = Object.keys(Fieldset);
    expect(actualParts.sort()).toEqual(expectedParts.sort());
  });
});
