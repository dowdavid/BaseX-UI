/**
 * Prebuild script: copies component source files from packages/components/src/{name}/
 * into packages/cli/templates/{name}/ before tsup runs.
 *
 * Run via: tsx scripts/bundle-templates.ts
 * Triggered automatically by "prebuild" and "predev" npm scripts.
 */

import { readdir, mkdir, copyFile, rm, stat } from "fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Resolve paths relative to packages/cli/
const CLI_ROOT = join(__dirname, "..");
const COMPONENTS_SRC = join(CLI_ROOT, "../../packages/components/src");
const TEMPLATES_OUT = join(CLI_ROOT, "templates");

// Entries in packages/components/src/ that are not component directories
const SKIP = new Set(["_template", "index.ts", "test-setup.ts"]);

async function isDirectory(path: string): Promise<boolean> {
  try {
    return (await stat(path)).isDirectory();
  } catch {
    return false;
  }
}

async function copyIfExists(src: string, dest: string): Promise<boolean> {
  try {
    await copyFile(src, dest);
    return true;
  } catch {
    return false;
  }
}

async function main() {
  // Clear templates/ — remove and recreate to avoid stale components accumulating.
  // Preserve non-component files that live at the root of templates/ by only clearing
  // subdirectories, not the templates/ root itself.
  const existingEntries = await readdir(TEMPLATES_OUT).catch(() => []);
  for (const entry of existingEntries) {
    const entryPath = join(TEMPLATES_OUT, entry);
    if (await isDirectory(entryPath)) {
      await rm(entryPath, { recursive: true, force: true });
    }
  }

  // Read component directories
  const srcEntries = await readdir(COMPONENTS_SRC);
  const components: string[] = [];

  for (const entry of srcEntries) {
    if (SKIP.has(entry)) continue;
    if (!(await isDirectory(join(COMPONENTS_SRC, entry)))) continue;
    components.push(entry);
  }

  console.log(`Bundling ${components.length} component templates...`);

  for (const name of components) {
    const srcDir = join(COMPONENTS_SRC, name);
    const destDir = join(TEMPLATES_OUT, name);

    await mkdir(destDir, { recursive: true });

    // Files to copy for each component
    const filesToCopy = [
      `${name}.tsx`,
      "index.ts",
      "manifest.json",
      `${name}.md`,
    ];

    const copied: string[] = [];
    for (const file of filesToCopy) {
      const didCopy = await copyIfExists(join(srcDir, file), join(destDir, file));
      if (didCopy) copied.push(file);
    }

    console.log(`  ${name}: ${copied.join(", ")}`);
  }

  console.log(`Done. Templates written to packages/cli/templates/`);
}

main().catch((err) => {
  console.error("bundle-templates failed:", err);
  process.exit(1);
});
