import { validate } from './validate.js';

/**
 * Type definitions for global OpenSpec configuration.
 */
export interface GlobalConfigType {
  featureFlags?: Record<string, boolean>;
  profile?: 'core' | 'custom';
  delivery?: 'both' | 'skills' | 'commands';
  workflows?: string[];
  [key: string]: any; // Allow passthrough for forward compatibility
}

/**
 * Zero-dependency schema definition for project configuration.
 */
export const GlobalConfigSchema = {
  'featureFlags?': 'object',
  'profile?': 'string',
  'delivery?': 'string',
  'workflows?': 'array',
};

/**
 * Default configuration values.
 */
export const DEFAULT_CONFIG: GlobalConfigType = {
  featureFlags: {},
  profile: 'core',
  delivery: 'both',
};

const KNOWN_TOP_LEVEL_KEYS = new Set([...Object.keys(DEFAULT_CONFIG), 'workflows']);

/**
 * Validate a config key path for CLI set operations.
 */
export function validateConfigKeyPath(path: string): { valid: boolean; reason?: string } {
  const rawKeys = path.split('.');

  if (rawKeys.length === 0 || rawKeys.some((key) => key.trim() === '')) {
    return { valid: false, reason: 'Key path must not be empty' };
  }

  const rootKey = rawKeys[0];
  if (!KNOWN_TOP_LEVEL_KEYS.has(rootKey)) {
    return { valid: false, reason: `Unknown top-level key "${rootKey}"` };
  }

  if (rootKey === 'featureFlags') {
    if (rawKeys.length > 2) {
      return { valid: false, reason: 'featureFlags values are booleans and do not support nested keys' };
    }
    return { valid: true };
  }

  if (rawKeys.length > 1) {
    return { valid: false, reason: `"${rootKey}" does not support nested keys` };
  }

  return { valid: true };
}

/**
 * Get a nested value from an object using dot notation.
 */
export function getNestedValue(obj: Record<string, unknown>, path: string): unknown {
  const keys = path.split('.');
  let current: any = obj;

  for (const key of keys) {
    if (current === null || current === undefined) return undefined;
    if (typeof current !== 'object') return undefined;
    current = current[key];
  }

  return current;
}

/**
 * Set a nested value in an object using dot notation.
 */
export function setNestedValue(obj: Record<string, unknown>, path: string, value: unknown): void {
  const keys = path.split('.');
  let current: Record<string, any> = obj;

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    if (current[key] === undefined || current[key] === null || typeof current[key] !== 'object') {
      current[key] = {};
    }
    current = current[key];
  }

  const lastKey = keys[keys.length - 1];
  current[lastKey] = value;
}

/**
 * Delete a nested value from an object using dot notation.
 */
export function deleteNestedValue(obj: Record<string, unknown>, path: string): boolean {
  const keys = path.split('.');
  let current: Record<string, any> = obj;

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    if (current[key] === undefined || current[key] === null || typeof current[key] !== 'object') {
      return false;
    }
    current = current[key];
  }

  const lastKey = keys[keys.length - 1];
  if (lastKey in current) {
    delete current[lastKey];
    return true;
  }
  return false;
}

/**
 * Coerce a string value to its appropriate type.
 */
export function coerceValue(value: string, forceString: boolean = false): string | number | boolean {
  if (forceString) return value;
  if (value === 'true') return true;
  if (value === 'false') return false;
  const num = Number(value);
  if (!isNaN(num) && isFinite(num) && value.trim() !== '') return num;
  return value;
}

/**
 * Format a value for YAML-like display.
 */
export function formatValueYaml(value: unknown, indent: number = 0): string {
  const indentStr = '  '.repeat(indent);
  if (value === null || value === undefined) return 'null';
  if (typeof value === 'boolean' || typeof value === 'number') return String(value);
  if (typeof value === 'string') return value;
  if (Array.isArray(value)) {
    if (value.length === 0) return '[]';
    return value.map((item) => `${indentStr}- ${formatValueYaml(item, indent + 1)}`).join('\n');
  }
  if (typeof value === 'object') {
    const entries = Object.entries(value as Record<string, any>);
    if (entries.length === 0) return '{}';
    return entries
      .map(([key, val]) => {
        const formattedVal = formatValueYaml(val, indent + 1);
        if (typeof val === 'object' && val !== null && Object.keys(val).length > 0) {
          return `${indentStr}${key}:\n${formattedVal}`;
        }
        return `${indentStr}${key}: ${formattedVal}`;
      })
      .join('\n');
  }
  return String(value);
}

/**
 * Validate a configuration object against the schema.
 */
export function validateConfig(config: unknown): { success: boolean; error?: string } {
  const result = validate(config, GlobalConfigSchema);
  if (result.success) return { success: true };
  return { success: false, error: result.errors.join('; ') };
}
