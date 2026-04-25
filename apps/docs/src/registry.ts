import { type ComponentType } from 'react';

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
import { NumberFieldPage } from './pages/NumberFieldPage';
import { PopoverPage } from './pages/PopoverPage';
import { PreviewCardPage } from './pages/PreviewCardPage';
import { ProgressPage } from './pages/ProgressPage';
import { RadioPage } from './pages/RadioPage';
import { TooltipPage } from './pages/TooltipPage';

export interface PageEntry {
  id: string;
  label: string;
  description: string;
  path: string;
  section: 'main' | 'components' | 'intelligence' | 'mcp-server';
  component?: ComponentType;
  /** Key into the content map for guide pages */
  markdown?: string;
}

export const sections = [
  { id: 'main', label: null },
  { id: 'intelligence', label: 'Intelligence' },
  { id: 'mcp-server', label: 'MCP Server' },
  { id: 'components', label: 'Components' },
] as const;

export const pages: PageEntry[] = [
  // Main section
  {
    id: 'about',
    label: 'About',
    description: 'The vision behind Base-X UI.',
    path: '/about',
    section: 'main',
    markdown: 'about',
  },
  {
    id: 'getting-started',
    label: 'Getting Started',
    description: 'Installation and quick start.',
    path: '/',
    section: 'main',
    markdown: 'getting-started',
  },
  {
    id: 'cli',
    label: 'CLI',
    description: 'Developer commands for initializing, scaffolding, and theming.',
    path: '/cli',
    section: 'main',
    markdown: 'cli',
  },

  // Components section
  {
    id: 'accordion',
    label: 'Accordion',
    description: 'Collapsible sections for progressive content disclosure.',
    path: '/components/accordion',
    section: 'components',
    component: AccordionPage,
  },
  {
    id: 'alert-dialog',
    label: 'Alert Dialog',
    description: 'A modal dialog that requires user acknowledgment to proceed.',
    path: '/components/alert-dialog',
    section: 'components',
    component: AlertDialogPage,
  },
  {
    id: 'autocomplete',
    label: 'Autocomplete',
    description: 'A text input with a filterable suggestion dropdown.',
    path: '/components/autocomplete',
    section: 'components',
    component: AutocompletePage,
  },
  {
    id: 'avatar',
    label: 'Avatar',
    description: 'A circular image or fallback representing a user or entity.',
    path: '/components/avatar',
    section: 'components',
    component: AvatarPage,
  },
  {
    id: 'button',
    label: 'Button',
    description: 'A clickable element for triggering actions.',
    path: '/components/button',
    section: 'components',
    component: ButtonPage,
  },
  {
    id: 'checkbox',
    label: 'Checkbox',
    description: 'A control for toggling between checked, unchecked, and indeterminate states.',
    path: '/components/checkbox',
    section: 'components',
    component: CheckboxPage,
  },
  {
    id: 'checkbox-group',
    label: 'Checkbox Group',
    description: 'A container that provides shared state to a series of checkboxes.',
    path: '/components/checkbox-group',
    section: 'components',
    component: CheckboxGroupPage,
  },
  {
    id: 'collapsible',
    label: 'Collapsible',
    description: 'A single collapsible section with a trigger button and animated content panel.',
    path: '/components/collapsible',
    section: 'components',
    component: CollapsiblePage,
  },
  {
    id: 'combobox',
    label: 'Combobox',
    description: 'A searchable select dropdown with optional multi-select.',
    path: '/components/combobox',
    section: 'components',
    component: ComboboxPage,
  },
  {
    id: 'dialog',
    label: 'Dialog',
    description: 'A general-purpose modal overlay for content, forms, or interactive flows.',
    path: '/components/dialog',
    section: 'components',
    component: DialogPage,
  },
  {
    id: 'drawer',
    label: 'Drawer',
    description: 'A slide-out panel anchored to a screen edge for supplementary content.',
    path: '/components/drawer',
    section: 'components',
    component: DrawerPage,
  },
  {
    id: 'field',
    label: 'Field',
    description: 'A form field wrapper connecting label, control, description, and error.',
    path: '/components/field',
    section: 'components',
    component: FieldPage,
  },
  {
    id: 'fieldset',
    label: 'Fieldset',
    description: 'A semantic grouping container for related form fields.',
    path: '/components/fieldset',
    section: 'components',
    component: FieldsetPage,
  },
  {
    id: 'form',
    label: 'Form',
    description: 'An enhanced form element with server-side validation error management.',
    path: '/components/form',
    section: 'components',
    component: FormPage,
  },
  {
    id: 'input',
    label: 'Input',
    description: 'A standalone styled text input with Field integration.',
    path: '/components/input',
    section: 'components',
    component: InputPage,
  },
  {
    id: 'menu',
    label: 'Menu',
    description: 'A dropdown menu with items, groups, checkbox items, and submenus.',
    path: '/components/menu',
    section: 'components',
    component: MenuPage,
  },
  {
    id: 'menubar',
    label: 'Menubar',
    description: 'A horizontal container for multiple menus with keyboard navigation.',
    path: '/components/menubar',
    section: 'components',
    component: MenubarPage,
  },
  {
    id: 'meter',
    label: 'Meter',
    description: 'A visual indicator showing a scalar value within a known range.',
    path: '/components/meter',
    section: 'components',
    component: MeterPage,
  },
  {
    id: 'navigation-menu',
    label: 'Navigation Menu',
    description: 'A site navigation component with hover-triggered dropdown content.',
    path: '/components/navigation-menu',
    section: 'components',
    component: NavigationMenuPage,
  },
  {
    id: 'number-field',
    label: 'Number Field',
    description: 'A numeric input with increment and decrement buttons.',
    path: '/components/number-field',
    section: 'components',
    component: NumberFieldPage,
  },
  {
    id: 'popover',
    label: 'Popover',
    description: 'A floating content panel that appears next to a trigger element.',
    path: '/components/popover',
    section: 'components',
    component: PopoverPage,
  },
  {
    id: 'preview-card',
    label: 'Preview Card',
    description: 'A hover-triggered card showing a preview of linked content.',
    path: '/components/preview-card',
    section: 'components',
    component: PreviewCardPage,
  },
  {
    id: 'progress',
    label: 'Progress',
    description: 'A progress bar showing determinate or indeterminate task completion.',
    path: '/components/progress',
    section: 'components',
    component: ProgressPage,
  },
  {
    id: 'radio',
    label: 'Radio',
    description: 'A radio button group for single-select choices.',
    path: '/components/radio',
    section: 'components',
    component: RadioPage,
  },
  {
    id: 'tooltip',
    label: 'Tooltip',
    description: 'A non-interactive label that appears on hover or focus.',
    path: '/components/tooltip',
    section: 'components',
    component: TooltipPage,
  },

  // Intelligence section
  {
    id: 'intelligence',
    label: 'Overview',
    description: 'How Base-X UI helps agents pick the right component.',
    path: '/intelligence',
    section: 'intelligence',
    markdown: 'intelligence/index',
  },
  {
    id: 'intent-resolution',
    label: 'Intent Resolution',
    description: 'Map natural language descriptions to the right component.',
    path: '/intelligence/intent-resolution',
    section: 'intelligence',
    markdown: 'intelligence/intent-resolution',
  },
  {
    id: 'anti-patterns',
    label: 'Anti-Patterns',
    description: '70 rules that catch component misuse before code is generated.',
    path: '/intelligence/anti-patterns',
    section: 'intelligence',
    markdown: 'intelligence/anti-patterns',
  },
  {
    id: 'animation-system',
    label: 'Animation System',
    description: 'Five presets that cover every interaction.',
    path: '/intelligence/animation-system',
    section: 'intelligence',
    markdown: 'intelligence/animation-system',
  },

  // MCP Server section
  {
    id: 'mcp-server',
    label: 'Overview',
    description: '10 tools that let AI agents discover and generate components.',
    path: '/mcp-server',
    section: 'mcp-server',
    markdown: 'mcp-server/index',
  },
  {
    id: 'discovery-tools',
    label: 'Discovery Tools',
    description: 'Tools for browsing and searching the component library.',
    path: '/mcp-server/discovery-tools',
    section: 'mcp-server',
    markdown: 'mcp-server/discovery-tools',
  },
  {
    id: 'intent-tools',
    label: 'Intent Tools',
    description: 'Tools for mapping descriptions to components and catching anti-patterns.',
    path: '/mcp-server/intent-tools',
    section: 'mcp-server',
    markdown: 'mcp-server/intent-tools',
  },
  {
    id: 'setup-tools',
    label: 'Setup & Token Tools',
    description: 'Pre-generation requirements, design tokens, themes, and animations.',
    path: '/mcp-server/setup-tools',
    section: 'mcp-server',
    markdown: 'mcp-server/setup-tools',
  },
];
