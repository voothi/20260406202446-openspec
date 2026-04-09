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
  'requirements?': 'array',
  'rename?': {
    from: 'string',
    to: 'string',
  },
};

export const ChangeSchema = {
  name: 'string',
  why: 'string',
  whatChanges: 'string',
  deltas: 'array',
  'metadata?': {
    version: 'string',
    format: 'string',
    'sourcePath?': 'string',
  },
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