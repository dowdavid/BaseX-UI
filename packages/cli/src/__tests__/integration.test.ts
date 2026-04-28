import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { execSync } from 'node:child_process';
import { mkdtempSync, rmSync, existsSync, readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';

// ---------------------------------------------------------------------------
// Mock @clack/prompts so runAdd() can be tested without TTY / interactive IO
// ---------------------------------------------------------------------------
vi.mock('@clack/prompts', () => ({
  intro: vi.fn(),
  outro: vi.fn(),
  log: { success: vi.fn(), info: vi.fn(), error: vi.fn(), warn: vi.fn() },
  spinner: () => ({ start: vi.fn(), stop: vi.fn() }),
  confirm: vi.fn().mockResolvedValue(true),
  isCancel: vi.fn().mockReturnValue(false),
  cancel: vi.fn(),
}));

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

// ---------------------------------------------------------------------------
// Direct runAdd() integration — no subprocess, exercises the function itself
// ---------------------------------------------------------------------------
describe('runAdd() direct import', () => {
  let tmpDir: string;
  let originalCwd: string;

  beforeEach(() => {
    tmpDir = mkdtempSync(join(tmpdir(), 'basex-runcli-test-'));
    originalCwd = process.cwd();
    process.chdir(tmpDir);
  });

  afterEach(() => {
    process.chdir(originalCwd);
    rmSync(tmpDir, { recursive: true, force: true });
    vi.clearAllMocks();
  });

  it('scaffolds button files into src/components/ui/button/', async () => {
    const { runAdd } = await import('../commands/add.js');
    await runAdd(['button']);

    const dir = join(tmpDir, 'src/components/ui/button');
    expect(existsSync(join(dir, 'button.tsx')), 'button.tsx missing').toBe(true);
    expect(existsSync(join(dir, 'index.ts')), 'index.ts missing').toBe(true);
    expect(existsSync(join(dir, 'manifest.json')), 'manifest.json missing').toBe(true);
    expect(existsSync(join(dir, 'button.md')), 'button.md missing').toBe(true);
  });

  it('button.tsx imports from @base-ui/react/button', async () => {
    const { runAdd } = await import('../commands/add.js');
    await runAdd(['button']);

    const tsx = readFileSync(join(tmpDir, 'src/components/ui/button/button.tsx'), 'utf8');
    expect(tsx).toContain("from '@base-ui/react/button'");
  });

  it('index.ts re-exports Button from ./button', async () => {
    const { runAdd } = await import('../commands/add.js');
    await runAdd(['button']);

    const idx = readFileSync(join(tmpDir, 'src/components/ui/button/index.ts'), 'utf8');
    expect(idx).toContain("from './button'");
    expect(idx).toContain('Button');
  });

  it('manifest.json is valid JSON with correct name', async () => {
    const { runAdd } = await import('../commands/add.js');
    await runAdd(['button']);

    const raw = readFileSync(join(tmpDir, 'src/components/ui/button/manifest.json'), 'utf8');
    const manifest = JSON.parse(raw) as { name: string };
    expect(manifest.name).toBe('Button');
  });
});
