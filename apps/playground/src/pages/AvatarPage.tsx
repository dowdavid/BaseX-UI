import * as stylex from '@stylexjs/stylex';
import { Avatar } from '@basex-ui/components';
import { Preview } from '../components/Preview';

function UserIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M10 10C11.933 10 13.5 8.433 13.5 6.5S11.933 3 10 3 6.5 4.567 6.5 6.5 8.067 10 10 10ZM10 11.5C7.665 11.5 3 12.67 3 15V16.5H17V15C17 12.67 12.335 11.5 10 11.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

const overrides = stylex.create({
  row: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
});

export function AvatarPage() {
  return (
    <>
      <Preview
        title="Image avatar"
        description="Displays a user photo. The fallback is shown until the image loads."
      >
        <div {...stylex.props(overrides.row)}>
          <Avatar.Root>
            <Avatar.Image
              src="https://i.pravatar.cc/80?u=jane"
              alt="Jane Doe"
            />
            <Avatar.Fallback>JD</Avatar.Fallback>
          </Avatar.Root>
          <Avatar.Root>
            <Avatar.Image
              src="https://i.pravatar.cc/80?u=alex"
              alt="Alex Smith"
            />
            <Avatar.Fallback>AS</Avatar.Fallback>
          </Avatar.Root>
        </div>
      </Preview>

      <Preview
        title="Initials fallback"
        description="When no image is provided, initials are shown on a muted background."
      >
        <div {...stylex.props(overrides.row)}>
          <Avatar.Root>
            <Avatar.Fallback>AB</Avatar.Fallback>
          </Avatar.Root>
          <Avatar.Root>
            <Avatar.Fallback>CD</Avatar.Fallback>
          </Avatar.Root>
          <Avatar.Root>
            <Avatar.Fallback>EF</Avatar.Fallback>
          </Avatar.Root>
        </div>
      </Preview>

      <Preview
        title="Icon fallback"
        description="An icon SVG can be used as a generic placeholder for anonymous users."
      >
        <Avatar.Root>
          <Avatar.Fallback>
            <UserIcon />
          </Avatar.Fallback>
        </Avatar.Root>
      </Preview>

      <Preview
        title="Broken image fallback"
        description="When the image URL fails to load, the fallback content is displayed automatically."
      >
        <Avatar.Root>
          <Avatar.Image src="/this-image-does-not-exist.jpg" alt="Missing" />
          <Avatar.Fallback>?</Avatar.Fallback>
        </Avatar.Root>
      </Preview>
    </>
  );
}
