/**
 * Status Command
 *
 * Displays artifact completion status for a change.
 */

// Zero-dependency replacements
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
import {
  loadChangeContext,
  formatChangeStatus,
  type ChangeStatus,
} from '../../core/artifact-graph/index.js';
import {
  validateChangeExists,
  validateSchemaExists,
  getAvailableChanges,
  getStatusIndicator,
  getStatusColor,
} from './shared.js';

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

export interface StatusOptions {
  change?: string;
  schema?: string;
  json?: boolean;
}

// -----------------------------------------------------------------------------
// Command Implementation
// -----------------------------------------------------------------------------

export async function statusCommand(options: StatusOptions): Promise<void> {
  const spinner = ora('Loading change status...').start();

  try {
    const projectRoot = process.cwd();

    // Handle no-changes case gracefully — status is informational,
    // so "no changes" is a valid state, not an error.
    if (!options.change) {
      const available = await getAvailableChanges(projectRoot);
      if (available.length === 0) {
        spinner.stop();
        if (options.json) {
          console.log(JSON.stringify({ changes: [], message: 'No active changes.' }, null, 2));
          return;
        }
        console.log('No active changes. Create one with: openspec new change <name>');
        return;
      }
      // Changes exist but --change not provided
      spinner.stop();
      throw new Error(
        `Missing required option --change. Available changes:\n  ${available.join('\n  ')}`
      );
    }

    const changeName = await validateChangeExists(options.change, projectRoot);

    // Validate schema if explicitly provided
    if (options.schema) {
      validateSchemaExists(options.schema, projectRoot);
    }

    // loadChangeContext will auto-detect schema from metadata if not provided
    const context = loadChangeContext(projectRoot, changeName, options.schema);
    const status = formatChangeStatus(context);

    spinner.stop();

    if (options.json) {
      console.log(JSON.stringify(status, null, 2));
      return;
    }

    printStatusText(status);
  } catch (error) {
    spinner.stop();
    throw error;
  }
}

export function printStatusText(status: ChangeStatus): void {
  const doneCount = status.artifacts.filter((a) => a.status === 'done').length;
  const total = status.artifacts.length;

  console.log(`Change: ${status.changeName}`);
  console.log(`Schema: ${status.schemaName}`);
  console.log(`Progress: ${doneCount}/${total} artifacts complete`);
  console.log();

  for (const artifact of status.artifacts) {
    const indicator = getStatusIndicator(artifact.status);
    const color = getStatusColor(artifact.status);
    let line = `${indicator} ${artifact.id}`;

    if (artifact.status === 'blocked' && artifact.missingDeps && artifact.missingDeps.length > 0) {
      line += color(` (blocked by: ${artifact.missingDeps.join(', ')})`);
    }

    console.log(line);
  }

  if (status.isComplete) {
    console.log();
    console.log(chalk.green('All artifacts complete!'));
  }
}
