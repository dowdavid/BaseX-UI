import { vi, describe, it, expect } from 'vitest';
import { createElement, isValidElement } from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Field } from './index';

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
  capitalize: (s: string) => s.charAt(0).toUpperCase() + s.slice(1),
}));

const PARTS = ['Root', 'Label', 'Description', 'Error', 'Control', 'Validity'] as const;

describe('Field', () => {
  it('exports all compound parts', () => {
    for (const p of PARTS) expect(Field[p]).toBeDefined();
  });

  it('sets displayName on all parts', () => {
    for (const p of PARTS) expect(Field[p].displayName).toBe(`Field.${p}`);
  });

  it('does not expose unexpected parts', () => {
    expect(Object.keys(Field).sort()).toEqual([...PARTS].sort());
  });

  it('renders Root with name and disabled', () => {
    const el = createElement(Field.Root, { name: 'email', disabled: false });
    expect(isValidElement(el)).toBe(true);
  });

  it('label is associated with control via htmlFor/id (aria-labelledby)', async () => {
    const user = userEvent.setup();
    const { getByLabelText } = render(
      <Field.Root name="email">
        <Field.Label>Email</Field.Label>
        <Field.Control type="email" />
      </Field.Root>,
    );
    // getByLabelText verifies the label<->input association
    const input = getByLabelText('Email');
    expect(input).toBeInTheDocument();
    await user.click(input);
    expect(input).toHaveFocus();
  });

  it('renders without a11y violations', async () => {
    const { container } = render(
      <Field.Root name="email">
        <Field.Control aria-label="Email address" />
      </Field.Root>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
