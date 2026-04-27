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

import { Toast, useToast } from './index';

describe('Toast', () => {
  it('exports all compound parts', () => {
    expect(Toast.Provider).toBeDefined();
    expect(Toast.Portal).toBeDefined();
    expect(Toast.Viewport).toBeDefined();
    expect(Toast.Root).toBeDefined();
    expect(Toast.Content).toBeDefined();
    expect(Toast.Title).toBeDefined();
    expect(Toast.Description).toBeDefined();
    expect(Toast.Action).toBeDefined();
    expect(Toast.Close).toBeDefined();
  });

  it('sets displayName on all parts', () => {
    expect(Toast.Provider.displayName).toBe('Toast.Provider');
    expect(Toast.Portal.displayName).toBe('Toast.Portal');
    expect(Toast.Viewport.displayName).toBe('Toast.Viewport');
    expect(Toast.Root.displayName).toBe('Toast.Root');
    expect(Toast.Content.displayName).toBe('Toast.Content');
    expect(Toast.Title.displayName).toBe('Toast.Title');
    expect(Toast.Description.displayName).toBe('Toast.Description');
    expect(Toast.Action.displayName).toBe('Toast.Action');
    expect(Toast.Close.displayName).toBe('Toast.Close');
  });

  it('does not expose unexpected parts', () => {
    const expectedParts = [
      'Provider',
      'Portal',
      'Viewport',
      'Root',
      'Content',
      'Title',
      'Description',
      'Action',
      'Close',
    ];
    const actualParts = Object.keys(Toast);
    expect(actualParts.sort()).toEqual(expectedParts.sort());
  });

  it('exposes a useToast hook (re-export of Base UI useToastManager)', () => {
    expect(typeof useToast).toBe('function');
  });
});
