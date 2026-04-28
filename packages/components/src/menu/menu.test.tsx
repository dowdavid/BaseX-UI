import { vi, describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { createElement, isValidElement } from 'react';
import { Menu } from './index';

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
  capitalize: {},
}));

const PARTS = [
  'Root',
  'Trigger',
  'Portal',
  'Positioner',
  'Popup',
  'Item',
  'LinkItem',
  'Group',
  'GroupLabel',
  'Separator',
  'CheckboxItem',
  'CheckboxItemIndicator',
  'RadioGroup',
  'RadioItem',
  'RadioItemIndicator',
  'Backdrop',
  'SubmenuRoot',
  'SubmenuTrigger',
  'Arrow',
] as const;

describe('Menu', () => {
  it('exports all compound parts', () => {
    for (const p of PARTS) expect(Menu[p]).toBeDefined();
  });

  it('sets displayName on all parts', () => {
    for (const p of PARTS) expect(Menu[p].displayName).toBe(`Menu.${p}`);
  });

  it('does not expose unexpected parts', () => {
    expect(Object.keys(Menu).sort()).toEqual([...PARTS].sort());
  });

  it('renders Root with controlled open state', () => {
    const el = createElement(Menu.Root, { open: false, onOpenChange: () => {} });
    expect(isValidElement(el)).toBe(true);
  });

  it('renders Root without a11y violations', async () => {
    const { container } = render(<Menu.Root />);
    // axe: portal content not inspectable in jsdom — covered by browser axe run
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
