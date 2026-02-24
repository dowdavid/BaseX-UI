import { describe, it, expect } from 'vitest';
import {
  resolveIntent,
  checkUsage,
  getAnimationPreset,
  getAnimationPresetForUseCase,
  animationPresets,
} from './index';

describe('resolveIntent', () => {
  it('matches a button intent', () => {
    const result = resolveIntent('I need a submit button');
    expect(result).not.toBeNull();
    expect(result!.intent.component).toBe('Button');
  });

  it('matches an accordion intent', () => {
    const result = resolveIntent('collapsible FAQ sections');
    expect(result).not.toBeNull();
    expect(result!.intent.component).toBe('Accordion');
  });

  it('returns null for gibberish', () => {
    const result = resolveIntent('xyzzy plugh abracadabra');
    expect(result).toBeNull();
  });

  it('includes anti-pattern warnings when applicable', () => {
    const result = resolveIntent('button for navigation to another page');
    expect(result).not.toBeNull();
    expect(result!.warnings.length).toBeGreaterThan(0);
    expect(result!.warnings[0]!.component).toBe('Button');
  });
});

describe('checkUsage', () => {
  it('catches navigation misuse for Button', () => {
    const warnings = checkUsage('Button', 'navigation to another page');
    expect(warnings.length).toBeGreaterThan(0);
    expect(warnings[0]!.alternative).toContain('Link');
  });

  it('passes valid button usage', () => {
    const warnings = checkUsage('Button', 'submit form data');
    expect(warnings).toHaveLength(0);
  });
});

describe('getAnimationPreset', () => {
  it('finds a preset by name', () => {
    const preset = getAnimationPreset('State');
    expect(preset).toBeDefined();
    expect(preset!.duration).toBe('100ms');
  });

  it('is case-insensitive', () => {
    const preset = getAnimationPreset('expand');
    expect(preset).toBeDefined();
    expect(preset!.name).toBe('Expand');
  });

  it('returns undefined for unknown preset', () => {
    const preset = getAnimationPreset('nonexistent');
    expect(preset).toBeUndefined();
  });
});

describe('getAnimationPresetForUseCase', () => {
  it('maps hover to State preset', () => {
    const preset = getAnimationPresetForUseCase('hover');
    expect(preset).toBeDefined();
    expect(preset!.name).toBe('State');
  });

  it('maps accordion panels to Expand preset', () => {
    const preset = getAnimationPresetForUseCase('accordion panels');
    expect(preset).toBeDefined();
    expect(preset!.name).toBe('Expand');
  });

  it('maps popover to Enter preset', () => {
    const preset = getAnimationPresetForUseCase('popover');
    expect(preset).toBeDefined();
    expect(preset!.name).toBe('Enter');
  });
});

describe('animationPresets', () => {
  it('has 5 entries', () => {
    expect(animationPresets).toHaveLength(5);
  });

  it('each preset has required fields', () => {
    for (const preset of animationPresets) {
      expect(preset).toHaveProperty('name');
      expect(preset).toHaveProperty('duration');
      expect(preset).toHaveProperty('durationToken');
      expect(preset).toHaveProperty('easing');
      expect(preset).toHaveProperty('easingToken');
      expect(preset).toHaveProperty('description');
      expect(preset).toHaveProperty('useFor');
      expect(Array.isArray(preset.useFor)).toBe(true);
    }
  });
});
