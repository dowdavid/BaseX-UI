import { useState, useMemo } from 'react';
import * as stylex from '@stylexjs/stylex';
import { tokens } from '@basex-ui/tokens';
import { Button } from '@basex-ui/components';
import { Link, useLocation } from 'react-router';
import { ChevronRight } from 'lucide-react';
import Fuse from 'fuse.js';
import { pages, sections } from '../registry';

const MOBILE = '@media (max-width: 768px)' as const;

const styles = stylex.create({
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
  searchInput: {
    width: '100%',
    paddingBlock: tokens.space2,
    paddingInline: tokens.space3,
    borderRadius: tokens.radiusMd,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: tokens.colorBorderMuted,
    backgroundColor: 'transparent',
    color: tokens.colorText,
    fontSize: tokens.fontSizeSm,
    fontFamily: tokens.fontFamilySans,
    outline: 'none',
    marginBottom: tokens.space2,
    '::placeholder': {
      color: tokens.colorTextMuted,
    },
    ':focus': {
      borderColor: tokens.colorBorder,
    },
  },
  sectionHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingInline: tokens.space3,
    paddingBlock: tokens.space1,
    marginTop: tokens.space4,
    cursor: 'pointer',
    borderRadius: tokens.radiusMd,
    backgroundColor: {
      default: 'transparent',
      ':hover': tokens.colorMuted,
    },
    transitionProperty: 'background-color',
    transitionDuration: tokens.motionDurationFast,
  },
  sectionLabel: {
    fontSize: tokens.fontSizeXs,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorTextMuted,
    textTransform: 'uppercase',
    letterSpacing: tokens.letterSpacingWide,
  },
  chevron: {
    width: '14px',
    height: '14px',
    color: tokens.colorTextMuted,
    transitionProperty: 'transform',
    transitionDuration: tokens.motionDurationFast,
    transitionTimingFunction: tokens.motionEaseOut,
  },
  chevronExpanded: {
    transform: 'rotate(90deg)',
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
    textDecoration: 'none',
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

const fuse = new Fuse(pages, {
  keys: ['label', 'description'],
  threshold: 0.3,
});

interface SidebarProps {
  open: boolean;
  onClose: () => void;
  dark: boolean;
  onToggleTheme: () => void;
}

export function Sidebar({ open, onClose, dark, onToggleTheme }: SidebarProps) {
  const location = useLocation();
  const [query, setQuery] = useState('');
  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    main: true,
    components: true,
    intelligence: false,
    'mcp-server': false,
  });

  const filtered = useMemo(
    () => (query ? fuse.search(query).map((r) => r.item) : pages),
    [query],
  );

  const isActive = (path: string) => location.pathname === path;
  const isSearching = query.length > 0;

  const toggleSection = (sectionId: string) => {
    setExpanded((prev) => ({ ...prev, [sectionId]: !prev[sectionId] }));
  };

  return (
    <nav {...stylex.props(styles.sidebar, open && styles.sidebarOpen)}>
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

      <input
        {...stylex.props(styles.searchInput)}
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {sections.map((section) => {
        const sectionPages = filtered.filter((p) => p.section === section.id);
        if (sectionPages.length === 0) return null;

        const isExpanded = isSearching || expanded[section.id] !== false;

        return (
          <div key={section.id}>
            {section.label && (
              <div
                {...stylex.props(styles.sectionHeader)}
                onClick={() => toggleSection(section.id)}
              >
                <span {...stylex.props(styles.sectionLabel)}>{section.label}</span>
                <ChevronRight
                  {...stylex.props(styles.chevron, isExpanded && styles.chevronExpanded)}
                />
              </div>
            )}
            {isExpanded &&
              sectionPages.map((page) => (
                <Link
                  key={page.id}
                  to={page.path}
                  onClick={onClose}
                  {...stylex.props(
                    styles.navItem,
                    isActive(page.path) && styles.navItemActive,
                  )}
                >
                  {page.label}
                </Link>
              ))}
          </div>
        );
      })}

      <div {...stylex.props(styles.spacer)} />
      <div {...stylex.props(styles.themeToggle)}>
        <Button variant="ghost" size="sm" onClick={onToggleTheme}>
          {dark ? 'Light mode' : 'Dark mode'}
        </Button>
      </div>
    </nav>
  );
}
