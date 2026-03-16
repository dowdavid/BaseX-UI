'use client';

import { Avatar } from '@basex-ui/components';
import { Preview } from '@/components/preview';

export function AvatarBasic() {
  return (
    <Preview>
      <Avatar.Root>
        <Avatar.Image src="https://i.pravatar.cc/150?u=basex" alt="Jane Doe" />
        <Avatar.Fallback>JD</Avatar.Fallback>
      </Avatar.Root>
    </Preview>
  );
}

export function AvatarFallback() {
  return (
    <Preview>
      <Avatar.Root>
        <Avatar.Fallback>JD</Avatar.Fallback>
      </Avatar.Root>
    </Preview>
  );
}
