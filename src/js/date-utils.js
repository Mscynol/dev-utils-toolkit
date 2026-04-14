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

/**
 * 添加小时
 * @param {Date|string|number} date
 * @param {number} hours
 * @returns {Date}
 */
export function addHours(date, hours) {
  const d = new Date(date);
  d.setHours(d.getHours() + hours);
  return d;
}

/**
 * 添加分钟
 * @param {Date|string|number} date
 * @param {number} minutes
 * @returns {Date}
 */
export function addMinutes(date, minutes) {
  const d = new Date(date);
  d.setMinutes(d.getMinutes() + minutes);
  return d;
}

/**
 * 添加秒
 * @param {Date|string|number} date
 * @param {number} seconds
 * @returns {Date}
 */
export function addSeconds(date, seconds) {
  const d = new Date(date);
  d.setSeconds(d.getSeconds() + seconds);
  return d;
}

/**
 * 计算日期差（毫秒）
 * @param {Date|string|number} date1
 * @param {Date|string|number} date2
 * @returns {number}
 */
export function diffMs(date1, date2) {
  return new Date(date2).getTime() - new Date(date1).getTime();
}

/**
 * 计算日期差（秒）
 * @param {Date|string|number} date1
 * @param {Date|string|number} date2
 * @returns {number}
 */
export function diffSeconds(date1, date2) {
  return Math.floor(diffMs(date1, date2) / 1000);
}

/**
 * 计算日期差（分钟）
 * @param {Date|string|number} date1
 * @param {Date|string|number} date2
 * @returns {number}
 */
export function diffMinutes(date1, date2) {
  return Math.floor(diffMs(date1, date2) / (1000 * 60));
}

/**
 * 计算日期差（小时）
 * @param {Date|string|number} date1
 * @param {Date|string|number} date2
 * @returns {number}
 */
export function diffHours(date1, date2) {
  return Math.floor(diffMs(date1, date2) / (1000 * 60 * 60));
}

/**
 * 计算日期差（月）
 * @param {Date|string|number} date1
 * @param {Date|string|number} date2
 * @returns {number}
 */
export function diffMonths(date1, date2) {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  return (d2.getFullYear() - d1.getFullYear()) * 12 + (d2.getMonth() - d1.getMonth());
}

/**
 * 计算日期差（年）
 * @param {Date|string|number} date1
 * @param {Date|string|number} date2
 * @returns {number}
 */
export function diffYears(date1, date2) {
  return new Date(date2).getFullYear() - new Date(date1).getFullYear();
}

/**
 * 获取本周开始日期
 * @param {Date|string|number} date
 * @param {number} firstDayOfWeek 0=周日, 1=周一
 * @returns {Date}
 */
export function startOfWeek(date = new Date(), firstDayOfWeek = 0) {
  const d = new Date(date);
  const day = d.getDay();
  const diff = (day < firstDayOfWeek ? 7 : 0) + day - firstDayOfWeek;
  d.setDate(d.getDate() - diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

/**
 * 获取本周结束日期
 * @param {Date|string|number} date
 * @param {number} firstDayOfWeek 0=周日, 1=周一
 * @returns {Date}
 */
export function endOfWeek(date = new Date(), firstDayOfWeek = 0) {
  const start = startOfWeek(date, firstDayOfWeek);
  const d = new Date(start);
  d.setDate(d.getDate() + 6);
  d.setHours(23, 59, 59, 999);
  return d;
}

/**
 * 获取今天开始时间
 * @param {Date|string|number} date
 * @returns {Date}
 */
export function startOfDay(date = new Date()) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

/**
 * 获取今天结束时间
 * @param {Date|string|number} date
 * @returns {Date}
 */
export function endOfDay(date = new Date()) {
  const d = new Date(date);
  d.setHours(23, 59, 59, 999);
  return d;
}

/**
 * 获取年份开始日期
 * @param {Date|string|number} date
 * @returns {Date}
 */
export function startOfYear(date = new Date()) {
  const d = new Date(date);
  d.setMonth(0, 1);
  d.setHours(0, 0, 0, 0);
  return d;
}

/**
 * 获取年份结束日期
 * @param {Date|string|number} date
 * @returns {Date}
 */
export function endOfYear(date = new Date()) {
  const d = new Date(date);
  d.setMonth(11, 31);
  d.setHours(23, 59, 59, 999);
  return d;
}

/**
 * 获取季度
 * @param {Date|string|number} date
 * @returns {number}
 */
export function quarter(date = new Date()) {
  return Math.floor((new Date(date).getMonth() + 3) / 3);
}

/**
 * 获取季度开始日期
 * @param {Date|string|number} date
 * @returns {Date}
 */
export function startOfQuarter(date = new Date()) {
  const d = new Date(date);
  const q = quarter(d);
  d.setMonth((q - 1) * 3, 1);
  d.setHours(0, 0, 0, 0);
  return d;
}

/**
 * 获取季度结束日期
 * @param {Date|string|number} date
 * @returns {Date}
 */
export function endOfQuarter(date = new Date()) {
  const d = new Date(date);
  const q = quarter(d);
  d.setMonth(q * 3, 0);
  d.setHours(23, 59, 59, 999);
  return d;
}

/**
 * 是否是今天
 * @param {Date|string|number} date
 * @returns {boolean}
 */
export function isToday(date) {
  const d = new Date(date);
  const now = new Date();
  return d.toDateString() === now.toDateString();
}

/**
 * 是否是昨天
 * @param {Date|string|number} date
 * @returns {boolean}
 */
export function isYesterday(date) {
  const d = new Date(date);
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return d.toDateString() === yesterday.toDateString();
}

/**
 * 是否是明天
 * @param {Date|string|number} date
 * @returns {boolean}
 */
export function isTomorrow(date) {
  const d = new Date(date);
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return d.toDateString() === tomorrow.toDateString();
}

/**
 * 是否是周末
 * @param {Date|string|number} date
 * @returns {boolean}
 */
export function isWeekend(date) {
  const day = new Date(date).getDay();
  return day === 0 || day === 6;
}

/**
 * 是否在两个日期之间
 * @param {Date|string|number} date
 * @param {Date|string|number} start
 * @param {Date|string|number} end
 * @returns {boolean}
 */
export function isBetween(date, start, end) {
  const d = new Date(date).getTime();
  return d >= new Date(start).getTime() && d <= new Date(end).getTime();
}

/**
 * 判断日期A是否在日期B之前
 * @param {Date|string|number} dateA
 * @param {Date|string|number} dateB
 * @returns {boolean}
 */
export function isBefore(dateA, dateB) {
  return new Date(dateA).getTime() < new Date(dateB).getTime();
}

/**
 * 判断日期A是否在日期B之后
 * @param {Date|string|number} dateA
 * @param {Date|string|number} dateB
 * @returns {boolean}
 */
export function isAfter(dateA, dateB) {
  return new Date(dateA).getTime() > new Date(dateB).getTime();
}

/**
 * 判断是否为闰年
 * @param {Date|string|number} date
 * @returns {boolean}
 */
export function isLeapYearOf(date) {
  const year = new Date(date).getFullYear();
  return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

/**
 * 获取当前月份
 * @param {Date|string|number} date
 * @returns {number}
 */
export function month(date = new Date()) {
  return new Date(date).getMonth() + 1;
}

/**
 * 获取当前年份
 * @param {Date|string|number} date
 * @returns {number}
 */
export function year(date = new Date()) {
  return new Date(date).getFullYear();
}

/**
 * 获取日期中的日
 * @param {Date|string|number} date
 * @returns {number}
 */
export function day(date = new Date()) {
  return new Date(date).getDate();
}

/**
 * 获取小时
 * @param {Date|string|number} date
 * @returns {number}
 */
export function hour(date = new Date()) {
  return new Date(date).getHours();
}

/**
 * 获取分钟
 * @param {Date|string|number} date
 * @returns {number}
 */
export function minute(date = new Date()) {
  return new Date(date).getMinutes();
}

/**
 * 获取秒
 * @param {Date|string|number} date
 * @returns {number}
 */
export function second(date = new Date()) {
  return new Date(date).getSeconds();
}

/**
 * 获取友好的时间格式
 * @param {Date|string|number} date
 * @returns {string}
 */
export function friendlyDate(date) {
  const d = new Date(date);
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const target = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const diffDays = (today - target) / (1000 * 60 * 60 * 24);

  if (diffDays === 0) {
    return format(d, 'HH:mm');
  } else if (diffDays === 1) {
    return '昨天 ' + format(d, 'HH:mm');
  } else if (diffDays === 2) {
    return '前天 ' + format(d, 'HH:mm');
  } else if (diffDays < 7) {
    return dayName(d) + ' ' + format(d, 'HH:mm');
  } else {
    return format(d, 'YYYY-MM-DD HH:mm');
  }
}

/**
 * 获取日历数组（某月的所有日期）
 * @param {Date|string|number} date
 * @returns {Array}
 */
export function calendar(date = new Date()) {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = d.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startPadding = firstDay.getDay();
  const daysInMonth = lastDay.getDate();

  const weeks = [];
  let week = new Array(startPadding).fill(null);

  for (let day = 1; day <= daysInMonth; day++) {
    week.push(day);
    if (week.length === 7) {
      weeks.push(week);
      week = [];
    }
  }

  if (week.length > 0) {
    while (week.length < 7) {
      week.push(null);
    }
    weeks.push(week);
  }

  return weeks;
}

/**
 * 设置日期为指定时间
 * @param {Date|string|number} date
 * @param {number} hours
 * @param {number} minutes
 * @param {number} seconds
 * @returns {Date}
 */
export function setTime(date, hours, minutes = 0, seconds = 0) {
  const d = new Date(date);
  d.setHours(hours, minutes, seconds, 0);
  return d;
}

/**
 * 设置日期为年月日
 * @param {Date|string|number} date
 * @param {number} year
 * @param {number} month
 * @param {number} day
 * @returns {Date}
 */
export function setDate(date, year, month, day) {
  const d = new Date(date);
  d.setFullYear(year, month - 1, day);
  return d;
}

/**
 * 克隆日期
 * @param {Date|string|number} date
 * @returns {Date}
 */
export function clone(date) {
  return new Date(date);
}

/**
 * 比较两个日期是否相同（只比较日期部分）
 * @param {Date|string|number} date1
 * @param {Date|string|number} date2
 * @returns {boolean}
 */
export function isSameDay(date1, date2) {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  return d1.toDateString() === d2.toDateString();
}

/**
 * 比较两个日期是否相同月份
 * @param {Date|string|number} date1
 * @param {Date|string|number} date2
 * @returns {boolean}
 */
export function isSameMonth(date1, date2) {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  return d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth();
}

/**
 * 比较两个日期是否相同年份
 * @param {Date|string|number} date1
 * @param {Date|string|number} date2
 * @returns {boolean}
 */
export function isSameYear(date1, date2) {
  return new Date(date1).getFullYear() === new Date(date2).getFullYear();
}

/**
 * 获取年龄
 * @param {Date|string|number} birthDate
 * @returns {number}
 */
export function getAge(birthDate) {
  const birth = new Date(birthDate);
  const now = new Date();
  let age = now.getFullYear() - birth.getFullYear();
  const monthDiff = now.getMonth() - birth.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < birth.getDate())) {
    age--;
  }

  return age;
}

/**
 * 获取星座
 * @param {Date|string|number} date
 * @returns {string}
 */
export function getZodiac(date) {
  const d = new Date(date);
  const month = d.getMonth() + 1;
  const day = d.getDate();

  const zodiacSigns = [
    { name: '摩羯座', start: [1, 1], end: [1, 19] },
    { name: '水瓶座', start: [1, 20], end: [2, 18] },
    { name: '双鱼座', start: [2, 19], end: [3, 20] },
    { name: '白羊座', start: [3, 21], end: [4, 19] },
    { name: '金牛座', start: [4, 20], end: [5, 20] },
    { name: '双子座', start: [5, 21], end: [6, 21] },
    { name: '巨蟹座', start: [6, 22], end: [7, 22] },
    { name: '狮子座', start: [7, 23], end: [8, 22] },
    { name: '处女座', start: [8, 23], end: [9, 22] },
    { name: '天秤座', start: [9, 23], end: [10, 23] },
    { name: '天蝎座', start: [10, 24], end: [11, 22] },
    { name: '射手座', start: [11, 23], end: [12, 21] },
    { name: '摩羯座', start: [12, 22], end: [12, 31] }
  ];

  for (const sign of zodiacSigns) {
    const [startMonth, startDay] = sign.start;
    const [endMonth, endDay] = sign.end;

    if ((month === startMonth && day >= startDay) ||
        (month === endMonth && day <= endDay)) {
      return sign.name;
    }
  }

  return '未知';
}

/**
 * 获取生肖
 * @param {Date|string|number} date
 * @returns {string}
 */
export function getChineseZodiac(date) {
  const year = new Date(date).getFullYear();
  const animals = ['猴', '鸡', '狗', '猪', '鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊'];
  return animals[year % 12];
}

/**
 * 日期范围生成器
 * @param {Date|string|number} start
 * @param {Date|string|number} end
 * @param {string} unit day|week|month|year
 * @returns {Array<Date>}
 */
export function dateRange(start, end, unit = 'day') {
  const dates = [];
  let current = new Date(start);
  const endDate = new Date(end);

  while (current <= endDate) {
    dates.push(new Date(current));

    switch (unit) {
      case 'day':
        current.setDate(current.getDate() + 1);
        break;
      case 'week':
        current.setDate(current.getDate() + 7);
        break;
      case 'month':
        current.setMonth(current.getMonth() + 1);
        break;
      case 'year':
        current.setFullYear(current.getFullYear() + 1);
        break;
    }
  }

  return dates;
}

/**
 * 格式化持续时间
 * @param {number} ms 毫秒
 * @param {string} format 格式模板
 * @returns {string}
 */
export function formatDuration(ms, format = 'HH:mm:ss') {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  const pad = (n) => String(n).padStart(2, '0');

  const tokens = {
    DD: days,
    HH: pad(hours % 24),
    mm: pad(minutes % 60),
    ss: pad(seconds % 60),
    SSS: String(ms % 1000).padStart(3, '0')
  };

  return format.replace(/DD|HH|mm|ss|SSS/g, match => tokens[match]);
}

/**
 * 解析时间字符串为毫秒数
 * @param {string} timeStr 如 "1h", "30m", "2d"
 * @returns {number}
 */
export function parseDuration(timeStr) {
  const match = timeStr.match(/^(\d+)([smhdwMy])$/);
  if (!match) return 0;

  const [, num, unit] = match;
  const value = parseInt(num, 10);

  const multipliers = {
    s: 1000,
    m: 60 * 1000,
    h: 60 * 60 * 1000,
    d: 24 * 60 * 60 * 1000,
    w: 7 * 24 * 60 * 60 * 1000,
    M: 30 * 24 * 60 * 60 * 1000,
    y: 365 * 24 * 60 * 60 * 1000
  };

  return value * (multipliers[unit] || 0);
}

/**
 * 获取倒计时
 * @param {Date|string|number} targetDate
 * @returns {Object}
 */
export function countdown(targetDate) {
  const diff = new Date(targetDate).getTime() - Date.now();

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds, total: diff };
}

/**
 * ISO 8601 格式化为本地时间
 * @param {string} isoString
 * @param {string} format
 * @returns {string}
 */
export function isoToLocal(isoString, format = 'YYYY-MM-DD HH:mm:ss') {
  return format(new Date(isoString), format);
}

/**
 * 获取当前 ISO 时间字符串
 * @returns {string}
 */
export function toISOString(date = new Date()) {
  return new Date(date).toISOString();
}

/**
 * 获取 UTC 时间戳
 * @param {Date|string|number} date
 * @returns {number}
 */
export function utcTimestamp(date = new Date()) {
  return new Date(date).getTime();
}

/**
 * 时区转换
 * @param {Date|string|number} date
 * @param {number} offset 目标时区偏移（小时）
 * @returns {Date}
 */
export function convertTimezone(date, offset) {
  const d = new Date(date);
  const utc = d.getTime() + (d.getTimezoneOffset() * 60000);
  return new Date(utc + (3600000 * offset));
}

/**
 * 获取本机时区偏移
 * @returns {number}
 */
export function getTimezoneOffset() {
  return -new Date().getTimezoneOffset() / 60;
}

/**
 * 获取时区名称
 * @returns {string}
 */
export function getTimezoneName() {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
}
