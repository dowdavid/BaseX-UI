import { useState } from 'react';
import { Toolbar } from '@basex-ui/components';
import * as stylex from '@stylexjs/stylex';
import { tokens } from '@basex-ui/tokens';
import { Preview } from '../components/Preview';

// Width is fully locked on transient buttons so the label changing
// (e.g. "Save" → "Saving…" → "Saved ✓") doesn't grow or reflow neighbors.
// 120px fits the longest label ("Publishing…") across Save/Publish/Delete
// cycles at the toolbar's current type scale with comfortable padding;
// eyeballed, not a token. Uses fixed `width` (not `minWidth`) so longer
// labels can't push past the lock.
const TRANSIENT_WIDTH = '120px';

const styles = stylex.create({
  transientAction: {
    width: TRANSIENT_WIDTH,
    boxSizing: 'border-box',
  },
  saveSuccess: {
    width: TRANSIENT_WIDTH,
    boxSizing: 'border-box',
    backgroundColor: tokens.colorSuccess,
    color: tokens.colorSuccessContrast,
  },
  // Mirrors the toolbar's "active tab" pressed treatment — neutral, not green/red.
  publishDone: {
    width: TRANSIENT_WIDTH,
    boxSizing: 'border-box',
    backgroundColor: tokens.colorText,
    color: tokens.colorTextInverse,
  },
  deleteDone: {
    width: TRANSIENT_WIDTH,
    boxSizing: 'border-box',
    backgroundColor: tokens.colorDestructive,
    color: tokens.colorDestructiveContrast,
  },
});

type TransientState = 'idle' | 'progressing' | 'done';

/**
 * Drives the idle → progressing → done → idle cycle for the Save / Publish /
 * Delete demo buttons. Kept local to this docs page on purpose — these states
 * are demo affordances, not a shared component primitive.
 */
function useTransientAction(
  idleLabel: string,
  progressingLabel: string,
  doneLabel: string,
  progressingMs = 700,
  doneMs = 1500,
) {
  const [state, setState] = useState<TransientState>('idle');
  const onClick = () => {
    if (state !== 'idle') return;
    setState('progressing');
    setTimeout(() => {
      setState('done');
      setTimeout(() => setState('idle'), doneMs);
    }, progressingMs);
  };
  const label =
    state === 'progressing' ? progressingLabel : state === 'done' ? doneLabel : idleLabel;
  return { state, label, onClick, isDone: state === 'done' };
}

export function ToolbarPage() {
  // Controlled multi-select formatting state — drives the pressed visual on
  // the toggle items. No display side effect.
  const [formatting, setFormatting] = useState<string[]>(['bold']);

  // Controlled single-select alignment state — same purpose: drives pressed
  // visual on the toggle items.
  const [alignment, setAlignment] = useState<string[]>(['left']);

  const save = useTransientAction('Save', 'Saving…', 'Saved ✓');
  const publish = useTransientAction('Publish', 'Publishing…', 'Published ✓');
  const del = useTransientAction('Delete', 'Deleting…', 'Deleted ✓');

  return (
    <>
      <Preview
        title="Basic toolbar"
        description="Action buttons with a separator. Tab once to enter the toolbar, then arrow keys move between items."
        code={`<Toolbar.Root>
  <Toolbar.Button>Save</Toolbar.Button>
  <Toolbar.Button>Undo</Toolbar.Button>
  <Toolbar.Separator />
  <Toolbar.Button onClick={handlePublish} disabled={publish.state !== 'idle'}>
    {publish.label}
  </Toolbar.Button>
</Toolbar.Root>`}
      >
        <Toolbar.Root>
          <Toolbar.Button>Save</Toolbar.Button>
          <Toolbar.Button>Undo</Toolbar.Button>
          <Toolbar.Separator />
          <Toolbar.Button
            onClick={publish.onClick}
            disabled={publish.state !== 'idle'}
            sx={publish.isDone ? styles.publishDone : styles.transientAction}
          >
            {publish.label}
          </Toolbar.Button>
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
  <Toolbar.Button onClick={handleSave} disabled={save.state !== 'idle'}>
    {save.label}
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
            onClick={save.onClick}
            disabled={save.state !== 'idle'}
            sx={save.isDone ? styles.saveSuccess : styles.transientAction}
          >
            {save.label}
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
  <Toolbar.Button onClick={handleDelete} disabled={del.state !== 'idle'}>
    {del.label}
  </Toolbar.Button>
</Toolbar.Root>`}
      >
        <Toolbar.Root orientation="vertical">
          <Toolbar.Button>Select</Toolbar.Button>
          <Toolbar.Button>Move</Toolbar.Button>
          <Toolbar.Separator />
          <Toolbar.Button
            onClick={del.onClick}
            disabled={del.state !== 'idle'}
            sx={del.isDone ? styles.deleteDone : styles.transientAction}
          >
            {del.label}
          </Toolbar.Button>
        </Toolbar.Root>
      </Preview>
    </>
  );
}
