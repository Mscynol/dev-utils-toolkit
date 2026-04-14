/**
 * 数组工具库
 */

/**
 * 数组去重
 * @param {Array} arr
 * @returns {Array}
 */
export function unique(arr) {
  return [...new Set(arr)];
}

/**
 * 数组扁平化
 * @param {Array} arr
 * @param {number} depth
 * @returns {Array}
 */
export function flatten(arr, depth = Infinity) {
  return arr.flat(depth);
}

/**
 * 数组随机打乱（Fisher-Yates 算法）
 * @param {Array} arr
 * @returns {Array}
 */
export function shuffle(arr) {
  const newArr = [...arr];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}

/**
 * 按指定键对数组进行分组
 * @param {Array} arr
 * @param {string|Function} key
 * @returns {Object}
 */
export function groupBy(arr, key) {
  return arr.reduce((acc, item) => {
    const k = typeof key === 'function' ? key(item) : item[key];
    if (!acc[k]) acc[k] = [];
    acc[k].push(item);
    return acc;
  }, {});
}

/**
 * 数组求和
 * @param {Array<number>} arr
 * @returns {number}
 */
export function sum(arr) {
  return arr.reduce((total, cur) => total + cur, 0);
}

/**
 * 数组求平均值
 * @param {Array<number>} arr
 * @returns {number}
 */
export function avg(arr) {
  if (arr.length === 0) return 0;
  return sum(arr) / arr.length;
}

/**
 * 获取数组最大值
 * @param {Array<number>} arr
 * @returns {number}
 */
export function max(arr) {
  return Math.max(...arr);
}

/**
 * 获取数组最小值
 * @param {Array<number>} arr
 * @returns {number}
 */
export function min(arr) {
  return Math.min(...arr);
}

/**
 * 数组去重并保留首次出现的顺序
 * @param {Array} arr
 * @param {string|Function} key 用于对象数组去重的键或函数
 * @returns {Array}
 */
export function uniqueBy(arr, key) {
  if (!key) return unique(arr);

  const seen = new Set();
  return arr.filter(item => {
    const k = typeof key === 'function' ? key(item) : item[key];
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
}

/**
 * 计算数组中某元素出现次数
 * @param {Array} arr
 * @param {*} value
 * @returns {number}
 */
export function count(arr, value) {
  return arr.filter(item => item === value).length;
}

/**
 * 计算数组中各元素出现次数
 * @param {Array} arr
 * @returns {Object}
 */
export function countBy(arr) {
  return arr.reduce((acc, item) => {
    acc[item] = (acc[item] || 0) + 1;
    return acc;
  }, {});
}

/**
 * 获取数组中的众数（出现次数最多的元素）
 * @param {Array} arr
 * @returns {Array}
 */
export function mode(arr) {
  const counts = countBy(arr);
  const maxCount = Math.max(...Object.values(counts));
  return Object.keys(counts).filter(key => counts[key] === maxCount).map(k => isNaN(k) ? k : Number(k));
}

/**
 * 获取数组中的中位数
 * @param {Array<number>} arr
 * @returns {number}
 */
export function median(arr) {
  if (arr.length === 0) return 0;
  const sorted = [...arr].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0
    ? (sorted[mid - 1] + sorted[mid]) / 2
    : sorted[mid];
}

/**
 * 计算数组标准差
 * @param {Array<number>} arr
 * @returns {number}
 */
export function stdDev(arr) {
  if (arr.length === 0) return 0;
  const mean = avg(arr);
  const variance = arr.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / arr.length;
  return Math.sqrt(variance);
}

/**
 * 数组分块
 * @param {Array} arr
 * @param {number} size
 * @returns {Array}
 */
export function chunk(arr, size) {
  const result = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}

/**
 * 数组取差集（在 arr1 中但不在 arr2 中）
 * @param {Array} arr1
 * @param {Array} arr2
 * @returns {Array}
 */
export function difference(arr1, arr2) {
  const set2 = new Set(arr2);
  return arr1.filter(item => !set2.has(item));
}

/**
 * 数组取交集
 * @param {Array} arr1
 * @param {Array} arr2
 * @returns {Array}
 */
export function intersection(arr1, arr2) {
  const set2 = new Set(arr2);
  return arr1.filter(item => set2.has(item));
}

/**
 * 数组取并集
 * @param {Array} arr1
 * @param {Array} arr2
 * @returns {Array}
 */
export function union(arr1, arr2) {
  return [...new Set([...arr1, ...arr2])];
}

/**
 * 数组对称差集（只在其中一个数组中出现的元素）
 * @param {Array} arr1
 * @param {Array} arr2
 * @returns {Array}
 */
export function symmetricDifference(arr1, arr2) {
  const set1 = new Set(arr1);
  const set2 = new Set(arr2);
  return [...arr1.filter(x => !set2.has(x)), ...arr2.filter(x => !set1.has(x))];
}

/**
 * 移除数组中的假值（false, 0, '', null, undefined, NaN）
 * @param {Array} arr
 * @returns {Array}
 */
export function compact(arr) {
  return arr.filter(Boolean);
}

/**
 * 从数组头部移除 N 个元素
 * @param {Array} arr
 * @param {number} n
 * @returns {Array}
 */
export function drop(arr, n = 1) {
  return arr.slice(n);
}

/**
 * 从数组尾部移除 N 个元素
 * @param {Array} arr
 * @param {number} n
 * @returns {Array}
 */
export function dropRight(arr, n = 1) {
  return n === 0 ? [...arr] : arr.slice(0, -n);
}

/**
 * 使用条件函数移除数组头部元素
 * @param {Array} arr
 * @param {Function} predicate
 * @returns {Array}
 */
export function dropWhile(arr, predicate) {
  let index = arr.findIndex(item => !predicate(item));
  return index === -1 ? [] : arr.slice(index);
}

/**
 * 填充数组
 * @param {Array} arr
 * @param {*} value
 * @param {number} start
 * @param {number} end
 * @returns {Array}
 */
export function fill(arr, value, start = 0, end = arr.length) {
  const result = [...arr];
  for (let i = start; i < end; i++) {
    result[i] = value;
  }
  return result;
}

/**
 * 查找数组中第一个匹配条件的元素
 * @param {Array} arr
 * @param {Function} predicate
 * @returns {*}
 */
export function find(arr, predicate) {
  return arr.find(predicate);
}

/**
 * 查找数组中最后一个匹配条件的元素
 * @param {Array} arr
 * @param {Function} predicate
 * @returns {*}
 */
export function findLast(arr, predicate) {
  for (let i = arr.length - 1; i >= 0; i--) {
    if (predicate(arr[i], i, arr)) return arr[i];
  }
  return undefined;
}

/**
 * 查找数组中所有匹配条件的索引
 * @param {Array} arr
 * @param {Function} predicate
 * @returns {Array<number>}
 */
export function findIndexes(arr, predicate) {
  return arr.reduce((acc, item, index) => {
    if (predicate(item, index, arr)) acc.push(index);
    return acc;
  }, []);
}

/**
 * 获取数组的第一个元素
 * @param {Array} arr
 * @returns {*}
 */
export function first(arr) {
  return arr[0];
}

/**
 * 获取数组的最后一个元素
 * @param {Array} arr
 * @returns {*}
 */
export function last(arr) {
  return arr[arr.length - 1];
}

/**
 * 获取指定索引的元素，支持负索引
 * @param {Array} arr
 * @param {number} index
 * @returns {*}
 */
export function nth(arr, index) {
  const idx = index >= 0 ? index : arr.length + index;
  return arr[idx];
}

/**
 * 将数组按指定条件分区
 * @param {Array} arr
 * @param {Function} predicate
 * @returns {Array}
 */
export function partition(arr, predicate) {
  return arr.reduce((acc, item) => {
    acc[predicate(item) ? 0 : 1].push(item);
    return acc;
  }, [[], []]);
}

/**
 * 从数组中随机抽取一个元素
 * @param {Array} arr
 * @returns {*}
 */
export function sample(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * 从数组中随机抽取 N 个元素
 * @param {Array} arr
 * @param {number} n
 * @returns {Array}
 */
export function sampleSize(arr, n = 1) {
  const shuffled = shuffle(arr);
  return shuffled.slice(0, n);
}

/**
 * 按指定键对对象数组进行排序
 * @param {Array} arr
 * @param {string} key
 * @param {string} order asc|desc
 * @returns {Array}
 */
export function sortBy(arr, key, order = 'asc') {
  const sorted = [...arr].sort((a, b) => {
    if (a[key] < b[key]) return -1;
    if (a[key] > b[key]) return 1;
    return 0;
  });
  return order === 'desc' ? sorted.reverse() : sorted;
}

/**
 * 按多个条件对对象数组进行排序
 * @param {Array} arr
 * @param {Array<{key: string, order: string}>} criteria
 * @returns {Array}
 */
export function orderBy(arr, criteria) {
  return [...arr].sort((a, b) => {
    for (const { key, order = 'asc' } of criteria) {
      if (a[key] < b[key]) return order === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return order === 'asc' ? 1 : -1;
    }
    return 0;
  });
}

/**
 * 获取两个数组中都有的元素（根据指定键比较）
 * @param {Array<Object>} arr1
 * @param {Array<Object>} arr2
 * @param {string} key
 * @returns {Array}
 */
export function intersectionBy(arr1, arr2, key) {
  const keys2 = new Set(arr2.map(item => item[key]));
  return arr1.filter(item => keys2.has(item[key]));
}

/**
 * 比较两个数组是否相等（深度比较）
 * @param {Array} arr1
 * @param {Array} arr2
 * @returns {boolean}
 */
export function isEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) return false;
  return arr1.every((item, index) => {
    if (Array.isArray(item) && Array.isArray(arr2[index])) {
      return isEqual(item, arr2[index]);
    }
    if (typeof item === 'object' && item !== null && typeof arr2[index] === 'object' && arr2[index] !== null) {
      return JSON.stringify(item) === JSON.stringify(arr2[index]);
    }
    return item === arr2[index];
  });
}

/**
 * 将数组转换为对象
 * @param {Array} arr
 * @param {string|Function} key
 * @returns {Object}
 */
export function keyBy(arr, key) {
  return arr.reduce((acc, item) => {
    const k = typeof key === 'function' ? key(item) : item[key];
    acc[k] = item;
    return acc;
  }, {});
}

/**
 * 提取对象数组中指定键的值
 * @param {Array<Object>} arr
 * @param {string} key
 * @returns {Array}
 */
export function pluck(arr, key) {
  return arr.map(item => item[key]);
}

/**
 * 数组轮询 - 循环遍历数组
 * @param {Array} arr
 * @param {Function} callback
 */
export function rotate(arr, callback, interval = 1000) {
  let index = 0;
  const timer = setInterval(() => {
    callback(arr[index], index);
    index = (index + 1) % arr.length;
  }, interval);
  return () => clearInterval(timer);
}

/**
 * 移动数组元素到指定位置
 * @param {Array} arr
 * @param {number} fromIndex
 * @param {number} toIndex
 * @returns {Array}
 */
export function move(arr, fromIndex, toIndex) {
  const result = [...arr];
  const [removed] = result.splice(fromIndex, 1);
  result.splice(toIndex, 0, removed);
  return result;
}

/**
 * 交换数组中两个元素的位置
 * @param {Array} arr
 * @param {number} index1
 * @param {number} index2
 * @returns {Array}
 */
export function swap(arr, index1, index2) {
  const result = [...arr];
  [result[index1], result[index2]] = [result[index2], result[index1]];
  return result;
}

/**
 * 在指定位置插入元素
 * @param {Array} arr
 * @param {number} index
 * @param {...*} elements
 * @returns {Array}
 */
export function insert(arr, index, ...elements) {
  const result = [...arr];
  result.splice(index, 0, ...elements);
  return result;
}

/**
 * 在指定位置删除元素
 * @param {Array} arr
 * @param {number} index
 * @param {number} count
 * @returns {Array}
 */
export function removeAt(arr, index, count = 1) {
  const result = [...arr];
  result.splice(index, count);
  return result;
}

/**
 * 删除数组中匹配条件的所有元素
 * @param {Array} arr
 * @param {Function} predicate
 * @returns {Array}
 */
export function remove(arr, predicate) {
  return arr.filter((item, index) => !predicate(item, index, arr));
}

/**
 * 获取数组中的所有唯一值（递归处理嵌套数组）
 * @param {Array} arr
 * @returns {Array}
 */
export function deepUnique(arr) {
  const result = [];
  const seen = new Set();

  const traverse = (item) => {
    if (Array.isArray(item)) {
      item.forEach(traverse);
    } else {
      const key = typeof item === 'object' ? JSON.stringify(item) : item;
      if (!seen.has(key)) {
        seen.add(key);
        result.push(item);
      }
    }
  };

  traverse(arr);
  return result;
}

/**
 * 计算数组累计和
 * @param {Array<number>} arr
 * @returns {Array<number>}
 */
export function cumulativeSum(arr) {
  let sum = 0;
  return arr.map(val => sum += val);
}

/**
 * 计算数组累计乘积
 * @param {Array<number>} arr
 * @returns {Array<number>}
 */
export function cumulativeProduct(arr) {
  let product = 1;
  return arr.map(val => product *= val);
}

/**
 * 计算数组中元素的排名
 * @param {Array<number>} arr
 * @param {boolean} ascending
 * @returns {Array<number>}
 */
export function rank(arr, ascending = true) {
  const sorted = [...arr].map((val, idx) => ({ val, idx })).sort((a, b) =>
    ascending ? a.val - b.val : b.val - a.val
  );
  const ranks = new Array(arr.length);
  sorted.forEach((item, rank) => {
    ranks[item.idx] = rank + 1;
  });
  return ranks;
}

/**
 * 滑动窗口遍历数组
 * @param {Array} arr
 * @param {number} size
 * @param {Function} callback
 */
export function slidingWindow(arr, size, callback) {
  for (let i = 0; i <= arr.length - size; i++) {
    callback(arr.slice(i, i + size), i);
  }
}

/**
 * 判断数组是否有序
 * @param {Array} arr
 * @param {string} order asc|desc
 * @returns {boolean}
 */
export function isSorted(arr, order = 'asc') {
  for (let i = 1; i < arr.length; i++) {
    if (order === 'asc' && arr[i] < arr[i - 1]) return false;
    if (order === 'desc' && arr[i] > arr[i - 1]) return false;
  }
  return true;
}

/**
 * 二分查找
 * @param {Array} arr 已排序数组
 * @param {*} target
 * @returns {number}
 */
export function binarySearch(arr, target) {
  let left = 0, right = arr.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}

/**
 * 获取数组的所有排列
 * @param {Array} arr
 * @returns {Array}
 */
export function permutations(arr) {
  if (arr.length <= 1) return [arr];
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    const current = arr[i];
    const remaining = [...arr.slice(0, i), ...arr.slice(i + 1)];
    const perms = permutations(remaining);
    for (const perm of perms) {
      result.push([current, ...perm]);
    }
  }
  return result;
}

/**
 * 获取数组的所有组合
 * @param {Array} arr
 * @param {number} k
 * @returns {Array}
 */
export function combinations(arr, k) {
  if (k === 0) return [[]];
  if (arr.length < k) return [];
  if (arr.length === k) return [arr];

  const [first, ...rest] = arr;
  const withFirst = combinations(rest, k - 1).map(comb => [first, ...comb]);
  const withoutFirst = combinations(rest, k);
  return [...withFirst, ...withoutFirst];
}

/**
 * 获取数组最后一个元素的索引
 * @param {Array} arr
 * @param {Function} predicate
 * @returns {number}
 */
export function findLastIndex(arr, predicate) {
  for (let i = arr.length - 1; i >= 0; i--) {
    if (predicate(arr[i], i, arr)) return i;
  }
  return -1;
}

/**
 * 获取数组所有唯一值（根据指定键）
 * @param {Array} arr
 * @param {string|Function} key
 * @returns {Array}
 */
export function uniqBy(arr, key) {
  return uniqueBy(arr, key);
}

/**
 * 数组转对象（根据指定键值对）
 * @param {Array} arr
 * @param {string} keyProp
 * @param {string} valueProp
 * @returns {Object}
 */
export function toObject(arr, keyProp, valueProp) {
  return arr.reduce((acc, item) => {
    acc[item[keyProp]] = item[valueProp];
    return acc;
  }, {});
}

/**
 * 按指定属性合并多个数组
 * @param {string} key
 * @param {...Array} arrays
 * @returns {Array}
 */
export function mergeBy(key, ...arrays) {
  const map = new Map();
  arrays.forEach(arr => {
    arr.forEach(item => {
      const k = item[key];
      if (map.has(k)) {
        map.set(k, { ...map.get(k), ...item });
      } else {
        map.set(k, { ...item });
      }
    });
  });
  return Array.from(map.values());
}

/**
 * 数组求积
 * @param {Array<number>} arr
 * @returns {number}
 */
export function product(arr) {
  if (arr.length === 0) return 0;
  return arr.reduce((acc, val) => acc * val, 1);
}

/**
 * 获取数组中最大元素的索引
 * @param {Array<number>} arr
 * @returns {number}
 */
export function maxIndex(arr) {
  if (arr.length === 0) return -1;
  let maxIdx = 0;
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > arr[maxIdx]) maxIdx = i;
  }
  return maxIdx;
}

/**
 * 获取数组中最小元素的索引
 * @param {Array<number>} arr
 * @returns {number}
 */
export function minIndex(arr) {
  if (arr.length === 0) return -1;
  let minIdx = 0;
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < arr[minIdx]) minIdx = i;
  }
  return minIdx;
}

/**
 * 获取数组的极差（最大值 - 最小值）
 * @param {Array<number>} arr
 * @returns {number}
 */
export function range(arr) {
  if (arr.length === 0) return 0;
  return Math.max(...arr) - Math.min(...arr);
}

/**
 * 计算数组的变异系数（标准差/平均值）
 * @param {Array<number>} arr
 * @returns {number}
 */
export function coefficientOfVariation(arr) {
  if (arr.length === 0 || avg(arr) === 0) return 0;
  return stdDev(arr) / avg(arr);
}

/**
 * 获取数组中连续的子数组
 * @param {Array} arr
 * @param {Function} predicate
 * @returns {Array<Array>}
 */
export function consecutive(arr, predicate) {
  const result = [];
  let current = [];

  arr.forEach((item, index) => {
    if (predicate(item, index)) {
      current.push(item);
    } else {
      if (current.length > 0) {
        result.push(current);
        current = [];
      }
    }
  });

  if (current.length > 0) {
    result.push(current);
  }

  return result;
}

/**
 * 数组拉链操作
 * @param {...Array} arrays
 * @returns {Array}
 */
export function zip(...arrays) {
  const minLength = Math.min(...arrays.map(arr => arr.length));
  return Array.from({ length: minLength }, (_, i) =>
    arrays.map(arr => arr[i])
  );
}

/**
 * 数组反拉链操作
 * @param {Array<Array>} arr
 * @returns {Array<Array>}
 */
export function unzip(arr) {
  if (arr.length === 0) return [];
  const maxLength = Math.max(...arr.map(sub => sub.length));
  return Array.from({ length: maxLength }, (_, i) =>
    arr.map(sub => sub[i])
  );
}

/**
 * 数组展平一级并映射
 * @param {Array} arr
 * @param {Function} callback
 * @returns {Array}
 */
export function flatMap(arr, callback) {
  return arr.flatMap(callback);
}

/**
 * 填充数组指定值
 * @param {*} value
 * @param {number} length
 * @returns {Array}
 */
export function fillArray(value, length) {
  return Array(length).fill(value);
}

/**
 * 生成数字范围数组
 * @param {number} start
 * @param {number} end
 * @param {number} step
 * @returns {Array<number>}
 */
export function rangeArray(start, end, step = 1) {
  const result = [];
  for (let i = start; step > 0 ? i < end : i > end; i += step) {
    result.push(i);
  }
  return result;
}

/**
 * 判断数组是否包含所有指定元素
 * @param {Array} arr
 * @param {Array} values
 * @returns {boolean}
 */
export function includesAll(arr, values) {
  const set = new Set(arr);
  return values.every(v => set.has(v));
}

/**
 * 判断数组是否包含任意指定元素
 * @param {Array} arr
 * @param {Array} values
 * @returns {boolean}
 */
export function includesAny(arr, values) {
  const set = new Set(arr);
  return values.some(v => set.has(v));
}

/**
 * 获取数组中不匹配条件的元素
 * @param {Array} arr
 * @param {Array} values
 * @returns {Array}
 */
export function differenceWith(arr, values, comparator) {
  return arr.filter(a => !values.some(b => comparator(a, b)));
}

/**
 * 通过比较器去重
 * @param {Array} arr
 * @param {Function} comparator
 * @returns {Array}
 */
export function uniqueWith(arr, comparator) {
  return arr.filter((item, index, self) =>
    index === self.findIndex(other => comparator(item, other))
  );
}

/**
 * 获取数组的笛卡尔积
 * @param {...Array} arrays
 * @returns {Array}
 */
export function cartesianProduct(...arrays) {
  return arrays.reduce((a, b) =>
    a.flatMap(d => b.map(e => [...d, e])),
    [[]]
  );
}

/**
 * 将数组分割为多个小数组
 * @param {Array} arr
 * @param {number} count 分割成多少份
 * @returns {Array<Array>}
 */
export function split(arr, count) {
  const size = Math.ceil(arr.length / count);
  return chunk(arr, size);
}

/**
 * 并行遍历多个数组
 * @param {Function} callback
 * @param {...Array} arrays
 * @returns {Array}
 */
export function zipWith(callback, ...arrays) {
  const minLength = Math.min(...arrays.map(arr => arr.length));
  return Array.from({ length: minLength }, (_, i) =>
    callback(...arrays.map(arr => arr[i]))
  );
}

/**
 * 获取数组前缀和
 * @param {Array<number>} arr
 * @returns {Array<number>}
 */
export function prefixSum(arr) {
  return cumulativeSum(arr);
}

/**
 * 对数组进行归约，从右向左
 * @param {Array} arr
 * @param {Function} callback
 * @param {*} initialValue
 * @returns {*}
 */
export function reduceRight(arr, callback, initialValue) {
  return arr.reduceRight(callback, initialValue);
}

/**
 * 获取数组的加权平均值
 * @param {Array<number>} arr
 * @param {Array<number>} weights
 * @returns {number}
 */
export function weightedAverage(arr, weights) {
  if (arr.length !== weights.length) throw new Error('数组长度不匹配');
  const weightedSum = arr.reduce((sum, val, i) => sum + val * weights[i], 0);
  const weightSum = weights.reduce((sum, w) => sum + w, 0);
  return weightSum === 0 ? 0 : weightedSum / weightSum;
}

/**
 * 获取数组的移动平均
 * @param {Array<number>} arr
 * @param {number} period
 * @returns {Array<number>}
 */
export function movingAverage(arr, period) {
  const result = [];
  for (let i = period - 1; i < arr.length; i++) {
    const sum = arr.slice(i - period + 1, i + 1).reduce((a, b) => a + b, 0);
    result.push(sum / period);
  }
  return result;
}

/**
 * 计算数组的百分位数
 * @param {Array<number>} arr
 * @param {number} percentile 0-100
 * @returns {number}
 */
export function percentile(arr, percentile) {
  if (arr.length === 0) return 0;
  const sorted = [...arr].sort((a, b) => a - b);
  const index = (percentile / 100) * (sorted.length - 1);
  const lower = Math.floor(index);
  const upper = Math.ceil(index);
  const weight = index - lower;
  return sorted[lower] * (1 - weight) + sorted[upper] * weight;
}

/**
 * 计算数组的四分位数
 * @param {Array<number>} arr
 * @returns {Object}
 */
export function quartiles(arr) {
  return {
    q1: percentile(arr, 25),
    q2: percentile(arr, 50),
    q3: percentile(arr, 75)
  };
}

/**
 * 计算数组的峰值数量
 * @param {Array<number>} arr
 * @returns {number}
 */
export function countPeaks(arr) {
  let count = 0;
  for (let i = 1; i < arr.length - 1; i++) {
    if (arr[i] > arr[i - 1] && arr[i] > arr[i + 1]) {
      count++;
    }
  }
  return count;
}

/**
 * 计算数组的谷值数量
 * @param {Array<number>} arr
 * @returns {number}
 */
export function countValleys(arr) {
  let count = 0;
  for (let i = 1; i < arr.length - 1; i++) {
    if (arr[i] < arr[i - 1] && arr[i] < arr[i + 1]) {
      count++;
    }
  }
  return count;
}

/**
 * 计算数组的累积最大值
 * @param {Array<number>} arr
 * @returns {Array<number>}
 */
export function cumulativeMax(arr) {
  let max = -Infinity;
  return arr.map(val => {
    max = Math.max(max, val);
    return max;
  });
}

/**
 * 计算数组的累积最小值
 * @param {Array<number>} arr
 * @returns {Array<number>}
 */
export function cumulativeMin(arr) {
  let min = Infinity;
  return arr.map(val => {
    min = Math.min(min, val);
    return min;
  });
}

/**
 * 获取数组中最长递增子序列长度
 * @param {Array<number>} arr
 * @returns {number}
 */
export function lisLength(arr) {
  if (arr.length === 0) return 0;
  const tails = [];
  arr.forEach(num => {
    let i = 0, j = tails.length;
    while (i < j) {
      const mid = Math.floor((i + j) / 2);
      if (tails[mid] < num) i = mid + 1;
      else j = mid;
    }
    tails[i] = num;
  });
  return tails.length;
}

/**
 * 获取数组中最长连续递增子序列
 * @param {Array<number>} arr
 * @returns {Array<number>}
 */
export function longestIncreasingSubarray(arr) {
  if (arr.length === 0) return [];
  let maxStart = 0, maxLen = 1;
  let currStart = 0, currLen = 1;

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > arr[i - 1]) {
      currLen++;
    } else {
      if (currLen > maxLen) {
        maxLen = currLen;
        maxStart = currStart;
      }
      currStart = i;
      currLen = 1;
    }
  }

  if (currLen > maxLen) {
    maxLen = currLen;
    maxStart = currStart;
  }

  return arr.slice(maxStart, maxStart + maxLen);
}

/**
 * 数组洗牌（原地修改）
 * @param {Array} arr
 * @returns {Array}
 */
export function shuffleInPlace(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * 随机采样（不放回）
 * @param {Array} arr
 * @param {number} n
 * @returns {Array}
 */
export function sampleWithoutReplacement(arr, n) {
  return sampleSize(arr, n);
}

/**
 * 随机采样（放回）
 * @param {Array} arr
 * @param {number} n
 * @returns {Array}
 */
export function sampleWithReplacement(arr, n) {
  const result = [];
  for (let i = 0; i < n; i++) {
    result.push(sample(arr));
  }
  return result;
}

/**
 * 获取数组的频率分布
 * @param {Array<number>} arr
 * @param {number} bins 分组数量
 * @returns {Array}
 */
export function histogram(arr, bins = 10) {
  const min = Math.min(...arr);
  const max = Math.max(...arr);
  const binWidth = (max - min) / bins;
  const result = Array(bins).fill(0).map((_, i) => ({
    range: [min + i * binWidth, min + (i + 1) * binWidth],
    count: 0
  }));

  arr.forEach(val => {
    const binIndex = Math.min(Math.floor((val - min) / binWidth), bins - 1);
    result[binIndex].count++;
  });

  return result;
}

/**
 * 获取数组的众数及频率
 * @param {Array} arr
 * @returns {Array<{value: *, count: number}>}
 */
export function modeWithCount(arr) {
  const counts = countBy(arr);
  const maxCount = Math.max(...Object.values(counts));
  return Object.entries(counts)
    .filter(([, count]) => count === maxCount)
    .map(([value, count]) => ({ value: isNaN(value) ? value : Number(value), count }));
}

/**
 * 计算两个数组的皮尔逊相关系数
 * @param {Array<number>} arr1
 * @param {Array<number>} arr2
 * @returns {number}
 */
export function pearsonCorrelation(arr1, arr2) {
  if (arr1.length !== arr2.length) throw new Error('数组长度必须相同');
  const n = arr1.length;
  const sum1 = sum(arr1);
  const sum2 = sum(arr2);
  const sum1Sq = arr1.reduce((acc, v) => acc + v * v, 0);
  const sum2Sq = arr2.reduce((acc, v) => acc + v * v, 0);
  const pSum = arr1.reduce((acc, v, i) => acc + v * arr2[i], 0);

  const num = pSum - (sum1 * sum2 / n);
  const den = Math.sqrt((sum1Sq - sum1 * sum1 / n) * (sum2Sq - sum2 * sum2 / n));

  return den === 0 ? 0 : num / den;
}

/**
 * 根据多个键排序
 * @param {Array} arr
 * @param {...string} keys
 * @returns {Array}
 */
export function sortByKeys(arr, ...keys) {
  return [...arr].sort((a, b) => {
    for (const key of keys) {
      if (a[key] < b[key]) return -1;
      if (a[key] > b[key]) return 1;
    }
    return 0;
  });
}

/**
 * 自然排序（适用于文件名等）
 * @param {Array<string>} arr
 * @returns {Array<string>}
 */
export function naturalSort(arr) {
  return [...arr].sort((a, b) =>
    a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' })
  );
}

/**
 * 获取嵌套数组的值
 * @param {Array} arr
 * @param {string} path 如 '0.1.2' 或 [0, 1, 2]
 * @returns {*}
 */
export function getNestedValue(arr, path) {
  const keys = Array.isArray(path) ? path : path.split('.');
  return keys.reduce((acc, key) => acc?.[key], arr);
}

/**
 * 设置嵌套数组的值
 * @param {Array} arr
 * @param {string} path
 * @param {*} value
 * @returns {Array}
 */
export function setNestedValue(arr, path, value) {
  const result = JSON.parse(JSON.stringify(arr));
  const keys = Array.isArray(path) ? path : path.split('.');
  let current = result;
  for (let i = 0; i < keys.length - 1; i++) {
    if (!current[keys[i]]) current[keys[i]] = [];
    current = current[keys[i]];
  }
  current[keys[keys.length - 1]] = value;
  return result;
}

/**
 * 矩阵转置
 * @param {Array<Array>} matrix
 * @returns {Array<Array>}
 */
export function transpose(matrix) {
  if (matrix.length === 0) return [];
  return matrix[0].map((_, i) => matrix.map(row => row[i]));
}

/**
 * 矩阵乘法
 * @param {Array<Array>} a
 * @param {Array<Array>} b
 * @returns {Array<Array>}
 */
export function matrixMultiply(a, b) {
  const result = [];
  for (let i = 0; i < a.length; i++) {
    result[i] = [];
    for (let j = 0; j < b[0].length; j++) {
      let sum = 0;
      for (let k = 0; k < a[0].length; k++) {
        sum += a[i][k] * b[k][j];
      }
      result[i][j] = sum;
    }
  }
  return result;
}

/**
 * 创建指定维度的数组
 * @param {*} dimensions
 * @param {*} initialValue
 * @returns {Array}
 */
export function createNDArray(dimensions, initialValue = 0) {
  if (dimensions.length === 0) return initialValue;
  const [first, ...rest] = dimensions;
  return Array.from({ length: first }, () => createNDArray(rest, initialValue));
}

/**
 * 数组快照（深拷贝）
 * @param {Array} arr
 * @returns {Array}
 */
export function snapshot(arr) {
  return JSON.parse(JSON.stringify(arr));
}

/**
 * 比较两个数组的差异
 * @param {Array} oldArr
 * @param {Array} newArr
 * @returns {Object}
 */
export function diffArrays(oldArr, newArr) {
  const added = newArr.filter(x => !oldArr.includes(x));
  const removed = oldArr.filter(x => !newArr.includes(x));
  const unchanged = oldArr.filter(x => newArr.includes(x));
  return { added, removed, unchanged };
}

/**
 * 将数组分批处理
 * @param {Array} arr
 * @param {number} batchSize
 * @param {Function} processor
 * @returns {Promise<Array>}
 */
export async function batchProcess(arr, batchSize, processor) {
  const results = [];
  for (let i = 0; i < arr.length; i += batchSize) {
    const batch = arr.slice(i, i + batchSize);
    const batchResults = await Promise.all(batch.map(processor));
    results.push(...batchResults);
  }
  return results;
}

/**
 * 异步过滤数组
 * @param {Array} arr
 * @param {Function} predicate
 * @returns {Promise<Array>}
 */
export async function asyncFilter(arr, predicate) {
  const results = await Promise.all(arr.map(predicate));
  return arr.filter((_, i) => results[i]);
}

/**
 * 异步映射数组
 * @param {Array} arr
 * @param {Function} mapper
 * @param {number} concurrency
 * @returns {Promise<Array>}
 */
export async function asyncMap(arr, mapper, concurrency = Infinity) {
  if (concurrency === Infinity) {
    return Promise.all(arr.map(mapper));
  }

  const results = [];
  const executing = [];

  for (const [index, item] of arr.entries()) {
    const promise = mapper(item, index).then(result => ({ index, result }));
    results.push(promise);

    if (arr.length >= concurrency) {
      executing.push(promise);
      if (executing.length >= concurrency) {
        await Promise.race(executing);
        executing.splice(executing.findIndex(p => p === promise), 1);
      }
    }
  }

  return Promise.all(results).then(results =>
    results.sort((a, b) => a.index - b.index).map(r => r.result)
  );
}

/**
 * 数组防抖（用于频繁更新的数组）
 * @param {Function} callback
 * @param {number} wait
 * @returns {Function}
 */
export function debounceArray(callback, wait) {
  let timeout;
  let pendingArgs = [];
  return function(...args) {
    pendingArgs.push(...args);
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      callback(pendingArgs);
      pendingArgs = [];
    }, wait);
  };
}

/**
 * 数组节流（用于频繁更新的数组）
 * @param {Function} callback
 * @param {number} limit
 * @returns {Function}
 */
export function throttleArray(callback, limit) {
  let inThrottle;
  let pendingArgs = [];
  return function(...args) {
    pendingArgs.push(...args);
    if (!inThrottle) {
      callback(pendingArgs);
      pendingArgs = [];
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

/**
 * 防抖去重（合并一段时间内的相同项）
 * @param {Array} arr
 * @param {string|Function} key
 * @param {number} maxAge
 * @returns {Array}
 */
export function dedupeByTime(arr, key, maxAge) {
  const seen = new Map();
  const now = Date.now();
  return arr.filter(item => {
    const k = typeof key === 'function' ? key(item) : item[key];
    const lastSeen = seen.get(k);
    if (!lastSeen || now - lastSeen > maxAge) {
      seen.set(k, now);
      return true;
    }
    return false;
  });
}
