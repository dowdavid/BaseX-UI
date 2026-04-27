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
  capitalize: (s: string) => s.charAt(0).toUpperCase() + s.slice(1),
}));

import { Select } from './index';

describe('Select', () => {
  it('exports all compound parts', () => {
    expect(Select.Root).toBeDefined();
    expect(Select.Trigger).toBeDefined();
    expect(Select.Value).toBeDefined();
    expect(Select.Icon).toBeDefined();
    expect(Select.Portal).toBeDefined();
    expect(Select.Positioner).toBeDefined();
    expect(Select.Popup).toBeDefined();
    expect(Select.Viewport).toBeDefined();
    expect(Select.Item).toBeDefined();
    expect(Select.ItemText).toBeDefined();
    expect(Select.ItemIndicator).toBeDefined();
    expect(Select.Group).toBeDefined();
    expect(Select.GroupLabel).toBeDefined();
    expect(Select.Separator).toBeDefined();
    expect(Select.ScrollUpButton).toBeDefined();
    expect(Select.ScrollDownButton).toBeDefined();
  });

  it('sets displayName on all parts', () => {
    expect(Select.Root.displayName).toBe('Select.Root');
    expect(Select.Trigger.displayName).toBe('Select.Trigger');
    expect(Select.Value.displayName).toBe('Select.Value');
    expect(Select.Icon.displayName).toBe('Select.Icon');
    expect(Select.Portal.displayName).toBe('Select.Portal');
    expect(Select.Positioner.displayName).toBe('Select.Positioner');
    expect(Select.Popup.displayName).toBe('Select.Popup');
    expect(Select.Viewport.displayName).toBe('Select.Viewport');
    expect(Select.Item.displayName).toBe('Select.Item');
    expect(Select.ItemText.displayName).toBe('Select.ItemText');
    expect(Select.ItemIndicator.displayName).toBe('Select.ItemIndicator');
    expect(Select.Group.displayName).toBe('Select.Group');
    expect(Select.GroupLabel.displayName).toBe('Select.GroupLabel');
    expect(Select.Separator.displayName).toBe('Select.Separator');
    expect(Select.ScrollUpButton.displayName).toBe('Select.ScrollUpButton');
    expect(Select.ScrollDownButton.displayName).toBe('Select.ScrollDownButton');
  });

  it('does not expose unexpected parts', () => {
    const expectedParts = [
      'Root',
      'Trigger',
      'Value',
      'Icon',
      'Portal',
      'Positioner',
      'Popup',
      'Viewport',
      'Item',
      'ItemText',
      'ItemIndicator',
      'Group',
      'GroupLabel',
      'Separator',
      'ScrollUpButton',
      'ScrollDownButton',
    ];
    const actualParts = Object.keys(Select);
    expect(actualParts.sort()).toEqual(expectedParts.sort());
  });
});
