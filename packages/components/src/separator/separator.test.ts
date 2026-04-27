import { vi, describe, it, expect } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import { createElement } from 'react';

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

import { Separator } from './index';

describe('Separator', () => {
  it('exports Root part', () => {
    expect(Separator.Root).toBeDefined();
  });

  it('sets displayName on Root', () => {
    expect(Separator.Root.displayName).toBe('Separator.Root');
  });

  it('does not expose unexpected parts', () => {
    expect(Object.keys(Separator).sort()).toEqual(['Root']);
  });

  it('renders horizontal with semantic role and aria-orientation', () => {
    const html = renderToStaticMarkup(createElement(Separator.Root, {}));
    expect(html).toContain('role="separator"');
    expect(html).toContain('aria-orientation="horizontal"');
  });

  it('renders vertical orientation', () => {
    const html = renderToStaticMarkup(createElement(Separator.Root, { orientation: 'vertical' }));
    expect(html).toContain('aria-orientation="vertical"');
  });

  it('decorative variant exposes role="none" and no aria-orientation', () => {
    const html = renderToStaticMarkup(createElement(Separator.Root, { decorative: true }));
    expect(html).toContain('role="none"');
    expect(html).not.toContain('aria-orientation');
  });
});
