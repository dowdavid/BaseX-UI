import { useState } from 'react';
import { ToggleGroup } from '@basex-ui/components';
import { AlignLeft, AlignCenter, AlignRight, Bold, Italic, Underline } from 'lucide-react';
import { Preview } from '../components/Preview';

export function ToggleGroupPage() {
  const [view, setView] = useState<string | null>('list');
  const [format, setFormat] = useState<string[]>(['bold']);

  return (
    <>
      <Preview
        title="Single (segmented control)"
        description='Single-select mode. One or zero items pressed; exposes role="radiogroup".'
        code={`<ToggleGroup.Root type="single" defaultValue="list">
  <ToggleGroup.Item value="list">List</ToggleGroup.Item>
  <ToggleGroup.Item value="grid">Grid</ToggleGroup.Item>
  <ToggleGroup.Item value="board">Board</ToggleGroup.Item>
</ToggleGroup.Root>`}
      >
        <ToggleGroup.Root type="single" defaultValue="list">
          <ToggleGroup.Item value="list">List</ToggleGroup.Item>
          <ToggleGroup.Item value="grid">Grid</ToggleGroup.Item>
          <ToggleGroup.Item value="board">Board</ToggleGroup.Item>
        </ToggleGroup.Root>
      </Preview>

      <Preview
        title="Multiple (formatting toolbar)"
        description='Multi-select mode. Any combination pressed; exposes role="group".'
        code={`<ToggleGroup.Root type="multiple" defaultValue={['bold']}>
  <ToggleGroup.Item value="bold" aria-label="Bold"><Bold size={16} aria-hidden /></ToggleGroup.Item>
  <ToggleGroup.Item value="italic" aria-label="Italic"><Italic size={16} aria-hidden /></ToggleGroup.Item>
  <ToggleGroup.Item value="underline" aria-label="Underline"><Underline size={16} aria-hidden /></ToggleGroup.Item>
</ToggleGroup.Root>`}
      >
        <ToggleGroup.Root type="multiple" defaultValue={['bold']}>
          <ToggleGroup.Item value="bold" aria-label="Bold">
            <Bold size={16} aria-hidden="true" />
          </ToggleGroup.Item>
          <ToggleGroup.Item value="italic" aria-label="Italic">
            <Italic size={16} aria-hidden="true" />
          </ToggleGroup.Item>
          <ToggleGroup.Item value="underline" aria-label="Underline">
            <Underline size={16} aria-hidden="true" />
          </ToggleGroup.Item>
        </ToggleGroup.Root>
      </Preview>

      <Preview
        title="With icons (alignment picker)"
        description="Single-select with icon-only items. Each item carries an aria-label."
        code={`<ToggleGroup.Root type="single" defaultValue="left">
  <ToggleGroup.Item value="left" aria-label="Align left"><AlignLeft size={16} aria-hidden /></ToggleGroup.Item>
  <ToggleGroup.Item value="center" aria-label="Align center"><AlignCenter size={16} aria-hidden /></ToggleGroup.Item>
  <ToggleGroup.Item value="right" aria-label="Align right"><AlignRight size={16} aria-hidden /></ToggleGroup.Item>
</ToggleGroup.Root>`}
      >
        <ToggleGroup.Root type="single" defaultValue="left">
          <ToggleGroup.Item value="left" aria-label="Align left">
            <AlignLeft size={16} aria-hidden="true" />
          </ToggleGroup.Item>
          <ToggleGroup.Item value="center" aria-label="Align center">
            <AlignCenter size={16} aria-hidden="true" />
          </ToggleGroup.Item>
          <ToggleGroup.Item value="right" aria-label="Align right">
            <AlignRight size={16} aria-hidden="true" />
          </ToggleGroup.Item>
        </ToggleGroup.Root>
      </Preview>

      <Preview
        title="Vertical orientation"
        description="Arrow-up / arrow-down move focus between items."
        code={`<ToggleGroup.Root type="single" orientation="vertical" defaultValue="a">
  <ToggleGroup.Item value="a">A</ToggleGroup.Item>
  <ToggleGroup.Item value="b">B</ToggleGroup.Item>
  <ToggleGroup.Item value="c">C</ToggleGroup.Item>
</ToggleGroup.Root>`}
      >
        <ToggleGroup.Root type="single" orientation="vertical" defaultValue="a">
          <ToggleGroup.Item value="a">A</ToggleGroup.Item>
          <ToggleGroup.Item value="b">B</ToggleGroup.Item>
          <ToggleGroup.Item value="c">C</ToggleGroup.Item>
        </ToggleGroup.Root>
      </Preview>

      <Preview
        title="Controlled (single)"
        description={`React state drives the pressed value. Current value: ${view ?? 'none'}`}
        code={`const [view, setView] = useState<string | null>('list');

<ToggleGroup.Root type="single" value={view} onValueChange={setView}>
  <ToggleGroup.Item value="list">List</ToggleGroup.Item>
  <ToggleGroup.Item value="grid">Grid</ToggleGroup.Item>
</ToggleGroup.Root>`}
      >
        <ToggleGroup.Root type="single" value={view} onValueChange={setView}>
          <ToggleGroup.Item value="list">List</ToggleGroup.Item>
          <ToggleGroup.Item value="grid">Grid</ToggleGroup.Item>
        </ToggleGroup.Root>
      </Preview>

      <Preview
        title="Controlled (multiple)"
        description={`Current value: [${format.join(', ') || 'none'}]`}
        code={`const [format, setFormat] = useState<string[]>(['bold']);

<ToggleGroup.Root type="multiple" value={format} onValueChange={setFormat}>
  <ToggleGroup.Item value="bold">Bold</ToggleGroup.Item>
  <ToggleGroup.Item value="italic">Italic</ToggleGroup.Item>
  <ToggleGroup.Item value="underline">Underline</ToggleGroup.Item>
</ToggleGroup.Root>`}
      >
        <ToggleGroup.Root type="multiple" value={format} onValueChange={setFormat}>
          <ToggleGroup.Item value="bold">Bold</ToggleGroup.Item>
          <ToggleGroup.Item value="italic">Italic</ToggleGroup.Item>
          <ToggleGroup.Item value="underline">Underline</ToggleGroup.Item>
        </ToggleGroup.Root>
      </Preview>

      <Preview
        title="Disabled"
        description="Disabling the group disables every item."
        code={`<ToggleGroup.Root disabled defaultValue="a">
  <ToggleGroup.Item value="a">A</ToggleGroup.Item>
  <ToggleGroup.Item value="b">B</ToggleGroup.Item>
</ToggleGroup.Root>`}
      >
        <ToggleGroup.Root disabled defaultValue="a">
          <ToggleGroup.Item value="a">A</ToggleGroup.Item>
          <ToggleGroup.Item value="b">B</ToggleGroup.Item>
        </ToggleGroup.Root>
      </Preview>
    </>
  );
}
