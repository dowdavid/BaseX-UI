import { vi, describe, it, expect } from 'vitest';

vi.mock('@stylexjs/stylex', () => {
  const m = {
    create: (s: Record<string, unknown>) => s,
    props: () => ({ className: '' }),
    defineVars: (v: Record<string, unknown>) => v,
  };
  return { default: m, ...m };
});
vi.mock('@basex-ui/tokens', () => ({
  tokens: new Proxy({}, { get: (_, p) => `var(--${String(p)})` }),
}));

import { Drawer } from './index';

describe('Drawer', () => {
  it('exports all compound parts', () => {
    expect(Drawer.Root).toBeDefined();
    expect(Drawer.Trigger).toBeDefined();
    expect(Drawer.Portal).toBeDefined();
    expect(Drawer.Backdrop).toBeDefined();
    expect(Drawer.Popup).toBeDefined();
    expect(Drawer.Header).toBeDefined();
    expect(Drawer.Title).toBeDefined();
    expect(Drawer.Description).toBeDefined();
    expect(Drawer.Panel).toBeDefined();
    expect(Drawer.Footer).toBeDefined();
    expect(Drawer.Close).toBeDefined();
  });

  it('sets displayName on all parts', () => {
    expect(Drawer.Root.displayName).toBe('Drawer.Root');
    expect(Drawer.Trigger.displayName).toBe('Drawer.Trigger');
    expect(Drawer.Portal.displayName).toBe('Drawer.Portal');
    expect(Drawer.Backdrop.displayName).toBe('Drawer.Backdrop');
    expect(Drawer.Popup.displayName).toBe('Drawer.Popup');
    expect(Drawer.Header.displayName).toBe('Drawer.Header');
    expect(Drawer.Title.displayName).toBe('Drawer.Title');
    expect(Drawer.Description.displayName).toBe('Drawer.Description');
    expect(Drawer.Panel.displayName).toBe('Drawer.Panel');
    expect(Drawer.Footer.displayName).toBe('Drawer.Footer');
    expect(Drawer.Close.displayName).toBe('Drawer.Close');
  });

  it('does not expose unexpected parts', () => {
    const expectedParts = [
      'Root', 'Trigger', 'Portal', 'Backdrop', 'Popup',
      'Header', 'Title', 'Description', 'Panel', 'Footer', 'Close',
    ];
    const actualParts = Object.keys(Drawer);
    expect(actualParts.sort()).toEqual(expectedParts.sort());
  });
});
