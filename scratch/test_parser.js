import { parseYaml } from '../dist/core/parsers/yaml-parser.js';

const yaml = `context: |
  Project: Kardenwort-mpv
# Note: this is a comment with a colon
schema: spec-driven
`;

try {
    const result = parseYaml(yaml);
    console.log('Result:', JSON.stringify(result, null, 2));
} catch (error) {
    console.error('Error:', error.message);
}
