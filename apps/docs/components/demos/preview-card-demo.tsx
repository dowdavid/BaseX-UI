'use client';

import { PreviewCard } from '@basex-ui/components';
import { Preview } from '@/components/preview';

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
