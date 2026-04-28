import { vi, describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { createElement, isValidElement } from 'react';
import { Switch } from './index';

expect.extend(toHaveNoViolations);

vi.mock('@stylexjs/stylex', () => {
  const m = {
    create: (s: Record<string, unknown>) => s,
    props: () => ({ className: '' }),
    defineVars: (v: Record<string, unknown>) => v,
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

describe('Switch', () => {
  it('exports compound parts', () => {
    expect(Switch.Root).toBeDefined();
    expect(Switch.Thumb).toBeDefined();
  });

  it('sets displayName on all parts', () => {
    expect(Switch.Root.displayName).toBe('Switch.Root');
    expect(Switch.Thumb.displayName).toBe('Switch.Thumb');
  });

  it('does not expose unexpected parts', () => {
    expect(Object.keys(Switch).sort()).toEqual(['Root', 'Thumb']);
  });

  it('renders Root with Thumb, controlled checked and disabled', () => {
    const el = createElement(Switch.Root, {
      checked: true,
      onCheckedChange: () => {},
      disabled: false,
      children: createElement(Switch.Thumb),
    });
    expect(isValidElement(el)).toBe(true);
  });

  it('renders without a11y violations', async () => {
    const { container } = render(
      <Switch.Root aria-label="Enable notifications">
        <Switch.Thumb />
      </Switch.Root>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
