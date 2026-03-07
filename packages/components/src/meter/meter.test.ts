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

import { Meter } from './index';

describe('Meter', () => {
  it('exports all compound parts', () => {
    expect(Meter.Root).toBeDefined();
    expect(Meter.Label).toBeDefined();
    expect(Meter.Track).toBeDefined();
    expect(Meter.Indicator).toBeDefined();
    expect(Meter.Value).toBeDefined();
  });

  it('sets displayName on all parts', () => {
    expect(Meter.Root.displayName).toBe('Meter.Root');
    expect(Meter.Label.displayName).toBe('Meter.Label');
    expect(Meter.Track.displayName).toBe('Meter.Track');
    expect(Meter.Indicator.displayName).toBe('Meter.Indicator');
    expect(Meter.Value.displayName).toBe('Meter.Value');
  });

  it('does not expose unexpected parts', () => {
    const expectedParts = ['Root', 'Label', 'Track', 'Indicator', 'Value'];
    const actualParts = Object.keys(Meter);
    expect(actualParts.sort()).toEqual(expectedParts.sort());
  });
});
