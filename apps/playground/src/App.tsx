import { useState, useEffect, useCallback } from 'react';
import * as stylex from '@stylexjs/stylex';
import { tokens } from '@basex-ui/tokens';
import { lightTheme, darkTheme } from '@basex-ui/styles';
import { Button } from '@basex-ui/components';

const MOBILE = '@media (max-width: 768px)' as const;
import { AccordionPage } from './pages/AccordionPage';
import { AlertDialogPage } from './pages/AlertDialogPage';
import { AutocompletePage } from './pages/AutocompletePage';
import { AvatarPage } from './pages/AvatarPage';
import { ButtonPage } from './pages/ButtonPage';
import { CheckboxPage } from './pages/CheckboxPage';
import { CheckboxGroupPage } from './pages/CheckboxGroupPage';
import { CollapsiblePage } from './pages/CollapsiblePage';
import { ComboboxPage } from './pages/ComboboxPage';
import { DialogPage } from './pages/DialogPage';
import { DrawerPage } from './pages/DrawerPage';
import { FieldPage } from './pages/FieldPage';
import { FieldsetPage } from './pages/FieldsetPage';
import { FormPage } from './pages/FormPage';
import { InputPage } from './pages/InputPage';
import { MenuPage } from './pages/MenuPage';
import { MenubarPage } from './pages/MenubarPage';
import { MeterPage } from './pages/MeterPage';
import { NavigationMenuPage } from './pages/NavigationMenuPage';

const pages = [
  {
    id: 'accordion',
    label: 'Accordion',
    description: 'Collapsible sections for progressive content disclosure.',
    component: AccordionPage,
  },
  {
    id: 'alert-dialog',
    label: 'Alert Dialog',
    description: 'A modal dialog that requires user acknowledgment to proceed.',
    component: AlertDialogPage,
  },
  {
    id: 'autocomplete',
    label: 'Autocomplete',
    description: 'A text input with a filterable suggestion dropdown.',
    component: AutocompletePage,
  },
  {
    id: 'avatar',
    label: 'Avatar',
    description: 'A circular image or fallback representing a user or entity.',
    component: AvatarPage,
  },
  {
    id: 'button',
    label: 'Button',
    description: 'A clickable element for triggering actions.',
    component: ButtonPage,
  },
  {
    id: 'checkbox',
    label: 'Checkbox',
    description: 'A control for toggling between checked, unchecked, and indeterminate states.',
    component: CheckboxPage,
  },
  {
    id: 'checkbox-group',
    label: 'Checkbox Group',
    description: 'A container that provides shared state to a series of checkboxes.',
    component: CheckboxGroupPage,
  },
  {
    id: 'collapsible',
    label: 'Collapsible',
    description: 'A single collapsible section with a trigger button and animated content panel.',
    component: CollapsiblePage,
  },
  {
    id: 'combobox',
    label: 'Combobox',
    description: 'A searchable select dropdown with optional multi-select.',
    component: ComboboxPage,
  },
  {
    id: 'dialog',
    label: 'Dialog',
    description: 'A general-purpose modal overlay for content, forms, or interactive flows.',
    component: DialogPage,
  },
  {
    id: 'drawer',
    label: 'Drawer',
    description: 'A slide-out panel anchored to a screen edge for supplementary content.',
    component: DrawerPage,
  },
  {
    id: 'field',
    label: 'Field',
    description: 'A form field wrapper connecting label, control, description, and error.',
    component: FieldPage,
  },
  {
    id: 'fieldset',
    label: 'Fieldset',
    description: 'A semantic grouping container for related form fields.',
    component: FieldsetPage,
  },
  {
    id: 'form',
    label: 'Form',
    description: 'An enhanced form element with server-side validation error management.',
    component: FormPage,
  },
  {
    id: 'input',
    label: 'Input',
    description: 'A standalone styled text input with Field integration.',
    component: InputPage,
  },
  {
    id: 'menu',
    label: 'Menu',
    description: 'A dropdown menu with items, groups, checkbox items, and submenus.',
    component: MenuPage,
  },
  {
    id: 'menubar',
    label: 'Menubar',
    description: 'A horizontal container for multiple menus with keyboard navigation.',
    component: MenubarPage,
  },
  {
    id: 'meter',
    label: 'Meter',
    description: 'A visual indicator showing a scalar value within a known range.',
    component: MeterPage,
  },
  {
    id: 'navigation-menu',
    label: 'Navigation Menu',
    description: 'A site navigation component with hover-triggered dropdown content.',
    component: NavigationMenuPage,
  },
] as const;

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
    [MOBILE]: {
      position: 'fixed',
      top: 0,
      left: 0,
      bottom: 0,
      zIndex: 50,
      backgroundColor: tokens.colorBackground,
      transform: 'translateX(-100%)',
      transitionProperty: 'transform',
      transitionDuration: '200ms',
      transitionTimingFunction: 'ease-out',
    },
  },
  sidebarOpen: {
    [MOBILE]: {
      transform: 'translateX(0)',
    },
  },
  sidebarHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: tokens.space2,
    paddingBlock: tokens.space2,
    paddingInline: tokens.space2,
    marginBottom: tokens.space2,
  },
  logoMark: {
    width: '24px',
    height: '24px',
    flexShrink: 0,
    color: tokens.colorText,
  },
  logoInner: {
    stroke: tokens.colorBackground,
  },
  logoText: {
    fontSize: tokens.fontSizeSm,
    fontWeight: tokens.fontWeightBold,
    letterSpacing: tokens.letterSpacingWide,
    color: tokens.colorText,
    lineHeight: 1,
  },
  logoTextMuted: {
    color: tokens.colorTextMuted,
    fontWeight: tokens.fontWeightMedium,
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
  const [activePage, setActivePage] = useState<string>('accordion');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const theme = dark ? darkTheme : lightTheme;

  // Apply theme to <html> so portaled content (dropdowns, dialogs) inherits tokens
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

  const handlePageSelect = useCallback((pageId: string) => {
    setActivePage(pageId);
    setSidebarOpen(false);
  }, []);

  const currentPage = pages.find((p) => p.id === activePage) ?? pages[0];
  const PageComponent = currentPage.component;

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

      <nav {...stylex.props(styles.sidebar, sidebarOpen && styles.sidebarOpen)}>
        <div {...stylex.props(styles.sidebarHeader)}>
          <svg
            {...stylex.props(styles.logoMark)}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="24" height="24" rx="6" fill="currentColor" />
            <path
              d="M6 8.5L12 5L18 8.5V15.5L12 19L6 15.5V8.5Z"
              {...stylex.props(styles.logoInner)}
              strokeWidth="1.5"
              fill="none"
            />
            <path
              d="M12 5V19M6 8.5L18 15.5M18 8.5L6 15.5"
              {...stylex.props(styles.logoInner)}
              strokeWidth="1.5"
            />
          </svg>
          <div>
            <div {...stylex.props(styles.logoText)}>Base-X UI</div>
          </div>
        </div>
        {pages.map((page) => (
          <button
            key={page.id}
            onClick={() => handlePageSelect(page.id)}
            {...stylex.props(styles.navItem, activePage === page.id && styles.navItemActive)}
          >
            {page.label}
          </button>
        ))}
        <div {...stylex.props(styles.spacer)} />
        <div {...stylex.props(styles.themeToggle)}>
          <Button variant="ghost" size="sm" onClick={() => setDark((d) => !d)}>
            {dark ? 'Light mode' : 'Dark mode'}
          </Button>
        </div>
      </nav>

      <main {...stylex.props(styles.main)}>
        <div {...stylex.props(styles.content)}>
          <header {...stylex.props(styles.header)}>
            <h1 {...stylex.props(styles.title)}>{currentPage.label}</h1>
            <p {...stylex.props(styles.description)}>{currentPage.description}</p>
          </header>
          <PageComponent />
        </div>
      </main>
    </div>
  );
}
