/**
 * Zero-dependency types and schemas for the artifact graph.
 */

export interface Artifact {
  id: string;
  generates: string;
  description: string;
  template: string;
  instruction?: string;
  requires: string[];
}

export interface ApplyPhase {
  requires: string[];
  tracks?: string | null;
  instruction?: string;
}

export interface SchemaYaml {
  name: string;
  version: number;
  description?: string;
  artifacts: Artifact[];
  apply?: ApplyPhase;
}

export interface ChangeMetadata {
  schema: string;
  created?: string;
}

// Zero-dependency schema objects for use with validate()
export const ArtifactSchema = {
  id: 'string',
  generates: 'string',
  description: 'string',
  template: 'string',
  'instruction?': 'string',
  'requires?': 'array',
};

export const ApplyPhaseSchema = {
  requires: 'array',
  'tracks?': 'string',
  'instruction?': 'string',
};

export const SchemaYamlSchema = {
  name: 'string',
  version: 'number',
  'description?': 'string',
  artifacts: 'array',
  'apply?': ApplyPhaseSchema,
};

export const ChangeMetadataSchema = {
  schema: 'string',
  'created?': 'string',
};

// Runtime state types (internal only)
export type CompletedSet = Set<string>;

export interface BlockedArtifacts {
  [artifactId: string]: string[];
}
