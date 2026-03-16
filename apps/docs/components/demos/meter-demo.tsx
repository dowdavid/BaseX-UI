'use client';

import * as stylex from '@stylexjs/stylex';
import { Meter } from '@basex-ui/components';
import { lightTheme, darkTheme } from '@basex-ui/styles';
import { useTheme } from 'next-themes';

function Preview({ children }: { children: React.ReactNode }) {
  const { resolvedTheme } = useTheme();
  const theme = resolvedTheme === 'dark' ? darkTheme : lightTheme;
  return (
    <div
      {...stylex.props(theme)}
      style={{
        padding: '2rem',
        borderRadius: '0.5rem',
        border: '1px solid var(--fd-border)',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        width: '100%',
      }}
    >
      {children}
    </div>
  );
}

export function MeterBasic() {
  return (
    <Preview>
      <Meter.Root value={65} style={{ width: '100%' }}>
        <Meter.Label>Storage</Meter.Label>
        <Meter.Value />
        <Meter.Track>
          <Meter.Indicator />
        </Meter.Track>
      </Meter.Root>
    </Preview>
  );
}

export function MeterColors() {
  return (
    <Preview>
      <Meter.Root value={50} style={{ width: '100%' }}>
        <Meter.Track>
          <Meter.Indicator />
        </Meter.Track>
      </Meter.Root>
      <Meter.Root value={50} style={{ width: '100%' }}>
        <Meter.Track>
          <Meter.Indicator color="secondary" />
        </Meter.Track>
      </Meter.Root>
      <Meter.Root value={50} style={{ width: '100%' }}>
        <Meter.Track>
          <Meter.Indicator color="destructive" />
        </Meter.Track>
      </Meter.Root>
    </Preview>
  );
}

export function MeterSizes() {
  return (
    <Preview>
      <Meter.Root value={60} style={{ width: '100%' }}>
        <Meter.Track size="sm">
          <Meter.Indicator />
        </Meter.Track>
      </Meter.Root>
      <Meter.Root value={60} style={{ width: '100%' }}>
        <Meter.Track size="md">
          <Meter.Indicator />
        </Meter.Track>
      </Meter.Root>
      <Meter.Root value={60} style={{ width: '100%' }}>
        <Meter.Track size="lg">
          <Meter.Indicator />
        </Meter.Track>
      </Meter.Root>
    </Preview>
  );
}
