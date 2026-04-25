import { Toolbar } from '@basex-ui/components';
import { Preview } from '../components/Preview';

export function ToolbarPage() {
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
        description="Multi-select formatting toggles inside a Toolbar.ToggleGroup."
        code={`<Toolbar.Root>
  <Toolbar.ToggleGroup multiple defaultValue={['bold']}>
    <Toolbar.ToggleItem value="bold">B</Toolbar.ToggleItem>
    <Toolbar.ToggleItem value="italic">I</Toolbar.ToggleItem>
    <Toolbar.ToggleItem value="underline">U</Toolbar.ToggleItem>
  </Toolbar.ToggleGroup>
</Toolbar.Root>`}
      >
        <Toolbar.Root>
          <Toolbar.ToggleGroup multiple defaultValue={['bold']}>
            <Toolbar.ToggleItem value="bold">B</Toolbar.ToggleItem>
            <Toolbar.ToggleItem value="italic">I</Toolbar.ToggleItem>
            <Toolbar.ToggleItem value="underline">U</Toolbar.ToggleItem>
          </Toolbar.ToggleGroup>
        </Toolbar.Root>
      </Preview>

      <Preview
        title="With separators and a link"
        description="Mix buttons, toggle groups, separators, and links in one toolbar."
        code={`<Toolbar.Root>
  <Toolbar.ToggleGroup defaultValue={['left']}>
    <Toolbar.ToggleItem value="left">Left</Toolbar.ToggleItem>
    <Toolbar.ToggleItem value="center">Center</Toolbar.ToggleItem>
    <Toolbar.ToggleItem value="right">Right</Toolbar.ToggleItem>
  </Toolbar.ToggleGroup>
  <Toolbar.Separator />
  <Toolbar.Button>Save</Toolbar.Button>
  <Toolbar.Separator />
  <Toolbar.Link href="#docs">Docs</Toolbar.Link>
</Toolbar.Root>`}
      >
        <Toolbar.Root>
          <Toolbar.ToggleGroup defaultValue={['left']}>
            <Toolbar.ToggleItem value="left">Left</Toolbar.ToggleItem>
            <Toolbar.ToggleItem value="center">Center</Toolbar.ToggleItem>
            <Toolbar.ToggleItem value="right">Right</Toolbar.ToggleItem>
          </Toolbar.ToggleGroup>
          <Toolbar.Separator />
          <Toolbar.Button>Save</Toolbar.Button>
          <Toolbar.Separator />
          <Toolbar.Link href="#docs">Docs</Toolbar.Link>
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
