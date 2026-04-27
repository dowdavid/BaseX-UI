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

import { Avatar } from './index';

describe('Avatar', () => {
  it('exports compound parts', () => {
    expect(Avatar.Root).toBeDefined();
    expect(Avatar.Image).toBeDefined();
    expect(Avatar.Fallback).toBeDefined();
  });

  it('sets displayName on all parts', () => {
    expect(Avatar.Root.displayName).toBe('Avatar.Root');
    expect(Avatar.Image.displayName).toBe('Avatar.Image');
    expect(Avatar.Fallback.displayName).toBe('Avatar.Fallback');
  });

  it('does not expose unexpected parts', () => {
    expect(Object.keys(Avatar).sort()).toEqual(['Fallback', 'Image', 'Root']);
  });

  it('renders compound structure as valid React elements', () => {
    const el = createElement(Avatar.Root, {
      children: [
        createElement(Avatar.Image, { key: 'i', src: '/x.png', alt: 'x' }),
        createElement(Avatar.Fallback, { key: 'f', children: 'DD' }),
      ],
    });
    expect(isValidElement(el)).toBe(true);
  });
});
