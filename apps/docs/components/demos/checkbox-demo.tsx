'use client';

import { Checkbox } from '@basex-ui/components';
import { Preview } from '@/components/preview';

export function CheckboxBasic() {
  return (
    <Preview>
      <label style={{ display: 'flex', alignItems: 'center',
        justifyContent: 'center', gap: '0.5rem' }}>
        <Checkbox.Root defaultChecked>
          <Checkbox.Indicator />
        </Checkbox.Root>
        Enable notifications
      </label>
    </Preview>
  );
}

export function CheckboxDisabled() {
  return (
    <Preview>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <label style={{ display: 'flex', alignItems: 'center',
        justifyContent: 'center', gap: '0.5rem', opacity: 0.64 }}>
          <Checkbox.Root disabled>
            <Checkbox.Indicator />
          </Checkbox.Root>
          Unchecked disabled
        </label>
        <label style={{ display: 'flex', alignItems: 'center',
        justifyContent: 'center', gap: '0.5rem', opacity: 0.64 }}>
          <Checkbox.Root disabled defaultChecked>
            <Checkbox.Indicator />
          </Checkbox.Root>
          Checked disabled
        </label>
      </div>
    </Preview>
  );
}
