import {
  mask,
  randomCode,
  camelCase,
  kebabCase,
  truncate,
} from '../../src/js/string-utils.js';

describe('String Utils', () => {
  describe('mask', () => {
    it('should mask phone number', () => {
      expect(mask('13800138000', 3, 4)).toBe('138****8000');
    });

    it('should mask id card', () => {
      expect(mask('110101199001011234', 4, 4)).toBe('1101**********1234');
    });

    it('should use custom mask char', () => {
      expect(mask('123456', 2, 2, '#')).toBe('12##56');
    });

    it('should handle empty string', () => {
      expect(mask('', 1, 1)).toBe('');
    });
  });

  describe('randomCode', () => {
    it('should generate code of correct length', () => {
      expect(randomCode(6)).toHaveLength(6);
      expect(randomCode(4)).toHaveLength(4);
    });

    it('should generate digits only by default', () => {
      const code = randomCode(10);
      expect(code).toMatch(/^\d+$/);
    });

    it('should generate mixed code when specified', () => {
      const code = randomCode(10, 'mixed');
      expect(code).toMatch(/^[a-zA-Z0-9]+$/);
    });

    it('should generate different codes', () => {
      const code1 = randomCode(6);
      const code2 = randomCode(6);
      expect(code1).not.toBe(code2);
    });
  });

  describe('camelCase', () => {
    it('should convert kebab-case to camelCase', () => {
      expect(camelCase('hello-world')).toBe('helloWorld');
    });

    it('should convert snake_case to camelCase', () => {
      expect(camelCase('hello_world')).toBe('helloWorld');
    });

    it('should handle multiple words', () => {
      expect(camelCase('hello-world-foo-bar')).toBe('helloWorldFooBar');
    });
  });

  describe('kebabCase', () => {
    it('should convert camelCase to kebab-case', () => {
      expect(kebabCase('helloWorld')).toBe('hello-world');
    });

    it('should convert PascalCase to kebab-case', () => {
      expect(kebabCase('HelloWorld')).toBe('hello-world');
    });

    it('should handle multiple words', () => {
      expect(kebabCase('helloWorldFooBar')).toBe('hello-world-foo-bar');
    });
  });

  describe('truncate', () => {
    it('should truncate long strings', () => {
      expect(truncate('hello world', 8)).toBe('hello...');
    });

    it('should not truncate short strings', () => {
      expect(truncate('hello', 10)).toBe('hello');
    });

    it('should use custom suffix', () => {
      expect(truncate('hello world', 8, '---')).toBe('hello---');
    });
  });
});
