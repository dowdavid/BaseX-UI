import { vi, describe, it, expect } from 'vitest';
import { createElement, isValidElement } from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import { ToggleGroup } from './index';

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

describe('ToggleGroup', () => {
  it('exports compound parts', () => {
    expect(ToggleGroup.Root).toBeDefined();
    expect(ToggleGroup.Item).toBeDefined();
  });

  it('sets displayName on all parts', () => {
    expect(ToggleGroup.Root.displayName).toBe('ToggleGroup.Root');
    expect(ToggleGroup.Item.displayName).toBe('ToggleGroup.Item');
  });

  it('does not expose unexpected parts', () => {
    expect(Object.keys(ToggleGroup).sort()).toEqual(['Item', 'Root']);
  });

  it('renders Root as a valid React element (default single mode)', () => {
    const el = createElement(ToggleGroup.Root, {
      defaultValue: 'a',
      children: createElement(ToggleGroup.Item, { value: 'a', children: 'A' }),
    });
    expect(isValidElement(el)).toBe(true);
  });

  it('renders Root in multiple mode', () => {
    const el = createElement(ToggleGroup.Root, {
      type: 'multiple',
      defaultValue: ['a'],
      children: createElement(ToggleGroup.Item, { value: 'a', children: 'A' }),
    });
    expect(isValidElement(el)).toBe(true);
  });

  it('accepts orientation, disabled, and controlled props', () => {
    const el = createElement(ToggleGroup.Root, {
      orientation: 'vertical',
      disabled: true,
      value: 'a',
      onValueChange: () => {},
      children: createElement(ToggleGroup.Item, { value: 'a', children: 'A' }),
    });
    expect(isValidElement(el)).toBe(true);
  });

  it('click item sets pressed; single mode — only one pressed at a time', async () => {
    const user = userEvent.setup();
    const { getAllByRole } = render(
      <ToggleGroup.Root aria-label="Text formatting">
        <ToggleGroup.Item value="bold" aria-label="Bold">
          B
        </ToggleGroup.Item>
        <ToggleGroup.Item value="italic" aria-label="Italic">
          I
        </ToggleGroup.Item>
      </ToggleGroup.Root>,
    );
    const buttons = getAllByRole('button');
    // Click Bold
    await user.click(buttons[0]);
    expect(buttons[0]).toHaveAttribute('aria-pressed', 'true');
    // Click Italic — Bold should be deselected in single mode
    await user.click(buttons[1]);
    expect(buttons[1]).toHaveAttribute('aria-pressed', 'true');
    expect(buttons[0]).toHaveAttribute('aria-pressed', 'false');
  });

  it('renders without a11y violations', async () => {
    const { container } = render(
      <ToggleGroup.Root aria-label="Text formatting">
        <ToggleGroup.Item value="bold" aria-label="Bold">
          B
        </ToggleGroup.Item>
        <ToggleGroup.Item value="italic" aria-label="Italic">
          I
        </ToggleGroup.Item>
      </ToggleGroup.Root>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
