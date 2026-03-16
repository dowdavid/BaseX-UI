'use client';

import { Combobox } from '@basex-ui/components';
import { Preview } from '@/components/preview';

const fruits = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry', 'Fig', 'Grape'];

export function ComboboxBasic() {
  return (
    <Preview constrained>
      <Combobox.Root items={fruits}>
        <Combobox.Input placeholder="Pick a fruit..." />
        <Combobox.Popup>
          <Combobox.Empty>No fruits found.</Combobox.Empty>
          {(item: string) => (
            <Combobox.Item key={item} value={item}>
              <Combobox.ItemIndicator />
              {item}
            </Combobox.Item>
          )}
        </Combobox.Popup>
      </Combobox.Root>
    </Preview>
  );
}

export function ComboboxMulti() {
  return (
    <Preview constrained>
      <Combobox.Root items={fruits} multiple>
        <Combobox.Input placeholder="Select fruits..." />
        <Combobox.Popup>
          <Combobox.Empty>No fruits found.</Combobox.Empty>
          {(item: string) => (
            <Combobox.Item key={item} value={item}>
              <Combobox.ItemIndicator />
              {item}
            </Combobox.Item>
          )}
        </Combobox.Popup>
      </Combobox.Root>
    </Preview>
  );
}
