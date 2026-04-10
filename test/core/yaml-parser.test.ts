import { describe, it, expect } from 'vitest';
import { parseYaml, stringifyYaml } from '../../src/core/parsers/yaml-parser.js';

describe('yaml-parser', () => {
  describe('parseYaml', () => {
    it('should parse simple key-value pairs', () => {
      const input = 'name: openspec\nversion: 1.0';
      const result = parseYaml(input);
      expect(result.name).toBe('openspec');
      expect(result.version).toBe(1.0);
    });

    it('should parse nested objects', () => {
      const input = 'proxy:\n  host: localhost\n  port: 8080';
      const result = parseYaml(input);
      expect(result.proxy.host).toBe('localhost');
      expect(result.proxy.port).toBe(8080);
    });

    it('should parse arrays of scalars', () => {
      const input = 'tags:\n  - simple\n  - fast';
      const result = parseYaml(input);
      expect(result.tags).toEqual(['simple', 'fast']);
    });

    it('should parse block scalars and preserve internal line breaks', () => {
      const input = 'description: |\n  Line 1\n  Line 2\n\n  Line 4';
      const result = parseYaml(input);
      // The parser adds a trailing newline and join with newlines
      expect(result.description).toBe('Line 1\nLine 2\n\nLine 4\n');
    });

    it('should throw on invalid format (no colon or dash)', () => {
      const input = 'invalid line without colon';
      expect(() => parseYaml(input)).toThrow('Invalid YAML format at line');
    });

    it('should parse JSON-style arrays', () => {
      const input = 'list: [a, b, c]';
      const result = parseYaml(input);
      expect(result.list).toEqual(['a', 'b', 'c']);
    });
  });

  describe('stringifyYaml', () => {
    it('should stringify simple objects', () => {
      const obj = { name: 'openspec', version: 1.0 };
      const result = stringifyYaml(obj);
      expect(result).toBe('name: openspec\nversion: 1\n');
    });

    it('should stringify nested objects', () => {
      const obj = { proxy: { host: 'localhost' } };
      const result = stringifyYaml(obj);
      expect(result).toBe('proxy:\n  host: localhost\n');
    });
  });

  describe('roundtrip', () => {
    it('should achieve roundtrip for representative input', () => {
      const input = 'name: openspec\nproxy:\n  host: localhost\n';
      const parsed = parseYaml(input);
      const stringified = stringifyYaml(parsed);
      expect(stringified).toBe(input);
    });
  });
});
