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
