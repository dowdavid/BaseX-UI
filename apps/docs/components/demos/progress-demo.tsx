'use client';

import * as stylex from '@stylexjs/stylex';
import { Progress } from '@basex-ui/components';
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

export function ProgressBasic() {
  return (
    <Preview>
      <Progress.Root value={45} style={{ width: '100%' }}>
        <Progress.Label>Upload</Progress.Label>
        <Progress.Value />
        <Progress.Track>
          <Progress.Indicator />
        </Progress.Track>
      </Progress.Root>
    </Preview>
  );
}

export function ProgressColors() {
  return (
    <Preview>
      <Progress.Root value={50} style={{ width: '100%' }}>
        <Progress.Track>
          <Progress.Indicator />
        </Progress.Track>
      </Progress.Root>
      <Progress.Root value={50} style={{ width: '100%' }}>
        <Progress.Track>
          <Progress.Indicator color="secondary" />
        </Progress.Track>
      </Progress.Root>
      <Progress.Root value={50} style={{ width: '100%' }}>
        <Progress.Track>
          <Progress.Indicator color="destructive" />
        </Progress.Track>
      </Progress.Root>
    </Preview>
  );
}

export function ProgressIndeterminate() {
  return (
    <Preview>
      <Progress.Root value={null} style={{ width: '100%' }}>
        <Progress.Label>Loading</Progress.Label>
        <Progress.Track>
          <Progress.Indicator />
        </Progress.Track>
      </Progress.Root>
    </Preview>
  );
}
