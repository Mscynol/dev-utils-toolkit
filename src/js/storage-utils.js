/**
 * localStorage 封装工具
 */

// 设置存储
export function setStorage(key, value) {
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  localStorage.setItem(key, value)
}

// 获取存储
export function getStorage(key) {
  const data = localStorage.getItem(key)
  try {
    return JSON.parse(data)
  } catch {
    return data
  }
}

// 删除
export function removeStorage(key) {
  localStorage.removeItem(key)
}

// 清空全部
export function clearStorage() {
  localStorage.clear()
}