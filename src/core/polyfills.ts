/**
 * Zero-dependency polyfills for terminal styling and spinners.
 */

/**
 * Minimal chalk polyfill that returns strings unchanged.
 * Supports chaining: chalk.blue.bold('text') -> 'text'
 */
const makeChalk = () => {
  const ch: any = (s: any) => s;
  const proxy: any = new Proxy(ch, {
    get: () => proxy,
    apply: (_target, _thisArg, args) => args[0]
  });
  return proxy;
};

export const chalk = makeChalk();

/**
 * Minimal ora polyfill for terminal spinners.
 * Provides a no-op interface.
 */
export const ora = (msg?: string) => ({
  start: function() { return this; },
  succeed: function() { return this; },
  fail: function(e: any) { if (e) { console.error(e); } return this; },
  stop: function() { return this; },
  stopAndPersist: function() { return this; },
  info: function(msg: string) { if (msg) { console.log(msg); } return this; },
  warn: function(msg: string) { if (msg) { console.warn(msg); } return this; },
  text: msg || ''
}) as any;
