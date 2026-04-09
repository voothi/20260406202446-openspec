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
    if (argv.length === 0 && !this._action && this._commands.size === 0) {
      this.showHelp();
      return;
    }

    const commandName = argv[0];
    
    if (commandName === '--help' || commandName === '-h') {
        this.showHelp();
        return;
    }
    
    if (commandName === '--version' || commandName === '-v') {
        console.log(this.versionStr);
        return;
    }

    const cmd = this._commands.get(commandName);

    if (cmd) {
      return cmd.parse(argv.slice(1));
    }

    const args: string[] = [];
    const options: any = Object.create(null);

    for (let i = 0; i < argv.length; i++) {
        const arg = argv[i];
        if (arg.startsWith('--')) {
            const parts = arg.slice(2).split('=');
            const key = parts[0];
            if (key === '__proto__' || key === 'constructor') continue;
            
            const camelKey = key.replace(/-([a-z0-9])/gi, g => g[1].toUpperCase());
            
            if (key.startsWith('no-')) {
                const posKey = camelKey.slice(2).charAt(0).toLowerCase() + camelKey.slice(3);
                options[posKey] = false;
            } else if (parts.length > 1) {
                options[camelKey] = parts.slice(1).join('=');
            } else if (i + 1 < argv.length && !argv[i+1].startsWith('-')) {
                options[camelKey] = argv[++i];
            } else {
                options[camelKey] = true;
            }
        } else if (arg.startsWith('-')) {
            options[arg.slice(1)] = true;
        } else {
            args.push(arg);
        }
    }

    if (this._action) {
       const expectedArgs = this._expectedArgs || 0;
       const actionArgs: any[] = [];
       for (let i = 0; i < expectedArgs; i++) {
         actionArgs.push(args[i]);
       }
       actionArgs.push(options);
       actionArgs.push(this);
       await this._action(...actionArgs);
    } else if (argv.length > 0 && !this.parent) {
       console.error(`Unknown command: ${commandName}`);
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
