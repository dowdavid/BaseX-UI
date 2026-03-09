import * as stylex from '@stylexjs/stylex';
import { tokens } from '@basex-ui/tokens';
import { PreviewCard } from '@basex-ui/components';
import { Preview } from '../components/Preview';

const pageStyles = stylex.create({
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.space2,
  },
  cardTitle: {
    fontSize: tokens.fontSizeMd,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorText,
  },
  cardDesc: {
    fontSize: tokens.fontSizeSm,
    color: tokens.colorTextMuted,
    lineHeight: tokens.lineHeightNormal,
  },
  avatar: {
    width: '40px',
    height: '40px',
    borderRadius: tokens.radiusFull,
    backgroundColor: tokens.colorMuted,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: tokens.fontSizeSm,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorTextMuted,
    flexShrink: 0,
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    gap: tokens.space3,
  },
});

export function PreviewCardPage() {
  return (
    <>
      <Preview title="Basic" description="Hover over the link to see a preview.">
        <PreviewCard.Root>
          <PreviewCard.Trigger href="#">Hover for preview</PreviewCard.Trigger>
          <PreviewCard.Portal>
            <PreviewCard.Positioner>
              <PreviewCard.Popup>
                A simple preview of the linked content.
              </PreviewCard.Popup>
            </PreviewCard.Positioner>
          </PreviewCard.Portal>
        </PreviewCard.Root>
      </Preview>

      <Preview title="User preview" description="Rich content preview for a user profile.">
        <PreviewCard.Root>
          <PreviewCard.Trigger href="#">@janedoe</PreviewCard.Trigger>
          <PreviewCard.Portal>
            <PreviewCard.Positioner>
              <PreviewCard.Popup>
                <div {...stylex.props(pageStyles.row)}>
                  <div {...stylex.props(pageStyles.avatar)}>JD</div>
                  <div {...stylex.props(pageStyles.cardContent)}>
                    <span {...stylex.props(pageStyles.cardTitle)}>Jane Doe</span>
                    <span {...stylex.props(pageStyles.cardDesc)}>
                      Design engineer building accessible components.
                    </span>
                  </div>
                </div>
              </PreviewCard.Popup>
            </PreviewCard.Positioner>
          </PreviewCard.Portal>
        </PreviewCard.Root>
      </Preview>
    </>
  );
}
