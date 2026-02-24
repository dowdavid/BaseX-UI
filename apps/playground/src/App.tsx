import { useState } from 'react';
import * as stylex from '@stylexjs/stylex';
import { tokens } from '@basex-ui/tokens';
import { lightTheme, darkTheme } from '@basex-ui/styles';
import { Button } from '@basex-ui/components';
import { ButtonPage } from './pages/ButtonPage';
import { AccordionPage } from './pages/AccordionPage';

const pages = [
  { id: 'button', label: 'Button', component: ButtonPage },
  { id: 'accordion', label: 'Accordion', component: AccordionPage },
] as const;

const styles = stylex.create({
  layout: {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: tokens.colorBackground,
    color: tokens.colorText,
    fontFamily: tokens.fontFamilySans,
  },
  sidebar: {
    width: '220px',
    flexShrink: 0,
    borderRightWidth: '1px',
    borderRightStyle: 'solid',
    borderRightColor: tokens.colorBorderMuted,
    padding: tokens.space4,
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.space1,
    position: 'sticky',
    top: 0,
    height: '100vh',
    overflowY: 'auto',
  },
  sidebarHeader: {
    fontSize: tokens.fontSizeSm,
    fontWeight: tokens.fontWeightBold,
    letterSpacing: tokens.letterSpacingWide,
    color: tokens.colorTextMuted,
    textTransform: 'uppercase',
    paddingBlock: tokens.space2,
    paddingInline: tokens.space2,
    marginBottom: tokens.space2,
  },
  navItem: {
    display: 'block',
    width: '100%',
    textAlign: 'left',
    paddingBlock: tokens.space2,
    paddingInline: tokens.space3,
    borderRadius: tokens.radiusMd,
    fontSize: tokens.fontSizeSm,
    fontWeight: tokens.fontWeightMedium,
    color: tokens.colorTextMuted,
    cursor: 'pointer',
    backgroundColor: {
      default: 'transparent',
      ':hover': tokens.colorMuted,
    },
    transitionProperty: 'background-color, color',
    transitionDuration: tokens.motionDurationFast,
    transitionTimingFunction: tokens.motionEaseOut,
  },
  navItemActive: {
    backgroundColor: tokens.colorMuted,
    color: tokens.colorText,
  },
  main: {
    flex: 1,
    padding: tokens.space8,
    overflowY: 'auto',
  },
  content: {
    maxWidth: '640px',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: tokens.space8,
  },
  title: {
    fontSize: tokens.fontSize2xl,
    fontWeight: tokens.fontWeightBold,
  },
  spacer: {
    flex: 1,
  },
  themeToggle: {
    marginTop: 'auto',
    paddingTop: tokens.space4,
    borderTopWidth: '1px',
    borderTopStyle: 'solid',
    borderTopColor: tokens.colorBorderMuted,
  },
});

export function App() {
  const [dark, setDark] = useState(false);
  const [activePage, setActivePage] = useState<string>('button');
  const theme = dark ? darkTheme : lightTheme;

  const currentPage = pages.find((p) => p.id === activePage) ?? pages[0];
  const PageComponent = currentPage.component;

  return (
    <div {...stylex.props(theme, styles.layout)}>
      <nav {...stylex.props(styles.sidebar)}>
        <div {...stylex.props(styles.sidebarHeader)}>Components</div>
        {pages.map((page) => (
          <button
            key={page.id}
            onClick={() => setActivePage(page.id)}
            {...stylex.props(
              styles.navItem,
              activePage === page.id && styles.navItemActive,
            )}
          >
            {page.label}
          </button>
        ))}
        <div {...stylex.props(styles.spacer)} />
        <div {...stylex.props(styles.themeToggle)}>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setDark((d) => !d)}
          >
            {dark ? 'Light mode' : 'Dark mode'}
          </Button>
        </div>
      </nav>

      <main {...stylex.props(styles.main)}>
        <div {...stylex.props(styles.content)}>
          <header {...stylex.props(styles.header)}>
            <h1 {...stylex.props(styles.title)}>{currentPage.label}</h1>
          </header>
          <PageComponent />
        </div>
      </main>
    </div>
  );
}
