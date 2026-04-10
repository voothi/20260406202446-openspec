import { Requirement, RequirementSchema } from './base.schema.js';

/**
 * Zero-dependency change schemas.
 */
export type DeltaOperation = 'ADDED' | 'MODIFIED' | 'REMOVED' | 'RENAMED';

export const DeltaSchema = {
  spec: 'string',
  operation: 'string',
  description: 'string',
  'requirement?': RequirementSchema,
  'requirements?': [RequirementSchema],
  'rename?': {
    from: 'string',
    to: 'string',
  },
};

import { validate } from '../validate.js';
import { 
  VALIDATION_MESSAGES, 
  MIN_WHY_SECTION_LENGTH, 
  MAX_DELTAS_PER_CHANGE 
} from '../validation/constants.js';

export const ChangeSchema = (val: any) => {
  const basic = validate(val, {
    name: 'string',
    why: 'string',
    whatChanges: 'string',
    deltas: [DeltaSchema],
    'metadata?': {
      version: 'string',
      format: 'string',
      'sourcePath?': 'string',
    },
  });
  if (!basic.success) return basic;

  const errors: string[] = [];
  if (val.why.length < MIN_WHY_SECTION_LENGTH) {
    errors.push(VALIDATION_MESSAGES.CHANGE_WHY_TOO_SHORT);
  }
  if (val.deltas.length === 0) {
    errors.push(VALIDATION_MESSAGES.CHANGE_NO_DELTAS);
  }
  if (val.deltas.length > MAX_DELTAS_PER_CHANGE) {
    errors.push(VALIDATION_MESSAGES.CHANGE_TOO_MANY_DELTAS);
  }

  return { success: errors.length === 0, errors };
};

export interface Delta {
  spec: string;
  operation: DeltaOperation;
  description: string;
  requirement?: Requirement;
  requirements?: Requirement[];
  rename?: {
    from: string;
    to: string;
  };
}

export interface Change {
  name: string;
  why: string;
  whatChanges: string;
  deltas: Delta[];
  metadata?: {
    version: string;
    format: 'openspec-change';
    sourcePath?: string;
  };
}