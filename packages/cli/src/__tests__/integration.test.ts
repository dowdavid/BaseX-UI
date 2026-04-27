import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { execSync } from 'node:child_process';
import { mkdtempSync, rmSync, existsSync, readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';

const CLI_BIN = resolve(__dirname, '../../dist/index.js');

function runCli(args: string[], cwd: string): { stdout: string; status: number } {
  try {
    const stdout = execSync(`node ${CLI_BIN} ${args.join(' ')}`, {
      cwd,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'pipe'],
    });
    return { stdout, status: 0 };
  } catch (err: unknown) {
    const e = err as { stdout?: Buffer | string; status?: number };
    return {
      stdout: e.stdout?.toString() ?? '',
      status: e.status ?? 1,
    };
  }
}

describe('basex-ui CLI', () => {
  let workDir: string;

  beforeEach(() => {
    workDir = mkdtempSync(join(tmpdir(), 'basex-cli-test-'));
  });

  afterEach(() => {
    rmSync(workDir, { recursive: true, force: true });
  });

  it('prints help with --help', () => {
    const { stdout } = runCli(['--help'], workDir);
    expect(stdout).toContain('basex-ui');
    expect(stdout).toContain('init');
    expect(stdout).toContain('add');
    expect(stdout).toContain('theme');
    expect(stdout).toContain('list');
  });

  it('errors on unknown command', () => {
    const { status } = runCli(['totallybogus'], workDir);
    expect(status).not.toBe(0);
  });

  it('add without args prints available components', () => {
    const { stdout } = runCli(['add'], workDir);
    expect(stdout).toContain('button');
    expect(stdout).toContain('accordion');
  });

  it('add button scaffolds the expected files', () => {
    runCli(['add', 'button'], workDir);
    const dir = join(workDir, 'src/components/ui/button');
    expect(existsSync(join(dir, 'button.tsx'))).toBe(true);
    expect(existsSync(join(dir, 'index.ts'))).toBe(true);
    expect(existsSync(join(dir, 'manifest.json'))).toBe(true);
    expect(existsSync(join(dir, 'button.md'))).toBe(true);

    const tsx = readFileSync(join(dir, 'button.tsx'), 'utf8');
    expect(tsx).toContain('@base-ui/react/button');
    expect(tsx).toContain("Button.displayName = 'Button'");

    const manifest = JSON.parse(readFileSync(join(dir, 'manifest.json'), 'utf8'));
    expect(manifest.name).toBe('Button');
  });

  it('add accordion scaffolds the expected files', () => {
    runCli(['add', 'accordion'], workDir);
    const dir = join(workDir, 'src/components/ui/accordion');
    expect(existsSync(join(dir, 'accordion.tsx'))).toBe(true);
    expect(existsSync(join(dir, 'manifest.json'))).toBe(true);

    const tsx = readFileSync(join(dir, 'accordion.tsx'), 'utf8');
    expect(tsx).toContain('Accordion.Root');
    expect(tsx).toContain('Accordion.Trigger');
    expect(tsx).toContain('Accordion.Panel');
  });

  it('list reports installed status correctly', () => {
    runCli(['add', 'button'], workDir);
    const { stdout } = runCli(['list'], workDir);
    expect(stdout).toContain('Button');
    expect(stdout).toContain('[installed]');
    expect(stdout).toContain('Accordion');
    expect(stdout).toContain('[available]');
  });
});
