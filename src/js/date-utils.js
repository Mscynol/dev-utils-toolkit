/**
 * 日期时间工具库
 */

/**
 * 格式化日期
 * @param {Date|string|number} date
 * @param {string} format
 * @returns {string}
 */
export function format(date, format = 'YYYY-MM-DD HH:mm:ss') {
  const d = new Date(date);
  if (isNaN(d.getTime())) return '';

  const pad = (n) => String(n).padStart(2, '0');

  const tokens = {
    YYYY: d.getFullYear(),
    MM: pad(d.getMonth() + 1),
    DD: pad(d.getDate()),
    HH: pad(d.getHours()),
    mm: pad(d.getMinutes()),
    ss: pad(d.getSeconds()),
    SSS: String(d.getMilliseconds()).padStart(3, '0')
  };

  return format.replace(/YYYY|MM|DD|HH|mm|ss|SSS/g, match => tokens[match]);
}

/**
 * 获取当前时间字符串
 * @returns {string}
 */
export function now() {
  return format(new Date());
}

/**
 * 获取今天日期
 * @returns {string}
 */
export function today() {
  return format(new Date(), 'YYYY-MM-DD');
}

/**
 * 添加天数
 * @param {Date|string|number} date
 * @param {number} days
 * @returns {Date}
 */
export function addDays(date, days) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

/**
 * 添加月份
 * @param {Date|string|number} date
 * @param {number} months
 * @returns {Date}
 */
export function addMonths(date, months) {
  const d = new Date(date);
  d.setMonth(d.getMonth() + months);
  return d;
}

/**
 * 添加年份
 * @param {Date|string|number} date
 * @param {number} years
 * @returns {Date}
 */
export function addYears(date, years) {
  const d = new Date(date);
  d.setFullYear(d.getFullYear() + years);
  return d;
}

/**
 * 计算日期差（天数）
 * @param {Date|string|number} date1
 * @param {Date|string|number} date2
 * @returns {number}
 */
export function diffDays(date1, date2) {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  const msPerDay = 1000 * 60 * 60 * 24;
  return Math.floor((d2 - d1) / msPerDay);
}

/**
 * 获取时间戳（秒）
 * @param {Date|string|number} date
 * @returns {number}
 */
export function timestamp(date = new Date()) {
  return Math.floor(new Date(date).getTime() / 1000);
}

/**
 * 获取时间戳（毫秒）
 * @param {Date|string|number} date
 * @returns {number}
 */
export function timestampMs(date = new Date()) {
  return new Date(date).getTime();
}

/**
 * 获取月初日期
 * @param {Date|string|number} date
 * @returns {Date}
 */
export function startOfMonth(date = new Date()) {
  const d = new Date(date);
  d.setDate(1);
  d.setHours(0, 0, 0, 0);
  return d;
}

/**
 * 获取月末日期
 * @param {Date|string|number} date
 * @returns {Date}
 */
export function endOfMonth(date = new Date()) {
  const d = new Date(date);
  d.setMonth(d.getMonth() + 1);
  d.setDate(0);
  d.setHours(23, 59, 59, 999);
  return d;
}

/**
 * 获取周几（0-6）
 * @param {Date|string|number} date
 * @returns {number}
 */
export function dayOfWeek(date = new Date()) {
  return new Date(date).getDay();
}

/**
 * 获取周几名称
 * @param {Date|string|number} date
 * @param {string} locale
 * @returns {string}
 */
export function dayName(date = new Date(), locale = 'zh-CN') {
  const days = {
    'zh-CN': ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
    'en-US': ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  };
  const day = new Date(date).getDay();
  return days[locale]?.[day] || days['zh-CN'][day];
}

/**
 * 是否闰年
 * @param {number} year
 * @returns {boolean}
 */
export function isLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

/**
 * 获取月份天数
 * @param {number} year
 * @param {number} month 1-12
 * @returns {number}
 */
export function daysInMonth(year, month) {
  return new Date(year, month, 0).getDate();
}

/**
 * 相对时间描述
 * @param {Date|string|number} date
 * @returns {string}
 */
export function fromNow(date) {
  const now = Date.now();
  const then = new Date(date).getTime();
  const diff = now - then;
  const absDiff = Math.abs(diff);
  const isPast = diff > 0;

  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;
  const month = 30 * day;
  const year = 365 * day;

  let text;
  if (absDiff < minute) {
    text = '刚刚';
  } else if (absDiff < hour) {
    text = `${Math.floor(absDiff / minute)}分钟前`;
  } else if (absDiff < day) {
    text = `${Math.floor(absDiff / hour)}小时前`;
  } else if (absDiff < month) {
    text = `${Math.floor(absDiff / day)}天前`;
  } else if (absDiff < year) {
    text = `${Math.floor(absDiff / month)}个月前`;
  } else {
    text = `${Math.floor(absDiff / year)}年前`;
  }

  return isPast ? text : text.replace('前', '后');
}
