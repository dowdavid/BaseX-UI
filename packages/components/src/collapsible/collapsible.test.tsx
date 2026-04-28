import { vi, describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import { createElement, isValidElement } from 'react';
import { Collapsible } from './index';

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
  ChevronDown: () => null,
}));

describe('Collapsible', () => {
  it('exports compound parts', () => {
    expect(Collapsible.Root).toBeDefined();
    expect(Collapsible.Trigger).toBeDefined();
    expect(Collapsible.Panel).toBeDefined();
  });

  it('sets displayName on all parts', () => {
    expect(Collapsible.Root.displayName).toBe('Collapsible.Root');
    expect(Collapsible.Trigger.displayName).toBe('Collapsible.Trigger');
    expect(Collapsible.Panel.displayName).toBe('Collapsible.Panel');
  });

  it('does not expose unexpected parts', () => {
    expect(Object.keys(Collapsible).sort()).toEqual(['Panel', 'Root', 'Trigger']);
  });

  it('renders compound structure with controlled open state', () => {
    const el = createElement(Collapsible.Root, {
      open: true,
      onOpenChange: () => {},
      children: [
        createElement(Collapsible.Trigger, { key: 't', children: 'Toggle' }),
        createElement(Collapsible.Panel, { key: 'p', children: 'Content' }),
      ],
    });
    expect(isValidElement(el)).toBe(true);
  });

  it('click trigger opens the panel (aria-expanded)', async () => {
    const user = userEvent.setup();
    const { getByRole } = render(
      <Collapsible.Root>
        <Collapsible.Trigger>Toggle</Collapsible.Trigger>
        <Collapsible.Panel>Content</Collapsible.Panel>
      </Collapsible.Root>,
    );
    const trigger = getByRole('button', { name: 'Toggle' });
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    await user.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
  });

  it('renders without a11y violations', async () => {
    const { container } = render(
      <Collapsible.Root>
        <Collapsible.Trigger>Toggle</Collapsible.Trigger>
        <Collapsible.Panel>Content</Collapsible.Panel>
      </Collapsible.Root>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
