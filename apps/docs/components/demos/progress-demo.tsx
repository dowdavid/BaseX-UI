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
      <Progress.Root value={65} style={{ width: '100%' }}>
        <Progress.Label>Uploading...</Progress.Label>
        <Progress.Track>
          <Progress.Indicator />
        </Progress.Track>
      </Progress.Root>
    </Preview>
  );
}

export function ProgressWithValue() {
  return (
    <Preview>
      <Progress.Root value={42} style={{ width: '100%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Progress.Label>Processing</Progress.Label>
          <Progress.Value />
        </div>
        <Progress.Track>
          <Progress.Indicator />
        </Progress.Track>
      </Progress.Root>
    </Preview>
  );
}

export function ProgressColors() {
  const colors = ['default', 'secondary', 'destructive'] as const;
  return (
    <Preview>
      {colors.map((color, i) => (
        <Progress.Root key={color} value={30 + i * 30} style={{ width: '100%' }}>
          <Progress.Label>{color}</Progress.Label>
          <Progress.Track>
            <Progress.Indicator color={color} />
          </Progress.Track>
        </Progress.Root>
      ))}
    </Preview>
  );
}

export function ProgressSizes() {
  const sizes = ['sm', 'md', 'lg'] as const;
  return (
    <Preview>
      {sizes.map((size) => (
        <Progress.Root key={size} value={50} style={{ width: '100%' }}>
          <Progress.Label>{size}</Progress.Label>
          <Progress.Track size={size}>
            <Progress.Indicator />
          </Progress.Track>
        </Progress.Root>
      ))}
    </Preview>
  );
}

export function ProgressIndeterminate() {
  return (
    <Preview>
      <Progress.Root value={null} style={{ width: '100%' }}>
        <Progress.Label>Loading...</Progress.Label>
        <Progress.Track>
          <Progress.Indicator />
        </Progress.Track>
      </Progress.Root>
    </Preview>
  );
}
