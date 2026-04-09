/**
 * Zero-dependency schema validator.
 * Replaces 'zod' for simple object structure validation.
 */
export interface ValidationResult {
  success: boolean;
  errors: string[];
}

export function validate(obj: any, schema: any): ValidationResult {
  const errors: string[] = [];

  if (!obj || typeof obj !== 'object') {
    return { success: false, errors: ['Input is not an object'] };
  }

  for (const [key, type] of Object.entries(schema)) {
    const isOptional = key.endsWith('?');
    const actualKey = isOptional ? key.slice(0, -1) : key;
    const actualValue = obj[actualKey];

    if (actualValue === undefined || actualValue === null) {
      if (!isOptional) {
        errors.push(`Missing required field: ${actualKey}`);
      }
      continue;
    }

    if (type === 'string' && typeof actualValue !== 'string') {
      errors.push(`Field ${actualKey} must be a string`);
    } else if (type === 'number' && typeof actualValue !== 'number') {
      errors.push(`Field ${actualKey} must be a number`);
    } else if (type === 'boolean' && typeof actualValue !== 'boolean') {
      errors.push(`Field ${actualKey} must be a boolean`);
    } else if (type === 'array' && !Array.isArray(actualValue)) {
      errors.push(`Field ${actualKey} must be an array`);
    } else if (typeof type === 'object' && !Array.isArray(type)) {
      const subResult = validate(actualValue, type);
      if (!subResult.success) {
        errors.push(...subResult.errors.map(e => `${actualKey}.${e}`));
      }
    }
  }

  return {
    success: errors.length === 0,
    errors
  };
}
