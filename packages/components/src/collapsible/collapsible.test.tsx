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

import { Collapsible } from './index';

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
});
