import { useState, useEffect, useRef } from 'react';
import * as stylex from '@stylexjs/stylex';
import { tokens } from '@basex-ui/tokens';
import { lightTheme, darkTheme } from '@basex-ui/styles';
import { Routes, Route, useLocation } from 'react-router';
import { pages, type PageEntry } from './registry';
import { Sidebar } from './components/Sidebar';
import { GuidePage } from './pages/GuidePage';
import { ComponentDocPage } from './pages/ComponentDocPage';
import { content } from './content';
import { apiDocs } from './content/api-docs';
import { ThemeProvider } from './context/ThemeContext';

const MOBILE = '@media (max-width: 768px)' as const;

const styles = stylex.create({
  layout: {
    display: 'flex',
    height: '100vh',
    width: '100vw',
    overflowX: 'hidden',
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
  mobileLogoMark: {
    width: '24px',
    height: '24px',
    flexShrink: 0,
    color: tokens.colorText,
  },
  mobileLogoInner: {
    stroke: tokens.colorBackground,
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
    overflowX: 'hidden',
    minWidth: 0,
    [MOBILE]: {
      padding: tokens.space4,
    },
  },
  content: {
    maxWidth: '768px',
    width: '100%',
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
  descriptionRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: tokens.space4,
    marginTop: tokens.space2,
    [MOBILE]: {
      gap: tokens.space2,
    },
  },
  description: {
    fontSize: tokens.fontSizeMd,
    color: tokens.colorTextMuted,
    lineHeight: tokens.lineHeightNormal,
    [MOBILE]: {
      fontSize: tokens.fontSizeSm,
    },
  },
  githubLink: {
    display: 'flex',
    alignItems: 'center',
    flexShrink: 0,
    color: tokens.colorTextMuted,
    textDecoration: 'none',
    cursor: 'pointer',
    backgroundColor: {
      default: 'transparent',
      ':hover': tokens.colorMuted,
    },
    borderRadius: tokens.radiusMd,
    padding: tokens.space1,
  },
  githubIcon: {
    width: '20px',
    height: '20px',
  },
});

function PageWrapper({ page }: { page: PageEntry }) {
  return (
    <>
      <header {...stylex.props(styles.header)}>
        <h1 {...stylex.props(styles.title)}>{page.label}</h1>
        <div {...stylex.props(styles.descriptionRow)}>
          <p {...stylex.props(styles.description)}>{page.description}</p>
          <a
            href="https://github.com/dowdavid/BaseX-UI"
            target="_blank"
            rel="noopener noreferrer"
            {...stylex.props(styles.githubLink)}
            aria-label="GitHub"
          >
            <svg
              {...stylex.props(styles.githubIcon)}
              viewBox="0 0 24 24"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" />
            </svg>
          </a>
        </div>
      </header>
      {page.component && (
        <ComponentDocPage
          DemoPage={page.component}
          apiDocs={apiDocs[page.id]}
          importStatement={`import { ${page.label.replace(/\s/g, '')} } from '@basex-ui/components';`}
        />
      )}
      {page.markdown && content[page.markdown] != null && (
        <GuidePage content={content[page.markdown]!} />
      )}
    </>
  );
}

export function App() {
  const [dark, setDark] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const mainRef = useRef<HTMLElement>(null);
  const location = useLocation();
  const theme = dark ? darkTheme : lightTheme;

  // Scroll main content to top on navigation
  useEffect(() => {
    mainRef.current?.scrollTo(0, 0);
  }, [location.pathname]);

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
    <ThemeProvider value={dark}>
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
          <svg
            {...stylex.props(styles.mobileLogoMark)}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="24" height="24" rx="6" fill="currentColor" />
            <path
              d="M6 8.5L12 5L18 8.5V15.5L12 19L6 15.5V8.5Z"
              {...stylex.props(styles.mobileLogoInner)}
              strokeWidth="1.5"
              fill="none"
            />
            <path
              d="M12 5V19M6 8.5L18 15.5M18 8.5L6 15.5"
              {...stylex.props(styles.mobileLogoInner)}
              strokeWidth="1.5"
            />
          </svg>
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

        <main ref={mainRef} {...stylex.props(styles.main)}>
          <div {...stylex.props(styles.content)}>
            <Routes>
              {pages.map((page) => (
                <Route key={page.id} path={page.path} element={<PageWrapper page={page} />} />
              ))}
            </Routes>
          </div>
        </main>
      </div>
    </ThemeProvider>
  );
}
