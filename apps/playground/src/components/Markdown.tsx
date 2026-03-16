import { useState, useEffect, type ComponentPropsWithoutRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import * as stylex from '@stylexjs/stylex';
import { tokens } from '@basex-ui/tokens';

const styles = stylex.create({
  root: {
    fontSize: tokens.fontSizeSm,
    lineHeight: tokens.lineHeightRelaxed,
    color: tokens.colorText,
  },
  h1: {
    fontSize: tokens.fontSize2xl,
    fontWeight: tokens.fontWeightBold,
    marginTop: tokens.space10,
    marginBottom: tokens.space4,
    lineHeight: tokens.lineHeightTight,
    color: tokens.colorText,
  },
  h2: {
    fontSize: tokens.fontSizeLg,
    fontWeight: tokens.fontWeightSemibold,
    marginTop: tokens.space10,
    marginBottom: tokens.space4,
    color: tokens.colorText,
  },
  h3: {
    fontSize: tokens.fontSizeMd,
    fontWeight: tokens.fontWeightSemibold,
    marginTop: tokens.space8,
    marginBottom: tokens.space3,
    color: tokens.colorText,
  },
  h4: {
    fontSize: tokens.fontSizeSm,
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
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginBlock: tokens.space6,
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
    backgroundColor: tokens.colorMuted,
    borderRadius: tokens.radiusMd,
    padding: tokens.space4,
    overflowX: 'auto',
    marginBlock: tokens.space4,
    fontSize: tokens.fontSizeSm,
    fontFamily: tokens.fontFamilyMono,
    lineHeight: tokens.lineHeightRelaxed,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: tokens.colorBorderMuted,
  },
  strong: {
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorText,
  },
});

function CodeBlock({ language, code }: { language?: string; code: string }) {
  const [html, setHtml] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    import('shiki').then(({ codeToHtml }) => {
      codeToHtml(code.trim(), {
        lang: language || 'tsx',
        theme: 'github-dark-default',
      }).then((result) => {
        if (!cancelled) setHtml(result);
      }).catch(() => {
        // Language not supported, leave unstyled
      });
    });
    return () => {
      cancelled = true;
    };
  }, [code, language]);

  if (html) {
    return (
      <div
        {...stylex.props(styles.pre)}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }
  return (
    <pre {...stylex.props(styles.pre)}>
      <code>{code.trim()}</code>
    </pre>
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
    <table {...stylex.props(styles.table)} {...props} />
  ),
  th: (props: ComponentPropsWithoutRef<'th'>) => <th {...stylex.props(styles.th)} {...props} />,
  td: (props: ComponentPropsWithoutRef<'td'>) => <td {...stylex.props(styles.td)} {...props} />,
  strong: (props: ComponentPropsWithoutRef<'strong'>) => (
    <strong {...stylex.props(styles.strong)} {...props} />
  ),
  code: ({ className, children, ...rest }: ComponentPropsWithoutRef<'code'> & { inline?: boolean }) => {
    const match = /language-(\w+)/.exec(className || '');
    const codeStr = String(children).replace(/\n$/, '');

    // Block code: has a language class or is inside a <pre>
    if (match) {
      return <CodeBlock language={match[1]} code={codeStr} />;
    }

    // Inline code
    return <code {...stylex.props(styles.inlineCode)} {...rest}>{children}</code>;
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
