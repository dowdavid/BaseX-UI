import * as p from '@clack/prompts';
import { readdir, readFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

function getTemplatesDir(): string {
  const url = import.meta.url;
  if (url.startsWith('file:')) {
    return fileURLToPath(new URL('../../templates', url));
  }
  return resolve(process.cwd(), 'packages/cli/templates');
}

export async function runList() {
  p.intro('basex-ui list');

  const templatesDir = getTemplatesDir();
  const cwd = process.cwd();
  const componentsDir = join(cwd, 'src/components/ui');

  let installed: Set<string> = new Set();
  if (existsSync(componentsDir)) {
    try {
      const dirs = await readdir(componentsDir, { withFileTypes: true });
      installed = new Set(dirs.filter((d) => d.isDirectory()).map((d) => d.name));
    } catch {
      // ignore
    }
  }

  let templateDirs: string[] = [];
  try {
    const entries = await readdir(templatesDir, { withFileTypes: true });
    templateDirs = entries.filter((e) => e.isDirectory()).map((e) => e.name).sort();
  } catch {
    p.log.error('Templates directory not found. Run `pnpm build` in the CLI package first.');
    p.outro('');
    return;
  }

  const lines = await Promise.all(
    templateDirs.map(async (slug) => {
      let name = slug;
      let description = '';
      try {
        const raw = await readFile(join(templatesDir, slug, 'manifest.json'), 'utf8');
        const manifest = JSON.parse(raw) as { name?: string; description?: string };
        if (manifest.name) name = manifest.name;
        if (manifest.description) description = manifest.description.split('.')[0] ?? manifest.description;
      } catch {
        // fall back to slug
      }
      const status = installed.has(slug) ? '[installed]' : '[available]';
      return `  ${name.padEnd(18)} ${status.padEnd(14)} ${description}`;
    }),
  );

  p.log.info(`Components (${templateDirs.length}):\n${lines.join('\n')}`);
  p.log.info(`\nAdd a component: basex-ui add <name>`);
  p.outro('');
}
