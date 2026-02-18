import intentsData from '../intents.json';

export interface Intent {
  intent: string;
  component: string;
  signals: string[];
  reasoning: string;
  composition: string;
}

export interface AntiPattern {
  component: string;
  scenario: string;
  reasoning: string;
  alternative: string;
}

export interface IntentsIndex {
  version: string;
  description: string;
  intents: Intent[];
  antiPatterns: AntiPattern[];
}

export const intentsIndex: IntentsIndex = intentsData as IntentsIndex;

/**
 * Resolve a developer description to the best matching intent.
 * Scores each intent by how many signal keywords appear in the description.
 */
export function resolveIntent(description: string): {
  intent: Intent;
  score: number;
  warnings: AntiPattern[];
} | null {
  const lower = description.toLowerCase();

  let bestIntent: Intent | null = null;
  let bestScore = 0;

  for (const intent of intentsIndex.intents) {
    let score = 0;
    for (const signal of intent.signals) {
      if (lower.includes(signal.toLowerCase())) {
        score++;
      }
    }
    if (score > bestScore) {
      bestScore = score;
      bestIntent = intent;
    }
  }

  if (!bestIntent || bestScore === 0) return null;

  // Check for anti-pattern warnings
  const warnings = intentsIndex.antiPatterns.filter((ap) =>
    ap.component === bestIntent!.component &&
    lower.includes(ap.scenario.toLowerCase().split(' ')[0]!)
  );

  return { intent: bestIntent, score: bestScore, warnings };
}

/**
 * Check if a component usage matches any anti-patterns.
 */
export function checkUsage(
  component: string,
  context: string,
): AntiPattern[] {
  const lower = context.toLowerCase();
  return intentsIndex.antiPatterns.filter(
    (ap) =>
      ap.component === component &&
      ap.scenario
        .toLowerCase()
        .split(' ')
        .some((word) => word.length > 3 && lower.includes(word)),
  );
}
