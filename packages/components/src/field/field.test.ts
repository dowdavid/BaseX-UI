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

import { Field } from './index';

describe('Field', () => {
  it('exports all compound parts', () => {
    expect(Field.Root).toBeDefined();
    expect(Field.Label).toBeDefined();
    expect(Field.Description).toBeDefined();
    expect(Field.Error).toBeDefined();
    expect(Field.Control).toBeDefined();
    expect(Field.Validity).toBeDefined();
  });

  it('sets displayName on all parts', () => {
    expect(Field.Root.displayName).toBe('Field.Root');
    expect(Field.Label.displayName).toBe('Field.Label');
    expect(Field.Description.displayName).toBe('Field.Description');
    expect(Field.Error.displayName).toBe('Field.Error');
    expect(Field.Control.displayName).toBe('Field.Control');
    expect(Field.Validity.displayName).toBe('Field.Validity');
  });

  it('does not expose unexpected parts', () => {
    const expectedParts = ['Root', 'Label', 'Description', 'Error', 'Control', 'Validity'];
    const actualParts = Object.keys(Field);
    expect(actualParts.sort()).toEqual(expectedParts.sort());
  });
});
