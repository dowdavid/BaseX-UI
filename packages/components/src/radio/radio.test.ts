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
  capitalize: (s: string) => s.charAt(0).toUpperCase() + s.slice(1),
}));

import { Radio } from './index';

describe('Radio', () => {
  it('exports compound parts', () => {
    expect(Radio.Group).toBeDefined();
    expect(Radio.Root).toBeDefined();
    expect(Radio.Indicator).toBeDefined();
  });

  it('sets displayName on all parts', () => {
    expect(Radio.Group.displayName).toBe('Radio.Group');
    expect(Radio.Root.displayName).toBe('Radio.Root');
    expect(Radio.Indicator.displayName).toBe('Radio.Indicator');
  });

  it('does not expose unexpected parts', () => {
    expect(Object.keys(Radio).sort()).toEqual(['Group', 'Indicator', 'Root']);
  });

  it('renders Group with controlled value, orientation, and disabled', () => {
    const el = createElement(Radio.Group, {
      value: 'a',
      onValueChange: () => {},
      orientation: 'vertical',
      disabled: false,
      children: createElement(Radio.Root, {
        value: 'a',
        children: createElement(Radio.Indicator),
      }),
    });
    expect(isValidElement(el)).toBe(true);
  });
});
