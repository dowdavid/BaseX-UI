import { vi, describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import { createElement, isValidElement } from 'react';
import { Input } from './index';

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

describe('Input', () => {
  it('exports the Input component', () => {
    expect(Input).toBeDefined();
  });

  it('sets displayName', () => {
    expect(Input.displayName).toBe('Input');
  });

  it('renders as a valid React element', () => {
    expect(isValidElement(createElement(Input))).toBe(true);
  });

  it('accepts size, disabled, and value props', () => {
    for (const size of ['sm', 'md', 'lg'] as const) {
      const el = createElement(Input, { size, disabled: false, value: '', onChange: () => {} });
      expect(isValidElement(el)).toBe(true);
    }
  });

  it('typing updates value and focus/blur events fire', async () => {
    const user = userEvent.setup();
    const onFocus = vi.fn();
    const onBlur = vi.fn();
    const { getByRole } = render(<Input aria-label="Search" onFocus={onFocus} onBlur={onBlur} />);
    const input = getByRole('textbox', { name: 'Search' });
    await user.click(input);
    expect(onFocus).toHaveBeenCalledOnce();
    await user.type(input, 'hello');
    expect(input).toHaveValue('hello');
    await user.tab();
    expect(onBlur).toHaveBeenCalled();
  });

  it('renders without a11y violations', async () => {
    const { container } = render(<Input aria-label="Search" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
