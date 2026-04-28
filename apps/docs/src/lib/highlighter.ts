import { createHighlighterCore, type HighlighterCore } from 'shiki/core';
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript';

// Singleton — created once, reused across all CodeBlock and CodeToggle instances.
// Only loads the 5 languages actually used in docs (tsx, ts, css, bash, json)
// plus the 2 themes. Eliminates WASM and all unused grammar chunks.
let promise: Promise<HighlighterCore> | null = null;

export function getHighlighter(): Promise<HighlighterCore> {
  if (!promise) {
    promise = createHighlighterCore({
      themes: [
        import('shiki/themes/github-dark-default.mjs'),
        import('shiki/themes/github-light-default.mjs'),
      ],
      langs: [
        import('shiki/langs/tsx.mjs'),
        import('shiki/langs/typescript.mjs'),
        import('shiki/langs/css.mjs'),
        import('shiki/langs/bash.mjs'),
        import('shiki/langs/json.mjs'),
      ],
      engine: createJavaScriptRegexEngine(),
    });
  }
  return promise;
}

// Languages registered above — fall back to tsx for anything else.
const SUPPORTED_LANGS = new Set(['tsx', 'ts', 'typescript', 'css', 'bash', 'sh', 'json']);

export function normalizeLang(lang: string | undefined): string {
  if (!lang) return 'tsx';
  const l = lang.toLowerCase();
  if (l === 'sh' || l === 'shell' || l === 'shellscript') return 'bash';
  if (l === 'ts') return 'typescript';
  return SUPPORTED_LANGS.has(l) ? l : 'tsx';
}
