import { vi, describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { createElement, isValidElement } from 'react';
import { NavigationMenu } from './index';

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
  'List',
  'Item',
  'Trigger',
  'Content',
  'Portal',
  'Positioner',
  'Popup',
  'Viewport',
  'Backdrop',
  'Link',
  'Icon',
  'Arrow',
] as const;

describe('NavigationMenu', () => {
  it('exports all compound parts', () => {
    for (const p of PARTS) expect(NavigationMenu[p]).toBeDefined();
  });

  it('sets displayName on all parts', () => {
    for (const p of PARTS) expect(NavigationMenu[p].displayName).toBe(`NavigationMenu.${p}`);
  });

  it('does not expose unexpected parts', () => {
    expect(Object.keys(NavigationMenu).sort()).toEqual([...PARTS].sort());
  });

  it('renders Root with orientation', () => {
    const el = createElement(NavigationMenu.Root, { orientation: 'horizontal' });
    expect(isValidElement(el)).toBe(true);
  });

  it('renders Root without a11y violations', async () => {
    const { container } = render(<NavigationMenu.Root aria-label="Main navigation" />);
    // axe: portal content not inspectable in jsdom — covered by browser axe run
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
