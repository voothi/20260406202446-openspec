import { describe, it, expect } from 'vitest';
import { validate } from '../../src/core/validate.js';

describe('validate', () => {
  describe('primitives', () => {
    it('should validate string', () => {
      expect(validate('test', 'string').success).toBe(true);
      expect(validate(123, 'string').success).toBe(false);
    });

    it('should validate number', () => {
      expect(validate(123, 'number').success).toBe(true);
      expect(validate('123', 'number').success).toBe(false);
    });

    it('should validate boolean', () => {
      expect(validate(true, 'boolean').success).toBe(true);
      expect(validate('true', 'boolean').success).toBe(false);
    });

    it('should validate array primitive', () => {
      expect(validate([], 'array').success).toBe(true);
      expect(validate({}, 'array').success).toBe(false);
    });
  });

  describe('regex', () => {
    it('should validate regex', () => {
      const schema = 'regex:^\\d{3}$';
      expect(validate('123', schema).success).toBe(true);
      expect(validate('1234', schema).success).toBe(false);
      expect(validate('abc', schema).success).toBe(false);
    });
  });

  describe('arrays', () => {
    it('should validate array of primitives', () => {
      const schema = ['string'];
      expect(validate(['a', 'b'], schema).success).toBe(true);
      expect(validate(['a', 1], schema).success).toBe(false);
    });

    it('should validate array of objects', () => {
      const schema = [{ id: 'number' }];
      expect(validate([{ id: 1 }, { id: 2 }], schema).success).toBe(true);
      expect(validate([{ id: 1 }, { id: '2' }], schema).success).toBe(false);
    });
  });

  describe('objects', () => {
    it('should validate required and optional keys', () => {
      const schema = {
        name: 'string',
        'age?': 'number'
      };
      expect(validate({ name: 'Alice', age: 30 }, schema).success).toBe(true);
      expect(validate({ name: 'Bob' }, schema).success).toBe(true);
      expect(validate({ age: 30 }, schema).success).toBe(false);
    });

    it('should validate wildcard objects', () => {
      const schema = { '*': 'string' };
      expect(validate({ a: 'foo', b: 'bar' }, schema).success).toBe(true);
      expect(validate({ a: 'foo', b: 123 }, schema).success).toBe(false);
    });
  });

  describe('functions', () => {
    it('should validate using custom function', () => {
      const schema = (val: any) => {
        if (val === 'secret') return { success: true, errors: [] };
        return { success: false, errors: ['invalid secret'] };
      };
      expect(validate('secret', schema).success).toBe(true);
      expect(validate('public', schema).success).toBe(false);
    });
  });
});
