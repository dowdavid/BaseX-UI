'use client';

import * as stylex from '@stylexjs/stylex';

const styles = stylex.create({
  card: {
    padding: '2rem',
    borderRadius: '0.5rem',
    border: '1px solid var(--fd-border)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: '0.75rem',
  },
  constrained: {
    width: '100%',
    maxWidth: '15rem',
  },
  column: {
    flexDirection: 'column',
  },
});

interface PreviewProps {
  children: React.ReactNode;
  constrained?: boolean;
  column?: boolean;
}

export function Preview({ children, constrained, column }: PreviewProps) {
  return (
    <div {...stylex.props(styles.card, column && styles.column)}>
      {constrained ? (
        <div {...stylex.props(styles.constrained)}>{children}</div>
      ) : (
        children
      )}
    </div>
  );
}
