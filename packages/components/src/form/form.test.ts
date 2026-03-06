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

import { Form } from './index';

describe('Form', () => {
  it('exports Form component', () => {
    expect(Form).toBeDefined();
  });

  it('sets displayName', () => {
    expect(Form.displayName).toBe('Form');
  });
});
