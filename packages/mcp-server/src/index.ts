import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';
import { resolveIntent, checkUsage } from '@basex-ui/intelligence';
import {
  listComponents,
  getComponent,
  searchComponents,
  getTokensByCategory,
} from './data.js';

const server = new McpServer({
  name: 'basex-ui',
  version: '0.1.0',
});

// --- Tool 1: list_components ---
server.registerTool('list_components', {
  description:
    'List all available BaseX UI components with their categories and descriptions.',
}, async () => {
  const components = listComponents();
  const result = components.map((c) => ({
    name: c.name,
    category: c.category,
    description: c.description,
  }));
  return {
    content: [
      {
        type: 'text' as const,
        text: JSON.stringify(result, null, 2),
      },
    ],
  };
});

// --- Tool 2: search_components ---
server.registerTool('search_components', {
  description:
    'Search BaseX UI components by name, description, or category.',
  inputSchema: { query: z.string().describe('Search query string') },
}, async ({ query }) => {
  const results = searchComponents(query);
  const output = results.map((c) => ({
    name: c.name,
    category: c.category,
    description: c.description,
  }));
  return {
    content: [
      {
        type: 'text' as const,
        text:
          output.length > 0
            ? JSON.stringify(output, null, 2)
            : `No components found matching "${query}".`,
      },
    ],
  };
});

// --- Tool 3: get_component ---
server.registerTool('get_component', {
  description:
    'Get the full manifest for a BaseX UI component including props, variants, examples, intents, and anti-patterns.',
  inputSchema: { name: z.string().describe('Component name (e.g. "Button")') },
}, async ({ name }) => {
  const component = getComponent(name);
  if (!component) {
    return {
      content: [
        {
          type: 'text' as const,
          text: `Component "${name}" not found. Use list_components to see available components.`,
        },
      ],
      isError: true,
    };
  }
  return {
    content: [
      {
        type: 'text' as const,
        text: JSON.stringify(component, null, 2),
      },
    ],
  };
});

// --- Tool 4: get_component_example ---
server.registerTool('get_component_example', {
  description: 'Get a specific usage example for a BaseX UI component.',
  inputSchema: {
    name: z.string().describe('Component name (e.g. "Button")'),
    variant: z
      .string()
      .optional()
      .describe(
        'Example variant name (e.g. "basic", "variants", "colors", "sizes"). Omit to get all examples.',
      ),
  },
}, async ({ name, variant }) => {
  const component = getComponent(name);
  if (!component) {
    return {
      content: [
        {
          type: 'text' as const,
          text: `Component "${name}" not found.`,
        },
      ],
      isError: true,
    };
  }

  if (variant) {
    const example = component.examples.find(
      (e) => e.name.toLowerCase() === variant.toLowerCase(),
    );
    if (!example) {
      return {
        content: [
          {
            type: 'text' as const,
            text: `Example "${variant}" not found for ${name}. Available: ${component.examples.map((e) => e.name).join(', ')}`,
          },
        ],
        isError: true,
      };
    }
    return {
      content: [
        {
          type: 'text' as const,
          text: `// ${example.description}\n${example.code}`,
        },
      ],
    };
  }

  const allExamples = component.examples
    .map((e) => `// ${e.description}\n${e.code}`)
    .join('\n\n');
  return {
    content: [
      {
        type: 'text' as const,
        text: allExamples,
      },
    ],
  };
});

// --- Tool 5: resolve_intent ---
server.registerTool('resolve_intent', {
  description:
    'Describe what you are building and get a recommended BaseX UI component with reasoning and composition blueprint.',
  inputSchema: {
    description: z
      .string()
      .describe(
        'Natural language description of what you want to build (e.g. "a button to delete a user account")',
      ),
  },
}, async ({ description }) => {
  const result = resolveIntent(description);
  if (!result) {
    return {
      content: [
        {
          type: 'text' as const,
          text: 'No matching component found for that description. Try being more specific or use list_components to browse available components.',
        },
      ],
    };
  }

  const output: Record<string, unknown> = {
    recommendedComponent: result.intent.component,
    intent: result.intent.intent,
    reasoning: result.intent.reasoning,
    composition: result.intent.composition,
    confidence: result.score,
  };

  if (result.warnings.length > 0) {
    output.warnings = result.warnings.map((w) => ({
      scenario: w.scenario,
      reasoning: w.reasoning,
      alternative: w.alternative,
    }));
  }

  return {
    content: [
      {
        type: 'text' as const,
        text: JSON.stringify(output, null, 2),
      },
    ],
  };
});

// --- Tool 6: check_usage ---
server.registerTool('check_usage', {
  description:
    'Check if a component usage matches any known anti-patterns. Returns warnings if the component might not be the right choice.',
  inputSchema: {
    component: z.string().describe('Component name (e.g. "Button")'),
    context: z
      .string()
      .describe(
        'Description of how the component is being used (e.g. "navigating to another page")',
      ),
  },
}, async ({ component, context }) => {
  const warnings = checkUsage(component, context);
  if (warnings.length === 0) {
    return {
      content: [
        {
          type: 'text' as const,
          text: `No anti-pattern warnings for using ${component} in that context.`,
        },
      ],
    };
  }

  const output = warnings.map((w) => ({
    scenario: w.scenario,
    reasoning: w.reasoning,
    alternative: w.alternative,
  }));

  return {
    content: [
      {
        type: 'text' as const,
        text: JSON.stringify(
          {
            warning: `${component} may not be the right choice here.`,
            antiPatterns: output,
          },
          null,
          2,
        ),
      },
    ],
  };
});

// --- Tool 7: get_tokens ---
server.registerTool('get_tokens', {
  description:
    'Get BaseX UI design tokens, optionally filtered by category (colors, spacing, typography, radius, borders, shadows, motion).',
  inputSchema: {
    category: z
      .string()
      .optional()
      .describe(
        'Token category to filter by: colors, spacing, typography, radius, borders, shadows, motion. Omit for all.',
      ),
  },
}, async ({ category }) => {
  const tokens = getTokensByCategory(category);
  return {
    content: [
      {
        type: 'text' as const,
        text: JSON.stringify(tokens, null, 2),
      },
    ],
  };
});

// --- Tool 8: get_theme_example ---
server.registerTool('get_theme_example', {
  description:
    'Get an example of how to create or apply a BaseX UI theme using stylex.createTheme.',
  inputSchema: {
    theme: z
      .string()
      .describe(
        'Theme type: "light", "dark", or "custom" for a custom theme example.',
      ),
  },
}, async ({ theme }) => {
  const examples: Record<string, string> = {
    light: `import { lightTheme } from '@basex-ui/styles';
import * as stylex from '@stylexjs/stylex';

// Apply the light theme to a root element
function App({ children }) {
  return (
    <div {...stylex.props(lightTheme)}>
      {children}
    </div>
  );
}`,

    dark: `import { darkTheme } from '@basex-ui/styles';
import * as stylex from '@stylexjs/stylex';

// Apply the dark theme to a root element
function App({ children }) {
  return (
    <div {...stylex.props(darkTheme)}>
      {children}
    </div>
  );
}

// Or toggle based on preference
function ThemedApp({ children }) {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  return (
    <div {...stylex.props(prefersDark ? darkTheme : lightTheme)}>
      {children}
    </div>
  );
}`,

    custom: `import * as stylex from '@stylexjs/stylex';
import { tokens } from '@basex-ui/tokens';
import { generateSemanticColors } from '@basex-ui/tokens/oklch';

// Generate a custom primary palette from a hex color
const customColors = generateSemanticColors('#8B5CF6'); // Purple

// Create a custom theme
const purpleTheme = stylex.createTheme(tokens, {
  ...customColors,
  // Override additional tokens as needed
  colorFocusRing: customColors.colorPrimary,
});

// Apply the custom theme
function App({ children }) {
  return (
    <div {...stylex.props(purpleTheme)}>
      {children}
    </div>
  );
}`,
  };

  const example = examples[theme.toLowerCase()];
  if (!example) {
    return {
      content: [
        {
          type: 'text' as const,
          text: `Unknown theme "${theme}". Available: light, dark, custom.`,
        },
      ],
      isError: true,
    };
  }

  return {
    content: [
      {
        type: 'text' as const,
        text: example,
      },
    ],
  };
});

// --- Start server ---
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((error) => {
  console.error('MCP server error:', error);
  process.exit(1);
});
