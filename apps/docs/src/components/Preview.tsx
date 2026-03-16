import * as stylex from '@stylexjs/stylex';
import { tokens } from '@basex-ui/tokens';
import { CodeToggle } from './CodeToggle';

const MOBILE = '@media (max-width: 768px)' as const;

const styles = stylex.create({
  section: {
    marginBottom: tokens.space10,
    [MOBILE]: {
      marginBottom: tokens.space6,
    },
  },
  title: {
    fontSize: tokens.fontSizeMd,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorText,
    marginBottom: tokens.space1,
  },
  description: {
    fontSize: tokens.fontSizeSm,
    color: tokens.colorTextMuted,
    lineHeight: tokens.lineHeightNormal,
    marginBottom: tokens.space4,
  },
  card: {
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: tokens.colorBorderMuted,
    borderRadius: tokens.radiusLg,
    padding: tokens.space8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    [MOBILE]: {
      padding: tokens.space4,
    },
  },
  constrained: {
    width: '100%',
    maxWidth: '15rem',
  },
});

interface PreviewProps {
  title: string;
  description?: string;
  /** Constrain children to a max-width (e.g. for Accordion). */
  constrained?: boolean;
  /** Source code for the demo, shown via a View Code toggle. */
  code?: string;
  children: React.ReactNode;
}

export function Preview({ title, description, constrained, code, children }: PreviewProps) {
  return (
    <section {...stylex.props(styles.section)}>
      <h2 {...stylex.props(styles.title)}>{title}</h2>
      {description && <p {...stylex.props(styles.description)}>{description}</p>}
      <div {...stylex.props(styles.card)}>
        {constrained ? <div {...stylex.props(styles.constrained)}>{children}</div> : children}
      </div>
      {code && <CodeToggle code={code} />}
    </section>
  );
}
