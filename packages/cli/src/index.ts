import { intro, outro, log } from '@clack/prompts';

const args = process.argv.slice(2);
const command = args[0];

async function main() {
  if (!command || command === '--help' || command === '-h') {
    showHelp();
    return;
  }

  switch (command) {
    case 'init': {
      const { runInit } = await import('./commands/init.js');
      await runInit(args.slice(1));
      break;
    }
    case 'add': {
      const { runAdd } = await import('./commands/add.js');
      await runAdd(args.slice(1));
      break;
    }
    case 'theme': {
      const { runTheme } = await import('./commands/theme.js');
      await runTheme(args.slice(1));
      break;
    }
    case 'list': {
      const { runList } = await import('./commands/list.js');
      await runList();
      break;
    }
    default:
      log.error(`Unknown command: ${command}`);
      showHelp();
      process.exit(1);
  }
}

function showHelp() {
  intro('basex-ui');
  log.info(`Usage: basex-ui <command>

Commands:
  init              Interactive setup with theme builder
  add <component>   Scaffold a component into your project
  theme create      Create a new named theme
  theme use <name>  Switch active theme
  theme list        List saved themes
  list              Show available/installed components

Options:
  --help, -h        Show this help message`);
  outro('');
}

main().catch((error) => {
  log.error(String(error));
  process.exit(1);
});
