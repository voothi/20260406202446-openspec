/**
 * Zero-dependency schema validator.
 * Replaces 'zod' for simple object structure validation.
 * 
 * Supported Schema DSL:
 * - 'string', 'number', 'boolean', 'array': Primitive type checks
 * - 'regex:<pattern>': String must match the provided regex pattern
 * - [itemSchema]: Array where every item matches itemSchema
 * - { key: schema }: Object with required key matching schema
 * - { 'key?': schema }: Object with optional key matching schema
 * - { '*': schema }: Wildcard object where every value matches schema
 * - (val) => ValidationResult: Custom function validator
 */
export interface ValidationResult {
  success: boolean;
  errors: string[];
}

export function validate(obj: any, schema: any): ValidationResult {
  // Handle null/undefined values to validate against
  if (obj === null || obj === undefined) {
    return { success: false, errors: ['Value is null or undefined'] };
  }

  // Handle function schemas (custom validation logic)
  if (typeof schema === 'function') {
    return schema(obj);
  }

  // Handle primitive schemas (strings, numbers, etc.)
  if (typeof schema === 'string') {
    if (schema.startsWith('regex:')) {
      const pattern = schema.slice(6);
      if (typeof obj !== 'string' || !new RegExp(pattern).test(obj)) {
        return { success: false, errors: [`must match regex ${pattern}`] };
      }
      return { success: true, errors: [] };
    }
    if (schema === 'string' && typeof obj !== 'string') return { success: false, errors: ['must be a string'] };
    if (schema === 'number' && typeof obj !== 'number') return { success: false, errors: ['must be a number'] };
    if (schema === 'boolean' && typeof obj !== 'boolean') return { success: false, errors: ['must be a boolean'] };
    if (schema === 'array' && !Array.isArray(obj)) return { success: false, errors: ['must be an array'] };
    return { success: true, errors: [] };
  }

  // Handle array schemas [itemSchema]
  if (Array.isArray(schema)) {
    if (!Array.isArray(obj)) return { success: false, errors: ['must be an array'] };
    const errors: string[] = [];
    if (schema.length > 0) {
      const itemSchema = schema[0];
      for (let i = 0; i < obj.length; i++) {
        const itemResult = validate(obj[i], itemSchema);
        if (!itemResult.success) {
          errors.push(...itemResult.errors.map(e => `[${i}].${e}`));
        }
      }
    }
    return { success: errors.length === 0, errors };
  }

  // Handle object schemas
  const errors: string[] = [];
  if (!obj || typeof obj !== 'object') {
    return { success: false, errors: ['is not an object'] };
  }

  // Handle wildcard object schemas { '*': type }
  if (schema['*']) {
    const itemType = schema['*'];
    for (const [key, val] of Object.entries(obj)) {
      const subResult = validate(val, itemType);
      if (!subResult.success) {
        errors.push(...subResult.errors.map(e => `${key}${e.startsWith('[') ? '' : '.'}${e}`));
      }
    }
    return { success: errors.length === 0, errors };
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

    const subResult = validate(actualValue, type);
    if (!subResult.success) {
      errors.push(...subResult.errors.map(e => `${actualKey}${e.startsWith('[') ? '' : '.'}${e}`));
    }
  }

  return {
    success: errors.length === 0,
    errors
  };
}
