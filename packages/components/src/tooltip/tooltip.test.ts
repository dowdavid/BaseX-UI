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

import { Tooltip } from './index';

describe('Tooltip', () => {
  it('exports all compound parts', () => {
    expect(Tooltip.Provider).toBeDefined();
    expect(Tooltip.Root).toBeDefined();
    expect(Tooltip.Trigger).toBeDefined();
    expect(Tooltip.Portal).toBeDefined();
    expect(Tooltip.Positioner).toBeDefined();
    expect(Tooltip.Popup).toBeDefined();
    expect(Tooltip.Arrow).toBeDefined();
  });

  it('sets displayName on all parts', () => {
    expect(Tooltip.Provider.displayName).toBe('Tooltip.Provider');
    expect(Tooltip.Root.displayName).toBe('Tooltip.Root');
    expect(Tooltip.Trigger.displayName).toBe('Tooltip.Trigger');
    expect(Tooltip.Portal.displayName).toBe('Tooltip.Portal');
    expect(Tooltip.Positioner.displayName).toBe('Tooltip.Positioner');
    expect(Tooltip.Popup.displayName).toBe('Tooltip.Popup');
    expect(Tooltip.Arrow.displayName).toBe('Tooltip.Arrow');
  });

  it('does not expose unexpected parts', () => {
    const expectedParts = ['Provider', 'Root', 'Trigger', 'Portal', 'Positioner', 'Popup', 'Arrow'];
    const actualParts = Object.keys(Tooltip);
    expect(actualParts.sort()).toEqual(expectedParts.sort());
  });
});
