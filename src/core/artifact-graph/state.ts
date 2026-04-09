import * as fs from 'node:fs';
import * as path from 'node:path';
import { walk } from '../fs-utils.js';
import type { CompletedSet } from './types.js';
import type { ArtifactGraph } from './graph.js';
import { FileSystemUtils } from '../../utils/file-system.js';

/**
 * Detects which artifacts are completed by checking file existence in the change directory.
 * Returns a Set of completed artifact IDs.
 *
 * @param graph - The artifact graph to check
 * @param changeDir - The change directory to scan for files
 * @returns Set of artifact IDs whose generated files exist
 */
export function detectCompleted(graph: ArtifactGraph, changeDir: string): CompletedSet {
  const completed = new Set<string>();

  // Handle missing change directory gracefully
  if (!fs.existsSync(changeDir)) {
    return completed;
  }

  for (const artifact of graph.getAllArtifacts()) {
    if (isArtifactComplete(artifact.generates, changeDir)) {
      completed.add(artifact.id);
    }
  }

  return completed;
}

/**
 * Checks if an artifact is complete by checking if its generated file(s) exist.
 * Supports both simple paths and glob patterns.
 */
function isArtifactComplete(generates: string, changeDir: string): boolean {
  // Check if it's a glob pattern
  if (isGlobPattern(generates)) {
    return hasGlobMatches(changeDir, generates);
  }

  const fullPath = path.join(changeDir, generates);

  // Simple file path - check if file exists
  return fs.existsSync(fullPath);
}

/**
 * Checks if a path contains glob pattern characters.
 */
function isGlobPattern(pattern: string): boolean {
  return pattern.includes('*') || pattern.includes('?') || pattern.includes('[');
}

/**
 * Checks if a glob pattern has any matches.
 * Normalizes Windows backslashes to forward slashes for cross-platform glob compatibility.
 */
function hasGlobMatches(changeDir: string, pattern: string): boolean {
  const matches = walk(changeDir, { recursive: true, pattern });
  return matches.length > 0;
}
