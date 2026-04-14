/**
 * 字符串工具库
 */

/**
 * 计算字符串 MD5
 * @param {string} text
 * @returns {string}
 */
export function md5(text) {
  // 简单的 MD5 实现，生产环境建议使用专业库
  const crypto = typeof window !== 'undefined' && window.crypto;
  if (crypto && crypto.subtle) {
    const encoder = new TextEncoder();
    return crypto.subtle.digest('MD5', encoder.encode(text))
      .then(buf => Array.from(new Uint8Array(buf))
        .map(b => b.toString(16).padStart(2, '0'))
        .join(''));
  }
  // 降级：简单哈希（非加密安全）
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    const char = text.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(16).padStart(8, '0');
}

/**
 * 生成随机字符串
 * @param {number} length
 * @param {string} chars
 * @returns {string}
 */
export function randomString(length = 8, chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789') {
  let result = '';
  const charsLength = chars.length;
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * charsLength));
  }
  return result;
}

/**
 * 生成随机验证码
 * @param {number} length
 * @returns {string}
 */
export function randomCode(length = 6) {
  return randomString(length, '0123456789');
}

/**
 * 驼峰转下划线
 * @param {string} str
 * @returns {string}
 */
export function camelToSnake(str) {
  return str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
}

/**
 * 下划线转驼峰
 * @param {string} str
 * @returns {string}
 */
export function snakeToCamel(str) {
  return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
}

/**
 * 截断字符串
 * @param {string} str
 * @param {number} length
 * @param {string} suffix
 * @returns {string}
 */
export function truncate(str, length, suffix = '...') {
  if (str.length <= length) return str;
  return str.slice(0, length - suffix.length) + suffix;
}

/**
 * 遮盖字符串中间部分
 * @param {string} str
 * @param {number} start
 * @param {number} end
 * @param {string} mask
 * @returns {string}
 */
export function mask(str, start = 3, end = 3, mask = '*') {
  if (str.length <= start + end) return str;
  return str.slice(0, start) + mask.repeat(str.length - start - end) + str.slice(-end);
}

/**
 * 去除字符串首尾空白及多余空格
 * @param {string} str
 * @returns {string}
 */
export function cleanWhitespace(str) {
  return str.trim().replace(/\s+/g, ' ');
}

/**
 * 转义 HTML 特殊字符
 * @param {string} str
 * @returns {string}
 */
export function escapeHtml(str) {
  const htmlEscapes = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  };
  return str.replace(/[&<>"']/g, char => htmlEscapes[char]);
}

/**
 * 反转义 HTML 特殊字符
 * @param {string} str
 * @returns {string}
 */
export function unescapeHtml(str) {
  const htmlUnescapes = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#39;': "'"
  };
  return str.replace(/&(?:amp|lt|gt|quot|#39);/g, entity => htmlUnescapes[entity]);
}

/**
 * 字符串模板填充
 * @param {string} template
 * @param {object} data
 * @returns {string}
 */
export function template(template, data) {
  return template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    return data[key] !== undefined ? data[key] : match;
  });
}

/**
 * 格式化字节大小
 * @param {number} bytes
 * @param {number} decimals
 * @returns {string}
 */
export function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(decimals)) + ' ' + sizes[i];
}

/**
 * 转换为短横线命名 (kebab-case)
 * @param {string} str
 * @returns {string}
 */
export function camelToKebab(str) {
  return str.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`).replace(/^-/, '');
}

/**
 * 短横线命名转驼峰
 * @param {string} str
 * @returns {string}
 */
export function kebabToCamel(str) {
  return str.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
}

/**
 * 首字母大写
 * @param {string} str
 * @returns {string}
 */
export function capitalize(str) {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * 首字母小写
 * @param {string} str
 * @returns {string}
 */
export function uncapitalize(str) {
  if (!str) return str;
  return str.charAt(0).toLowerCase() + str.slice(1);
}

/**
 * 驼峰命名转帕斯卡命名 (PascalCase)
 * @param {string} str
 * @returns {string}
 */
export function camelToPascal(str) {
  return capitalize(str);
}

/**
 * 帕斯卡命名转驼峰命名
 * @param {string} str
 * @returns {string}
 */
export function pascalToCamel(str) {
  return uncapitalize(str);
}

/**
 * 反转字符串
 * @param {string} str
 * @returns {string}
 */
export function reverse(str) {
  return str.split('').reverse().join('');
}

/**
 * 重复字符串 N 次
 * @param {string} str
 * @param {number} count
 * @returns {string}
 */
export function repeat(str, count) {
  return str.repeat(count);
}

/**
 * 判断字符串是否以指定前缀开头
 * @param {string} str
 * @param {string} prefix
 * @returns {boolean}
 */
export function startsWith(str, prefix) {
  return str.startsWith(prefix);
}

/**
 * 判断字符串是否以指定后缀结尾
 * @param {string} str
 * @param {string} suffix
 * @returns {boolean}
 */
export function endsWith(str, suffix) {
  return str.endsWith(suffix);
}

/**
 * 填充字符串到指定长度（左侧）
 * @param {string} str
 * @param {number} length
 * @param {string} pad
 * @returns {string}
 */
export function padStart(str, length, pad = ' ') {
  return str.padStart(length, pad);
}

/**
 * 填充字符串到指定长度（右侧）
 * @param {string} str
 * @param {number} length
 * @param {string} pad
 * @returns {string}
 */
export function padEnd(str, length, pad = ' ') {
  return str.padEnd(length, pad);
}

/**
 * 去除字符串中所有空白
 * @param {string} str
 * @returns {string}
 */
export function removeWhitespace(str) {
  return str.replace(/\s+/g, '');
}

/**
 * 提取字符串中的数字
 * @param {string} str
 * @returns {string}
 */
export function extractNumbers(str) {
  return str.replace(/\D/g, '');
}

/**
 * 提取字符串中的字母
 * @param {string} str
 * @returns {string}
 */
export function extractLetters(str) {
  return str.replace(/[^a-zA-Z]/g, '');
}

/**
 * 计算字符串字节长度（中文算2字节）
 * @param {string} str
 * @returns {number}
 */
export function byteLength(str) {
  let length = 0;
  for (let char of str) {
    length += (char.charCodeAt(0) > 127) ? 2 : 1;
  }
  return length;
}

/**
 * 按字节长度截断字符串
 * @param {string} str
 * @param {number} byteLen
 * @param {string} suffix
 * @returns {string}
 */
export function truncateByByte(str, byteLen, suffix = '...') {
  let length = 0;
  let result = '';
  for (let char of str) {
    length += (char.charCodeAt(0) > 127) ? 2 : 1;
    if (length > byteLen) {
      return result + suffix;
    }
    result += char;
  }
  return result;
}

/**
 * 判断字符串是否为回文
 * @param {string} str
 * @returns {boolean}
 */
export function isPalindrome(str) {
  const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, '');
  return cleaned === cleaned.split('').reverse().join('');
}

/**
 * 计算字符串中某字符出现次数
 * @param {string} str
 * @param {string} char
 * @returns {number}
 */
export function countOccurrences(str, char) {
  return (str.match(new RegExp(char, 'g')) || []).length;
}

/**
 * Base64 编码
 * @param {string} str
 * @returns {string}
 */
export function base64Encode(str) {
  if (typeof window !== 'undefined') {
    return window.btoa(encodeURIComponent(str));
  }
  return Buffer.from(str).toString('base64');
}

/**
 * Base64 解码
 * @param {string} str
 * @returns {string}
 */
export function base64Decode(str) {
  if (typeof window !== 'undefined') {
    return decodeURIComponent(window.atob(str));
  }
  return Buffer.from(str, 'base64').toString('utf8');
}

/**
 * URL 编码
 * @param {string} str
 * @returns {string}
 */
export function urlEncode(str) {
  return encodeURIComponent(str);
}

/**
 * URL 解码
 * @param {string} str
 * @returns {string}
 */
export function urlDecode(str) {
  return decodeURIComponent(str);
}

/**
 * 生成 UUID v4
 * @returns {string}
 */
export function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

/**
 * 生成简短唯一ID
 * @param {number} length
 * @returns {string}
 */
export function nanoid(length = 10) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-~';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/**
 * 字符串相似度计算 (Levenshtein 距离)
 * @param {string} str1
 * @param {string} str2
 * @returns {number}
 */
export function levenshteinDistance(str1, str2) {
  const m = str1.length;
  const n = str2.length;
  const dp = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));

  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (str1[i - 1] === str2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = Math.min(
          dp[i - 1][j] + 1,
          dp[i][j - 1] + 1,
          dp[i - 1][j - 1] + 1
        );
      }
    }
  }
  return dp[m][n];
}

/**
 * 计算字符串相似度 (0-1)
 * @param {string} str1
 * @param {string} str2
 * @returns {number}
 */
export function similarity(str1, str2) {
  const maxLen = Math.max(str1.length, str2.length);
  if (maxLen === 0) return 1;
  const distance = levenshteinDistance(str1, str2);
  return 1 - distance / maxLen;
}

/**
 * 高亮字符串中的匹配内容
 * @param {string} str
 * @param {string} keyword
 * @param {string} startTag
 * @param {string} endTag
 * @returns {string}
 */
export function highlight(str, keyword, startTag = '<mark>', endTag = '</mark>') {
  if (!keyword) return str;
  const regex = new RegExp(`(${escapeRegExp(keyword)})`, 'gi');
  return str.replace(regex, `${startTag}$1${endTag}`);
}

/**
 * 转义正则表达式特殊字符
 * @param {string} str
 * @returns {string}
 */
export function escapeRegExp(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * 将字符串转换为 slug (URL友好)
 * @param {string} str
 * @returns {string}
 */
export function slugify(str) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * 单词首字母大写
 * @param {string} str
 * @returns {string}
 */
export function titleCase(str) {
  return str.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
}

/**
 * 将字符串转换为 camelCase
 * @param {string} str
 * @returns {string}
 */
export function toCamelCase(str) {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/\s+/g, '');
}

/**
 * 将字符串转换为 PascalCase
 * @param {string} str
 * @returns {string}
 */
export function toPascalCase(str) {
  return str
    .replace(new RegExp(/[-_]+/, 'g'), ' ')
    .replace(new RegExp(/[^\w\s]/, 'g'), '')
    .replace(
      /\s+(.)(\w*)/g,
      ($1, $2, $3) => `${$2.toUpperCase() + $3.toLowerCase()}`
    )
    .replace(new RegExp(/\w/), s => s.toUpperCase());
}

/**
 * 将字符串转换为 snake_case
 * @param {string} str
 * @returns {string}
 */
export function toSnakeCase(str) {
  return str && str.match(
    /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g
  )
    .map(x => x.toLowerCase())
    .join('_');
}

/**
 * 将字符串转换为 kebab-case
 * @param {string} str
 * @returns {string}
 */
export function toKebabCase(str) {
  return str && str.match(
    /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g
  )
    .map(x => x.toLowerCase())
    .join('-');
}

/**
 * 移除字符串中的 HTML 标签
 * @param {string} str
 * @returns {string}
 */
export function stripHtml(str) {
  return str.replace(/<[^>]*>/g, '');
}

/**
 * 格式化手机号 (138****8888)
 * @param {string} phone
 * @returns {string}
 */
export function formatPhone(phone) {
  return phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
}

/**
 * 格式化身份证号 (110101********1234)
 * @param {string} idCard
 * @returns {string}
 */
export function formatIdCard(idCard) {
  return idCard.replace(/(\d{6})\d{8}(\d{4})/, '$1********$2');
}

/**
 * 格式化银行卡号 (显示后4位)
 * @param {string} cardNo
 * @returns {string}
 */
export function formatBankCard(cardNo) {
  const len = cardNo.length;
  if (len <= 4) return cardNo;
  return '*'.repeat(len - 4) + cardNo.slice(-4);
}

/**
 * 字符串按行分割
 * @param {string} str
 * @returns {Array}
 */
export function lines(str) {
  return str.split(/\r\n|[\r\n]/);
}

/**
 * 多行字符串合并为一行
 * @param {string} str
 * @returns {string}
 */
export function unlines(str) {
  return lines(str).join('');
}

/**
 * 获取字符串中的单词列表
 * @param {string} str
 * @returns {Array}
 */
export function words(str) {
  return str.match(/\w+/g) || [];
}

/**
 * 检测字符串是否为中文
 * @param {string} str
 * @returns {boolean}
 */
export function isChinese(str) {
  return /^[\u4e00-\u9fa5]+$/.test(str);
}

/**
 * 检测字符串是否包含中文
 * @param {string} str
 * @returns {boolean}
 */
export function hasChinese(str) {
  return /[\u4e00-\u9fa5]/.test(str);
}

/**
 * 检测字符串是否为全英文
 * @param {string} str
 * @returns {boolean}
 */
export function isEnglish(str) {
  return /^[a-zA-Z]+$/.test(str);
}

/**
 * 计算文本阅读时间 (分钟)
 * @param {string} text
 * @param {number} wordsPerMinute
 * @returns {number}
 */
export function readingTime(text, wordsPerMinute = 200) {
  const words = text.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}
