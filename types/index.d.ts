// ==================== Array Utils ====================

/**
 * 数组去重
 * @param arr 输入数组
 * @returns 去重后的新数组
 */
export function unique<T>(arr: T[]): T[];

/**
 * 数组扁平化
 * @param arr 嵌套数组
 * @param depth 扁平化深度，默认为 Infinity
 * @returns 扁平化后的数组
 */
export function flatten<T>(arr: any[], depth?: number): T[];

/**
 * 数组随机打乱（Fisher-Yates 算法）
 * @param arr 输入数组
 * @returns 打乱后的新数组
 */
export function shuffle<T>(arr: T[]): T[];

/**
 * 按指定键对数组进行分组
 * @param arr 输入数组
 * @param key 分组键名或函数
 * @returns 分组后的对象
 */
export function groupBy<T>(arr: T[], key: keyof T | ((item: T) => string)): Record<string, T[]>;

/**
 * 将数组分割成指定大小的块
 * @param arr 输入数组
 * @param size 每块大小
 * @returns 分块后的数组
 */
export function chunk<T>(arr: T[], size: number): T[][];

/**
 * 计算数组元素之和
 * @param arr 数字数组
 * @returns 元素之和
 */
export function sum(arr: number[]): number;

/**
 * 计算数组平均值
 * @param arr 数字数组
 * @returns 平均值
 */
export function avg(arr: number[]): number;

/**
 * 找出数组最大值
 * @param arr 数字数组
 * @returns 最大值
 */
export function max(arr: number[]): number;

/**
 * 找出数组最小值
 * @param arr 数字数组
 * @returns 最小值
 */
export function min(arr: number[]): number;

/**
 * 计算多个数组的交集
 * @param arrs 多个数组
 * @returns 交集数组
 */
export function intersection<T>(...arrs: T[][]): T[];

/**
 * 计算两个数组的差集
 * @param arr1 第一个数组
 * @param arr2 第二个数组
 * @returns 差集数组
 */
export function difference<T>(arr1: T[], arr2: T[]): T[];

/**
 * 按指定键排序数组
 * @param arr 输入数组
 * @param key 排序键
 * @param order 排序方向，'asc' 或 'desc'
 * @returns 排序后的新数组
 */
export function sortBy<T>(arr: T[], key: keyof T, order?: 'asc' | 'desc'): T[];

// ==================== Date Utils ====================

/**
 * 格式化日期
 * @param date 日期对象、字符串或时间戳
 * @param pattern 格式化模式，默认为 'YYYY-MM-DD HH:mm:ss'
 * @returns 格式化后的日期字符串
 */
export function format(date: Date | string | number, pattern?: string): string;

/**
 * 获取当前时间字符串
 * @returns 当前时间字符串
 */
export function now(): string;

/**
 * 获取今天日期字符串
 * @returns 今天日期字符串
 */
export function today(): string;

/**
 * 添加天数
 * @param date 日期对象、字符串或时间戳
 * @param days 天数
 * @returns 计算后的日期对象
 */
export function addDays(date: Date | string | number, days: number): Date;

/**
 * 添加月份
 * @param date 日期对象、字符串或时间戳
 * @param months 月数
 * @returns 计算后的日期对象
 */
export function addMonths(date: Date | string | number, months: number): Date;

/**
 * 添加年份
 * @param date 日期对象、字符串或时间戳
 * @param years 年数
 * @returns 计算后的日期对象
 */
export function addYears(date: Date | string | number, years: number): Date;

/**
 * 计算两个日期之间的天数差
 * @param date1 第一个日期
 * @param date2 第二个日期
 * @returns 天数差
 */
export function diffDays(date1: Date | string | number, date2: Date | string | number): number;

/**
 * 获取时间戳（秒）
 * @param date 日期对象、字符串或时间戳
 * @returns 时间戳（秒）
 */
export function timestamp(date?: Date | string | number): number;

/**
 * 获取时间戳（毫秒）
 * @param date 日期对象、字符串或时间戳
 * @returns 时间戳（毫秒）
 */
export function timestampMs(date?: Date | string | number): number;

/**
 * 获取月份第一天
 * @param date 日期对象、字符串或时间戳
 * @returns 月份第一天的日期对象
 */
export function startOfMonth(date?: Date | string | number): Date;

/**
 * 获取月份最后一天
 * @param date 日期对象、字符串或时间戳
 * @returns 月份最后一天的日期对象
 */
export function endOfMonth(date?: Date | string | number): Date;

/**
 * 获取星期几（0-6）
 * @param date 日期对象、字符串或时间戳
 * @returns 星期几（0-6）
 */
export function dayOfWeek(date?: Date | string | number): number;

/**
 * 获取星期名称
 * @param date 日期对象、字符串或时间戳
 * @param locale 语言环境，默认为 'zh-CN'
 * @returns 星期名称
 */
export function dayName(date?: Date | string | number, locale?: string): string;

/**
 * 判断是否为闰年
 * @param year 年份
 * @returns 是否为闰年
 */
export function isLeapYear(year: number): boolean;

/**
 * 获取月份天数
 * @param year 年份
 * @param month 月份（1-12）
 * @returns 月份天数
 */
export function daysInMonth(year: number, month: number): number;

/**
 * 判断是否为周末
 * @param date 日期对象、字符串或时间戳
 * @returns 是否为周末
 */
export function isWeekend(date?: Date | string | number): boolean;

/**
 * 获取相对时间描述
 * @param date 日期对象、字符串或时间戳
 * @returns 相对时间描述（如"1分钟前"、"2天后"）
 */
export function fromNow(date: Date | string | number): string;

// ==================== String Utils ====================

/**
 * MD5 哈希
 * @param text 输入文本
 * @returns MD5 哈希值
 */
export function md5(text: string): string | Promise<string>;

/**
 * SHA256 哈希
 * @param text 输入文本
 * @returns SHA256 哈希值
 */
export function sha256(text: string): string | Promise<string>;

/**
 * 生成随机字符串
 * @param length 字符串长度，默认为 8
 * @param chars 可用字符集
 * @returns 随机字符串
 */
export function randomString(length?: number, chars?: string): string;

/**
 * 生成随机验证码
 * @param length 验证码长度，默认为 6
 * @param type 验证码类型，'digits' 或 'mixed'
 * @returns 随机验证码
 */
export function randomCode(length?: number, type?: 'digits' | 'mixed'): string;

/**
 * 驼峰命名转蛇形命名
 * @param str 驼峰命名字符串
 * @returns 蛇形命名字符串
 */
export function camelToSnake(str: string): string;

/**
 * 蛇形命名转驼峰命名
 * @param str 蛇形命名字符串
 * @returns 驼峰命名字符串
 */
export function snakeToCamel(str: string): string;

/**
 * 短横线命名转驼峰命名
 * @param str 短横线命名字符串
 * @returns 驼峰命名字符串
 */
export function camelCase(str: string): string;

/**
 * 驼峰命名转短横线命名
 * @param str 驼峰命名字符串
 * @returns 短横线命名字符串
 */
export function kebabCase(str: string): string;

/**
 * 截断字符串
 * @param str 输入字符串
 * @param length 最大长度
 * @param suffix 后缀，默认为 '...'
 * @returns 截断后的字符串
 */
export function truncate(str: string, length: number, suffix?: string): string;

/**
 * 字符串脱敏
 * @param str 输入字符串
 * @param start 保留开头字符数
 * @param end 保留结尾字符数
 * @param mask 掩码字符，默认为 '*'
 * @returns 脱敏后的字符串
 */
export function mask(str: string, start?: number, end?: number, mask?: string): string;

/**
 * 清理空白字符
 * @param str 输入字符串
 * @returns 清理后的字符串
 */
export function cleanWhitespace(str: string): string;

/**
 * 转义 HTML 特殊字符
 * @param str 输入字符串
 * @returns 转义后的字符串
 */
export function escapeHtml(str: string): string;

/**
 * 反转义 HTML 特殊字符
 * @param str 输入字符串
 * @returns 反转义后的字符串
 */
export function unescapeHtml(str: string): string;

/**
 * 模板字符串替换
 * @param template 模板字符串
 * @param data 数据对象
 * @returns 替换后的字符串
 */
export function template(template: string, data: Record<string, any>): string;

/**
 * 格式化字节大小
 * @param bytes 字节数
 * @param decimals 小数位数，默认为 2
 * @returns 格式化后的字符串（如"1.50 KB"）
 */
export function formatBytes(bytes: number, decimals?: number): string;

// ==================== Validate Utils ====================

/**
 * 验证邮箱格式
 * @param email 邮箱地址
 * @returns 是否为有效邮箱
 */
export function isEmail(email: string): boolean;

/**
 * 验证手机号格式（中国大陆）
 * @param phone 手机号
 * @returns 是否为有效手机号
 */
export function isPhone(phone: string): boolean;

/**
 * 验证身份证号格式（中国大陆）
 * @param idCard 身份证号
 * @returns 是否为有效身份证号
 */
export function isIdCard(idCard: string): boolean;

/**
 * 判断是否为空值
 * @param value 任意值
 * @returns 是否为空
 */
export function isEmpty(value: any): boolean;

/**
 * 验证是否为简单密码（仅数字）
 * @param pwd 密码
 * @returns 是否为简单密码
 */
export function isSimplePassword(pwd: string): boolean;

/**
 * 验证是否为数字字符串
 * @param value 输入值
 * @returns 是否为数字
 */
export function isNumber(value: string): boolean;

/**
 * 验证 URL 格式
 * @param url URL 地址
 * @returns 是否为有效 URL
 */
export function isUrl(url: string): boolean;

// ==================== Storage Utils ====================

interface StorageItem<T> {
  value: T;
  expire?: number;
}

interface StorageAPI {
  /**
   * 设置存储项
   * @param key 键名
   * @param value 值
   * @param ttl 过期时间（秒）
   */
  set<T>(key: string, value: T, ttl?: number): void;

  /**
   * 获取存储项
   * @param key 键名
   * @returns 存储值，不存在或已过期返回 null
   */
  get<T>(key: string): T | null;

  /**
   * 移除存储项
   * @param key 键名
   */
  remove(key: string): void;

  /**
   * 清空所有存储项
   */
  clear(): void;
}

/** localStorage 封装 */
export const storage: StorageAPI;

/** sessionStorage 封装 */
export const session: StorageAPI;

/**
 * 设置 localStorage 项
 * @param key 键名
 * @param value 值
 * @deprecated 请使用 storage.set
 */
export function setStorage(key: string, value: any): void;

/**
 * 获取 localStorage 项
 * @param key 键名
 * @returns 存储值
 * @deprecated 请使用 storage.get
 */
export function getStorage<T = any>(key: string): T | null;

/**
 * 移除 localStorage 项
 * @param key 键名
 * @deprecated 请使用 storage.remove
 */
export function removeStorage(key: string): void;

/**
 * 清空 localStorage
 * @deprecated 请使用 storage.clear
 */
export function clearStorage(): void;
