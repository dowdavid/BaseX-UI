import * as stylex from '@stylexjs/stylex';
import { tokens } from '@basex-ui/tokens';
import { Separator } from '@basex-ui/components';
import { Preview } from '../components/Preview';

const styles = stylex.create({
  stack: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.space3,
    width: '100%',
  },
  stackItem: {
    fontFamily: tokens.fontFamilySans,
    fontSize: tokens.fontSizeSm,
    color: tokens.colorText,
  },
  inlineRow: {
    display: 'flex',
    alignItems: 'center',
    gap: tokens.space3,
    height: '24px',
    fontFamily: tokens.fontFamilySans,
    fontSize: tokens.fontSizeSm,
    color: tokens.colorText,
  },
  metaLabel: {
    color: tokens.colorTextMuted,
  },
});

export function SeparatorPage() {
  return (
    <>
      <Preview
        title="Horizontal"
        description="The default. Spans the full width of its container with a 1px line."
        code={`<Separator.Root />`}
      >
        <div {...stylex.props(styles.stack)}>
          <div {...stylex.props(styles.stackItem)}>Account settings</div>
          <Separator.Root />
          <div {...stylex.props(styles.stackItem)}>Notifications</div>
          <Separator.Root />
          <div {...stylex.props(styles.stackItem)}>Billing</div>
        </div>
      </Preview>

      <Preview
        title="Vertical"
        description="Inside a flex row, a vertical separator splits inline metadata or toolbar groups."
        code={`<div style={{ display: 'flex', alignItems: 'center', gap: 12, height: 24 }}>
  <span>Jane Doe</span>
  <Separator.Root orientation="vertical" />
  <span>5 min read</span>
  <Separator.Root orientation="vertical" />
  <span>Apr 25, 2026</span>
</div>`}
      >
        <div {...stylex.props(styles.inlineRow)}>
          <span>Jane Doe</span>
          <Separator.Root orientation="vertical" />
          <span {...stylex.props(styles.metaLabel)}>5 min read</span>
          <Separator.Root orientation="vertical" />
          <span {...stylex.props(styles.metaLabel)}>Apr 25, 2026</span>
        </div>
      </Preview>

      <Preview
        title="Decorative vs. semantic"
        description='By default, Separator exposes role="separator" to assistive tech. Pass `decorative` when the divider is purely visual and adjacent content is already grouped semantically — screen readers will skip it (role="none").'
        code={`{/* Semantic — announced as a separator */}
<Separator.Root />

{/* Decorative — skipped by screen readers */}
<Separator.Root decorative />`}
      >
        <div {...stylex.props(styles.stack)}>
          <div {...stylex.props(styles.stackItem)}>Semantic separator</div>
          <Separator.Root />
          <div {...stylex.props(styles.stackItem)}>Decorative separator</div>
          <Separator.Root decorative />
          <div {...stylex.props(styles.stackItem)}>Both look identical</div>
        </div>
      </Preview>
    </>
  );
}
