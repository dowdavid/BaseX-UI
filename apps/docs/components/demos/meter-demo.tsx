'use client';

import { Meter } from '@basex-ui/components';
import { Preview } from '@/components/preview';

export function MeterBasic() {
  return (
    <Preview column>
      <Meter.Root value={65} style={{ width: '100%' }}>
        <Meter.Label>Storage used</Meter.Label>
        <Meter.Track>
          <Meter.Indicator />
        </Meter.Track>
      </Meter.Root>
    </Preview>
  );
}

export function MeterWithValue() {
  return (
    <Preview column>
      <Meter.Root value={42} style={{ width: '100%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Meter.Label>Upload progress</Meter.Label>
          <Meter.Value />
        </div>
        <Meter.Track>
          <Meter.Indicator />
        </Meter.Track>
      </Meter.Root>
    </Preview>
  );
}

export function MeterColors() {
  const colors = ['default', 'secondary', 'destructive'] as const;
  return (
    <Preview column>
      {colors.map((color, i) => (
        <Meter.Root key={color} value={30 + i * 30} style={{ width: '100%' }}>
          <Meter.Label>{color}</Meter.Label>
          <Meter.Track>
            <Meter.Indicator color={color} />
          </Meter.Track>
        </Meter.Root>
      ))}
    </Preview>
  );
}

export function MeterSizes() {
  const sizes = ['sm', 'md', 'lg'] as const;
  return (
    <Preview column>
      {sizes.map((size) => (
        <Meter.Root key={size} value={50} style={{ width: '100%' }}>
          <Meter.Label>{size}</Meter.Label>
          <Meter.Track size={size}>
            <Meter.Indicator />
          </Meter.Track>
        </Meter.Root>
      ))}
    </Preview>
  );
}
