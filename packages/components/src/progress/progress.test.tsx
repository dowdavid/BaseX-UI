import { vi, describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { createElement, isValidElement } from 'react';
import { Progress } from './index';

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

describe('Progress', () => {
  it('exports compound parts', () => {
    expect(Progress.Root).toBeDefined();
    expect(Progress.Label).toBeDefined();
    expect(Progress.Track).toBeDefined();
    expect(Progress.Indicator).toBeDefined();
    expect(Progress.Value).toBeDefined();
  });

  it('sets displayName on all parts', () => {
    expect(Progress.Root.displayName).toBe('Progress.Root');
    expect(Progress.Label.displayName).toBe('Progress.Label');
    expect(Progress.Track.displayName).toBe('Progress.Track');
    expect(Progress.Indicator.displayName).toBe('Progress.Indicator');
    expect(Progress.Value.displayName).toBe('Progress.Value');
  });

  it('does not expose unexpected parts', () => {
    expect(Object.keys(Progress).sort()).toEqual(['Indicator', 'Label', 'Root', 'Track', 'Value']);
  });

  it('renders Root with value, max, and indeterminate props', () => {
    expect(isValidElement(createElement(Progress.Root, { value: 50, max: 100 }))).toBe(true);
    expect(isValidElement(createElement(Progress.Root, { value: null }))).toBe(true);
  });

  // interaction: Progress has no user interaction — display-only component

  it('renders without a11y violations', async () => {
    const { container } = render(
      <Progress.Root value={50} max={100} aria-label="Upload progress">
        <Progress.Track>
          <Progress.Indicator />
        </Progress.Track>
      </Progress.Root>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
