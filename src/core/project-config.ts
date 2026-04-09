import { existsSync, readFileSync } from 'fs';
import path from 'path';
import { parseYaml } from './parsers/yaml-parser.js';

/**
 * Zero-dependency project configuration schema.
 */
export interface ProjectConfig {
  schema: string;
  context?: string;
  rules?: Record<string, string[]>;
}

const MAX_CONTEXT_SIZE = 50 * 1024; // 50KB hard limit

/**
 * Read and parse openspec/config.yaml from project root.
 * Uses resilient parsing - validates each field independently.
 *
 * @param projectRoot - The root directory of the project
 * @returns Parsed config or null if file doesn't exist
 */
export function readProjectConfig(projectRoot: string): ProjectConfig | null {
  // Try both .yaml and .yml, prefer .yaml
  let configPath = path.join(projectRoot, 'openspec', 'config.yaml');
  if (!existsSync(configPath)) {
    configPath = path.join(projectRoot, 'openspec', 'config.yml');
    if (!existsSync(configPath)) {
      return null;
    }
  }

  try {
    const content = readFileSync(configPath, 'utf-8');
    const raw = parseYaml(content);

    if (!raw || typeof raw !== 'object') {
      console.warn(`openspec/config.yaml is not a valid YAML object`);
      return null;
    }

    const config: Partial<ProjectConfig> = {};

    // Parse schema field
    if (typeof raw.schema === 'string' && raw.schema.trim().length > 0) {
      config.schema = raw.schema.trim();
    } else if (raw.schema !== undefined) {
      console.warn(`Invalid 'schema' field in config (must be non-empty string)`);
    }

    // Parse context field with size limit
    if (typeof raw.context === 'string') {
      const contextSize = Buffer.byteLength(raw.context, 'utf-8');
      if (contextSize > MAX_CONTEXT_SIZE) {
        console.warn(`Context too large (${(contextSize / 1024).toFixed(1)}KB, limit: ${MAX_CONTEXT_SIZE / 1024}KB)`);
        console.warn(`Ignoring context field`);
      } else {
        config.context = raw.context;
      }
    } else if (raw.context !== undefined) {
      console.warn(`Invalid 'context' field in config (must be string)`);
    }

    // Parse rules field
    if (typeof raw.rules === 'object' && raw.rules !== null && !Array.isArray(raw.rules)) {
      const parsedRules: Record<string, string[]> = {};
      let hasValidRules = false;

      for (const [artifactId, rules] of Object.entries(raw.rules)) {
        if (Array.isArray(rules)) {
          const validRules = rules.filter(r => typeof r === 'string' && r.trim().length > 0);
          if (validRules.length > 0) {
            parsedRules[artifactId] = validRules;
            hasValidRules = true;
          }
        } else {
          console.warn(`Rules for '${artifactId}' must be an array of strings`);
        }
      }

      if (hasValidRules) {
        config.rules = parsedRules;
      }
    } else if (raw.rules !== undefined) {
      console.warn(`Invalid 'rules' field in config (must be object)`);
    }

    return Object.keys(config).length > 0 ? (config as ProjectConfig) : null;
  } catch (error) {
    console.warn(`Failed to parse openspec/config.yaml:`, error);
    return null;
  }
}

export function validateConfigRules(
  rules: Record<string, string[]>,
  validArtifactIds: Set<string>,
  schemaName: string
): string[] {
  const warnings: string[] = [];

  for (const artifactId of Object.keys(rules)) {
    if (!validArtifactIds.has(artifactId)) {
      const validIds = Array.from(validArtifactIds).sort().join(', ');
      warnings.push(
        `Unknown artifact ID in rules: "${artifactId}". ` +
          `Valid IDs for schema "${schemaName}": ${validIds}`
      );
    }
  }

  return warnings;
}

export function suggestSchemas(
  invalidSchemaName: string,
  availableSchemas: { name: string; isBuiltIn: boolean }[]
): string {
  function levenshtein(a: string, b: string): number {
    const matrix: number[][] = [];
    for (let i = 0; i <= b.length; i++) matrix[i] = [i];
    for (let j = 0; j <= a.length; j++) matrix[0][j] = j;
    for (let i = 1; i <= b.length; i++) {
      for (let j = 1; j <= a.length; j++) {
        if (b.charAt(i - 1) === a.charAt(j - 1)) matrix[i][j] = matrix[i - 1][j - 1];
        else matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, matrix[i][j - 1] + 1, matrix[i - 1][j] + 1);
      }
    }
    return matrix[b.length][a.length];
  }

  const suggestions = availableSchemas
    .map((s) => ({ ...s, distance: levenshtein(invalidSchemaName, s.name) }))
    .filter((s) => s.distance <= 3)
    .sort((a, b) => a.distance - b.distance)
    .slice(0, 3);

  const builtIn = availableSchemas.filter((s) => s.isBuiltIn).map((s) => s.name);
  const projectLocal = availableSchemas.filter((s) => !s.isBuiltIn).map((s) => s.name);

  let message = `Schema '${invalidSchemaName}' not found in openspec/config.yaml\n\n`;

  if (suggestions.length > 0) {
    message += `Did you mean one of these?\n`;
    suggestions.forEach((s) => {
      const type = s.isBuiltIn ? 'built-in' : 'project-local';
      message += `  - ${s.name} (${type})\n`;
    });
    message += '\n';
  }

  message += `Available schemas:\n`;
  if (builtIn.length > 0) message += `  Built-in: ${builtIn.join(', ')}\n`;
  if (projectLocal.length > 0) message += `  Project-local: ${projectLocal.join(', ')}\n`;
  else message += `  Project-local: (none found)\n`;

  message += `\nFix: Edit openspec/config.yaml and change 'schema: ${invalidSchemaName}' to a valid schema name`;

  return message;
}
