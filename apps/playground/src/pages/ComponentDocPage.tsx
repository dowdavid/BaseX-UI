import { type ComponentType } from 'react';
import { Markdown } from '../components/Markdown';
import * as stylex from '@stylexjs/stylex';
import { tokens } from '@basex-ui/tokens';

const styles = stylex.create({
  importBlock: {
    backgroundColor: tokens.colorMuted,
    borderRadius: tokens.radiusMd,
    padding: tokens.space4,
    fontFamily: tokens.fontFamilyMono,
    fontSize: tokens.fontSizeSm,
    color: tokens.colorText,
    marginBottom: tokens.space10,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: tokens.colorBorderMuted,
    overflowX: 'auto',
  },
  divider: {
    borderTopWidth: '1px',
    borderTopStyle: 'solid',
    borderTopColor: tokens.colorBorderMuted,
    marginTop: tokens.space10,
    paddingTop: tokens.space10,
  },
  apiHeading: {
    fontSize: tokens.fontSizeLg,
    fontWeight: tokens.fontWeightBold,
    marginBottom: tokens.space6,
    color: tokens.colorText,
  },
});

interface ComponentDocPageProps {
  DemoPage: ComponentType;
  apiDocs?: string;
  importStatement: string;
}

export function ComponentDocPage({ DemoPage, apiDocs, importStatement }: ComponentDocPageProps) {
  return (
    <>
      <pre {...stylex.props(styles.importBlock)}>
        <code>{importStatement}</code>
      </pre>

      <DemoPage />

      {apiDocs && (
        <div {...stylex.props(styles.divider)}>
          <h2 {...stylex.props(styles.apiHeading)}>API Reference</h2>
          <Markdown content={apiDocs} />
        </div>
      )}
    </>
  );
}
