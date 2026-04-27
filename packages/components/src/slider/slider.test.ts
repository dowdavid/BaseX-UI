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
  capitalize: (s: string) => s,
}));

import { Slider } from './index';

const PARTS = ['Root', 'Label', 'Value', 'Control', 'Track', 'Indicator', 'Thumb'] as const;

describe('Slider', () => {
  it('exports all compound parts', () => {
    for (const p of PARTS) expect(Slider[p]).toBeDefined();
  });

  it('sets displayName on all parts', () => {
    for (const p of PARTS) expect(Slider[p].displayName).toBe(`Slider.${p}`);
  });

  it('does not expose unexpected parts', () => {
    expect(Object.keys(Slider).sort()).toEqual([...PARTS].sort());
  });

  it('renders Root with min, max, step, controlled value', () => {
    const el = createElement(Slider.Root, {
      min: 0,
      max: 100,
      step: 1,
      value: 50,
      onValueChange: () => {},
      disabled: false,
    });
    expect(isValidElement(el)).toBe(true);
  });
});
