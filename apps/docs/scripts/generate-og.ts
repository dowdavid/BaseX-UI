/**
 * Build-time OG image + per-route HTML generator.
 *
 * For each component page in `src/registry.ts` this script:
 *  1. Renders a 1200x630 PNG into `dist/og/<slug>.png` (Satori + resvg)
 *  2. Emits a prerendered `dist/components/<slug>/index.html` that copies the
 *     SPA shell but rewrites the per-page `<title>` and OG/Twitter meta tags
 *     so crawlers (Twitter, Slack, iMessage, Facebook) see a unique card.
 *
 * Users still load the SPA — React Router takes over after hydration. The
 * `vercel.json` rewrite is configured so prerendered HTML wins for the exact
 * `/components/<slug>` path while everything else falls back to `index.html`.
 */
import { createRequire } from 'node:module';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';

interface ComponentEntry {
  id: string;
  label: string;
  description: string;
  path: string;
}

/**
 * Parse component entries out of `src/registry.ts` without importing it (the
 * registry pulls in React page components, which can't run in a plain Node
 * script). We only need static metadata, so a small regex sweep is enough.
 */
async function readComponentEntries(registryPath: string): Promise<ComponentEntry[]> {
  const src = await readFile(registryPath, 'utf8');
  const objectRe =
    /\{\s*id:\s*'([^']+)',\s*label:\s*'([^']+)',\s*description:\s*([\s\S]*?),\s*path:\s*'(\/components\/[^']+)',\s*section:\s*'components'/g;
  const out: ComponentEntry[] = [];
  for (const m of src.matchAll(objectRe)) {
    const description = m[3]
      .trim()
      .replace(/^'/, '')
      .replace(/'$/, '')
      // collapse multiline string concatenations inside description value
      .replace(/'\s*\+?\s*\n\s*'/g, '')
      .replace(/\\'/g, "'");
    out.push({ id: m[1], label: m[2], description, path: m[4] });
  }
  return out;
}

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);

const DOCS_ROOT = path.resolve(__dirname, '..');
const DIST_DIR = path.join(DOCS_ROOT, 'dist');
const OG_DIR = path.join(DIST_DIR, 'og');
const SITE_URL = 'https://basex-ui-docs.vercel.app';

// Match og-image.svg / favicon.svg palette
const BG = '#0a0a0a';
const FG = '#e5e5e5';
const MUTED = '#a3a3a3';

const LOGO_SIZE = 160;
const LOGO_RADIUS = 40;
const LOGO_STROKE = 6;

async function loadFonts() {
  const geist = require.resolve('@fontsource/geist-sans/files/geist-sans-latin-400-normal.woff');
  const geistBold =
    require.resolve('@fontsource/geist-sans/files/geist-sans-latin-700-normal.woff');
  const [regular, bold] = await Promise.all([readFile(geist), readFile(geistBold)]);
  return [
    { name: 'Geist', data: regular, weight: 400 as const, style: 'normal' as const },
    { name: 'Geist', data: bold, weight: 700 as const, style: 'normal' as const },
  ];
}

/**
 * Logomark vector, scaled from the 80x80 favicon viewBox to LOGO_SIZE.
 * Drawn via Satori as inline SVG.
 */
function Logomark() {
  const s = LOGO_SIZE / 80;
  return {
    type: 'svg',
    props: {
      width: LOGO_SIZE,
      height: LOGO_SIZE,
      viewBox: '0 0 80 80',
      xmlns: 'http://www.w3.org/2000/svg',
      children: [
        {
          type: 'rect',
          props: { width: 80, height: 80, rx: LOGO_RADIUS / s, fill: FG },
        },
        {
          type: 'path',
          props: {
            d: 'M20 28.3L40 16.7L60 28.3V51.7L40 63.3L20 51.7V28.3Z',
            stroke: BG,
            strokeWidth: LOGO_STROKE / s,
            fill: 'none',
          },
        },
        {
          type: 'path',
          props: {
            d: 'M40 16.7V63.3M20 28.3L60 51.7M60 28.3L20 51.7',
            stroke: BG,
            strokeWidth: LOGO_STROKE / s,
          },
        },
      ],
    },
  };
}

function Card(label: string) {
  return {
    type: 'div',
    props: {
      style: {
        width: 1200,
        height: 630,
        background: BG,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 80,
      },
      children: [
        // top-left: logomark + tiny wordmark
        {
          type: 'div',
          props: {
            style: { display: 'flex', alignItems: 'center', gap: 24 },
            children: [
              Logomark(),
              {
                type: 'div',
                props: {
                  style: {
                    color: MUTED,
                    fontFamily: 'Geist',
                    fontSize: 28,
                    fontWeight: 400,
                    letterSpacing: 1,
                  },
                  children: 'Base-X UI',
                },
              },
            ],
          },
        },
        // bottom-left: component name
        {
          type: 'div',
          props: {
            style: { display: 'flex', flexDirection: 'column', gap: 16 },
            children: [
              {
                type: 'div',
                props: {
                  style: {
                    color: MUTED,
                    fontFamily: 'Geist',
                    fontSize: 28,
                    fontWeight: 400,
                    letterSpacing: 2,
                    textTransform: 'uppercase',
                  },
                  children: 'Component',
                },
              },
              {
                type: 'div',
                props: {
                  style: {
                    color: FG,
                    fontFamily: 'Geist',
                    fontSize: 128,
                    fontWeight: 700,
                    letterSpacing: -2,
                    lineHeight: 1.05,
                  },
                  children: label,
                },
              },
            ],
          },
        },
      ],
    },
  };
}

async function renderPng(
  label: string,
  outPath: string,
  fonts: Awaited<ReturnType<typeof loadFonts>>,
) {
  // Satori accepts a JSX-like tree; we hand-build the React element shape it expects.
  const svg = await satori(Card(label) as Parameters<typeof satori>[0], {
    width: 1200,
    height: 630,
    fonts,
  });
  const png = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } }).render().asPng();
  await writeFile(outPath, png);
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function rewriteShell(
  shell: string,
  opts: { title: string; description: string; url: string; image: string },
) {
  const { title, description, url, image } = opts;
  const t = escapeHtml(title);
  const d = escapeHtml(description);

  let html = shell;
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${t}</title>`);
  html = html.replace(
    /<meta\s+name="description"[\s\S]*?\/>/,
    `<meta name="description" content="${d}" />`,
  );
  html = html.replace(
    /<meta\s+property="og:title"[\s\S]*?\/>/,
    `<meta property="og:title" content="${t}" />`,
  );
  html = html.replace(
    /<meta\s+property="og:description"[\s\S]*?\/>/,
    `<meta property="og:description" content="${d}" />`,
  );
  html = html.replace(
    /<meta\s+property="og:image"[\s\S]*?\/>/,
    `<meta property="og:image" content="${image}" />`,
  );
  html = html.replace(
    /<meta\s+name="twitter:title"[\s\S]*?\/>/,
    `<meta name="twitter:title" content="${t}" />`,
  );
  html = html.replace(
    /<meta\s+name="twitter:description"[\s\S]*?\/>/,
    `<meta name="twitter:description" content="${d}" />`,
  );
  html = html.replace(
    /<meta\s+name="twitter:image"[\s\S]*?\/>/,
    `<meta name="twitter:image" content="${image}" />`,
  );

  // Inject canonical og:url (none in the original shell)
  if (!/property="og:url"/.test(html)) {
    html = html.replace(
      /<meta\s+name="twitter:card"/,
      `<meta property="og:url" content="${url}" />\n    <meta name="twitter:card"`,
    );
  }
  return html;
}

async function main() {
  if (!existsSync(DIST_DIR)) {
    throw new Error(`dist/ not found at ${DIST_DIR}. Run \`vite build\` first.`);
  }
  await mkdir(OG_DIR, { recursive: true });

  const shellPath = path.join(DIST_DIR, 'index.html');
  const shell = await readFile(shellPath, 'utf8');
  const fonts = await loadFonts();

  const components = await readComponentEntries(path.join(DOCS_ROOT, 'src/registry.ts'));
  if (components.length === 0) throw new Error('No component entries parsed from registry.ts');

  // 1. Render fallback OG (used by non-component routes). Keep existing PNG in
  //    public/ untouched; just copy it as-is into dist/og-image.png (vite already
  //    handles that). No-op here.

  let count = 0;
  for (const page of components) {
    const slug = page.path.replace(/^\/components\//, '');
    const ogPath = path.join(OG_DIR, `${slug}.png`);
    await renderPng(page.label, ogPath, fonts);

    const routeDir = path.join(DIST_DIR, 'components', slug);
    await mkdir(routeDir, { recursive: true });
    const html = rewriteShell(shell, {
      title: `${page.label} — Base-X UI`,
      description: page.description,
      url: `${SITE_URL}/components/${slug}`,
      image: `${SITE_URL}/og/${slug}.png`,
    });
    await writeFile(path.join(routeDir, 'index.html'), html);
    count += 1;
  }

  // eslint-disable-next-line no-console
  console.log(`[generate-og] wrote ${count} OG cards + prerendered HTML shells`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
