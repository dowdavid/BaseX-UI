'use client';

import { useEffect } from 'react';
import * as stylex from '@stylexjs/stylex';
import { lightTheme, darkTheme } from '@basex-ui/styles';
import { useTheme } from 'next-themes';

/**
 * Syncs the BaseX UI theme tokens to <html> so portaled content
 * (dialogs, drawers, popovers, menus) inherits theme tokens.
 * Mirrors what the playground does in App.tsx useEffect.
 */
export function BaseXThemeSync() {
  const { resolvedTheme } = useTheme();
  const theme = resolvedTheme === 'dark' ? darkTheme : lightTheme;

  useEffect(() => {
    const themeProps = stylex.props(theme);
    const el = document.documentElement;

    // Store existing classes (e.g. font class from next/font) to preserve them
    const existingClasses = el.className
      .split(' ')
      .filter((c) => !c.startsWith('x'));

    if (themeProps.className) {
      el.className = [...existingClasses, themeProps.className].join(' ');
    }
    if (themeProps.style) {
      Object.assign(el.style, themeProps.style);
    }

    return () => {
      // Clean up StyleX classes but keep non-StyleX classes
      el.className = existingClasses.join(' ');
    };
  }, [theme]);

  return null;
}
