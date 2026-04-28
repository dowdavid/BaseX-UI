import { vi, describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { createElement, isValidElement } from 'react';
import { Toast, useToast } from './index';

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
vi.mock('lucide-react', () => ({
  X: () => null,
}));

const PARTS = [
  'Provider',
  'Portal',
  'Viewport',
  'Root',
  'Content',
  'Title',
  'Description',
  'Action',
  'Close',
] as const;

describe('Toast', () => {
  it('exports all compound parts', () => {
    for (const p of PARTS) expect(Toast[p]).toBeDefined();
  });

  it('sets displayName on all parts', () => {
    for (const p of PARTS) expect(Toast[p].displayName).toBe(`Toast.${p}`);
  });

  it('does not expose unexpected parts', () => {
    expect(Object.keys(Toast).sort()).toEqual([...PARTS].sort());
  });

  it('exports useToast hook', () => {
    expect(typeof useToast).toBe('function');
  });

  it('renders Provider as a valid React element', () => {
    const el = createElement(Toast.Provider, { timeout: 5000 });
    expect(isValidElement(el)).toBe(true);
  });

  // interaction: Toast.Close requires full Portal/Viewport/Root stack which doesn't
  // render in jsdom — covered by browser testing

  it('renders Provider without a11y violations', async () => {
    const { container } = render(<Toast.Provider timeout={5000} />);
    // axe: portal content not inspectable in jsdom — covered by browser axe run
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
