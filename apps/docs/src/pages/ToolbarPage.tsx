import { useState } from 'react';
import { Toolbar } from '@basex-ui/components';
import * as stylex from '@stylexjs/stylex';
import { tokens } from '@basex-ui/tokens';
import { Preview } from '../components/Preview';

const styles = stylex.create({
  status: {
    marginTop: tokens.space3,
    fontFamily: tokens.fontFamilyMono,
    fontSize: tokens.fontSizeBody,
    color: tokens.colorTextMuted,
  },
});

export function ToolbarPage() {
  // "Basic toolbar" — log the last action so the buttons show signs of life.
  const [lastBasicAction, setLastBasicAction] = useState<string | null>(null);

  // "With toggle items" — controlled multi-select formatting state. Wiring
  // value/onValueChange means the toggles actually drive a state value rather
  // than just toggling visually.
  const [formatting, setFormatting] = useState<string[]>(['bold']);

  // "With separators and a link" — controlled alignment + a save indicator.
  const [alignment, setAlignment] = useState<string[]>(['left']);
  const [saved, setSaved] = useState(false);

  // "Vertical" — last tool used.
  const [tool, setTool] = useState<string | null>(null);

  return (
    <>
      <Preview
        title="Basic toolbar"
        description="Action buttons with a separator. Tab once to enter the toolbar, then arrow keys move between items."
        code={`<Toolbar.Root>
  <Toolbar.Button onClick={() => setLastAction('Save')}>Save</Toolbar.Button>
  <Toolbar.Button onClick={() => setLastAction('Undo')}>Undo</Toolbar.Button>
  <Toolbar.Separator />
  <Toolbar.Button onClick={() => setLastAction('Publish')}>Publish</Toolbar.Button>
</Toolbar.Root>`}
      >
        <div>
          <Toolbar.Root>
            <Toolbar.Button onClick={() => setLastBasicAction('Save')}>Save</Toolbar.Button>
            <Toolbar.Button onClick={() => setLastBasicAction('Undo')}>Undo</Toolbar.Button>
            <Toolbar.Separator />
            <Toolbar.Button onClick={() => setLastBasicAction('Publish')}>Publish</Toolbar.Button>
          </Toolbar.Root>
          <div {...stylex.props(styles.status)}>Last action: {lastBasicAction ?? '—'}</div>
        </div>
      </Preview>

      <Preview
        title="With toggle items"
        description="Multi-select formatting toggles inside a Toolbar.ToggleGroup. value/onValueChange drive a controlled state."
        code={`<Toolbar.Root>
  <Toolbar.ToggleGroup multiple value={formatting} onValueChange={setFormatting}>
    <Toolbar.ToggleItem value="bold">B</Toolbar.ToggleItem>
    <Toolbar.ToggleItem value="italic">I</Toolbar.ToggleItem>
    <Toolbar.ToggleItem value="underline">U</Toolbar.ToggleItem>
  </Toolbar.ToggleGroup>
</Toolbar.Root>`}
      >
        <div>
          <Toolbar.Root>
            <Toolbar.ToggleGroup multiple value={formatting} onValueChange={setFormatting}>
              <Toolbar.ToggleItem value="bold">B</Toolbar.ToggleItem>
              <Toolbar.ToggleItem value="italic">I</Toolbar.ToggleItem>
              <Toolbar.ToggleItem value="underline">U</Toolbar.ToggleItem>
            </Toolbar.ToggleGroup>
          </Toolbar.Root>
          <div {...stylex.props(styles.status)}>
            Active: {formatting.length ? formatting.join(', ') : 'none'}
          </div>
        </div>
      </Preview>

      <Preview
        title="With separators and a link"
        description="Mix buttons, toggle groups, separators, and links. The link opens the Base UI docs in a new tab."
        code={`<Toolbar.Root>
  <Toolbar.ToggleGroup value={alignment} onValueChange={setAlignment}>
    <Toolbar.ToggleItem value="left">Left</Toolbar.ToggleItem>
    <Toolbar.ToggleItem value="center">Center</Toolbar.ToggleItem>
    <Toolbar.ToggleItem value="right">Right</Toolbar.ToggleItem>
  </Toolbar.ToggleGroup>
  <Toolbar.Separator />
  <Toolbar.Button onClick={() => setSaved(true)}>Save</Toolbar.Button>
  <Toolbar.Separator />
  <Toolbar.Link href="https://base-ui.com" target="_blank" rel="noreferrer">
    Docs
  </Toolbar.Link>
</Toolbar.Root>`}
      >
        <div>
          <Toolbar.Root>
            <Toolbar.ToggleGroup value={alignment} onValueChange={setAlignment}>
              <Toolbar.ToggleItem value="left">Left</Toolbar.ToggleItem>
              <Toolbar.ToggleItem value="center">Center</Toolbar.ToggleItem>
              <Toolbar.ToggleItem value="right">Right</Toolbar.ToggleItem>
            </Toolbar.ToggleGroup>
            <Toolbar.Separator />
            <Toolbar.Button onClick={() => setSaved(true)}>Save</Toolbar.Button>
            <Toolbar.Separator />
            <Toolbar.Link href="https://base-ui.com" target="_blank" rel="noreferrer">
              Docs
            </Toolbar.Link>
          </Toolbar.Root>
          <div {...stylex.props(styles.status)}>
            Align: {alignment[0] ?? 'none'} · Save: {saved ? 'saved' : 'idle'}
          </div>
        </div>
      </Preview>

      <Preview
        title="Vertical toolbar"
        description="orientation='vertical' rotates the layout and remaps arrow keys to Up/Down."
        code={`<Toolbar.Root orientation="vertical">
  <Toolbar.Button onClick={() => setTool('Select')}>Select</Toolbar.Button>
  <Toolbar.Button onClick={() => setTool('Move')}>Move</Toolbar.Button>
  <Toolbar.Separator />
  <Toolbar.Button onClick={() => setTool('Delete')}>Delete</Toolbar.Button>
</Toolbar.Root>`}
      >
        <div>
          <Toolbar.Root orientation="vertical">
            <Toolbar.Button onClick={() => setTool('Select')}>Select</Toolbar.Button>
            <Toolbar.Button onClick={() => setTool('Move')}>Move</Toolbar.Button>
            <Toolbar.Separator />
            <Toolbar.Button onClick={() => setTool('Delete')}>Delete</Toolbar.Button>
          </Toolbar.Root>
          <div {...stylex.props(styles.status)}>Tool: {tool ?? '—'}</div>
        </div>
      </Preview>
    </>
  );
}
