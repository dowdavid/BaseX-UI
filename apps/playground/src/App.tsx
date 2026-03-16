import { useState, useEffect } from 'react';
import * as stylex from '@stylexjs/stylex';
import { tokens } from '@basex-ui/tokens';
import { lightTheme, darkTheme } from '@basex-ui/styles';
import { Routes, Route } from 'react-router';
import { pages, type PageEntry } from './registry';
import { Sidebar } from './components/Sidebar';

const MOBILE = '@media (max-width: 768px)' as const;

const styles = stylex.create({
  layout: {
    display: 'flex',
    height: '100vh',
    backgroundColor: tokens.colorBackground,
    color: tokens.colorText,
    fontFamily: tokens.fontFamilySans,
    [MOBILE]: {
      flexDirection: 'column',
    },
  },
  mobileHeader: {
    display: 'none',
    [MOBILE]: {
      display: 'flex',
      alignItems: 'center',
      gap: tokens.space3,
      paddingBlock: tokens.space3,
      paddingInline: tokens.space4,
      borderBottomWidth: '1px',
      borderBottomStyle: 'solid',
      borderBottomColor: tokens.colorBorderMuted,
      flexShrink: 0,
    },
  },
  hamburger: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '36px',
    height: '36px',
    borderRadius: tokens.radiusMd,
    cursor: 'pointer',
    color: tokens.colorText,
    backgroundColor: {
      default: 'transparent',
      ':hover': tokens.colorMuted,
    },
  },
  hamburgerIcon: {
    width: '20px',
    height: '20px',
  },
  mobileLogoText: {
    fontSize: tokens.fontSizeSm,
    fontWeight: tokens.fontWeightBold,
    letterSpacing: tokens.letterSpacingWide,
    color: tokens.colorText,
    lineHeight: 1,
  },
  overlay: {
    display: 'none',
    [MOBILE]: {
      display: 'block',
      position: 'fixed',
      inset: 0,
      backgroundColor: 'oklch(0 0 0 / 0.4)',
      zIndex: 40,
    },
  },
  main: {
    flex: 1,
    padding: tokens.space8,
    overflowY: 'auto',
    [MOBILE]: {
      padding: tokens.space4,
    },
  },
  content: {
    maxWidth: '768px',
  },
  header: {
    marginBottom: tokens.space10,
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: tokens.colorBorderMuted,
    paddingBottom: tokens.space6,
    [MOBILE]: {
      marginBottom: tokens.space6,
      paddingBottom: tokens.space4,
    },
  },
  title: {
    fontSize: tokens.fontSize2xl,
    fontWeight: tokens.fontWeightBold,
    lineHeight: tokens.lineHeightTight,
    [MOBILE]: {
      fontSize: tokens.fontSizeXl,
    },
  },
  description: {
    fontSize: tokens.fontSizeMd,
    color: tokens.colorTextMuted,
    lineHeight: tokens.lineHeightNormal,
    marginTop: tokens.space2,
    [MOBILE]: {
      fontSize: tokens.fontSizeSm,
    },
  },
});

function PageWrapper({ page }: { page: PageEntry }) {
  const PageComponent = page.component;
  return (
    <>
      <header {...stylex.props(styles.header)}>
        <h1 {...stylex.props(styles.title)}>{page.label}</h1>
        <p {...stylex.props(styles.description)}>{page.description}</p>
      </header>
      {PageComponent && <PageComponent />}
      {page.markdown && (
        <p {...stylex.props(styles.description)}>Guide content coming soon.</p>
      )}
    </>
  );
}

export function App() {
  const [dark, setDark] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const theme = dark ? darkTheme : lightTheme;

  useEffect(() => {
    const themeProps = stylex.props(theme);
    const el = document.documentElement;
    if (themeProps.className) {
      el.className = themeProps.className;
    }
    if (themeProps.style) {
      Object.assign(el.style, themeProps.style);
    }
    return () => {
      el.className = '';
      el.style.cssText = '';
    };
  }, [dark]);

  return (
    <div {...stylex.props(theme, styles.layout)}>
      {/* Mobile header */}
      <div {...stylex.props(styles.mobileHeader)}>
        <button
          {...stylex.props(styles.hamburger)}
          onClick={() => setSidebarOpen(true)}
          aria-label="Open navigation"
        >
          <svg {...stylex.props(styles.hamburgerIcon)} viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 5A.75.75 0 012.75 9h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 9.75zm0 5a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75a.75.75 0 01-.75-.75z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <span {...stylex.props(styles.mobileLogoText)}>Base-X UI</span>
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div {...stylex.props(styles.overlay)} onClick={() => setSidebarOpen(false)} />
      )}

      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        dark={dark}
        onToggleTheme={() => setDark((d) => !d)}
      />

      <main {...stylex.props(styles.main)}>
        <div {...stylex.props(styles.content)}>
          <Routes>
            {pages.map((page) => (
              <Route
                key={page.id}
                path={page.path}
                element={<PageWrapper page={page} />}
              />
            ))}
          </Routes>
        </div>
      </main>
    </div>
  );
}
