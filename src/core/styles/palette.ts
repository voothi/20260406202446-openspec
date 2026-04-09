// Zero-dependency chalk polyfill
const makeChalk = () => new Proxy(function(s: any) { return s; }, { get: (_target, prop) => prop === 'default' ? makeChalk() : makeChalk() }) as any;
const chalk = makeChalk();

export const PALETTE = {
  white: chalk.hex('#f4f4f4'),
  lightGray: chalk.hex('#c8c8c8'),
  midGray: chalk.hex('#8a8a8a'),
  darkGray: chalk.hex('#4a4a4a')
};
