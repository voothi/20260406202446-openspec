/**
 * Zero-dependency CLI router.
 * Replaces 'commander' with manual process.argv parsing.
 */
export class CliRouter {
  private _commands = new Map<string, CliRouter>();
  private options: { flags: string; desc: string }[] = [];
  private _description = '';
  private versionStr = '';
  private _action: ((...args: any[]) => void | Promise<void>) | null = null;
  private _name = '';
  private _expectedArgs = 0;
  parent: CliRouter | null = null;

  constructor() {}

  version(v?: string): string | this { 
    if (v === undefined) return this.versionStr;
    this.versionStr = v; 
    return this; 
  }

  description(d?: string): string | this {
    if (d === undefined) return this._description;
    this._description = d;
    return this;
  }

  name(n?: string): string | this {
    if (n === undefined) return this._name;
    this._name = n;
    return this;
  }

  command(nameAndArgs: string, options?: { hidden?: boolean }): CliRouter {
    const parts = nameAndArgs.split(' ');
    const name = parts[0];
    const cmd = new CliRouter();
    cmd._name = name;
    cmd._expectedArgs = parts.length > 1 ? parts.length - 1 : 0;
    cmd.parent = this;
    this._commands.set(name, cmd);
    return cmd;
  }

  option(flags: string, desc: string): this {
    this.options.push({ flags, desc });
    return this;
  }

  private _resolveOptionKey(arg: string): string | null {
    for (const opt of this.options) {
        const parts = opt.flags.split(',').map(p => p.trim());
        const short = parts.find(p => p.startsWith('-') && !p.startsWith('--'))?.slice(1);
        const longMatch = parts.find(p => p.startsWith('--'))?.split(' ')[0].slice(2);
        
        const cleanArg = arg.startsWith('--') ? arg.slice(2) : arg.slice(1);
        if (arg.startsWith('--')) {
            if (cleanArg === longMatch || (longMatch && cleanArg.startsWith('no-') && cleanArg.slice(3) === longMatch)) return longMatch;
        } else {
            if (cleanArg === short) return longMatch || short || null;
        }
    }
    return null;
  }

  action(fn: (...args: any[]) => void | Promise<void>): this {
    this._action = fn;
    return this;
  }

  /**
   * Mock for commander hooks (not fully implemented in zero-dep version)
   */
  hook(_name: string, _fn: () => void): this {
    return this;
  }

  /**
   * Mock for commander allowUnknownOption
   */
  allowUnknownOption(_bool: boolean = true): this {
    return this;
  }

  async parse(argv: string[] = process.argv.slice(2)): Promise<void> {
    const options: any = Object.create(null);
    const positional: string[] = [];
    
    // First pass: extract all options and find the command
    let commandIdx = -1;
    for (let i = 0; i < argv.length; i++) {
        const arg = argv[i];
        
        if (!arg.startsWith('-') && this._commands.has(arg)) {
            // Delegate to subcommand immediately
            return this._commands.get(arg)!.parse(argv.slice(i + 1));
        }

        if (arg.startsWith('-')) {
            if (arg === '--help' || arg === '-h') {
                this.showHelp();
                return;
            }
            if (arg === '--version' || arg === '-v') {
                console.log(this.versionStr);
                return;
            }
            
            const isNegated = arg.startsWith('--no-');
            const rawKey = arg.split('=')[0];
            const resolvedKey = this._resolveOptionKey(rawKey) || (arg.startsWith('--') ? rawKey.slice(2) : rawKey.slice(1));
            
            const camelKey = resolvedKey.replace(/-([a-z0-9])/gi, g => g[1].toUpperCase());
            
            if (isNegated) {
                // If it was --no-telemetry, resolvedKey might be 'telemetry' or 'no-telemetry'
                // We want to set the base property to false
                const targetKey = camelKey.startsWith('no') ? camelKey.slice(2).charAt(0).toLowerCase() + camelKey.slice(3) : camelKey;
                options[targetKey] = false;
            } else if (arg.includes('=')) {
                options[camelKey] = arg.split('=')[1];
            } else if (i + 1 < argv.length && !argv[i+1].startsWith('-')) {
                /**
                 * Greedy option value resolution:
                 * Consumes the next token as a value if it doesn't start with '-'.
                 * Limitation: This can misparse positional arguments as option values
                 * if they are placed immediately after a flag that expects a value.
                 */
                options[camelKey] = argv[++i];
            } else {
                options[camelKey] = true;
            }
        } else {
            positional.push(arg);
        }
    }

    if (this._action) {
       const actionArgs: any[] = [];
       for (let i = 0; i < (this._expectedArgs || 0); i++) {
         actionArgs.push(positional[i]);
       }
       actionArgs.push(options);
       actionArgs.push(this);
       await this._action(...actionArgs);
    } else if (argv.length > 0 && !this.parent) {
       // Only error on root router
       const firstNonOpt = argv.find(a => !a.startsWith('-'));
       console.error(`Unknown command: ${firstNonOpt || argv[0]}`);
       process.exit(1);
    } else {
       this.showHelp();
    }
  }

  showHelp(): void {
    console.log(`\nOpenSpec CLI (version ${this.versionStr || 'unknown'})`);
    console.log(this._description ? `\n  ${this._description}` : '');
    console.log(`\nUsage: openspec ${this.getFullCommandName()} [options]\n`);
    
    if (this._commands.size > 0) {
        console.log(`Commands:`);
        for (const [name, cmd] of this._commands) {
            console.log(`  ${name.padEnd(20)} ${cmd._description}`);
        }
        console.log('');
    }
    
    if (this.options && this.options.length > 0) {
        console.log(`Options:`);
        for (const opt of this.options) {
            console.log(`  ${opt.flags.padEnd(20)} ${opt.desc}`);
        }
        console.log('');
    }
  }

  private getFullCommandName(): string {
    const names: string[] = [];
    let current: CliRouter | null = this;
    while (current) {
        if (current._name) names.unshift(current._name);
        current = current.parent;
    }
    return names.join(' ') || '<command>';
  }
}
