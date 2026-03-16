'use client';

import { Checkbox, CheckboxGroup } from '@basex-ui/components';
import { Preview } from '@/components/preview';

export function CheckboxGroupBasic() {
  return (
    <Preview constrained>
      <CheckboxGroup.Root>
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Checkbox.Root name="notifications" value="email">
            <Checkbox.Indicator />
          </Checkbox.Root>
          Email
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Checkbox.Root name="notifications" value="sms">
            <Checkbox.Indicator />
          </Checkbox.Root>
          SMS
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Checkbox.Root name="notifications" value="push">
            <Checkbox.Indicator />
          </Checkbox.Root>
          Push
        </label>
      </CheckboxGroup.Root>
    </Preview>
  );
}
