import { useState, useRef, useEffect } from 'react';
import * as stylex from '@stylexjs/stylex';
import { tokens } from '@basex-ui/tokens';
import { Code } from 'lucide-react';
import { useIsDark } from '../context/ThemeContext';
import { CopyButton } from './CopyButton';

const styles = stylex.create({
  toggle: {
    display: 'flex',
    alignItems: 'center',
    gap: tokens.space1h,
    paddingBlock: tokens.space1h,
    paddingInline: tokens.space3,
    fontSize: tokens.fontSizeXs,
    fontFamily: tokens.fontFamilyMono,
    color: tokens.colorTextMuted,
    cursor: 'pointer',
    borderRadius: tokens.radiusSm,
    backgroundColor: {
      default: 'transparent',
      ':hover': tokens.colorMuted,
    },
    marginTop: tokens.space3,
    transitionProperty: 'background-color',
    transitionDuration: tokens.motionDurationFast,
  },
  icon: {
    width: '14px',
    height: '14px',
  },
  wrapper: {
    overflow: 'hidden',
    transitionProperty: 'height',
    transitionDuration: tokens.motionDurationNormal,
    transitionTimingFunction: tokens.motionEaseInOut,
  },
  inner: {
    paddingTop: tokens.space3,
  },
  pre: {
    position: 'relative',
    backgroundColor: tokens.colorMuted,
    borderRadius: tokens.radiusMd,
    padding: tokens.space5,
    overflowX: 'auto',
    fontSize: tokens.fontSizeSm,
    fontFamily: tokens.fontFamilyMono,
    lineHeight: tokens.lineHeightRelaxed,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: tokens.colorBorderMuted,
    margin: 0,
  },
});

interface CodeToggleProps {
  code: string;
}

export function CodeToggle({ code }: CodeToggleProps) {
  const [open, setOpen] = useState(false);
  const [height, setHeight] = useState(0);
  const [html, setHtml] = useState<string | null>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const dark = useIsDark();
  const trimmed = code.trim();

  useEffect(() => {
    if (open && innerRef.current) {
      setHeight(innerRef.current.scrollHeight);
    } else {
      setHeight(0);
    }
  }, [open]);

  useEffect(() => {
    let cancelled = false;
    import('shiki').then(({ codeToHtml }) => {
      codeToHtml(trimmed, {
        lang: 'tsx',
        theme: dark ? 'github-dark-default' : 'github-light-default',
      })
        .then((result) => {
          if (!cancelled) setHtml(result);
        })
        .catch(() => {});
    });
    return () => {
      cancelled = true;
    };
  }, [trimmed, dark]);

  return (
    <>
      <button {...stylex.props(styles.toggle)} onClick={() => setOpen((o) => !o)}>
        <Code {...stylex.props(styles.icon)} />
        {open ? 'Hide Code' : 'View Code'}
      </button>
      <div {...stylex.props(styles.wrapper)} style={{ height: `${height}px` }}>
        <div ref={innerRef} {...stylex.props(styles.inner)}>
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
        </div>
      </div>
    </>
  );
}
