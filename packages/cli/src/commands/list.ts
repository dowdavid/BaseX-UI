import * as p from '@clack/prompts';
import { readdir } from 'node:fs/promises';
import { join } from 'node:path';
import { existsSync } from 'node:fs';

// All available components
const AVAILABLE_COMPONENTS = [
  {
    name: 'Button',
    slug: 'button',
    description: 'A styled button for triggering actions.',
    category: 'actions',
  },
  {
    name: 'Accordion',
    slug: 'accordion',
    description: 'Collapsible panels for progressive content disclosure.',
    category: 'layout',
  },
];

export async function runList() {
  p.intro('basex-ui list');

  const cwd = process.cwd();
  const componentsDir = join(cwd, 'src/components/ui');

  // Check which components are installed
  let installed: Set<string> = new Set();
  if (existsSync(componentsDir)) {
    try {
      const dirs = await readdir(componentsDir, { withFileTypes: true });
      installed = new Set(dirs.filter((d) => d.isDirectory()).map((d) => d.name));
    } catch {
      // Ignore
    }
  }

  const lines = AVAILABLE_COMPONENTS.map((c) => {
    const status = installed.has(c.slug) ? '[installed]' : '[available]';
    return `  ${c.name.padEnd(16)} ${status.padEnd(14)} ${c.description}`;
  });

  p.log.info(`Components:\n${lines.join('\n')}`);
  p.log.info(`\nAdd a component: basex-ui add <name>`);
  p.outro('');
}
