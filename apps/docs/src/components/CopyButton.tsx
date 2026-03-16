import { useState, useCallback } from 'react';
import * as stylex from '@stylexjs/stylex';
import { tokens } from '@basex-ui/tokens';
import { Copy, Check } from 'lucide-react';

const styles = stylex.create({
  button: {
    position: 'absolute',
    top: tokens.space3,
    right: tokens.space3,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '28px',
    height: '28px',
    borderRadius: tokens.radiusSm,
    cursor: 'pointer',
    color: tokens.colorTextMuted,
    backgroundColor: {
      default: 'transparent',
      ':hover': tokens.colorMuted,
    },
    transitionProperty: 'color, background-color',
    transitionDuration: tokens.motionDurationFast,
  },
  copied: {
    color: tokens.colorPrimary,
  },
  icon: {
    width: '14px',
    height: '14px',
  },
});

interface CopyButtonProps {
  text: string;
}

export function CopyButton({ text }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  }, [text]);

  return (
    <button
      {...stylex.props(styles.button, copied && styles.copied)}
      onClick={handleCopy}
      aria-label={copied ? 'Copied' : 'Copy code'}
    >
      {copied ? <Check {...stylex.props(styles.icon)} /> : <Copy {...stylex.props(styles.icon)} />}
    </button>
  );
}
