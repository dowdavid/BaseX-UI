import { vi, describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { createElement, isValidElement } from 'react';
import { Meter } from './index';

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

describe('Meter', () => {
  it('exports compound parts', () => {
    expect(Meter.Root).toBeDefined();
    expect(Meter.Label).toBeDefined();
    expect(Meter.Track).toBeDefined();
    expect(Meter.Indicator).toBeDefined();
    expect(Meter.Value).toBeDefined();
  });

  it('sets displayName on all parts', () => {
    expect(Meter.Root.displayName).toBe('Meter.Root');
    expect(Meter.Label.displayName).toBe('Meter.Label');
    expect(Meter.Track.displayName).toBe('Meter.Track');
    expect(Meter.Indicator.displayName).toBe('Meter.Indicator');
    expect(Meter.Value.displayName).toBe('Meter.Value');
  });

  it('does not expose unexpected parts', () => {
    expect(Object.keys(Meter).sort()).toEqual(['Indicator', 'Label', 'Root', 'Track', 'Value']);
  });

  it('renders Root with value, min, and max props', () => {
    const el = createElement(Meter.Root, { value: 50, min: 0, max: 100 });
    expect(isValidElement(el)).toBe(true);
  });

  it('renders without a11y violations', async () => {
    const { container } = render(
      <Meter.Root value={50} min={0} max={100} aria-label="Storage used">
        <Meter.Track>
          <Meter.Indicator />
        </Meter.Track>
      </Meter.Root>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
