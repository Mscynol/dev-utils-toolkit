/**
 * 表单验证工具库
 */

// 邮箱验证
export function isEmail(email) {
  const reg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return reg.test(email)
}

// 手机号验证（中国）
export function isPhone(phone) {
  const reg = /^1[3-9]\d{9}$/
  return reg.test(phone)
}

// 是否为空
export function isEmpty(value) {
  return value == null || String(value).trim() === ''
}

// 密码强度 6-16 位字母数字
export function isSimplePassword(pwd) {
  return /^[a-zA-Z0-9]{6,16}$/.test(pwd)
}

// 是否纯数字
export function isNumber(value) {
  return /^\d+$/.test(value)
}

// 是否 URL
export function isUrl(url) {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}