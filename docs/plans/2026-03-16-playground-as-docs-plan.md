# Playground as Docs Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Transform the existing Vite playground into a full documentation site with URL routing, markdown API docs, code preview toggles, sidebar search, and guide pages — then delete the Fumadocs/Next.js docs app.

**Architecture:** Extend the existing playground SPA with React Router for URL-based navigation, react-markdown for rendering package `.md` files and guide content, Shiki for syntax highlighting, and Fuse.js for client-side search. The existing component demo pages remain unchanged. A new `ComponentDocPage` wrapper renders demos + markdown docs together. Guide pages render pure markdown.

**Tech Stack:** Vite 6, React 19, React Router 7, StyleX 0.17.5, react-markdown + remark-gfm, Shiki, Fuse.js

---

## Task 1: Install dependencies and configure React Router

**Files:**
- Modify: `apps/playground/package.json`
- Modify: `apps/playground/src/main.tsx`
- Modify: `apps/playground/vite.config.ts`

**Step 1: Install new dependencies**

```bash
cd apps/playground && pnpm add react-router react-markdown remark-gfm shiki fuse.js
```

**Step 2: Update vite.config.ts for SPA fallback**

Add the `appType: 'spa'` config (already default for Vite, but ensure the dev server handles client-side routing):

```ts
// In vite.config.ts, add to defineConfig:
server: {
  port: 5173,
},
```

No other Vite changes needed — Vite's dev server already falls back to index.html for unknown routes.

**Step 3: Wrap App in BrowserRouter**

Update `main.tsx`:

```tsx
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import { App } from './App';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
```

Remove the Agentation import (dev-only tool, not for production docs).

**Step 4: Verify dev server starts**

```bash
cd apps/playground && pnpm dev
```

Expected: Server starts on port 5173, app loads at localhost:5173.

**Step 5: Commit**

```bash
git add apps/playground/package.json apps/playground/src/main.tsx apps/playground/vite.config.ts pnpm-lock.yaml
git commit -m "feat(playground): install docs dependencies and add React Router"
```

---

## Task 2: Create the page registry and route structure

**Files:**
- Create: `apps/playground/src/registry.ts`
- Modify: `apps/playground/src/App.tsx`

**Step 1: Extract page registry to its own module**

Create `apps/playground/src/registry.ts`. This is the single source of truth for all pages — components, guides, and the about page. Move the `pages` array from App.tsx here and extend it with sections and route paths.

```ts
import { type ComponentType } from 'react';

// Page imports (components)
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

export interface PageEntry {
  id: string;
  label: string;
  description: string;
  path: string;
  section: 'main' | 'components' | 'intelligence' | 'mcp-server';
  component?: ComponentType;
  /** Path to markdown file (for guide pages and component API docs) */
  markdown?: string;
  /** Path to package .md file for component reference docs */
  apiDocs?: string;
}

export const sections = [
  { id: 'main', label: null },
  { id: 'components', label: 'Components' },
  { id: 'intelligence', label: 'Intelligence' },
  { id: 'mcp-server', label: 'MCP Server' },
] as const;

export const pages: PageEntry[] = [
  // Main section
  {
    id: 'about',
    label: 'About',
    description: 'The vision behind Base-X UI.',
    path: '/',
    section: 'main',
    markdown: 'about',
  },
  {
    id: 'getting-started',
    label: 'Getting Started',
    description: 'Installation and quick start.',
    path: '/getting-started',
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

  // Components section (24 entries)
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
```

**Step 2: Refactor App.tsx to use React Router**

Replace the `useState(activePage)` navigation with React Router's `Routes`/`Route` and `useLocation`/`useNavigate`. The sidebar reads from the registry and uses `<Link>` or `navigate()`. The main content area renders routes.

Key changes to `App.tsx`:
- Remove all 24 page imports (moved to registry.ts)
- Remove `pages` array (moved to registry.ts)
- Replace `useState(activePage)` with `useLocation()` to determine active page
- Replace `setActivePage(pageId)` with `useNavigate()` calls
- Replace `<PageComponent />` with `<Routes>` containing route definitions
- Sidebar buttons become `<Link>` elements styled the same way
- Add section headers and collapsible groups to sidebar

```tsx
// Rough structure of refactored App.tsx
import { Routes, Route, Link, useLocation } from 'react-router';
import { pages, sections } from './registry';

// In the sidebar:
{sections.map(section => (
  <div key={section.id}>
    {section.label && <SectionHeader>{section.label}</SectionHeader>}
    {pages.filter(p => p.section === section.id).map(page => (
      <Link
        key={page.id}
        to={page.path}
        {...stylex.props(styles.navItem, isActive(page.path) && styles.navItemActive)}
      >
        {page.label}
      </Link>
    ))}
  </div>
))}

// In the main content area:
<Routes>
  {pages.map(page => (
    <Route
      key={page.id}
      path={page.path}
      element={<PageWrapper page={page} />}
    />
  ))}
</Routes>
```

The `PageWrapper` component renders the header (title + description) plus either:
- Component demo page (if `page.component` exists)
- Guide page with markdown (if `page.markdown` exists)

**Step 3: Verify routing works**

```bash
pnpm dev
```

Navigate to `localhost:5173/components/button` — should show Button demos.
Navigate to `localhost:5173/` — should show About page (empty for now).
Browser back/forward should work.

**Step 4: Commit**

```bash
git add apps/playground/src/registry.ts apps/playground/src/App.tsx
git commit -m "feat(playground): add URL routing with React Router and page registry"
```

---

## Task 3: Create the sidebar with sections, search, and collapsible groups

**Files:**
- Create: `apps/playground/src/components/Sidebar.tsx`
- Modify: `apps/playground/src/App.tsx`

**Step 1: Create Sidebar component**

Extract sidebar from App.tsx into its own component. Add:
- Search input at top that filters pages by label and description using Fuse.js
- Section headers ("Components", "Intelligence", "MCP Server")
- Collapsible section groups (Components section starts expanded, others collapsed)
- Active page highlighting via `useLocation()`
- Mobile hamburger behavior (passed via props)

Style the search input with StyleX using the existing token system. Keep it minimal — a simple text input with subtle border, no search icon needed.

Section headers get a small label style: uppercase, muted color, small font, with some top margin.

Collapsible groups: clicking the section header toggles visibility of that section's items. Use a simple `useState` per section. Chevron icon rotates on expand/collapse.

```tsx
// Key structure
export function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const location = useLocation();
  const [query, setQuery] = useState('');
  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    components: true,
    intelligence: false,
    'mcp-server': false,
  });

  const filtered = query ? fuse.search(query).map(r => r.item) : pages;

  return (
    <nav {...stylex.props(styles.sidebar, open && styles.sidebarOpen)}>
      {/* Logo */}
      {/* Search input */}
      {/* Section groups with collapsible items */}
      {/* Theme toggle at bottom */}
    </nav>
  );
}
```

**Step 2: Update App.tsx to use Sidebar component**

Replace inline sidebar JSX with `<Sidebar />`.

**Step 3: Verify search and collapsible sections**

- Type "button" in search — should filter to show Button
- Type "dialog" — should show Dialog, Alert Dialog
- Click "Intelligence" header — should expand/collapse
- Active page should be highlighted

**Step 4: Commit**

```bash
git add apps/playground/src/components/Sidebar.tsx apps/playground/src/App.tsx
git commit -m "feat(playground): add sidebar with search, sections, and collapsible groups"
```

---

## Task 4: Create markdown renderer with syntax highlighting

**Files:**
- Create: `apps/playground/src/components/Markdown.tsx`

**Step 1: Create the Markdown component**

This component takes a raw markdown string and renders it with:
- `react-markdown` for parsing
- `remark-gfm` for tables and strikethrough
- Custom renderers for headings, code blocks, tables, and inline code
- Shiki for syntax-highlighted code blocks (async, with loading state)

All custom renderers are styled with StyleX using the existing token system.

```tsx
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import * as stylex from '@stylexjs/stylex';
import { tokens } from '@basex-ui/tokens';

// Style every markdown element with StyleX
const styles = stylex.create({
  root: {
    fontSize: tokens.fontSizeSm,
    lineHeight: tokens.lineHeightRelaxed,
    color: tokens.colorText,
  },
  h2: {
    fontSize: tokens.fontSizeLg,
    fontWeight: tokens.fontWeightSemibold,
    marginTop: tokens.space10,
    marginBottom: tokens.space4,
    color: tokens.colorText,
  },
  h3: {
    fontSize: tokens.fontSizeMd,
    fontWeight: tokens.fontWeightSemibold,
    marginTop: tokens.space8,
    marginBottom: tokens.space3,
    color: tokens.colorText,
  },
  p: {
    marginBottom: tokens.space4,
    color: tokens.colorText,
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginBlock: tokens.space6,
    fontSize: tokens.fontSizeSm,
  },
  th: {
    textAlign: 'left',
    paddingBlock: tokens.space2,
    paddingInline: tokens.space3,
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: tokens.colorBorderMuted,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorText,
  },
  td: {
    paddingBlock: tokens.space2,
    paddingInline: tokens.space3,
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: tokens.colorBorderMuted,
    color: tokens.colorTextMuted,
  },
  code: {
    fontFamily: tokens.fontFamilyMono,
    fontSize: '0.875em',
    backgroundColor: tokens.colorMuted,
    paddingBlock: '0.125rem',
    paddingInline: '0.375rem',
    borderRadius: tokens.radiusSm,
  },
  pre: {
    backgroundColor: tokens.colorMuted,
    borderRadius: tokens.radiusMd,
    padding: tokens.space4,
    overflowX: 'auto',
    marginBlock: tokens.space4,
    fontSize: tokens.fontSizeSm,
    fontFamily: tokens.fontFamilyMono,
    lineHeight: tokens.lineHeightRelaxed,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: tokens.colorBorderMuted,
  },
  // ... more element styles
});
```

For code blocks: use Shiki's `codeToHtml` with a theme that respects the current light/dark mode. Parse the language from the fenced code block info string. If Shiki hasn't loaded yet, show the code unstyled in a `<pre>`.

Custom component overrides for react-markdown:

```tsx
const components = {
  h2: ({ children }) => <h2 {...stylex.props(styles.h2)}>{children}</h2>,
  h3: ({ children }) => <h3 {...stylex.props(styles.h3)}>{children}</h3>,
  p: ({ children }) => <p {...stylex.props(styles.p)}>{children}</p>,
  table: ({ children }) => <table {...stylex.props(styles.table)}>{children}</table>,
  th: ({ children }) => <th {...stylex.props(styles.th)}>{children}</th>,
  td: ({ children }) => <td {...stylex.props(styles.td)}>{children}</td>,
  code: ({ inline, className, children }) => {
    if (inline) return <code {...stylex.props(styles.code)}>{children}</code>;
    return <CodeBlock language={className?.replace('language-', '')} code={String(children)} />;
  },
  pre: ({ children }) => children, // CodeBlock handles its own <pre>
};
```

**Step 2: Create CodeBlock sub-component**

```tsx
function CodeBlock({ language, code }: { language?: string; code: string }) {
  const [html, setHtml] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    import('shiki').then(({ codeToHtml }) => {
      codeToHtml(code.trim(), {
        lang: language || 'tsx',
        theme: 'github-dark-default',
      }).then(result => {
        if (!cancelled) setHtml(result);
      });
    });
    return () => { cancelled = true; };
  }, [code, language]);

  if (html) {
    return <div {...stylex.props(styles.pre)} dangerouslySetInnerHTML={{ __html: html }} />;
  }
  return <pre {...stylex.props(styles.pre)}><code>{code.trim()}</code></pre>;
}
```

**Step 3: Test with a sample markdown string**

Create a temporary test page that renders a markdown string with headings, code blocks, and tables to verify styling.

**Step 4: Commit**

```bash
git add apps/playground/src/components/Markdown.tsx
git commit -m "feat(playground): add markdown renderer with Shiki syntax highlighting"
```

---

## Task 5: Create guide pages and port markdown content

**Files:**
- Create: `apps/playground/src/content/about.md`
- Create: `apps/playground/src/content/getting-started.md`
- Create: `apps/playground/src/content/cli.md`
- Create: `apps/playground/src/content/intelligence/index.md`
- Create: `apps/playground/src/content/intelligence/intent-resolution.md`
- Create: `apps/playground/src/content/intelligence/anti-patterns.md`
- Create: `apps/playground/src/content/intelligence/animation-system.md`
- Create: `apps/playground/src/content/mcp-server/index.md`
- Create: `apps/playground/src/content/mcp-server/discovery-tools.md`
- Create: `apps/playground/src/content/mcp-server/intent-tools.md`
- Create: `apps/playground/src/content/mcp-server/setup-tools.md`
- Create: `apps/playground/src/pages/GuidePage.tsx`

**Step 1: Create the GuidePage component**

This component loads a markdown file via Vite's `?raw` import pattern and renders it with the Markdown component.

```tsx
import { Markdown } from '../components/Markdown';

interface GuidePageProps {
  content: string;
}

export function GuidePage({ content }: GuidePageProps) {
  return <Markdown content={content} />;
}
```

**Step 2: Create content files**

Port each MDX file from `apps/docs/content/docs/` to `apps/playground/src/content/`. Strip Fumadocs frontmatter (`---` blocks) and any Fumadocs-specific imports. Keep the markdown content as-is.

The About page is new — write placeholder content that Dave will fill in:

```md
# About Base-X UI

<!-- TODO(dave): Write the project vision -->
```

For each existing guide, copy the markdown body (everything after the frontmatter). The content from the exploration above shows exactly what each file contains.

**Step 3: Import content files with ?raw**

In the registry, content files are imported at the top and passed to route elements. Alternatively, use dynamic imports. For simplicity and zero-latency page switches, use static `?raw` imports in a content index:

```ts
// apps/playground/src/content/index.ts
import about from './about.md?raw';
import gettingStarted from './getting-started.md?raw';
import cli from './cli.md?raw';
import intelligenceIndex from './intelligence/index.md?raw';
import intentResolution from './intelligence/intent-resolution.md?raw';
import antiPatterns from './intelligence/anti-patterns.md?raw';
import animationSystem from './intelligence/animation-system.md?raw';
import mcpIndex from './mcp-server/index.md?raw';
import discoveryTools from './mcp-server/discovery-tools.md?raw';
import intentTools from './mcp-server/intent-tools.md?raw';
import setupTools from './mcp-server/setup-tools.md?raw';

export const content: Record<string, string> = {
  about,
  'getting-started': gettingStarted,
  cli,
  'intelligence/index': intelligenceIndex,
  'intelligence/intent-resolution': intentResolution,
  'intelligence/anti-patterns': antiPatterns,
  'intelligence/animation-system': animationSystem,
  'mcp-server/index': mcpIndex,
  'mcp-server/discovery-tools': discoveryTools,
  'mcp-server/intent-tools': intentTools,
  'mcp-server/setup-tools': setupTools,
};
```

**Step 4: Add Vite type declaration for ?raw imports**

In `apps/playground/src/vite-env.d.ts` (create if it doesn't exist):

```ts
/// <reference types="vite/client" />

declare module '*.md?raw' {
  const content: string;
  export default content;
}
```

**Step 5: Wire guide pages into the route system**

In App.tsx (or the route setup), guide pages render like:

```tsx
<Route
  path={page.path}
  element={
    page.markdown ? (
      <PageWrapper page={page}>
        <GuidePage content={content[page.markdown]} />
      </PageWrapper>
    ) : (
      <PageWrapper page={page}>
        <page.component />
      </PageWrapper>
    )
  }
/>
```

**Step 6: Verify all guide pages render**

Navigate to each guide URL and verify markdown renders with proper styling.

**Step 7: Commit**

```bash
git add apps/playground/src/content/ apps/playground/src/pages/GuidePage.tsx apps/playground/src/vite-env.d.ts
git commit -m "feat(playground): add guide pages with ported markdown content"
```

---

## Task 6: Create ComponentDocPage with demos + API reference

**Files:**
- Create: `apps/playground/src/pages/ComponentDocPage.tsx`
- Modify: `apps/playground/src/App.tsx` (route setup)

**Step 1: Create ComponentDocPage**

This is the key component. For each component page, it renders:
1. Import snippet (styled code block)
2. The existing demo page component (live demos)
3. The package `.md` file as rendered markdown (API reference)

```tsx
import { type ComponentType } from 'react';
import { Markdown } from '../components/Markdown';
import * as stylex from '@stylexjs/stylex';
import { tokens } from '@basex-ui/tokens';

const styles = stylex.create({
  importBlock: {
    backgroundColor: tokens.colorMuted,
    borderRadius: tokens.radiusMd,
    padding: tokens.space4,
    fontFamily: tokens.fontFamilyMono,
    fontSize: tokens.fontSizeSm,
    color: tokens.colorText,
    marginBottom: tokens.space10,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: tokens.colorBorderMuted,
  },
  divider: {
    borderTopWidth: '1px',
    borderTopStyle: 'solid',
    borderTopColor: tokens.colorBorderMuted,
    marginTop: tokens.space10,
    paddingTop: tokens.space10,
  },
  apiHeading: {
    fontSize: tokens.fontSizeLg,
    fontWeight: tokens.fontWeightBold,
    marginBottom: tokens.space6,
  },
});

interface ComponentDocPageProps {
  DemoPage: ComponentType;
  apiDocs?: string;
  importStatement: string;
}

export function ComponentDocPage({ DemoPage, apiDocs, importStatement }: ComponentDocPageProps) {
  return (
    <>
      <pre {...stylex.props(styles.importBlock)}>
        <code>{importStatement}</code>
      </pre>

      <DemoPage />

      {apiDocs && (
        <div {...stylex.props(styles.divider)}>
          <h2 {...stylex.props(styles.apiHeading)}>API Reference</h2>
          <Markdown content={apiDocs} />
        </div>
      )}
    </>
  );
}
```

**Step 2: Load component .md files**

Import all 24 component `.md` files via `?raw`. Create a mapping:

```ts
// apps/playground/src/content/api-docs.ts
import accordion from '../../../packages/components/src/accordion/accordion.md?raw';
import alertDialog from '../../../packages/components/src/alert-dialog/alert-dialog.md?raw';
import autocomplete from '../../../packages/components/src/autocomplete/autocomplete.md?raw';
// ... all 24 components

export const apiDocs: Record<string, string> = {
  accordion,
  'alert-dialog': alertDialog,
  autocomplete,
  // ... all 24
};
```

**Step 3: Wire into routes**

For component pages, the route element becomes:

```tsx
<ComponentDocPage
  DemoPage={page.component}
  apiDocs={apiDocs[page.id]}
  importStatement={`import { ${page.label.replace(/\s/g, '')} } from '@basex-ui/components';`}
/>
```

**Step 4: Verify a component page shows demos + API docs**

Navigate to `/components/button`. Should see:
1. Import snippet
2. Live Button demos (variants, sizes, disabled)
3. Divider
4. API Reference heading
5. Rendered button.md content (anatomy, props table, data attributes)

**Step 5: Commit**

```bash
git add apps/playground/src/pages/ComponentDocPage.tsx apps/playground/src/content/api-docs.ts
git commit -m "feat(playground): add component doc pages with demos and API reference"
```

---

## Task 7: Add "View Code" toggle to demo previews

**Files:**
- Modify: `apps/playground/src/components/Preview.tsx`
- Create: `apps/playground/src/components/CodeToggle.tsx`

**Step 1: Create CodeToggle component**

A button that toggles a code block open/closed with a smooth height animation.

```tsx
import { useState, useRef, useEffect } from 'react';
import * as stylex from '@stylexjs/stylex';
import { tokens } from '@basex-ui/tokens';

const styles = stylex.create({
  toggle: {
    display: 'flex',
    alignItems: 'center',
    gap: tokens.space1,
    paddingBlock: tokens.space2,
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
  },
  codeWrapper: {
    overflow: 'hidden',
    transition: 'height 200ms ease-out',
  },
  codeInner: {
    paddingTop: tokens.space3,
  },
});

interface CodeToggleProps {
  code: string;
}

export function CodeToggle({ code }: CodeToggleProps) {
  const [open, setOpen] = useState(false);
  // Render Shiki-highlighted code when open
  // ...
}
```

**Step 2: Add `code` prop to Preview component**

Extend Preview to accept an optional `code` string prop. When provided, render the CodeToggle below the demo card.

```tsx
interface PreviewProps {
  title: string;
  description?: string;
  constrained?: boolean;
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
```

**Step 3: Add code strings to demo pages**

For each Preview in a demo page, add the `code` prop with the JSX string that produces that demo. Start with ButtonPage as the template, then apply to all 24 pages.

This is the most tedious part. Each Preview gets a `code` prop with a template literal containing the relevant JSX. Example for ButtonPage:

```tsx
<Preview
  title="Variants & Colors"
  description="Three variants (solid, outline, ghost) across three color axes."
  code={`<Button>default</Button>
<Button variant="outline">outline</Button>
<Button variant="ghost">ghost</Button>
<Button color="destructive">destructive</Button>`}
>
```

**Step 4: Verify code toggle works**

Click "View Code" on a demo — code block should slide open with syntax highlighting.
Click again — should slide closed.

**Step 5: Commit**

```bash
git add apps/playground/src/components/Preview.tsx apps/playground/src/components/CodeToggle.tsx apps/playground/src/pages/
git commit -m "feat(playground): add View Code toggle to demo previews"
```

---

## Task 8: Polish typography, spacing, and visual design

**Files:**
- Modify: `apps/playground/src/App.tsx` (layout styles)
- Modify: `apps/playground/src/components/Sidebar.tsx` (sidebar styles)
- Modify: `apps/playground/src/components/Markdown.tsx` (prose styles)
- Modify: `apps/playground/src/components/Preview.tsx` (demo card styles)
- Modify: `apps/playground/src/index.css` (if needed)

This task is about making it look sharp. No functional changes. Focus on:

**Step 1: Typography**

- Ensure all text uses the token system (fontFamilySans for body, fontFamilyMono for code)
- Heading sizes should have clear hierarchy (page title > section title > subsection)
- Line heights should be comfortable for reading (lineHeightRelaxed for prose)
- Letter spacing: normal for body, slightly wide for section labels

**Step 2: Spacing**

- Generous whitespace between sections (space10 between major sections)
- Consistent padding in sidebar, main content, and cards
- Content max-width of 768px keeps lines readable
- Tables need breathing room (space3 cell padding)

**Step 3: Visual details**

- Subtle borders (colorBorderMuted) to separate sections
- Code blocks: muted background with border, rounded corners
- Active nav item: muted background + bold text color
- Hover states on all interactive elements (nav items, code toggle)
- Smooth transitions on hover/active states (motionDurationFast)

**Step 4: Dark mode verification**

Switch to dark mode and verify all elements look correct:
- Code blocks readable
- Tables readable
- Borders visible but subtle
- No white-on-white or dark-on-dark text

**Step 5: Mobile verification**

Test at 768px breakpoint:
- Hamburger menu works
- Content reflows properly
- Code blocks don't overflow
- Tables scroll horizontally if needed

**Step 6: Commit**

```bash
git add apps/playground/src/
git commit -m "chore(playground): polish typography, spacing, and visual design"
```

---

## Task 9: Configure production build and deployment

**Files:**
- Modify: `apps/playground/vite.config.ts`
- Modify: `apps/playground/package.json`

**Step 1: Configure Vite for SPA deployment**

For Vercel (or any static host), the SPA needs all routes to fall back to index.html. Add to vite.config.ts:

```ts
build: {
  outDir: 'dist',
},
```

Vercel automatically handles SPA fallback for Vite projects. For other hosts, a `vercel.json` or `_redirects` file may be needed.

**Step 2: Test production build**

```bash
cd apps/playground && pnpm build && pnpm preview
```

Navigate to `/components/button` directly — should load correctly (not 404).

**Step 3: Commit**

```bash
git add apps/playground/vite.config.ts apps/playground/package.json
git commit -m "chore(playground): configure production build for SPA deployment"
```

---

## Task 10: Delete the docs app

**Files:**
- Delete: `apps/docs/` (entire directory)
- Modify: `pnpm-workspace.yaml` (if it references apps/docs explicitly)
- Modify: root `package.json` (remove any docs-specific scripts)

**Step 1: Verify nothing depends on apps/docs**

```bash
grep -r "apps/docs" apps/ packages/ --include="*.json" --include="*.ts" --include="*.mjs"
```

Should only find references within apps/docs itself.

**Step 2: Delete the directory**

```bash
rm -rf apps/docs
```

**Step 3: Update workspace config if needed**

Check `pnpm-workspace.yaml` — if it uses `apps/*` glob pattern, no changes needed. If it lists apps/docs explicitly, remove it.

**Step 4: Verify monorepo builds**

```bash
pnpm install && pnpm build
```

No errors. The playground builds as the docs site.

**Step 5: Commit**

```bash
git add -A
git commit -m "chore: remove Fumadocs/Next.js docs app in favor of playground-as-docs"
```

---

## Task 11: Update project documentation

**Files:**
- Modify: `CLAUDE.md` (update Monorepo Layout, Docs App Pattern sections)
- Modify: `docs/plans/2026-03-16-playground-as-docs-design.md` (mark as complete)

**Step 1: Update CLAUDE.md**

- Remove "Docs App Pattern" section (or replace with new pattern)
- Update Monorepo Layout to show playground as the docs site
- Remove references to `apps/docs/`
- Update Scripts section if any docs-specific scripts existed
- Note that the playground IS the docs site

**Step 2: Mark plan as complete**

Update the design doc status from "Approved" to "Complete".

**Step 3: Commit**

```bash
git add CLAUDE.md docs/plans/2026-03-16-playground-as-docs-design.md
git commit -m "docs: update project docs to reflect playground-as-docs architecture"
```
