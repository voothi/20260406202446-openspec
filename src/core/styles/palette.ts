// Zero-dependency chalk polyfill that handles chaining e.g. chalk.hex('#fff')('text')
const makeChalk = () => {
  const ch: any = (s: any) => s;
  const proxy: any = new Proxy(ch, {
    get: () => proxy,
    apply: (_target, _thisArg, args) => {
      // If called with a single string, it's likely the text to "color"
      // or a hex code in a chain. To be safe for both, we return a function
      // that returns its input, which itself is the proxy.
      return proxy;
    }
  });
  return proxy;
};
const chalk = makeChalk();

export const PALETTE = {
  white: (s: any) => s,
  lightGray: (s: any) => s,
  midGray: (s: any) => s,
  darkGray: (s: any) => s
};
