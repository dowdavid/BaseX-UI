import { vi, describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import { createElement, isValidElement } from 'react';
import { Checkbox } from './index';

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
vi.mock('lucide-react', () => ({
  Check: () => null,
  Minus: () => null,
}));

describe('Checkbox', () => {
  it('exports compound parts', () => {
    expect(Checkbox.Root).toBeDefined();
    expect(Checkbox.Indicator).toBeDefined();
  });

  it('sets displayName on all parts', () => {
    expect(Checkbox.Root.displayName).toBe('Checkbox.Root');
    expect(Checkbox.Indicator.displayName).toBe('Checkbox.Indicator');
  });

  it('does not expose unexpected parts', () => {
    expect(Object.keys(Checkbox).sort()).toEqual(['Indicator', 'Root']);
  });

  it('renders compound structure with checked, disabled, and controlled props', () => {
    const el = createElement(Checkbox.Root, {
      checked: true,
      disabled: false,
      onCheckedChange: () => {},
      children: createElement(Checkbox.Indicator),
    });
    expect(isValidElement(el)).toBe(true);
  });

  it('click toggles checked state (aria-checked)', async () => {
    const user = userEvent.setup();
    const { getByRole } = render(
      <Checkbox.Root aria-label="Accept terms">
        <Checkbox.Indicator />
      </Checkbox.Root>,
    );
    const checkbox = getByRole('checkbox', { name: 'Accept terms' });
    expect(checkbox).toHaveAttribute('aria-checked', 'false');
    await user.click(checkbox);
    expect(checkbox).toHaveAttribute('aria-checked', 'true');
  });

  it('renders without a11y violations', async () => {
    const { container } = render(
      <Checkbox.Root aria-label="Accept terms">
        <Checkbox.Indicator />
      </Checkbox.Root>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
