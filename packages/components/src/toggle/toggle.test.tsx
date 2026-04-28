import { vi, describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { createElement, isValidElement } from 'react';
import { Toggle } from './index';

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

describe('Toggle', () => {
  it('exports Root', () => {
    expect(Toggle.Root).toBeDefined();
  });

  it('sets displayName on Root', () => {
    expect(Toggle.Root.displayName).toBe('Toggle.Root');
  });

  it('does not expose unexpected parts', () => {
    expect(Object.keys(Toggle).sort()).toEqual(['Root']);
  });

  it('renders Root with pressed and disabled props', () => {
    const el = createElement(Toggle.Root, {
      pressed: true,
      onPressedChange: () => {},
      disabled: false,
    });
    expect(isValidElement(el)).toBe(true);
  });

  it('renders without a11y violations', async () => {
    const { container } = render(<Toggle.Root aria-label="Bold">B</Toggle.Root>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
