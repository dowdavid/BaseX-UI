import { vi, describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { createElement, isValidElement } from 'react';
import { NumberField } from './index';

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

describe('NumberField', () => {
  it('exports compound parts', () => {
    expect(NumberField.Root).toBeDefined();
    expect(NumberField.Group).toBeDefined();
    expect(NumberField.Input).toBeDefined();
    expect(NumberField.Increment).toBeDefined();
    expect(NumberField.Decrement).toBeDefined();
  });

  it('sets displayName on all parts', () => {
    expect(NumberField.Root.displayName).toBe('NumberField.Root');
    expect(NumberField.Group.displayName).toBe('NumberField.Group');
    expect(NumberField.Input.displayName).toBe('NumberField.Input');
    expect(NumberField.Increment.displayName).toBe('NumberField.Increment');
    expect(NumberField.Decrement.displayName).toBe('NumberField.Decrement');
  });

  it('does not expose unexpected parts', () => {
    expect(Object.keys(NumberField).sort()).toEqual([
      'Decrement',
      'Group',
      'Increment',
      'Input',
      'Root',
    ]);
  });

  it('renders Root with min, max, step, controlled value', () => {
    const el = createElement(NumberField.Root, {
      min: 0,
      max: 100,
      step: 1,
      value: 5,
      onValueChange: () => {},
      disabled: false,
    });
    expect(isValidElement(el)).toBe(true);
  });

  it('renders without a11y violations', async () => {
    const { container } = render(
      <NumberField.Root min={0} max={100}>
        <NumberField.Group>
          <NumberField.Decrement aria-label="Decrease" />
          <NumberField.Input aria-label="Quantity" />
          <NumberField.Increment aria-label="Increase" />
        </NumberField.Group>
      </NumberField.Root>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
