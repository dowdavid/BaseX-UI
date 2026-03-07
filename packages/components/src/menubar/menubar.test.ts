import { vi, describe, it, expect } from 'vitest';

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

import { Menubar } from './index';

describe('Menubar', () => {
  it('exports the Menubar component', () => {
    expect(Menubar).toBeDefined();
  });

  it('sets displayName', () => {
    expect(Menubar.displayName).toBe('Menubar');
  });
});
