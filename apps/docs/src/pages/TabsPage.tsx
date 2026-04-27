import { useState } from 'react';
import * as stylex from '@stylexjs/stylex';
import { tokens } from '@basex-ui/tokens';
import { Field, Input, Tabs } from '@basex-ui/components';
import { Preview } from '../components/Preview';

const MOBILE = '@media (max-width: 768px)' as const;

const styles = stylex.create({
  panel: {
    paddingBlock: tokens.space3,
    color: tokens.colorTextMuted,
    fontFamily: tokens.fontFamilyMono,
    fontSize: tokens.fontSizeSm,
    lineHeight: tokens.lineHeightNormal,
    // Lock the panel area so switching tabs with different content lengths
    // does not reflow the surrounding bounding box.
    minWidth: { default: '20rem', [MOBILE]: 0 },
    minHeight: '3rem',
  },
  formPanel: {
    paddingBlock: tokens.space3,
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.space3,
    minWidth: { default: '20rem', [MOBILE]: 0 },
    minHeight: '8rem',
  },
});

export function TabsPage() {
  const [controlled, setControlled] = useState<string | number | null>('overview');

  return (
    <>
      <Preview
        title="Basic"
        description="Horizontal tabs with a filled-block active state. Automatic activation: focus a tab and it activates."
        code={`<Tabs.Root defaultValue="overview">
  <Tabs.List>
    <Tabs.Tab value="overview">Overview</Tabs.Tab>
    <Tabs.Tab value="details">Details</Tabs.Tab>
    <Tabs.Tab value="activity">Activity</Tabs.Tab>
    <Tabs.Indicator />
  </Tabs.List>
  <Tabs.Panel value="overview">Overview content</Tabs.Panel>
  <Tabs.Panel value="details">Details content</Tabs.Panel>
  <Tabs.Panel value="activity">Activity content</Tabs.Panel>
</Tabs.Root>`}
      >
        <Tabs.Root defaultValue="overview">
          <Tabs.List>
            <Tabs.Tab value="overview">Overview</Tabs.Tab>
            <Tabs.Tab value="details">Details</Tabs.Tab>
            <Tabs.Tab value="activity">Activity</Tabs.Tab>
            <Tabs.Indicator />
          </Tabs.List>
          <Tabs.Panel value="overview" sx={styles.panel}>
            Overview content for the project.
          </Tabs.Panel>
          <Tabs.Panel value="details" sx={styles.panel}>
            Detailed specs and metadata.
          </Tabs.Panel>
          <Tabs.Panel value="activity" sx={styles.panel}>
            Recent activity feed.
          </Tabs.Panel>
        </Tabs.Root>
      </Preview>

      <Preview
        title="Vertical"
        description="Vertical orientation, filled-block active state. Suitable for settings panels."
        code={`<Tabs.Root orientation="vertical" defaultValue="profile">
  <Tabs.List>
    <Tabs.Tab value="profile">Profile</Tabs.Tab>
    <Tabs.Tab value="account">Account</Tabs.Tab>
    <Tabs.Tab value="notifications">Notifications</Tabs.Tab>
    <Tabs.Indicator />
  </Tabs.List>
  <Tabs.Panel value="profile">Profile fields</Tabs.Panel>
  <Tabs.Panel value="account">Account fields</Tabs.Panel>
  <Tabs.Panel value="notifications">Notifications</Tabs.Panel>
</Tabs.Root>`}
      >
        <Tabs.Root orientation="vertical" defaultValue="profile">
          <Tabs.List>
            <Tabs.Tab value="profile">Profile</Tabs.Tab>
            <Tabs.Tab value="account">Account</Tabs.Tab>
            <Tabs.Tab value="notifications">Notifications</Tabs.Tab>
            <Tabs.Indicator />
          </Tabs.List>
          <Tabs.Panel value="profile" sx={styles.panel}>
            Profile fields go here.
          </Tabs.Panel>
          <Tabs.Panel value="account" sx={styles.panel}>
            Account settings go here.
          </Tabs.Panel>
          <Tabs.Panel value="notifications" sx={styles.panel}>
            Notification preferences.
          </Tabs.Panel>
        </Tabs.Root>
      </Preview>

      <Preview
        title="Manual activation"
        description="Focus moves with arrow keys, but Enter/Space is required to activate. Recommended when panels contain interactive content."
        code={`<Tabs.Root defaultValue="a">
  <Tabs.List activationMode="manual">
    <Tabs.Tab value="a">A</Tabs.Tab>
    <Tabs.Tab value="b">B</Tabs.Tab>
    <Tabs.Tab value="c">C</Tabs.Tab>
    <Tabs.Indicator />
  </Tabs.List>
  <Tabs.Panel value="a">A</Tabs.Panel>
  <Tabs.Panel value="b">B</Tabs.Panel>
  <Tabs.Panel value="c">C</Tabs.Panel>
</Tabs.Root>`}
      >
        <Tabs.Root defaultValue="a">
          <Tabs.List activationMode="manual">
            <Tabs.Tab value="a">A</Tabs.Tab>
            <Tabs.Tab value="b">B</Tabs.Tab>
            <Tabs.Tab value="c">C</Tabs.Tab>
            <Tabs.Indicator />
          </Tabs.List>
          <Tabs.Panel value="a" sx={styles.panel}>
            Panel A
          </Tabs.Panel>
          <Tabs.Panel value="b" sx={styles.panel}>
            Panel B
          </Tabs.Panel>
          <Tabs.Panel value="c" sx={styles.panel}>
            Panel C
          </Tabs.Panel>
        </Tabs.Root>
      </Preview>

      <Preview
        title="With form content"
        description="Tabs with form fields. Manual activation prevents arrow-key navigation from blowing away in-progress input."
        code={`<Tabs.Root defaultValue="profile">
  <Tabs.List activationMode="manual">
    <Tabs.Tab value="profile">Profile</Tabs.Tab>
    <Tabs.Tab value="address">Address</Tabs.Tab>
    <Tabs.Indicator />
  </Tabs.List>
  <Tabs.Panel value="profile">
    <Field.Root>
      <Field.Label>Name</Field.Label>
      <Input />
    </Field.Root>
  </Tabs.Panel>
  <Tabs.Panel value="address">
    <Field.Root>
      <Field.Label>City</Field.Label>
      <Input />
    </Field.Root>
  </Tabs.Panel>
</Tabs.Root>`}
      >
        <Tabs.Root defaultValue="profile">
          <Tabs.List activationMode="manual">
            <Tabs.Tab value="profile">Profile</Tabs.Tab>
            <Tabs.Tab value="address">Address</Tabs.Tab>
            <Tabs.Indicator />
          </Tabs.List>
          <Tabs.Panel value="profile" sx={styles.formPanel}>
            <Field.Root>
              <Field.Label>Name</Field.Label>
              <Input placeholder="Jane Doe" />
            </Field.Root>
            <Field.Root>
              <Field.Label>Email</Field.Label>
              <Input type="email" placeholder="jane@example.com" />
            </Field.Root>
          </Tabs.Panel>
          <Tabs.Panel value="address" sx={styles.formPanel}>
            <Field.Root>
              <Field.Label>City</Field.Label>
              <Input placeholder="San Francisco" />
            </Field.Root>
            <Field.Root>
              <Field.Label>Country</Field.Label>
              <Input placeholder="USA" />
            </Field.Root>
          </Tabs.Panel>
        </Tabs.Root>
      </Preview>

      <Preview
        title="Controlled"
        description="External state drives the active tab via value + onValueChange."
        code={`const [value, setValue] = useState('overview');
<Tabs.Root value={value} onValueChange={setValue}>
  <Tabs.List>
    <Tabs.Tab value="overview">Overview</Tabs.Tab>
    <Tabs.Tab value="details">Details</Tabs.Tab>
    <Tabs.Indicator />
  </Tabs.List>
  ...
</Tabs.Root>`}
      >
        <Tabs.Root value={controlled} onValueChange={(v) => setControlled(v)}>
          <Tabs.List>
            <Tabs.Tab value="overview">Overview</Tabs.Tab>
            <Tabs.Tab value="details">Details</Tabs.Tab>
            <Tabs.Indicator />
          </Tabs.List>
          <Tabs.Panel value="overview" sx={styles.panel}>
            Active value: <code>{String(controlled)}</code>
          </Tabs.Panel>
          <Tabs.Panel value="details" sx={styles.panel}>
            Active value: <code>{String(controlled)}</code>
          </Tabs.Panel>
        </Tabs.Root>
      </Preview>
    </>
  );
}
