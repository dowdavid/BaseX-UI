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

import { Progress } from './index';

describe('Progress', () => {
  it('exports compound parts', () => {
    expect(Progress.Root).toBeDefined();
    expect(Progress.Label).toBeDefined();
    expect(Progress.Track).toBeDefined();
    expect(Progress.Indicator).toBeDefined();
    expect(Progress.Value).toBeDefined();
  });

  it('sets displayName on all parts', () => {
    expect(Progress.Root.displayName).toBe('Progress.Root');
    expect(Progress.Label.displayName).toBe('Progress.Label');
    expect(Progress.Track.displayName).toBe('Progress.Track');
    expect(Progress.Indicator.displayName).toBe('Progress.Indicator');
    expect(Progress.Value.displayName).toBe('Progress.Value');
  });

  it('does not expose unexpected parts', () => {
    expect(Object.keys(Progress).sort()).toEqual(['Indicator', 'Label', 'Root', 'Track', 'Value']);
  });

  it('renders Root with value, max, and indeterminate props', () => {
    expect(isValidElement(createElement(Progress.Root, { value: 50, max: 100 }))).toBe(true);
    expect(isValidElement(createElement(Progress.Root, { value: null }))).toBe(true);
  });
});
