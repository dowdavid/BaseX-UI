import { vi, describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import { createElement, isValidElement } from 'react';
import { Tabs } from './index';

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

const PARTS = ['Root', 'List', 'Tab', 'Panel', 'Indicator'] as const;

describe('Tabs', () => {
  it('exports all compound parts', () => {
    for (const p of PARTS) expect(Tabs[p]).toBeDefined();
  });

  it('sets displayName on all parts', () => {
    for (const p of PARTS) expect(Tabs[p].displayName).toBe(`Tabs.${p}`);
  });

  it('does not expose unexpected parts', () => {
    expect(Object.keys(Tabs).sort()).toEqual([...PARTS].sort());
  });

  it('renders nested compound structure', () => {
    const el = createElement(Tabs.Root, {
      defaultValue: 'a',
      orientation: 'horizontal',
      children: [
        createElement(Tabs.List, {
          key: 'l',
          children: createElement(Tabs.Tab, { value: 'a', children: 'A' }),
        }),
        createElement(Tabs.Panel, { key: 'p', value: 'a', children: 'Content' }),
      ],
    });
    expect(isValidElement(el)).toBe(true);
  });

  it('click tab makes its panel visible (aria-selected)', async () => {
    const user = userEvent.setup();
    const { getByRole } = render(
      <Tabs.Root defaultValue="tab1">
        <Tabs.List>
          <Tabs.Tab value="tab1">Tab 1</Tabs.Tab>
          <Tabs.Tab value="tab2">Tab 2</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="tab1">Panel 1</Tabs.Panel>
        <Tabs.Panel value="tab2">Panel 2</Tabs.Panel>
      </Tabs.Root>,
    );
    const tab1 = getByRole('tab', { name: 'Tab 1' });
    const tab2 = getByRole('tab', { name: 'Tab 2' });
    expect(tab1).toHaveAttribute('aria-selected', 'true');
    expect(tab2).toHaveAttribute('aria-selected', 'false');
    await user.click(tab2);
    expect(tab2).toHaveAttribute('aria-selected', 'true');
    expect(tab1).toHaveAttribute('aria-selected', 'false');
  });

  it('renders without a11y violations', async () => {
    const { container } = render(
      <Tabs.Root defaultValue="tab1">
        <Tabs.List>
          <Tabs.Tab value="tab1">Tab 1</Tabs.Tab>
          <Tabs.Tab value="tab2">Tab 2</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="tab1">Panel 1</Tabs.Panel>
        <Tabs.Panel value="tab2">Panel 2</Tabs.Panel>
      </Tabs.Root>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
