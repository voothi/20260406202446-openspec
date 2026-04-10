import { describe, it, expect, vi } from 'vitest';
import { CliRouter } from '../../src/core/cli-router.js';

describe('CliRouter', () => {
  it('should pass positional argument correctly and not consume into options', async () => {
    const router = new CliRouter();
    const action = vi.fn();
    
    router
      .command('test <name>')
      .option('--json', 'output as json')
      .action(action);
      
    await router.parse(['test', 'my-name', '--json']);
    
    expect(action).toHaveBeenCalledWith('my-name', expect.objectContaining({ json: true }), expect.anything());
  });

  it('should parse options with equals sign', async () => {
    const router = new CliRouter();
    const action = vi.fn();
    
    router
      .command('test')
      .option('--change <name>', 'change name')
      .action(action);
      
    await router.parse(['test', '--change=my-change', '--json']);
    
    expect(action).toHaveBeenCalledWith(expect.objectContaining({ change: 'my-change', json: true }), expect.anything());
  });

  it('should handle --no-<flag> to set option to false', async () => {
    const router = new CliRouter();
    const action = vi.fn();
    
    router
      .command('test')
      .option('--telemetry', 'enable telemetry')
      .action(action);
      
    // commander style: if we have --telemetry, then --no-telemetry should set it to false
    await router.parse(['test', '--no-telemetry']);
    
    expect(action).toHaveBeenCalledWith(expect.objectContaining({ telemetry: false }), expect.anything());
  });

  it('should handle short flags', async () => {
    const router = new CliRouter();
    const action = vi.fn();
    
    router
      .command('test')
      .option('-j, --json', 'json output')
      .action(action);
      
    await router.parse(['test', '-j']);
    
    expect(action).toHaveBeenCalledWith(expect.objectContaining({ json: true }), expect.anything());
  });
});
