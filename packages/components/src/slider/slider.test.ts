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
  capitalize: (s: string) => s,
}));

import { Slider } from './index';

describe('Slider', () => {
  it('exports all compound parts', () => {
    expect(Slider.Root).toBeDefined();
    expect(Slider.Label).toBeDefined();
    expect(Slider.Value).toBeDefined();
    expect(Slider.Control).toBeDefined();
    expect(Slider.Track).toBeDefined();
    expect(Slider.Indicator).toBeDefined();
    expect(Slider.Thumb).toBeDefined();
  });

  it('sets displayName on all parts', () => {
    expect(Slider.Root.displayName).toBe('Slider.Root');
    expect(Slider.Label.displayName).toBe('Slider.Label');
    expect(Slider.Value.displayName).toBe('Slider.Value');
    expect(Slider.Control.displayName).toBe('Slider.Control');
    expect(Slider.Track.displayName).toBe('Slider.Track');
    expect(Slider.Indicator.displayName).toBe('Slider.Indicator');
    expect(Slider.Thumb.displayName).toBe('Slider.Thumb');
  });

  it('does not expose unexpected parts', () => {
    const expectedParts = ['Root', 'Label', 'Value', 'Control', 'Track', 'Indicator', 'Thumb'];
    const actualParts = Object.keys(Slider);
    expect(actualParts.sort()).toEqual(expectedParts.sort());
  });
});
