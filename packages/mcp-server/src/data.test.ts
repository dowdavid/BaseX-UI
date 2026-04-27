import { describe, it, expect } from 'vitest';
import {
  listComponents,
  getComponent,
  searchComponents,
  getComponentSetup,
  getTokensByCategory,
} from './data';

describe('listComponents', () => {
  it('returns all registered components', () => {
    const list = listComponents();
    const names = list.map((c) => c.name);
    expect(names).toContain('Button');
    expect(names).toContain('Accordion');
    expect(names).toContain('Tabs');
    expect(names).toContain('Select');
    expect(list).toHaveLength(31);
  });
});

describe('getComponent', () => {
  it('finds a component case-insensitively', () => {
    expect(getComponent('button')).toBeDefined();
    expect(getComponent('Button')).toBeDefined();
    expect(getComponent('BUTTON')).toBeDefined();
    expect(getComponent('accordion')).toBeDefined();
  });

  it('returns undefined for unknown component', () => {
    expect(getComponent('nonexistent')).toBeUndefined();
  });
});

describe('searchComponents', () => {
  it('matches by name', () => {
    const results = searchComponents('button');
    expect(results.length).toBeGreaterThan(0);
    expect(results[0]!.name).toBe('Button');
  });

  it('matches by description', () => {
    const results = searchComponents('collapsible');
    expect(results.length).toBeGreaterThan(0);
    expect(results[0]!.name).toBe('Accordion');
  });

  it('matches by category', () => {
    const results = searchComponents('actions');
    expect(results.length).toBeGreaterThan(0);
    expect(results[0]!.name).toBe('Button');
  });
});

describe('getComponentSetup', () => {
  it('returns setup for button with null cssRequirements', () => {
    const setup = getComponentSetup('button');
    expect(setup).not.toBeNull();
    expect(setup!.name).toBe('Button');
    expect(setup!.cssRequirements).toBeNull();
    expect(setup!.animationPresets.length).toBeGreaterThan(0);
  });

  it('returns setup for accordion with non-null cssRequirements', () => {
    const setup = getComponentSetup('accordion');
    expect(setup).not.toBeNull();
    expect(setup!.name).toBe('Accordion');
    expect(setup!.cssRequirements).not.toBeNull();
    expect(setup!.cssRequirements!.css).toContain('basex-accordion-panel');
    expect(setup!.animationPresets.length).toBeGreaterThan(0);
  });

  it('returns requiredProps for accordion Item', () => {
    const setup = getComponentSetup('accordion');
    expect(setup).not.toBeNull();
    const valueProps = setup!.requiredProps.filter((p) => p.prop === 'value');
    expect(valueProps.length).toBeGreaterThan(0);
    expect(valueProps[0]!.part).toBe('Item');
  });

  it('returns null for unknown component', () => {
    expect(getComponentSetup('nonexistent')).toBeNull();
  });
});

describe('getTokensByCategory', () => {
  it('filters by category', () => {
    const result = getTokensByCategory('colors');
    expect(Object.keys(result)).toEqual(['colors']);
    expect(result['colors']!.length).toBeGreaterThan(0);
  });

  it('returns all categories when omitted', () => {
    const result = getTokensByCategory();
    expect(Object.keys(result)).toContain('colors');
    expect(Object.keys(result)).toContain('spacing');
    expect(Object.keys(result)).toContain('typography');
    expect(Object.keys(result)).toContain('radius');
    expect(Object.keys(result)).toContain('motion');
  });
});
