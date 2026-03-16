'use client';

import { Button } from '@basex-ui/components';
import { Preview } from '@/components/preview';

export function ButtonVariants() {
  return (
    <Preview>
      <Button>Solid</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
    </Preview>
  );
}

export function ButtonColors() {
  return (
    <Preview>
      <Button color="default">Default</Button>
      <Button color="secondary">Secondary</Button>
      <Button color="destructive">Destructive</Button>
    </Preview>
  );
}

export function ButtonSizes() {
  return (
    <Preview>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </Preview>
  );
}

export function ButtonDisabled() {
  return (
    <Preview>
      <Button disabled>Disabled solid</Button>
      <Button variant="outline" disabled>Disabled outline</Button>
      <Button variant="ghost" disabled>Disabled ghost</Button>
    </Preview>
  );
}
