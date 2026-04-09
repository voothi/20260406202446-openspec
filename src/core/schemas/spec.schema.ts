import { Requirement, RequirementSchema } from './base.schema.js';

/**
 * Zero-dependency spec schema.
 */
export const SpecSchema = {
  name: 'string',
  overview: 'string',
  requirements: 'array',
  'metadata?': {
    version: 'string',
    format: 'string',
    'sourcePath?': 'string',
  },
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