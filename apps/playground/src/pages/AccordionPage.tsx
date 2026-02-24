import * as stylex from '@stylexjs/stylex';
import { tokens } from '@basex-ui/tokens';
import { Accordion } from '@basex-ui/components';

const styles = stylex.create({
  section: {
    marginBottom: tokens.space8,
  },
  sectionTitle: {
    fontSize: tokens.fontSizeLg,
    fontWeight: tokens.fontWeightSemibold,
    marginBottom: tokens.space4,
    color: tokens.colorTextMuted,
  },
});

export function AccordionPage() {
  return (
    <>
      <section {...stylex.props(styles.section)}>
        <h2 {...stylex.props(styles.sectionTitle)}>Single open</h2>
        <Accordion.Root defaultValue={['item-1']}>
          <Accordion.Item value="item-1">
            <Accordion.Header>
              <Accordion.Trigger>What is BaseX UI?</Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Panel>
              BaseX UI is an AI-first, copy-paste component library built on Base UI and styled with
              StyleX.
            </Accordion.Panel>
          </Accordion.Item>
          <Accordion.Item value="item-2">
            <Accordion.Header>
              <Accordion.Trigger>How does theming work?</Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Panel>
              Themes are built with stylex.createTheme, overriding design tokens defined with
              stylex.defineVars.
            </Accordion.Panel>
          </Accordion.Item>
          <Accordion.Item value="item-3">
            <Accordion.Header>
              <Accordion.Trigger>Can I customize components?</Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Panel>
              Yes — every part accepts an sx prop for StyleX overrides, and you own the source code.
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion.Root>
      </section>

      <section {...stylex.props(styles.section)}>
        <h2 {...stylex.props(styles.sectionTitle)}>Multiple open</h2>
        <Accordion.Root multiple defaultValue={['item-1', 'item-2']}>
          <Accordion.Item value="item-1">
            <Accordion.Header>
              <Accordion.Trigger>Section 1 (open)</Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Panel>Both panels can be open at the same time.</Accordion.Panel>
          </Accordion.Item>
          <Accordion.Item value="item-2">
            <Accordion.Header>
              <Accordion.Trigger>Section 2 (open)</Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Panel>Try closing one — the other stays open.</Accordion.Panel>
          </Accordion.Item>
        </Accordion.Root>
      </section>

      <section {...stylex.props(styles.section)}>
        <h2 {...stylex.props(styles.sectionTitle)}>Disabled item</h2>
        <Accordion.Root>
          <Accordion.Item value="item-1">
            <Accordion.Header>
              <Accordion.Trigger>Enabled section</Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Panel>This section works normally.</Accordion.Panel>
          </Accordion.Item>
          <Accordion.Item value="item-2" disabled>
            <Accordion.Header>
              <Accordion.Trigger>Disabled section</Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Panel>You cannot open this section.</Accordion.Panel>
          </Accordion.Item>
        </Accordion.Root>
      </section>
    </>
  );
}
