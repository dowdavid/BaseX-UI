import { vi, describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import { createElement, isValidElement } from 'react';
import { Toolbar } from './index';

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
  capitalize: {},
}));

const PARTS = [
  'Root',
  'Button',
  'Link',
  'Group',
  'Separator',
  'ToggleGroup',
  'ToggleItem',
] as const;

describe('Toolbar', () => {
  it('exports all compound parts', () => {
    for (const p of PARTS) expect(Toolbar[p]).toBeDefined();
  });

  it('sets displayName on all parts', () => {
    for (const p of PARTS) expect(Toolbar[p].displayName).toBe(`Toolbar.${p}`);
  });

  it('does not expose unexpected parts', () => {
    expect(Object.keys(Toolbar).sort()).toEqual([...PARTS].sort());
  });

  it('renders Root with orientation and disabled props', () => {
    const el = createElement(Toolbar.Root, { orientation: 'horizontal', disabled: false });
    expect(isValidElement(el)).toBe(true);
  });

  it('keyboard arrow moves focus between toolbar buttons (roving tabindex)', async () => {
    const user = userEvent.setup();
    const { getByRole } = render(
      <Toolbar.Root aria-label="Text editing tools">
        <Toolbar.Button>Bold</Toolbar.Button>
        <Toolbar.Button>Italic</Toolbar.Button>
      </Toolbar.Root>,
    );
    const boldBtn = getByRole('button', { name: 'Bold' });
    const italicBtn = getByRole('button', { name: 'Italic' });
    boldBtn.focus();
    expect(boldBtn).toHaveFocus();
    await user.keyboard('{ArrowRight}');
    expect(italicBtn).toHaveFocus();
  });

  it('renders without a11y violations', async () => {
    const { container } = render(
      <Toolbar.Root aria-label="Text editing tools">
        <Toolbar.Button>Bold</Toolbar.Button>
      </Toolbar.Root>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
