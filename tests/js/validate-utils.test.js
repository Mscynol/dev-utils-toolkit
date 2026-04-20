import {
  isEmail,
  isPhone,
  isIdCard,
  isUrl,
} from '../../src/js/validate-utils.js';

describe('Validate Utils', () => {
  describe('isEmail', () => {
    it('should validate correct emails', () => {
      expect(isEmail('test@example.com')).toBe(true);
      expect(isEmail('user.name@domain.co.uk')).toBe(true);
      expect(isEmail('user+tag@example.org')).toBe(true);
    });

    it('should reject invalid emails', () => {
      expect(isEmail('')).toBe(false);
      expect(isEmail('invalid')).toBe(false);
      expect(isEmail('@example.com')).toBe(false);
      expect(isEmail('test@')).toBe(false);
      expect(isEmail('test@.com')).toBe(false);
    });
  });

  describe('isPhone', () => {
    it('should validate Chinese mobile numbers', () => {
      expect(isPhone('13800138000')).toBe(true);
      expect(isPhone('15912345678')).toBe(true);
      expect(isPhone('18687654321')).toBe(true);
    });

    it('should reject invalid phone numbers', () => {
      expect(isPhone('')).toBe(false);
      expect(isPhone('12345678901')).toBe(false);
      expect(isPhone('1380013800')).toBe(false);
      expect(isPhone('138001380000')).toBe(false);
      expect(isPhone('abcdefghij')).toBe(false);
    });
  });

  describe('isIdCard', () => {
    it('should validate 18-digit ID cards', () => {
      expect(isIdCard('110101199001011234')).toBe(true);
      expect(isIdCard('310101198505152345')).toBe(true);
    });

    it('should validate ID cards with X', () => {
      expect(isIdCard('11010119900101123X')).toBe(true);
    });

    it('should reject invalid ID cards', () => {
      expect(isIdCard('')).toBe(false);
      expect(isIdCard('1234567890')).toBe(false);
      expect(isIdCard('11010119900101123')).toBe(false);
      expect(isIdCard('11010119900101123Y')).toBe(false);
    });
  });

  describe('isUrl', () => {
    it('should validate correct URLs', () => {
      expect(isUrl('https://example.com')).toBe(true);
      expect(isUrl('http://example.com')).toBe(true);
      expect(isUrl('https://sub.domain.co.uk/path')).toBe(true);
      expect(isUrl('https://example.com:8080/path?query=1')).toBe(true);
    });

    it('should reject invalid URLs', () => {
      expect(isUrl('')).toBe(false);
      expect(isUrl('not-a-url')).toBe(false);
      expect(isUrl('ftp://example.com')).toBe(false);
    });
  });
});
