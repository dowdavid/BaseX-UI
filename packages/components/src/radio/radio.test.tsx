import { vi, describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import { createElement, isValidElement } from 'react';
import { Radio } from './index';

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

describe('Radio', () => {
  it('exports compound parts', () => {
    expect(Radio.Group).toBeDefined();
    expect(Radio.Root).toBeDefined();
    expect(Radio.Indicator).toBeDefined();
  });

  it('sets displayName on all parts', () => {
    expect(Radio.Group.displayName).toBe('Radio.Group');
    expect(Radio.Root.displayName).toBe('Radio.Root');
    expect(Radio.Indicator.displayName).toBe('Radio.Indicator');
  });

  it('does not expose unexpected parts', () => {
    expect(Object.keys(Radio).sort()).toEqual(['Group', 'Indicator', 'Root']);
  });

  it('renders Group with controlled value, orientation, and disabled', () => {
    const el = createElement(Radio.Group, {
      value: 'a',
      onValueChange: () => {},
      orientation: 'vertical',
      disabled: false,
      children: createElement(Radio.Root, {
        value: 'a',
        children: createElement(Radio.Indicator),
      }),
    });
    expect(isValidElement(el)).toBe(true);
  });

  it('click radio item becomes checked (aria-checked)', async () => {
    const user = userEvent.setup();
    const { getAllByRole } = render(
      <Radio.Group aria-label="Color">
        <Radio.Root value="red" aria-label="Red">
          <Radio.Indicator />
        </Radio.Root>
        <Radio.Root value="blue" aria-label="Blue">
          <Radio.Indicator />
        </Radio.Root>
      </Radio.Group>,
    );
    const radios = getAllByRole('radio');
    expect(radios[0]).toHaveAttribute('aria-checked', 'false');
    await user.click(radios[0]);
    expect(radios[0]).toHaveAttribute('aria-checked', 'true');
  });

  it('renders without a11y violations', async () => {
    const { container } = render(
      <Radio.Group aria-label="Color">
        <Radio.Root value="red">
          <Radio.Indicator />
          Red
        </Radio.Root>
        <Radio.Root value="blue">
          <Radio.Indicator />
          Blue
        </Radio.Root>
      </Radio.Group>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
