import { vi, describe, it, expect } from 'vitest';
import { createElement, isValidElement } from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Button } from './index';

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

describe('Button', () => {
  it('exports the Button component', () => {
    expect(Button).toBeDefined();
  });

  it('sets displayName', () => {
    expect(Button.displayName).toBe('Button');
  });

  it('renders as a valid React element', () => {
    const el = createElement(Button, { children: 'Click' });
    expect(isValidElement(el)).toBe(true);
  });

  it('accepts variant, color, and size props', () => {
    const variants = ['solid', 'outline', 'ghost'] as const;
    const colors = ['default', 'secondary', 'destructive'] as const;
    const sizes = ['sm', 'md', 'lg'] as const;
    for (const variant of variants)
      for (const color of colors)
        for (const size of sizes) {
          const el = createElement(Button, { variant, color, size, children: 'x' });
          expect(isValidElement(el)).toBe(true);
        }
  });

  it('accepts disabled prop', () => {
    const el = createElement(Button, { disabled: true, children: 'x' });
    expect(isValidElement(el)).toBe(true);
  });

  it('click calls onClick handler', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    const { getByRole } = render(<Button onClick={onClick}>Click me</Button>);
    await user.click(getByRole('button', { name: 'Click me' }));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it('disabled button does not call onClick', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    const { getAllByRole } = render(
      <Button disabled onClick={onClick}>
        Disabled
      </Button>,
    );
    // Base UI may render multiple button elements; click the first one
    const buttons = getAllByRole('button', { name: 'Disabled' });
    await user.click(buttons[0]);
    expect(onClick).not.toHaveBeenCalled();
  });

  it('renders without a11y violations', async () => {
    const { container } = render(<Button>Click me</Button>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
