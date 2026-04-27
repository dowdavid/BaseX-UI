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

import { ScrollArea } from './index';

describe('ScrollArea', () => {
  it('exports compound parts', () => {
    expect(ScrollArea.Root).toBeDefined();
    expect(ScrollArea.Viewport).toBeDefined();
    expect(ScrollArea.Scrollbar).toBeDefined();
    expect(ScrollArea.Thumb).toBeDefined();
    expect(ScrollArea.Corner).toBeDefined();
  });

  it('sets displayName on all parts', () => {
    expect(ScrollArea.Root.displayName).toBe('ScrollArea.Root');
    expect(ScrollArea.Viewport.displayName).toBe('ScrollArea.Viewport');
    expect(ScrollArea.Scrollbar.displayName).toBe('ScrollArea.Scrollbar');
    expect(ScrollArea.Thumb.displayName).toBe('ScrollArea.Thumb');
    expect(ScrollArea.Corner.displayName).toBe('ScrollArea.Corner');
  });

  it('does not expose unexpected parts', () => {
    expect(Object.keys(ScrollArea).sort()).toEqual([
      'Corner',
      'Root',
      'Scrollbar',
      'Thumb',
      'Viewport',
    ]);
  });

  it('renders Root with nested compound parts', () => {
    const el = createElement(ScrollArea.Root, {
      children: createElement(ScrollArea.Viewport, {
        children: createElement(ScrollArea.Scrollbar, {
          children: createElement(ScrollArea.Thumb),
        }),
      }),
    });
    expect(isValidElement(el)).toBe(true);
  });
});
