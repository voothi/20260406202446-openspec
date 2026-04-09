import { readdirSync, statSync } from 'fs';
import { join } from 'path';

export interface WalkOptions {
  recursive?: boolean;
  pattern?: string | null;
}

/**
 * Zero-dependency recursive file walker.
 * Replaces 'fast-glob' for simple use cases.
 */
export function walk(dir: string, options: WalkOptions = {}): string[] {
  const { recursive = true, pattern = null } = options;
  const results: string[] = [];
  
  try {
    const list = readdirSync(dir);

    for (const file of list) {
        const filePath = join(dir, file);
        const stat = statSync(filePath);

        if (stat && stat.isDirectory()) {
            if (recursive) {
                results.push(...walk(filePath, { recursive, pattern }));
            }
        } else {
            // Simple glob-to-regex conversion for basic matching
            const regexPattern = pattern
                .replace(/\*\*\//g, '(?:.*/)?')
                .replace(/\*\*/g, '.*')
                .replace(/\//g, '[\\\\/]+')
                .replace(/\*/g, '[^\\\\/]*');
            
            if (!pattern || new RegExp(regexPattern).test(filePath)) {
                results.push(filePath.replace(/\\/g, '/'));
            }
        }
    }
  } catch (error) {
    // Gracefully handle missing directories
  }

  return results;
}
