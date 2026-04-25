import { useState } from 'react';
import * as stylex from '@stylexjs/stylex';
import { Bookmark, Bold, Italic, Underline } from 'lucide-react';
import { Toggle } from '@basex-ui/components';
import { tokens } from '@basex-ui/tokens';
import { Preview } from '../components/Preview';

const layoutStyles = stylex.create({
  row: {
    display: 'flex',
    alignItems: 'center',
    gap: tokens.space2,
    flexWrap: 'wrap',
  },
  status: {
    fontFamily: tokens.fontFamilySans,
    fontSize: tokens.fontSizeSm,
    color: tokens.colorMutedForeground,
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.space3,
    alignItems: 'flex-start',
  },
});

export function TogglePage() {
  const [pressed, setPressed] = useState(false);

  return (
    <>
      <Preview
        title="Basic"
        description="An uncontrolled toggle. Click, space, or enter flips the pressed state."
        code={`<Toggle.Root>Bold</Toggle.Root>`}
      >
        <Toggle.Root>Bold</Toggle.Root>
      </Preview>

      <Preview
        title="Controlled"
        description="Drive the pressed state from React state."
        code={`const [pressed, setPressed] = useState(false);

<Toggle.Root pressed={pressed} onPressedChange={setPressed}>
  Italic
</Toggle.Root>`}
      >
        <div {...stylex.props(layoutStyles.row)}>
          <Toggle.Root pressed={pressed} onPressedChange={setPressed}>
            Italic
          </Toggle.Root>
          <span {...stylex.props(layoutStyles.status)}>pressed: {String(pressed)}</span>
        </div>
      </Preview>

      <Preview
        title="With icon"
        description="Icon-only toggles must include an aria-label. Decorative icons are aria-hidden."
        code={`<Toggle.Root aria-label="Bookmark">
  <Bookmark aria-hidden="true" size={16} />
</Toggle.Root>`}
      >
        <div {...stylex.props(layoutStyles.row)}>
          <Toggle.Root aria-label="Bold">
            <Bold aria-hidden="true" size={16} />
          </Toggle.Root>
          <Toggle.Root aria-label="Italic">
            <Italic aria-hidden="true" size={16} />
          </Toggle.Root>
          <Toggle.Root aria-label="Underline">
            <Underline aria-hidden="true" size={16} />
          </Toggle.Root>
          <Toggle.Root aria-label="Bookmark" defaultPressed>
            <Bookmark aria-hidden="true" size={16} />
          </Toggle.Root>
        </div>
      </Preview>

      <Preview
        title="Disabled"
        description="Disabled toggles render at reduced contrast and ignore interaction."
        code={`<Toggle.Root disabled>Off</Toggle.Root>
<Toggle.Root disabled defaultPressed>On</Toggle.Root>`}
      >
        <div {...stylex.props(layoutStyles.row)}>
          <Toggle.Root disabled>Off</Toggle.Root>
          <Toggle.Root disabled defaultPressed>
            On
          </Toggle.Root>
        </div>
      </Preview>
    </>
  );
}
