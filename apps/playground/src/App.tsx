import { useState } from 'react';
import * as stylex from '@stylexjs/stylex';
import { tokens } from '@basex-ui/tokens';
import { lightTheme, darkTheme } from '@basex-ui/styles';
import { Button } from '@basex-ui/components';
import type { ButtonVariant, ButtonColor, ButtonSize } from '@basex-ui/components';

const variants: ButtonVariant[] = ['solid', 'outline', 'ghost'];
const colors: ButtonColor[] = ['default', 'secondary', 'destructive'];
const sizes: ButtonSize[] = ['sm', 'md', 'lg'];

const styles = stylex.create({
  page: {
    minHeight: '100vh',
    padding: tokens.space8,
    backgroundColor: tokens.colorBackground,
    color: tokens.colorText,
    fontFamily: tokens.fontFamilySans,
    transition: 'background-color 0.2s, color 0.2s',
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
  section: {
    marginBottom: tokens.space8,
  },
  sectionTitle: {
    fontSize: tokens.fontSizeLg,
    fontWeight: tokens.fontWeightSemibold,
    marginBottom: tokens.space4,
    color: tokens.colorTextMuted,
  },
  row: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: tokens.space3,
    marginBottom: tokens.space4,
  },
  label: {
    fontSize: tokens.fontSizeSm,
    color: tokens.colorTextMuted,
    minWidth: '80px',
    fontFamily: tokens.fontFamilyMono,
  },
});

export function App() {
  const [dark, setDark] = useState(false);
  const theme = dark ? darkTheme : lightTheme;

  return (
    <div {...stylex.props(theme, styles.page)}>
      <header {...stylex.props(styles.header)}>
        <h1 {...stylex.props(styles.title)}>BaseX UI Playground</h1>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setDark((d) => !d)}
        >
          {dark ? 'Light mode' : 'Dark mode'}
        </Button>
      </header>

      {/* Variant × Color grid */}
      <section {...stylex.props(styles.section)}>
        <h2 {...stylex.props(styles.sectionTitle)}>Variants &times; Colors</h2>
        {variants.map((variant) => (
          <div key={variant} {...stylex.props(styles.row)}>
            <span {...stylex.props(styles.label)}>{variant}</span>
            {colors
              .filter((color) => variant === 'solid' || color !== 'secondary')
              .map((color) => (
                <Button key={`${variant}-${color}`} variant={variant} color={color}>
                  {color}
                </Button>
              ))}
          </div>
        ))}
      </section>

      {/* Sizes */}
      <section {...stylex.props(styles.section)}>
        <h2 {...stylex.props(styles.sectionTitle)}>Sizes</h2>
        <div {...stylex.props(styles.row)}>
          {sizes.map((size) => (
            <Button key={size} size={size}>
              {size}
            </Button>
          ))}
        </div>
      </section>

      {/* Disabled */}
      <section {...stylex.props(styles.section)}>
        <h2 {...stylex.props(styles.sectionTitle)}>Disabled</h2>
        <div {...stylex.props(styles.row)}>
          {variants.map((variant) => (
            <Button key={variant} variant={variant} disabled>
              {variant}
            </Button>
          ))}
        </div>
      </section>
    </div>
  );
}
