'use client';

import * as stylex from '@stylexjs/stylex';
import { PreviewCard } from '@basex-ui/components';
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
      }}
    >
      {children}
    </div>
  );
}

export function PreviewCardBasic() {
  return (
    <Preview>
      <PreviewCard.Root>
        <PreviewCard.Trigger href="https://github.com">
          Base-X UI
        </PreviewCard.Trigger>
        <PreviewCard.Portal>
          <PreviewCard.Positioner>
            <PreviewCard.Popup>
              <p style={{ fontWeight: 600, marginBottom: '0.25rem' }}>
                Base-X UI
              </p>
              <p style={{ color: 'var(--color-text-muted, #666)', margin: 0 }}>
                A styled component library built on Base UI and StyleX for
                consistent, themeable interfaces.
              </p>
            </PreviewCard.Popup>
          </PreviewCard.Positioner>
        </PreviewCard.Portal>
      </PreviewCard.Root>
    </Preview>
  );
}
