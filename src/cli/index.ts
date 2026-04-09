import { CliRouter } from '../core/cli-router.js';
import { createRequire } from 'module';
import path from 'path';
import { promises as fs } from 'fs';
import { AI_TOOLS } from '../core/config.js';
import { UpdateCommand } from '../core/update.js';
import { ListCommand } from '../core/list.js';
import { ArchiveCommand } from '../core/archive.js';
import { ViewCommand } from '../core/view.js';
import { registerSpecCommand } from '../commands/spec.js';
import { ChangeCommand } from '../commands/change.js';
import { ValidateCommand } from '../commands/validate.js';
import { ShowCommand } from '../commands/show.js';
import { CompletionCommand } from '../commands/completion.js';
import { FeedbackCommand } from '../commands/feedback.js';
import { registerConfigCommand } from '../commands/config.js';
import { registerSchemaCommand } from '../commands/schema.js';
import {
  statusCommand,
  instructionsCommand,
  applyInstructionsCommand,
  templatesCommand,
  schemasCommand,
  newChangeCommand,
} from '../commands/workflow/index.js';

// Zero-dependency polyfills
const makeChalk = () => new Proxy(function(s: any) { return s; }, { get: (_target, prop) => prop === 'default' ? makeChalk() : makeChalk() }) as any;
const chalk = makeChalk();
const ora = (msg?: string) => ({
  start: function() { if (msg) console.log(msg); return this; },
  succeed: function() { return this; },
  fail: function(e: any) { if (e) { console.error(e); } return this; },
  stop: function() { return this; },
  stopAndPersist: function() { return this; },
  info: function(msg: string) { if (msg) { console.log(msg); } return this; },
  warn: function(msg: string) { if (msg) { console.warn(msg); } return this; },
  text: msg || ''
}) as any;

const program: any = new CliRouter();
const require = createRequire(import.meta.url);
const packageJson = JSON.parse(await fs.readFile(new URL('../../package.json', import.meta.url), 'utf8'));
const { version } = packageJson;

program
  .name('openspec')
  .description('AI-native system for spec-driven development')
  .version(version);

const availableToolIds = AI_TOOLS.filter((tool) => tool.skillsDir).map((tool) => tool.value);
const toolsOptionDescription = `Configure AI tools non-interactively. Use "all", "none", or a comma-separated list of: ${availableToolIds.join(', ')}`;

program
  .command('init [path]')
  .description('Initialize OpenSpec in your project')
  .option('--tools <tools>', toolsOptionDescription)
  .option('--force', 'Auto-cleanup legacy files without prompting')
  .option('--profile <profile>', 'Override global config profile (core or custom)')
  .action(async (targetPath: string = '.', options?: { tools?: string; force?: boolean; profile?: string }) => {
    try {
      const resolvedPath = path.resolve(targetPath);
      const { InitCommand } = await import('../core/init.js');
      const initCommand = new InitCommand({
        tools: options?.tools,
        force: options?.force,
        profile: options?.profile,
      });
      await initCommand.execute(resolvedPath);
    } catch (error) {
      console.error(`\nError: ${(error as Error).message}`);
      process.exit(1);
    }
  });

program
  .command('experimental', { hidden: true })
  .description('Alias for init (deprecated)')
  .option('--tool <tool-id>', 'Target AI tool (maps to --tools)')
  .option('--no-interactive', 'Disable interactive prompts')
  .action(async (options?: { tool?: string; noInteractive?: boolean }) => {
    try {
      console.log('Note: "openspec experimental" is deprecated. Use "openspec init" instead.');
      const { InitCommand } = await import('../core/init.js');
      const initCommand = new InitCommand({
        tools: options?.tool,
        interactive: options?.noInteractive === true ? false : undefined,
      });
      await initCommand.execute('.');
    } catch (error) {
      console.error(`\nError: ${(error as Error).message}`);
      process.exit(1);
    }
  });

program
  .command('update [path]')
  .description('Update OpenSpec instruction files')
  .option('--force', 'Force update even when tools are up to date')
  .action(async (targetPath: string = '.', options?: { force?: boolean }) => {
    try {
      const resolvedPath = path.resolve(targetPath);
      const updateCommand = new UpdateCommand({ force: options?.force });
      await updateCommand.execute(resolvedPath);
    } catch (error) {
      console.error(`\nError: ${(error as Error).message}`);
      process.exit(1);
    }
  });

program
  .command('list')
  .description('List items (changes by default). Use --specs to list specs.')
  .option('--specs', 'List specs instead of changes')
  .option('--changes', 'List changes explicitly (default)')
  .option('--sort <order>', 'Sort order: "recent" (default) or "name"', 'recent')
  .option('--json', 'Output as JSON (for programmatic use)')
  .action(async (options?: { specs?: boolean; changes?: boolean; sort?: string; json?: boolean }) => {
    try {
      const listCommand = new ListCommand();
      const mode: 'changes' | 'specs' = options?.specs ? 'specs' : 'changes';
      const sort = options?.sort === 'name' ? 'name' : 'recent';
      await listCommand.execute('.', mode, { sort, json: options?.json });
    } catch (error) {
      console.error(`\nError: ${(error as Error).message}`);
      process.exit(1);
    }
  });

program
  .command('view')
  .description('Display an interactive dashboard of specs and changes')
  .action(async () => {
    try {
      const viewCommand = new ViewCommand();
      await viewCommand.execute('.');
    } catch (error) {
      console.error(`\nError: ${(error as Error).message}`);
      process.exit(1);
    }
  });

const changeCmd: any = program
  .command('change')
  .description('Manage OpenSpec change proposals');

changeCmd
  .command('show [change-name]')
  .description('Show a change proposal in JSON or markdown format')
  .option('--json', 'Output as JSON')
  .option('--deltas-only', 'Show only deltas (JSON only)')
  .option('--requirements-only', 'Alias for --deltas-only (deprecated)')
  .option('--no-interactive', 'Disable interactive prompts')
  .action(async (changeName?: string, options?: { json?: boolean; requirementsOnly?: boolean; deltasOnly?: boolean; noInteractive?: boolean }) => {
    try {
      const changeCommand = new ChangeCommand();
      await changeCommand.show(changeName, options);
    } catch (error) {
      console.error(`Error: ${(error as Error).message}`);
      process.exitCode = 1;
    }
  });

changeCmd
  .command('list')
  .description('List all active changes (DEPRECATED: use "openspec list" instead)')
  .option('--json', 'Output as JSON')
  .option('--long', 'Show id and title with counts')
  .action(async (options?: { json?: boolean; long?: boolean }) => {
    try {
      console.error('Warning: "openspec change list" is deprecated. Use "openspec list".');
      const changeCommand = new ChangeCommand();
      await changeCommand.list(options);
    } catch (error) {
      console.error(`Error: ${(error as Error).message}`);
      process.exitCode = 1;
    }
  });

changeCmd
  .command('validate [change-name]')
  .description('Validate a change proposal')
  .option('--strict', 'Enable strict validation mode')
  .option('--json', 'Output validation report as JSON')
  .option('--no-interactive', 'Disable interactive prompts')
  .action(async (changeName?: string, options?: { strict?: boolean; json?: boolean; noInteractive?: boolean }) => {
    try {
      const changeCommand = new ChangeCommand();
      await changeCommand.validate(changeName, options);
      if (typeof process.exitCode === 'number' && process.exitCode !== 0) {
        process.exit(process.exitCode);
      }
    } catch (error) {
      console.error(`Error: ${(error as Error).message}`);
      process.exitCode = 1;
    }
  });

program
  .command('archive [change-name]')
  .description('Archive a completed change and update main specs')
  .option('-y, --yes', 'Skip confirmation prompts')
  .option('--skip-specs', 'Skip spec update operations (useful for infrastructure, tooling, or doc-only changes)')
  .option('--no-validate', 'Skip validation (not recommended, requires confirmation)')
  .action(async (changeName?: string, options?: { yes?: boolean; skipSpecs?: boolean; noValidate?: boolean; validate?: boolean }) => {
    try {
      const archiveCommand = new ArchiveCommand();
      await archiveCommand.execute(changeName, options);
    } catch (error) {
      console.error(`\nError: ${(error as Error).message}`);
      process.exit(1);
    }
  });

registerSpecCommand(program);
registerConfigCommand(program);
registerSchemaCommand(program);

program
  .command('validate [item-name]')
  .description('Validate changes and specs')
  .option('--all', 'Validate all changes and specs')
  .option('--changes', 'Validate all changes')
  .option('--specs', 'Validate all specs')
  .option('--type <type>', 'Specify item type when ambiguous: change|spec')
  .option('--strict', 'Enable strict validation mode')
  .option('--json', 'Output validation results as JSON')
  .option('--concurrency <n>', 'Max concurrent validations')
  .option('--no-interactive', 'Disable interactive prompts')
  .action(async (itemName?: string, options?: any) => {
    try {
      const validateCommand = new ValidateCommand();
      await validateCommand.execute(itemName, options);
    } catch (error) {
      console.error(`\nError: ${(error as Error).message}`);
      process.exit(1);
    }
  });

program
  .command('show [item-name]')
  .description('Show a change or spec')
  .option('--json', 'Output as JSON')
  .option('--type <type>', 'Specify item type when ambiguous: change|spec')
  .option('--no-interactive', 'Disable interactive prompts')
  .option('--deltas-only', 'Show only deltas (JSON only, change)')
  .option('--requirements-only', 'Alias for --deltas-only (deprecated, change)')
  .option('--requirements', 'JSON only: Show only requirements (exclude scenarios)')
  .option('--no-scenarios', 'JSON only: Exclude scenario content')
  .option('-r, --requirement <id>', 'JSON only: Show specific requirement by ID (1-based)')
  .action(async (itemName?: string, options?: any) => {
    try {
      const showCommand = new ShowCommand();
      await showCommand.execute(itemName, options ?? {});
    } catch (error) {
      console.error(`\nError: ${(error as Error).message}`);
      process.exit(1);
    }
  });

program
  .command('feedback <message>')
  .description('Submit feedback about OpenSpec')
  .option('--body <text>', 'Detailed description for the feedback')
  .action(async (message: string, options?: { body?: string }) => {
    try {
      const feedbackCommand = new FeedbackCommand();
      await feedbackCommand.execute(message, options);
    } catch (error) {
      console.error(`\nError: ${(error as Error).message}`);
      process.exit(1);
    }
  });

const completionCmd: any = program
  .command('completion')
  .description('Manage shell completions for OpenSpec CLI');

completionCmd
  .command('generate [shell]')
  .description('Generate completion script for a shell')
  .action(async (shell?: string) => {
    try {
      const completionCommand = new CompletionCommand();
      await completionCommand.generate({ shell });
    } catch (error) {
      console.error(`\nError: ${(error as Error).message}`);
      process.exit(1);
    }
  });

completionCmd
  .command('install [shell]')
  .description('Install completion script for a shell')
  .option('--verbose', 'Show detailed installation output')
  .action(async (shell?: string, options?: { verbose?: boolean }) => {
    try {
      const completionCommand = new CompletionCommand();
      await completionCommand.install({ shell, verbose: options?.verbose });
    } catch (error) {
      console.error(`\nError: ${(error as Error).message}`);
      process.exit(1);
    }
  });

completionCmd
  .command('uninstall [shell]')
  .description('Uninstall completion script for a shell')
  .option('-y, --yes', 'Skip confirmation prompts')
  .action(async (shell?: string, options?: { yes?: boolean }) => {
    try {
      const completionCommand = new CompletionCommand();
      await completionCommand.uninstall({ shell, yes: options?.yes });
    } catch (error) {
      console.error(`\nError: ${(error as Error).message}`);
      process.exit(1);
    }
  });

program
  .command('__complete <type>', { hidden: true })
  .description('Output completion data in machine-readable format')
  .action(async (type: string) => {
    try {
      const completionCommand = new CompletionCommand();
      await completionCommand.complete({ type });
    } catch (error) {
      process.exitCode = 1;
    }
  });

program
  .command('status')
  .description('Display artifact completion status for a change')
  .option('--change <id>', 'Change name')
  .option('--schema <name>', 'Schema override')
  .option('--json', 'Output as JSON')
  .action(async (options: any) => {
    try {
      await statusCommand(options);
    } catch (error) {
      console.error(`\nError: ${(error as Error).message}`);
      process.exit(1);
    }
  });

program
  .command('instructions [artifact]')
  .description('Output enriched instructions')
  .option('--change <id>', 'Change name')
  .option('--schema <name>', 'Schema override')
  .option('--json', 'Output as JSON')
  .action(async (artifactId: string | undefined, options: any) => {
    try {
      if (artifactId === 'apply') {
        const { applyInstructionsCommand } = await import('../commands/workflow/index.js');
        await applyInstructionsCommand(options);
      } else {
        await instructionsCommand(artifactId, options);
      }
    } catch (error) {
      console.error(`\nError: ${(error as Error).message}`);
      process.exit(1);
    }
  });

program
  .command('templates')
  .description('Show resolved template paths')
  .option('--schema <name>', 'Schema to use')
  .option('--json', 'Output as JSON')
  .action(async (options: any) => {
    try {
      await templatesCommand(options);
    } catch (error) {
      console.error(`\nError: ${(error as Error).message}`);
      process.exit(1);
    }
  });

program
  .command('schemas')
  .description('List available workflow schemas')
  .option('--json', 'Output as JSON')
  .action(async (options: any) => {
    try {
      await schemasCommand(options);
    } catch (error) {
      console.error(`\nError: ${(error as Error).message}`);
      process.exit(1);
    }
  });

const newCmd: any = program.command('new').description('Create new items');

newCmd
  .command('change <name>')
  .description('Create a new change directory')
  .option('--description <text>', 'Description')
  .option('--schema <name>', 'Schema')
  .action(async (name: string, options: any) => {
    try {
      await newChangeCommand(name, options);
    } catch (error) {
      console.error(`\nError: ${(error as Error).message}`);
      process.exit(1);
    }
  });

await program.parse();
