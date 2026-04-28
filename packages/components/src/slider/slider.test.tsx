import { vi, describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import { createElement, isValidElement } from 'react';
import { Slider } from './index';

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
  capitalize: (s: string) => s,
}));

const PARTS = ['Root', 'Label', 'Value', 'Control', 'Track', 'Indicator', 'Thumb'] as const;

describe('Slider', () => {
  it('exports all compound parts', () => {
    for (const p of PARTS) expect(Slider[p]).toBeDefined();
  });

  it('sets displayName on all parts', () => {
    for (const p of PARTS) expect(Slider[p].displayName).toBe(`Slider.${p}`);
  });

  it('does not expose unexpected parts', () => {
    expect(Object.keys(Slider).sort()).toEqual([...PARTS].sort());
  });

  it('renders Root with min, max, step, controlled value', () => {
    const el = createElement(Slider.Root, {
      min: 0,
      max: 100,
      step: 1,
      value: 50,
      onValueChange: () => {},
      disabled: false,
    });
    expect(isValidElement(el)).toBe(true);
  });

  it('ArrowRight key on thumb increases value (aria-valuenow)', async () => {
    const user = userEvent.setup();
    const { getByRole } = render(
      <Slider.Root min={0} max={100} defaultValue={50}>
        <Slider.Control>
          <Slider.Track>
            <Slider.Indicator />
            <Slider.Thumb aria-label="Volume" />
          </Slider.Track>
        </Slider.Control>
      </Slider.Root>,
    );
    const thumb = getByRole('slider', { name: 'Volume' });
    expect(thumb).toHaveAttribute('aria-valuenow', '50');
    thumb.focus();
    await user.keyboard('{ArrowRight}');
    expect(Number(thumb.getAttribute('aria-valuenow'))).toBeGreaterThan(50);
  });

  it('renders without a11y violations', async () => {
    const { container } = render(
      <Slider.Root min={0} max={100} defaultValue={50}>
        <Slider.Control>
          <Slider.Track>
            <Slider.Indicator />
            <Slider.Thumb aria-label="Volume" />
          </Slider.Track>
        </Slider.Control>
      </Slider.Root>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
