import { useState, useEffect } from 'react';
import * as stylex from '@stylexjs/stylex';
import { tokens } from '@basex-ui/tokens';
import { lightTheme, darkTheme } from '@basex-ui/styles';
import { Button } from '@basex-ui/components';
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
] as const;

const styles = stylex.create({
  layout: {
    display: 'flex',
    height: '100vh',
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
  },
  title: {
    fontSize: tokens.fontSize2xl,
    fontWeight: tokens.fontWeightBold,
    lineHeight: tokens.lineHeightTight,
  },
  description: {
    fontSize: tokens.fontSizeMd,
    color: tokens.colorTextMuted,
    lineHeight: tokens.lineHeightNormal,
    marginTop: tokens.space2,
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

  const currentPage = pages.find((p) => p.id === activePage) ?? pages[0];
  const PageComponent = currentPage.component;

  return (
    <div {...stylex.props(theme, styles.layout)}>
      <nav {...stylex.props(styles.sidebar)}>
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
            onClick={() => setActivePage(page.id)}
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
