// ==================== Array Utils ====================

export function unique<T>(arr: T[]): T[];
export function flatten<T>(arr: any[]): T[];
export function shuffle<T>(arr: T[]): T[];
export function groupBy<T>(arr: T[], key: keyof T): Record<string, T[]>;
export function sum(arr: number[]): number;
export function avg(arr: number[]): number;
export function max(arr: number[]): number;
export function min(arr: number[]): number;

// ==================== Date Utils ====================

export function format(date: Date | string | number, format?: string): string;
export function now(): string;
export function today(): string;
export function addDays(date: Date | string | number, days: number): Date;
export function addMonths(date: Date | string | number, months: number): Date;
export function addYears(date: Date | string | number, years: number): Date;
export function diffDays(date1: Date | string | number, date2: Date | string | number): number;
export function timestamp(date?: Date | string | number): number;
export function timestampMs(date?: Date | string | number): number;
export function startOfMonth(date?: Date | string | number): Date;
export function endOfMonth(date?: Date | string | number): Date;
export function dayOfWeek(date?: Date | string | number): number;
export function dayName(date?: Date | string | number, locale?: string): string;
export function isLeapYear(year: number): boolean;
export function daysInMonth(year: number, month: number): number;
export function fromNow(date: Date | string | number): string;

// ==================== String Utils ====================

export function md5(text: string): string | Promise<string>;
export function randomString(length?: number, chars?: string): string;
export function randomCode(length?: number): string;
export function camelToSnake(str: string): string;
export function snakeToCamel(str: string): string;
export function truncate(str: string, length: number, suffix?: string): string;
export function mask(str: string, start?: number, end?: number, mask?: string): string;
export function cleanWhitespace(str: string): string;
export function escapeHtml(str: string): string;
export function unescapeHtml(str: string): string;
export function template(template: string, data: Record<string, any>): string;
export function formatBytes(bytes: number, decimals?: number): string;

// ==================== Validate Utils ====================

export function isEmail(email: string): boolean;
export function isPhone(phone: string): boolean;
export function isEmpty(value: any): boolean;
export function isSimplePassword(pwd: string): boolean;
export function isNumber(value: string): boolean;
export function isUrl(url: string): boolean;

// ==================== Storage Utils ====================

export function setStorage(key: string, value: any): void;
export function getStorage<T = any>(key: string): T | null;
export function removeStorage(key: string): void;
export function clearStorage(): void;
