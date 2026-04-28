import { vi, describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { createElement, isValidElement } from 'react';
import { Avatar } from './index';

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

  it('renders without a11y violations', async () => {
    const { container } = render(
      <Avatar.Root>
        <Avatar.Image src="/avatar.png" alt="User avatar" />
        <Avatar.Fallback>DD</Avatar.Fallback>
      </Avatar.Root>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
