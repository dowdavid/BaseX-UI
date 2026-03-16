import about from './about.md?raw';
import gettingStarted from './getting-started.md?raw';
import cli from './cli.md?raw';
import intelligenceIndex from './intelligence/index.md?raw';
import intentResolution from './intelligence/intent-resolution.md?raw';
import antiPatterns from './intelligence/anti-patterns.md?raw';
import animationSystem from './intelligence/animation-system.md?raw';
import mcpIndex from './mcp-server/index.md?raw';
import discoveryTools from './mcp-server/discovery-tools.md?raw';
import intentTools from './mcp-server/intent-tools.md?raw';
import setupTools from './mcp-server/setup-tools.md?raw';

export const content: Record<string, string> = {
  about,
  'getting-started': gettingStarted,
  cli,
  'intelligence/index': intelligenceIndex,
  'intelligence/intent-resolution': intentResolution,
  'intelligence/anti-patterns': antiPatterns,
  'intelligence/animation-system': animationSystem,
  'mcp-server/index': mcpIndex,
  'mcp-server/discovery-tools': discoveryTools,
  'mcp-server/intent-tools': intentTools,
  'mcp-server/setup-tools': setupTools,
};
