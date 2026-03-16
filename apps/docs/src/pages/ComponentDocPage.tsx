import { type ComponentType } from 'react';
import { Markdown } from '../components/Markdown';
import { CopyButton } from '../components/CopyButton';
import * as stylex from '@stylexjs/stylex';
import { tokens } from '@basex-ui/tokens';

const MOBILE = '@media (max-width: 768px)' as const;

const styles = stylex.create({
  importBlock: {
    position: 'relative',
    backgroundColor: tokens.colorMuted,
    borderRadius: tokens.radiusMd,
    paddingTop: tokens.space5,
    paddingBottom: tokens.space5,
    paddingLeft: tokens.space5,
    paddingRight: tokens.space10,
    fontFamily: tokens.fontFamilyMono,
    fontSize: tokens.fontSizeSm,
    color: tokens.colorText,
    marginBottom: tokens.space10,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: tokens.colorBorderMuted,
    overflowX: 'auto',
    maxWidth: '100%',
    [MOBILE]: {
      fontSize: tokens.fontSizeXs,
      paddingTop: tokens.space4,
      paddingBottom: tokens.space4,
      paddingLeft: tokens.space4,
      paddingRight: tokens.space10,
      marginBottom: tokens.space6,
      whiteSpace: 'pre-wrap',
      wordBreak: 'break-all',
    },
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
        <CopyButton text={importStatement} />
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
