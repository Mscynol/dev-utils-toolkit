import {
  unique,
  flatten,
  shuffle,
  groupBy,
  chunk,
  intersection,
  difference,
} from '../../src/js/array-utils.js';

describe('Array Utils', () => {
  describe('unique', () => {
    it('should remove duplicate values', () => {
      expect(unique([1, 2, 2, 3, 3, 3])).toEqual([1, 2, 3]);
      expect(unique(['a', 'b', 'a'])).toEqual(['a', 'b']);
    });

    it('should handle empty array', () => {
      expect(unique([])).toEqual([]);
    });

    it('should handle array with no duplicates', () => {
      expect(unique([1, 2, 3])).toEqual([1, 2, 3]);
    });
  });

  describe('flatten', () => {
    it('should flatten nested arrays', () => {
      expect(flatten([1, [2, 3], [4, [5]]])).toEqual([1, 2, 3, 4, 5]);
    });

    it('should respect depth parameter', () => {
      expect(flatten([1, [2, [3, [4]]]], 2)).toEqual([1, 2, 3, [4]]);
    });

    it('should handle empty array', () => {
      expect(flatten([])).toEqual([]);
    });
  });

  describe('chunk', () => {
    it('should split array into chunks', () => {
      expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
    });

    it('should handle empty array', () => {
      expect(chunk([], 2)).toEqual([]);
    });

    it('should handle chunk size larger than array', () => {
      expect(chunk([1, 2], 5)).toEqual([[1, 2]]);
    });
  });

  describe('groupBy', () => {
    it('should group by string key', () => {
      const data = [
        { type: 'a', val: 1 },
        { type: 'b', val: 2 },
        { type: 'a', val: 3 },
      ];
      expect(groupBy(data, 'type')).toEqual({
        a: [
          { type: 'a', val: 1 },
          { type: 'a', val: 3 },
        ],
        b: [{ type: 'b', val: 2 }],
      });
    });

    it('should group by function', () => {
      const data = [1, 2, 3, 4, 5];
      expect(groupBy(data, (n) => (n % 2 === 0 ? 'even' : 'odd'))).toEqual({
        odd: [1, 3, 5],
        even: [2, 4],
      });
    });
  });

  describe('intersection', () => {
    it('should return common elements', () => {
      expect(intersection([1, 2, 3], [2, 3, 4])).toEqual([2, 3]);
    });

    it('should handle multiple arrays', () => {
      expect(intersection([1, 2, 3], [2, 3, 4], [3, 4, 5])).toEqual([3]);
    });

    it('should return empty array for no common elements', () => {
      expect(intersection([1, 2], [3, 4])).toEqual([]);
    });
  });

  describe('difference', () => {
    it('should return elements in first array but not second', () => {
      expect(difference([1, 2, 3], [2, 3, 4])).toEqual([1]);
    });

    it('should handle empty arrays', () => {
      expect(difference([], [1, 2])).toEqual([]);
      expect(difference([1, 2], [])).toEqual([1, 2]);
    });
  });

  describe('shuffle', () => {
    it('should return array of same length', () => {
      const arr = [1, 2, 3, 4, 5];
      expect(shuffle(arr)).toHaveLength(arr.length);
    });

    it('should contain same elements', () => {
      const arr = [1, 2, 3, 4, 5];
      const shuffled = shuffle(arr);
      expect(shuffled.sort()).toEqual(arr.sort());
    });

    it('should not mutate original array', () => {
      const arr = [1, 2, 3];
      const original = [...arr];
      shuffle(arr);
      expect(arr).toEqual(original);
    });
  });
});
