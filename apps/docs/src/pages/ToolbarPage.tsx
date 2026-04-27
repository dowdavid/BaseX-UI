import { useState } from 'react';
import { Toolbar } from '@basex-ui/components';
import * as stylex from '@stylexjs/stylex';
import { tokens } from '@basex-ui/tokens';
import { Preview } from '../components/Preview';

const styles = stylex.create({
  saveSuccess: {
    backgroundColor: tokens.colorSuccess,
    color: tokens.colorSuccessContrast,
  },
});

type SaveState = 'idle' | 'saving' | 'saved';

export function ToolbarPage() {
  // Controlled multi-select formatting state — drives the pressed visual on
  // the toggle items. No display side effect.
  const [formatting, setFormatting] = useState<string[]>(['bold']);

  // Controlled single-select alignment state — same purpose: drives pressed
  // visual on the toggle items.
  const [alignment, setAlignment] = useState<string[]>(['left']);

  // Save button progress: idle -> saving -> saved -> idle.
  const [saveState, setSaveState] = useState<SaveState>('idle');
  const handleSave = () => {
    if (saveState !== 'idle') return;
    setSaveState('saving');
    setTimeout(() => {
      setSaveState('saved');
      setTimeout(() => setSaveState('idle'), 1500);
    }, 700);
  };
  const saveLabel = saveState === 'saving' ? 'Saving…' : saveState === 'saved' ? 'Saved ✓' : 'Save';

  return (
    <>
      <Preview
        title="Basic toolbar"
        description="Action buttons with a separator. Tab once to enter the toolbar, then arrow keys move between items."
        code={`<Toolbar.Root>
  <Toolbar.Button>Save</Toolbar.Button>
  <Toolbar.Button>Undo</Toolbar.Button>
  <Toolbar.Separator />
  <Toolbar.Button>Publish</Toolbar.Button>
</Toolbar.Root>`}
      >
        <Toolbar.Root>
          <Toolbar.Button>Save</Toolbar.Button>
          <Toolbar.Button>Undo</Toolbar.Button>
          <Toolbar.Separator />
          <Toolbar.Button>Publish</Toolbar.Button>
        </Toolbar.Root>
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
        <Toolbar.Root>
          <Toolbar.ToggleGroup multiple value={formatting} onValueChange={setFormatting}>
            <Toolbar.ToggleItem value="bold">B</Toolbar.ToggleItem>
            <Toolbar.ToggleItem value="italic">I</Toolbar.ToggleItem>
            <Toolbar.ToggleItem value="underline">U</Toolbar.ToggleItem>
          </Toolbar.ToggleGroup>
        </Toolbar.Root>
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
  <Toolbar.Button onClick={handleSave} disabled={saveState !== 'idle'}>
    {saveLabel}
  </Toolbar.Button>
  <Toolbar.Separator />
  <Toolbar.Link href="https://github.com/dowdavid/BaseX-UI" target="_blank" rel="noreferrer">
    Docs
  </Toolbar.Link>
</Toolbar.Root>`}
      >
        <Toolbar.Root>
          <Toolbar.ToggleGroup value={alignment} onValueChange={setAlignment}>
            <Toolbar.ToggleItem value="left">Left</Toolbar.ToggleItem>
            <Toolbar.ToggleItem value="center">Center</Toolbar.ToggleItem>
            <Toolbar.ToggleItem value="right">Right</Toolbar.ToggleItem>
          </Toolbar.ToggleGroup>
          <Toolbar.Separator />
          <Toolbar.Button
            onClick={handleSave}
            disabled={saveState !== 'idle'}
            sx={saveState === 'saved' ? styles.saveSuccess : undefined}
          >
            {saveLabel}
          </Toolbar.Button>
          <Toolbar.Separator />
          <Toolbar.Link
            href="https://github.com/dowdavid/BaseX-UI"
            target="_blank"
            rel="noreferrer"
          >
            Docs
          </Toolbar.Link>
        </Toolbar.Root>
      </Preview>

      <Preview
        title="Vertical toolbar"
        description="orientation='vertical' rotates the layout and remaps arrow keys to Up/Down."
        code={`<Toolbar.Root orientation="vertical">
  <Toolbar.Button>Select</Toolbar.Button>
  <Toolbar.Button>Move</Toolbar.Button>
  <Toolbar.Separator />
  <Toolbar.Button>Delete</Toolbar.Button>
</Toolbar.Root>`}
      >
        <Toolbar.Root orientation="vertical">
          <Toolbar.Button>Select</Toolbar.Button>
          <Toolbar.Button>Move</Toolbar.Button>
          <Toolbar.Separator />
          <Toolbar.Button>Delete</Toolbar.Button>
        </Toolbar.Root>
      </Preview>
    </>
  );
}
