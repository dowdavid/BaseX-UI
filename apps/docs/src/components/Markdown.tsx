import { useState, useEffect, type ComponentPropsWithoutRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import * as stylex from '@stylexjs/stylex';
import { tokens } from '@basex-ui/tokens';
import { useIsDark } from '../context/ThemeContext';
import { CopyButton } from './CopyButton';

const MOBILE = '@media (max-width: 768px)' as const;

const styles = stylex.create({
  root: {
    // Prose uses mono as the primary voice (matches portfolio ArticleLayout).
    fontFamily: tokens.fontFamilyMono,
    fontSize: tokens.fontSizeBody,
    lineHeight: tokens.lineHeightRelaxed,
    color: tokens.colorText,
  },
  h1: {
    fontFamily: tokens.fontFamilyMono,
    fontSize: tokens.fontSizeTitle,
    fontWeight: tokens.fontWeightSemibold,
    marginTop: tokens.space10,
    marginBottom: tokens.space4,
    lineHeight: tokens.lineHeightTight,
    letterSpacing: tokens.letterSpacingTight,
    color: tokens.colorText,
  },
  h2: {
    fontFamily: tokens.fontFamilyMono,
    fontSize: tokens.fontSizeSubhead,
    fontWeight: tokens.fontWeightSemibold,
    marginTop: tokens.space10,
    marginBottom: tokens.space4,
    color: tokens.colorText,
  },
  h3: {
    fontFamily: tokens.fontFamilyMono,
    fontSize: tokens.fontSizeMd,
    fontWeight: tokens.fontWeightSemibold,
    marginTop: tokens.space8,
    marginBottom: tokens.space3,
    color: tokens.colorText,
  },
  h4: {
    fontFamily: tokens.fontFamilyMono,
    fontSize: tokens.fontSizeBody,
    fontWeight: tokens.fontWeightSemibold,
    marginTop: tokens.space6,
    marginBottom: tokens.space2,
    color: tokens.colorText,
  },
  p: {
    marginBottom: tokens.space4,
    color: tokens.colorText,
  },
  a: {
    color: tokens.colorPrimary,
    textDecoration: 'none',
    ':hover': {
      textDecoration: 'underline',
    },
  },
  ul: {
    marginBottom: tokens.space4,
    paddingLeft: tokens.space6,
  },
  ol: {
    marginBottom: tokens.space4,
    paddingLeft: tokens.space6,
  },
  li: {
    marginBottom: tokens.space1,
    color: tokens.colorText,
  },
  blockquote: {
    borderLeftWidth: '3px',
    borderLeftStyle: 'solid',
    borderLeftColor: tokens.colorBorderMuted,
    paddingLeft: tokens.space4,
    marginBottom: tokens.space4,
    color: tokens.colorTextMuted,
    fontStyle: 'italic',
  },
  hr: {
    borderTopWidth: '1px',
    borderTopStyle: 'solid',
    borderTopColor: tokens.colorBorderMuted,
    marginBlock: tokens.space8,
  },
  tableWrapper: {
    overflowX: 'auto',
    marginBlock: tokens.space6,
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: tokens.fontSizeSm,
  },
  th: {
    textAlign: 'left',
    paddingBlock: tokens.space2,
    paddingInline: tokens.space3,
    borderBottomWidth: '2px',
    borderBottomStyle: 'solid',
    borderBottomColor: tokens.colorBorderMuted,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorText,
  },
  td: {
    paddingBlock: tokens.space2,
    paddingInline: tokens.space3,
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: tokens.colorBorderMuted,
    color: tokens.colorTextMuted,
  },
  inlineCode: {
    fontFamily: tokens.fontFamilyMono,
    fontSize: '0.875em',
    backgroundColor: tokens.colorMuted,
    paddingBlock: '0.125rem',
    paddingInline: '0.375rem',
    borderRadius: tokens.radiusSm,
    color: tokens.colorText,
  },
  pre: {
    position: 'relative',
    backgroundColor: tokens.colorMuted,
    borderRadius: tokens.radiusMd,
    paddingTop: tokens.space5,
    paddingBottom: tokens.space5,
    paddingLeft: tokens.space5,
    paddingRight: tokens.space10,
    overflowX: 'auto',
    marginBlock: tokens.space4,
    fontSize: tokens.fontSizeSm,
    fontFamily: tokens.fontFamilyMono,
    lineHeight: tokens.lineHeightRelaxed,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: tokens.colorBorderMuted,
    maxWidth: '100%',
    [MOBILE]: {
      fontSize: tokens.fontSizeXs,
      paddingTop: tokens.space4,
      paddingBottom: tokens.space4,
      paddingLeft: tokens.space4,
      paddingRight: tokens.space10,
    },
  },
  strong: {
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorText,
  },
});

function CodeBlock({ language, code }: { language?: string; code: string }) {
  const [html, setHtml] = useState<string | null>(null);
  const dark = useIsDark();
  const trimmed = code.trim();

  useEffect(() => {
    let cancelled = false;
    import('../lib/highlighter').then(({ getHighlighter, normalizeLang }) => {
      getHighlighter()
        .then((hl) => {
          if (cancelled) return;
          try {
            setHtml(
              hl.codeToHtml(trimmed, {
                lang: normalizeLang(language),
                theme: dark ? 'github-dark-default' : 'github-light-default',
              }),
            );
          } catch {
            // unknown lang — leave plain text fallback
          }
        })
        .catch(() => {});
    });
    return () => {
      cancelled = true;
    };
  }, [trimmed, language, dark]);

  return (
    <div {...stylex.props(styles.pre)}>
      <CopyButton text={trimmed} />
      {html ? (
        <div dangerouslySetInnerHTML={{ __html: html }} />
      ) : (
        <pre style={{ margin: 0 }}>
          <code>{trimmed}</code>
        </pre>
      )}
    </div>
  );
}

const components = {
  h1: (props: ComponentPropsWithoutRef<'h1'>) => <h1 {...stylex.props(styles.h1)} {...props} />,
  h2: (props: ComponentPropsWithoutRef<'h2'>) => <h2 {...stylex.props(styles.h2)} {...props} />,
  h3: (props: ComponentPropsWithoutRef<'h3'>) => <h3 {...stylex.props(styles.h3)} {...props} />,
  h4: (props: ComponentPropsWithoutRef<'h4'>) => <h4 {...stylex.props(styles.h4)} {...props} />,
  p: (props: ComponentPropsWithoutRef<'p'>) => <p {...stylex.props(styles.p)} {...props} />,
  a: (props: ComponentPropsWithoutRef<'a'>) => <a {...stylex.props(styles.a)} {...props} />,
  ul: (props: ComponentPropsWithoutRef<'ul'>) => <ul {...stylex.props(styles.ul)} {...props} />,
  ol: (props: ComponentPropsWithoutRef<'ol'>) => <ol {...stylex.props(styles.ol)} {...props} />,
  li: (props: ComponentPropsWithoutRef<'li'>) => <li {...stylex.props(styles.li)} {...props} />,
  blockquote: (props: ComponentPropsWithoutRef<'blockquote'>) => (
    <blockquote {...stylex.props(styles.blockquote)} {...props} />
  ),
  hr: (props: ComponentPropsWithoutRef<'hr'>) => <hr {...stylex.props(styles.hr)} {...props} />,
  table: (props: ComponentPropsWithoutRef<'table'>) => (
    <div {...stylex.props(styles.tableWrapper)}>
      <table {...stylex.props(styles.table)} {...props} />
    </div>
  ),
  th: (props: ComponentPropsWithoutRef<'th'>) => <th {...stylex.props(styles.th)} {...props} />,
  td: (props: ComponentPropsWithoutRef<'td'>) => <td {...stylex.props(styles.td)} {...props} />,
  strong: (props: ComponentPropsWithoutRef<'strong'>) => (
    <strong {...stylex.props(styles.strong)} {...props} />
  ),
  code: ({
    className,
    children,
    ...rest
  }: ComponentPropsWithoutRef<'code'> & { inline?: boolean }) => {
    const match = /language-(\w+)/.exec(className || '');
    const codeStr = String(children).replace(/\n$/, '');

    // Block code: has a language class or is inside a <pre>
    if (match) {
      return <CodeBlock language={match[1]} code={codeStr} />;
    }

    // Inline code
    return (
      <code {...stylex.props(styles.inlineCode)} {...rest}>
        {children}
      </code>
    );
  },
  pre: ({ children }: ComponentPropsWithoutRef<'pre'>) => {
    // If children is a CodeBlock (via code component), just pass through
    return <>{children}</>;
  },
};

interface MarkdownProps {
  content: string;
}

export function Markdown({ content }: MarkdownProps) {
  return (
    <div {...stylex.props(styles.root)}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
