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

export interface AnimationPreset {
  name: string;
  duration: string;
  durationToken: string;
  easing: string;
  easingToken: string;
  description: string;
  useFor: string[];
}

export interface IntentsIndex {
  version: string;
  description: string;
  intents: Intent[];
  antiPatterns: AntiPattern[];
}

export const intentsIndex: IntentsIndex = intentsData as IntentsIndex;

// --- Animation presets ---

export const animationPresets: AnimationPreset[] = [
  {
    name: 'State',
    duration: '100ms',
    durationToken: 'motionDurationFast',
    easing: 'cubic-bezier(0, 0, 0.2, 1)',
    easingToken: 'motionEaseOut',
    description: 'For instant feedback on interaction. Feels responsive.',
    useFor: ['hover', 'focus', 'active', 'color changes', 'border changes', 'background changes'],
  },
  {
    name: 'Expand',
    duration: '200ms',
    durationToken: 'motionDurationNormal',
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    easingToken: 'motionEaseInOut',
    description: 'For content revealing in place. Accelerates then decelerates.',
    useFor: ['accordion panels', 'collapsible content', 'disclosure', 'height transitions'],
  },
  {
    name: 'Move',
    duration: '200ms',
    durationToken: 'motionDurationNormal',
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    easingToken: 'motionEaseInOut',
    description: 'For physical movement of an element. Start and end feel natural.',
    useFor: ['rotation', 'translation', 'slide', 'scale', 'chevron rotation'],
  },
  {
    name: 'Enter',
    duration: '200ms',
    durationToken: 'motionDurationNormal',
    easing: 'cubic-bezier(0, 0, 0.2, 1)',
    easingToken: 'motionEaseOut',
    description: 'For elements appearing. Decelerates into rest.',
    useFor: ['popover', 'tooltip', 'menu', 'dialog', 'fade in', 'scale in'],
  },
  {
    name: 'Exit',
    duration: '100ms',
    durationToken: 'motionDurationFast',
    easing: 'cubic-bezier(0, 0, 0.2, 1)',
    easingToken: 'motionEaseOut',
    description: 'For elements disappearing. Faster than enter so it feels snappy.',
    useFor: ['popover close', 'tooltip hide', 'menu close', 'dialog close', 'fade out'],
  },
];

export function getAnimationPreset(name: string): AnimationPreset | undefined {
  return animationPresets.find((p) => p.name.toLowerCase() === name.toLowerCase());
}

export function getAnimationPresetForUseCase(useCase: string): AnimationPreset | undefined {
  const lower = useCase.toLowerCase();
  return animationPresets.find((p) => p.useFor.some((u) => lower.includes(u.toLowerCase())));
}

// --- Stop words for keyword extraction ---

const STOP_WORDS = new Set([
  'a',
  'an',
  'the',
  'is',
  'are',
  'was',
  'were',
  'be',
  'been',
  'being',
  'have',
  'has',
  'had',
  'do',
  'does',
  'did',
  'will',
  'would',
  'could',
  'should',
  'may',
  'might',
  'shall',
  'can',
  'to',
  'of',
  'in',
  'for',
  'on',
  'with',
  'at',
  'by',
  'from',
  'or',
  'and',
  'not',
  'no',
  'but',
  'if',
  'then',
  'than',
  'that',
  'this',
  'it',
  'its',
  'as',
  'so',
]);

/**
 * Extract meaningful keywords from a text string.
 * Filters out stop words and short words.
 */
function extractKeywords(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s/-]/g, '')
    .split(/\s+/)
    .filter((w) => w.length > 2 && !STOP_WORDS.has(w));
}

/**
 * Score how well a context string matches an anti-pattern scenario.
 * Uses keyword overlap + multi-word phrase matching.
 * Returns 0 (no match) to 1 (strong match).
 */
function scoreAntiPatternMatch(scenario: string, context: string): number {
  const scenarioLower = scenario.toLowerCase();
  const contextLower = context.toLowerCase();

  // Check for multi-word phrase overlap (strongest signal)
  // Split scenario into 2-3 word phrases and check for inclusion
  const scenarioWords = scenarioLower.split(/\s+/);
  let phraseMatches = 0;
  for (let i = 0; i < scenarioWords.length - 1; i++) {
    const bigram = `${scenarioWords[i]} ${scenarioWords[i + 1]}`;
    if (contextLower.includes(bigram)) phraseMatches++;
  }

  // Check keyword overlap
  const scenarioKeywords = extractKeywords(scenario);
  const contextKeywords = new Set(extractKeywords(context));
  let keywordMatches = 0;
  for (const kw of scenarioKeywords) {
    if (contextKeywords.has(kw)) keywordMatches++;
  }

  // Also check if context keywords appear as substrings in scenario keywords
  // e.g., "navigate" matches "navigation", "toggle" matches "toggling"
  for (const contextKw of contextKeywords) {
    for (const scenarioKw of scenarioKeywords) {
      if (
        !contextKeywords.has(scenarioKw) &&
        (scenarioKw.startsWith(contextKw) || contextKw.startsWith(scenarioKw))
      ) {
        keywordMatches += 0.5;
      }
    }
  }

  if (scenarioKeywords.length === 0) return 0;

  // Weighted score: phrases count double
  const score = (keywordMatches + phraseMatches * 2) / (scenarioKeywords.length * 2);

  return Math.min(score, 1);
}

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

  // Check for anti-pattern warnings using improved matching
  const warnings = intentsIndex.antiPatterns.filter(
    (ap) =>
      ap.component === bestIntent!.component &&
      scoreAntiPatternMatch(ap.scenario, description) > 0.2,
  );

  return { intent: bestIntent, score: bestScore, warnings };
}

/**
 * Check if a component usage matches any anti-patterns.
 * Uses keyword + phrase matching for reliable detection.
 */
export function checkUsage(component: string, context: string): AntiPattern[] {
  return intentsIndex.antiPatterns.filter(
    (ap) => ap.component === component && scoreAntiPatternMatch(ap.scenario, context) > 0.2,
  );
}
