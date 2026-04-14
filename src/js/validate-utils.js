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

// 强密码验证（至少8位，包含大小写字母、数字和特殊字符）
export function isStrongPassword(pwd) {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(pwd)
}

// 中等强度密码验证（至少6位，包含字母和数字）
export function isMediumPassword(pwd) {
  return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(pwd)
}

// 是否纯数字
export function isNumber(value) {
  return /^\d+$/.test(value)
}

// 是否整数（包含负数）
export function isInteger(value) {
  return /^-?\d+$/.test(String(value))
}

// 是否正整数
export function isPositiveInteger(value) {
  return /^[1-9]\d*$/.test(String(value))
}

// 是否负整数
export function isNegativeInteger(value) {
  return /^-[1-9]\d*$/.test(String(value))
}

// 是否浮点数
export function isFloat(value) {
  return /^-?\d+\.\d+$/.test(String(value))
}

// 是否正浮点数
export function isPositiveFloat(value) {
  return /^\d+\.\d+$/.test(String(value))
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

// 是否 HTTP/HTTPS URL
export function isHttpUrl(url) {
  return /^https?:\/\/.+/i.test(url)
}

// 是否 IP 地址
export function isIP(ip) {
  return /^((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$/.test(ip)
}

// 是否 IPv6 地址
export function isIPv6(ip) {
  return /^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$|^::$|^::1$|^([0-9a-fA-F]{1,4}:){0,6}::([0-9a-fA-F]{1,4}:){0,5}[0-9a-fA-F]{1,4}$/.test(ip)
}

// 是否 MAC 地址
export function isMacAddress(mac) {
  return /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/.test(mac)
}

// 是否端口
export function isPort(port) {
  const num = parseInt(port, 10)
  return num >= 1 && num <= 65535
}

// 是否身份证号（中国大陆）
export function isIdCard(idCard) {
  // 15位或18位
  const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
  if (!reg.test(idCard)) return false

  // 18位身份证校验码验证
  if (idCard.length === 18) {
    const weights = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
    const checkCodes = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2']
    let sum = 0
    for (let i = 0; i < 17; i++) {
      sum += parseInt(idCard[i]) * weights[i]
    }
    const checkCode = checkCodes[sum % 11]
    return idCard[17].toUpperCase() === checkCode
  }

  return true
}

// 是否车牌号（中国大陆）
export function isLicensePlate(plate) {
  return /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z][A-HJ-NP-Z0-9]{4,5}[A-HJ-NP-Z0-9挂学警港澳]$/.test(plate)
}

// 是否邮政编码
export function isPostalCode(code) {
  return /^[1-9]\d{5}$/.test(code)
}

// 是否银行卡号
export function isBankCard(card) {
  if (!/^\d{16,19}$/.test(card)) return false

  // Luhn算法校验
  let sum = 0
  let isEven = false
  for (let i = card.length - 1; i >= 0; i--) {
    let digit = parseInt(card[i], 10)
    if (isEven) {
      digit *= 2
      if (digit > 9) digit -= 9
    }
    sum += digit
    isEven = !isEven
  }
  return sum % 10 === 0
}

// 是否中文姓名
export function isChineseName(name) {
  return /^[\u4e00-\u9fa5]{2,10}$/.test(name)
}

// 是否英文姓名
export function isEnglishName(name) {
  return /^[a-zA-Z\s]{2,50}$/.test(name)
}

// 是否日期格式（YYYY-MM-DD）
export function isDate(date) {
  return /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/.test(date)
}

// 是否时间格式（HH:mm:ss）
export function isTime(time) {
  return /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/.test(time)
}

// 是否日期时间格式
export function isDateTime(datetime) {
  return /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]) ([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/.test(datetime)
}

// 是否颜色（十六进制）
export function isHexColor(color) {
  return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color)
}

// 是否 RGB 颜色
export function isRgbColor(color) {
  return /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/.test(color)
}

// 是否 RGBA 颜色
export function isRgbaColor(color) {
  return /^rgba\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(0|1|0?\.\d+)\s*\)$/.test(color)
}

// 是否 HSL 颜色
export function isHslColor(color) {
  return /^hsl\(\s*(\d{1,3})\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*\)$/.test(color)
}

// 是否 JSON 字符串
export function isJson(str) {
  try {
    JSON.parse(str)
    return true
  } catch {
    return false
  }
}

// 是否 Base64 字符串
export function isBase64(str) {
  return /^[A-Za-z0-9+/]*={0,2}$/.test(str) && str.length % 4 === 0
}

// 是否 Data URI
export function isDataURI(uri) {
  return /^data:[\w/]+;base64,/.test(uri)
}

// 是否 UUID
export function isUUID(uuid) {
  return /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(uuid)
}

// 是否文件扩展名
export function isFileExtension(filename, extensions) {
  const ext = filename.slice(((filename.lastIndexOf('.') - 1) >>> 0) + 2)
  if (typeof extensions === 'string') {
    return ext.toLowerCase() === extensions.toLowerCase()
  }
  return extensions.some(e => e.toLowerCase() === ext.toLowerCase())
}

// 是否图片文件名
export function isImageFile(filename) {
  return isFileExtension(filename, ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'svg'])
}

// 是否视频文件名
export function isVideoFile(filename) {
  return isFileExtension(filename, ['mp4', 'avi', 'mov', 'wmv', 'flv', 'mkv', 'webm'])
}

// 是否音频文件名
export function isAudioFile(filename) {
  return isFileExtension(filename, ['mp3', 'wav', 'flac', 'aac', 'ogg', 'wma', 'm4a'])
}

// 是否文档文件名
export function isDocumentFile(filename) {
  return isFileExtension(filename, ['doc', 'docx', 'pdf', 'txt', 'xls', 'xlsx', 'ppt', 'pptx'])
}

// 是否中文
export function isChinese(str) {
  return /^[\u4e00-\u9fa5]+$/.test(str)
}

// 是否英文
export function isEnglish(str) {
  return /^[a-zA-Z]+$/.test(str)
}

// 是否字母数字组合
export function isAlphanumeric(str) {
  return /^[a-zA-Z0-9]+$/.test(str)
}

// 是否字母开头
export function isAlphaStart(str) {
  return /^[a-zA-Z]/.test(str)
}

// 是否包含空格
export function hasWhitespace(str) {
  return /\s/.test(str)
}

// 是否全角字符
export function isFullWidth(str) {
  return /[\uFF00-\uFFEF\u4E00-\u9FA5\uF900-\uFA2D]/.test(str)
}

// 是否包含特殊字符
export function hasSpecialChar(str) {
  return /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(str)
}

// 是否信用卡号（Visa）
export function isVisaCard(card) {
  return /^4[0-9]{12}(?:[0-9]{3})?$/.test(card)
}

// 是否信用卡号（MasterCard）
export function isMasterCard(card) {
  return /^5[1-5][0-9]{14}$/.test(card)
}

// 是否信用卡号（American Express）
export function isAmexCard(card) {
  return /^3[47][0-9]{13}$/.test(card)
}

// 是否车牌（新能源）
export function isNewEnergyPlate(plate) {
  return /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼][A-Z][DF]([A-HJ-NP-Z0-9]{5}|[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳])$/.test(plate)
}

// 是否社会统一信用代码
export function isCreditCode(code) {
  if (!/^[0-9A-HJ-NPQRTUWXY]{18}$/.test(code)) return false

  const weights = [1, 3, 9, 27, 19, 26, 16, 17, 20, 29, 25, 13, 8, 24, 10, 30, 28]
  const codes = '0123456789ABCDEFGHJKLMNPQRTUWXY'
  let sum = 0
  for (let i = 0; i < 17; i++) {
    sum += codes.indexOf(code[i]) * weights[i]
  }
  const checkCode = codes[(31 - sum % 31) % 31]
  return code[17] === checkCode
}

// 验证数组长度
export function isArrayLength(arr, min, max) {
  const len = arr.length
  if (min !== undefined && len < min) return false
  if (max !== undefined && len > max) return false
  return true
}

// 验证字符串长度
export function isStringLength(str, min, max) {
  const len = str.length
  if (min !== undefined && len < min) return false
  if (max !== undefined && len > max) return false
  return true
}

// 验证数值范围
export function isNumberRange(num, min, max) {
  const n = parseFloat(num)
  if (isNaN(n)) return false
  if (min !== undefined && n < min) return false
  if (max !== undefined && n > max) return false
  return true
}

// 是否匹配正则
export function matches(str, regex) {
  return regex.test(str)
}

// 表单验证组合器
export function createValidator(rules) {
  return function(data) {
    const errors = {}

    for (const [field, validators] of Object.entries(rules)) {
      const value = data[field]

      for (const validator of validators) {
        const result = validator(value, field, data)
        if (result !== true) {
          errors[field] = result
          break
        }
      }
    }

    return {
      valid: Object.keys(errors).length === 0,
      errors
    }
  }
}

// 必填验证
export function required(message = '此项为必填项') {
  return function(value) {
    if (isEmpty(value)) return message
    return true
  }
}

// 最小长度验证
export function minLength(min, message) {
  return function(value) {
    const len = String(value).length
    if (len < min) return message || `长度不能少于${min}个字符`
    return true
  }
}

// 最大长度验证
export function maxLength(max, message) {
  return function(value) {
    const len = String(value).length
    if (len > max) return message || `长度不能超过${max}个字符`
    return true
  }
}

// 范围长度验证
export function rangeLength(min, max, message) {
  return function(value) {
    const len = String(value).length
    if (len < min || len > max) return message || `长度应在${min}-${max}个字符之间`
    return true
  }
}

// 相等验证
export function equalTo(otherField, message) {
  return function(value, field, data) {
    if (value !== data[otherField]) return message || `与${otherField}不一致`
    return true
  }
}

// 自定义验证
export function custom(validator, message) {
  return function(value, field, data) {
    if (!validator(value, field, data)) return message || '验证失败'
    return true
  }
}