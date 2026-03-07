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

import { Menu } from './index';

describe('Menu', () => {
  it('exports all compound parts', () => {
    expect(Menu.Root).toBeDefined();
    expect(Menu.Trigger).toBeDefined();
    expect(Menu.Portal).toBeDefined();
    expect(Menu.Positioner).toBeDefined();
    expect(Menu.Popup).toBeDefined();
    expect(Menu.Item).toBeDefined();
    expect(Menu.LinkItem).toBeDefined();
    expect(Menu.Group).toBeDefined();
    expect(Menu.GroupLabel).toBeDefined();
    expect(Menu.Separator).toBeDefined();
    expect(Menu.CheckboxItem).toBeDefined();
    expect(Menu.CheckboxItemIndicator).toBeDefined();
    expect(Menu.RadioGroup).toBeDefined();
    expect(Menu.RadioItem).toBeDefined();
    expect(Menu.RadioItemIndicator).toBeDefined();
    expect(Menu.Backdrop).toBeDefined();
    expect(Menu.SubmenuRoot).toBeDefined();
    expect(Menu.SubmenuTrigger).toBeDefined();
    expect(Menu.Arrow).toBeDefined();
  });

  it('sets displayName on all parts', () => {
    expect(Menu.Root.displayName).toBe('Menu.Root');
    expect(Menu.Trigger.displayName).toBe('Menu.Trigger');
    expect(Menu.Portal.displayName).toBe('Menu.Portal');
    expect(Menu.Positioner.displayName).toBe('Menu.Positioner');
    expect(Menu.Popup.displayName).toBe('Menu.Popup');
    expect(Menu.Item.displayName).toBe('Menu.Item');
    expect(Menu.LinkItem.displayName).toBe('Menu.LinkItem');
    expect(Menu.Group.displayName).toBe('Menu.Group');
    expect(Menu.GroupLabel.displayName).toBe('Menu.GroupLabel');
    expect(Menu.Separator.displayName).toBe('Menu.Separator');
    expect(Menu.CheckboxItem.displayName).toBe('Menu.CheckboxItem');
    expect(Menu.CheckboxItemIndicator.displayName).toBe('Menu.CheckboxItemIndicator');
    expect(Menu.RadioGroup.displayName).toBe('Menu.RadioGroup');
    expect(Menu.RadioItem.displayName).toBe('Menu.RadioItem');
    expect(Menu.RadioItemIndicator.displayName).toBe('Menu.RadioItemIndicator');
    expect(Menu.Backdrop.displayName).toBe('Menu.Backdrop');
    expect(Menu.SubmenuRoot.displayName).toBe('Menu.SubmenuRoot');
    expect(Menu.SubmenuTrigger.displayName).toBe('Menu.SubmenuTrigger');
    expect(Menu.Arrow.displayName).toBe('Menu.Arrow');
  });

  it('does not expose unexpected parts', () => {
    const expectedParts = [
      'Root',
      'Trigger',
      'Portal',
      'Positioner',
      'Popup',
      'Item',
      'LinkItem',
      'Group',
      'GroupLabel',
      'Separator',
      'CheckboxItem',
      'CheckboxItemIndicator',
      'RadioGroup',
      'RadioItem',
      'RadioItemIndicator',
      'Backdrop',
      'SubmenuRoot',
      'SubmenuTrigger',
      'Arrow',
    ];
    const actualParts = Object.keys(Menu);
    expect(actualParts.sort()).toEqual(expectedParts.sort());
  });
});
