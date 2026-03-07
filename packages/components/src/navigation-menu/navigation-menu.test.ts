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
vi.mock('@basex-ui/styles', () => ({
  focusRing: {},
  capitalize: {},
}));

import { NavigationMenu } from './index';

describe('NavigationMenu', () => {
  it('exports all compound parts', () => {
    expect(NavigationMenu.Root).toBeDefined();
    expect(NavigationMenu.List).toBeDefined();
    expect(NavigationMenu.Item).toBeDefined();
    expect(NavigationMenu.Trigger).toBeDefined();
    expect(NavigationMenu.Content).toBeDefined();
    expect(NavigationMenu.Portal).toBeDefined();
    expect(NavigationMenu.Positioner).toBeDefined();
    expect(NavigationMenu.Popup).toBeDefined();
    expect(NavigationMenu.Viewport).toBeDefined();
    expect(NavigationMenu.Backdrop).toBeDefined();
    expect(NavigationMenu.Link).toBeDefined();
    expect(NavigationMenu.Icon).toBeDefined();
    expect(NavigationMenu.Arrow).toBeDefined();
  });

  it('sets displayName on all parts', () => {
    expect(NavigationMenu.Root.displayName).toBe('NavigationMenu.Root');
    expect(NavigationMenu.List.displayName).toBe('NavigationMenu.List');
    expect(NavigationMenu.Item.displayName).toBe('NavigationMenu.Item');
    expect(NavigationMenu.Trigger.displayName).toBe('NavigationMenu.Trigger');
    expect(NavigationMenu.Content.displayName).toBe('NavigationMenu.Content');
    expect(NavigationMenu.Portal.displayName).toBe('NavigationMenu.Portal');
    expect(NavigationMenu.Positioner.displayName).toBe('NavigationMenu.Positioner');
    expect(NavigationMenu.Popup.displayName).toBe('NavigationMenu.Popup');
    expect(NavigationMenu.Viewport.displayName).toBe('NavigationMenu.Viewport');
    expect(NavigationMenu.Backdrop.displayName).toBe('NavigationMenu.Backdrop');
    expect(NavigationMenu.Link.displayName).toBe('NavigationMenu.Link');
    expect(NavigationMenu.Icon.displayName).toBe('NavigationMenu.Icon');
    expect(NavigationMenu.Arrow.displayName).toBe('NavigationMenu.Arrow');
  });

  it('does not expose unexpected parts', () => {
    const expectedParts = [
      'Root',
      'List',
      'Item',
      'Trigger',
      'Content',
      'Portal',
      'Positioner',
      'Popup',
      'Viewport',
      'Backdrop',
      'Link',
      'Icon',
      'Arrow',
    ];
    const actualParts = Object.keys(NavigationMenu);
    expect(actualParts.sort()).toEqual(expectedParts.sort());
  });
});
