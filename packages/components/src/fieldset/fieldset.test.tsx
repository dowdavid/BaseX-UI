import { vi, describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { createElement, isValidElement } from 'react';
import { Fieldset } from './index';

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

describe('Fieldset', () => {
  it('exports compound parts', () => {
    expect(Fieldset.Root).toBeDefined();
    expect(Fieldset.Legend).toBeDefined();
  });

  it('sets displayName on all parts', () => {
    expect(Fieldset.Root.displayName).toBe('Fieldset.Root');
    expect(Fieldset.Legend.displayName).toBe('Fieldset.Legend');
  });

  it('does not expose unexpected parts', () => {
    expect(Object.keys(Fieldset).sort()).toEqual(['Legend', 'Root']);
  });

  it('renders Root with Legend as a valid React element', () => {
    const el = createElement(Fieldset.Root, {
      disabled: false,
      children: createElement(Fieldset.Legend, { children: 'Group' }),
    });
    expect(isValidElement(el)).toBe(true);
  });

  it('renders without a11y violations', async () => {
    const { container } = render(
      <Fieldset.Root>
        <Fieldset.Legend>Personal info</Fieldset.Legend>
      </Fieldset.Root>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
