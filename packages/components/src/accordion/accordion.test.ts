import { vi, describe, it, expect } from 'vitest';
import { createElement, isValidElement } from 'react';

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

import { Accordion } from './index';

describe('Accordion', () => {
  it('exports compound parts', () => {
    expect(Accordion.Root).toBeDefined();
    expect(Accordion.Item).toBeDefined();
    expect(Accordion.Header).toBeDefined();
    expect(Accordion.Trigger).toBeDefined();
    expect(Accordion.Panel).toBeDefined();
  });

  it('sets displayName on all parts', () => {
    expect(Accordion.Root.displayName).toBe('Accordion.Root');
    expect(Accordion.Item.displayName).toBe('Accordion.Item');
    expect(Accordion.Header.displayName).toBe('Accordion.Header');
    expect(Accordion.Trigger.displayName).toBe('Accordion.Trigger');
    expect(Accordion.Panel.displayName).toBe('Accordion.Panel');
  });

  it('does not expose unexpected parts', () => {
    expect(Object.keys(Accordion).sort()).toEqual(['Header', 'Item', 'Panel', 'Root', 'Trigger']);
  });

  it('renders nested compound structure as valid React elements', () => {
    const el = createElement(Accordion.Root, {
      defaultValue: ['a'],
      children: createElement(Accordion.Item, {
        value: 'a',
        children: [
          createElement(Accordion.Header, {
            key: 'h',
            children: createElement(Accordion.Trigger, { children: 'Q' }),
          }),
          createElement(Accordion.Panel, { key: 'p', children: 'A' }),
        ],
      }),
    });
    expect(isValidElement(el)).toBe(true);
  });

  it('accepts multiple, disabled, and controlled props on Root', () => {
    const el = createElement(Accordion.Root, {
      multiple: true,
      disabled: true,
      value: ['a'],
      onValueChange: () => {},
      children: createElement(Accordion.Item, { value: 'a' }),
    });
    expect(isValidElement(el)).toBe(true);
  });
});
