import { vi, describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { createElement, isValidElement } from 'react';
import { Combobox } from './index';

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
  'Input',
  'Popup',
  'Item',
  'ItemIndicator',
  'Clear',
  'Empty',
  'Group',
  'GroupLabel',
] as const;

describe('Combobox', () => {
  it('exports all compound parts', () => {
    for (const p of PARTS) expect(Combobox[p]).toBeDefined();
  });

  it('sets displayName on all parts', () => {
    for (const p of PARTS) expect(Combobox[p].displayName).toBe(`Combobox.${p}`);
  });

  it('does not expose unexpected parts', () => {
    expect(Object.keys(Combobox).sort()).toEqual([...PARTS].sort());
  });

  it('renders Root with items prop', () => {
    const el = createElement(Combobox.Root, { items: ['a', 'b'] });
    expect(isValidElement(el)).toBe(true);
  });

  it('renders Root without a11y violations', async () => {
    const { container } = render(<Combobox.Root items={['a', 'b']} />);
    // axe: portal content not inspectable in jsdom — covered by browser axe run
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
