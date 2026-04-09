import { Requirement, RequirementSchema } from './base.schema.js';

/**
 * Zero-dependency spec schema.
 */
import { validate } from '../validate.js';
import { VALIDATION_MESSAGES } from '../validation/constants.js';

export const SpecSchema = (val: any) => {
  const basic = validate(val, {
    name: 'string',
    overview: 'string',
    requirements: [RequirementSchema],
    'metadata?': {
      version: 'string',
      format: 'string',
      'sourcePath?': 'string',
    },
  });
  if (!basic.success) return basic;

  if (val.requirements.length === 0) {
    return { success: false, errors: [VALIDATION_MESSAGES.SPEC_NO_REQUIREMENTS] };
  }
  return { success: true, errors: [] };
};

export interface Spec {
  name: string;
  overview: string;
  requirements: Requirement[];
  metadata?: {
    version: string;
    format: 'openspec';
    sourcePath?: string;
  };
}