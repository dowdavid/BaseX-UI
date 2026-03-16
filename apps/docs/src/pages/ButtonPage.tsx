import * as stylex from '@stylexjs/stylex';
import { tokens } from '@basex-ui/tokens';
import { Button } from '@basex-ui/components';
import type { ButtonVariant, ButtonColor, ButtonSize } from '@basex-ui/components';
import { Preview } from '../components/Preview';

const variants: ButtonVariant[] = ['solid', 'outline', 'ghost'];
const colors: ButtonColor[] = ['default', 'secondary', 'destructive'];
const sizes: ButtonSize[] = ['sm', 'md', 'lg'];

const styles = stylex.create({
  grid: {
    display: 'inline-flex',
    flexDirection: 'column',
    gap: tokens.space4,
  },
  row: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: tokens.space3,
  },
  label: {
    fontSize: tokens.fontSizeSm,
    color: tokens.colorTextMuted,
    minWidth: '80px',
    fontFamily: tokens.fontFamilyMono,
  },
});

export function ButtonPage() {
  return (
    <>
      <Preview
        title="Variants & Colors"
        description="Three variants (solid, outline, ghost) across three color axes."
        code={`<Button>default</Button>
<Button variant="outline">outline</Button>
<Button variant="ghost">ghost</Button>
<Button color="destructive">destructive</Button>`}
      >
        <div {...stylex.props(styles.grid)}>
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
        </div>
      </Preview>

      <Preview
        title="Sizes"
        description="Small, medium, and large."
        code={`<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>`}
      >
        <div {...stylex.props(styles.row)}>
          {sizes.map((size) => (
            <Button key={size} size={size}>
              {size}
            </Button>
          ))}
        </div>
      </Preview>

      <Preview
        title="Disabled"
        description="Reduced opacity with no pointer events."
        code={`<Button disabled>Solid</Button>
<Button variant="outline" disabled>Outline</Button>
<Button variant="ghost" disabled>Ghost</Button>`}
      >
        <div {...stylex.props(styles.row)}>
          {variants.map((variant) => (
            <Button key={variant} variant={variant} disabled>
              {variant}
            </Button>
          ))}
        </div>
      </Preview>
    </>
  );
}
