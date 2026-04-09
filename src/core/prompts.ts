import readline from 'readline';

function createInterface() {
  return readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
}

function ask(question: string): Promise<string> {
  return new Promise((resolve) => {
    const rl = createInterface();
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.trim());
    });
  });
}

export type PromptOption = {
  name?: string;
  value: string;
  checked?: boolean;
  preSelected?: boolean;
  [key: string]: any;
};

export type PromptOptions = {
  message: string;
  default?: any;
  choices?: PromptOption[];
  validate?: (input: any) => boolean | string;
  instructions?: string;
  pageSize?: number;
  theme?: any;
  [key: string]: any;
};

export async function input(opts: PromptOptions): Promise<string> {
  const ans = await ask(`${opts.message} `);
  return ans || opts.default;
}

export async function confirm(opts: PromptOptions): Promise<boolean> {
  const ans = await ask(`${opts.message} (y/N) `);
  if (!ans) return opts.default || false;
  return ans.toLowerCase().startsWith('y');
}

export async function select(opts: Required<Pick<PromptOptions, 'message' | 'choices'>> & PromptOptions): Promise<string> {
  console.log(`\n${opts.message}`);
  opts.choices.forEach((c, i) => {
    console.log(`  ${i + 1}) ${c.name || c.value}`);
  });
  const ans = await ask(`Select an option (1-${opts.choices.length}): `);
  const idx = parseInt(ans, 10);
  if (!isNaN(idx) && idx >= 1 && idx <= opts.choices.length) {
    return opts.choices[idx - 1].value;
  }
  return opts.default || opts.choices[0].value;
}

export async function checkbox(opts: Required<Pick<PromptOptions, 'message' | 'choices'>> & PromptOptions): Promise<string[]> {
  console.log(`\n${opts.message}`);
  opts.choices.forEach((c, i) => {
    const checked = c.checked || c.preSelected;
    console.log(`  ${i + 1}) ${c.name || c.value} ${checked ? '[x]' : '[ ]'}`);
  });
  const ans = await ask(`Select multiple options (comma separated, e.g. 1,3): `);
  if (!ans) {
    return opts.choices.filter(c => c.checked || c.preSelected).map(c => c.value);
  }
  const indices = ans.split(',').map(s => parseInt(s.trim(), 10));
  const selected: string[] = [];
  for (const idx of indices) {
    if (!isNaN(idx) && idx >= 1 && idx <= opts.choices.length) {
      selected.push(opts.choices[idx - 1].value);
    }
  }
  return selected;
}
