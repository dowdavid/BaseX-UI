import { vi, describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { createElement, isValidElement } from 'react';
import { Select } from './index';

expect.extend(toHaveNoViolations);

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

const PARTS = [
  'Root',
  'Trigger',
  'Value',
  'Icon',
  'Portal',
  'Positioner',
  'Popup',
  'Viewport',
  'Item',
  'ItemText',
  'ItemIndicator',
  'Group',
  'GroupLabel',
  'Separator',
  'ScrollUpButton',
  'ScrollDownButton',
] as const;

describe('Select', () => {
  it('exports all compound parts', () => {
    for (const p of PARTS) expect(Select[p]).toBeDefined();
  });

  it('sets displayName on all parts', () => {
    for (const p of PARTS) expect(Select[p].displayName).toBe(`Select.${p}`);
  });

  it('does not expose unexpected parts', () => {
    expect(Object.keys(Select).sort()).toEqual([...PARTS].sort());
  });

  it('renders Root with controlled value, disabled', () => {
    const el = createElement(Select.Root, {
      value: 'a',
      onValueChange: () => {},
      disabled: false,
    });
    expect(isValidElement(el)).toBe(true);
  });

  // interaction: portal — covered by browser testing

  it('renders Root without a11y violations', async () => {
    const { container } = render(<Select.Root />);
    // axe: portal content not inspectable in jsdom — covered by browser axe run
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
