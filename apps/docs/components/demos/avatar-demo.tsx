'use client';

import * as stylex from '@stylexjs/stylex';
import { Avatar } from '@basex-ui/components';
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
        flexWrap: 'wrap',
        gap: '0.75rem',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {children}
    </div>
  );
}

export function AvatarBasic() {
  return (
    <Preview>
      <Avatar.Root>
        <Avatar.Image src="https://i.pravatar.cc/150?u=basex" alt="Jane Doe" />
        <Avatar.Fallback>JD</Avatar.Fallback>
      </Avatar.Root>
    </Preview>
  );
}

export function AvatarFallback() {
  return (
    <Preview>
      <Avatar.Root>
        <Avatar.Fallback>JD</Avatar.Fallback>
      </Avatar.Root>
    </Preview>
  );
}
