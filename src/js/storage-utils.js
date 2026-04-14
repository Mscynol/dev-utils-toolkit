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
export function getStorage(key, defaultValue = null) {
  const data = localStorage.getItem(key)
  if (data === null) return defaultValue
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

// 设置带过期时间的存储
export function setStorageWithExpiry(key, value, ttl) {
  const now = new Date()
  const item = {
    value: value,
    expiry: now.getTime() + ttl
  }
  localStorage.setItem(key, JSON.stringify(item))
}

// 获取带过期时间的存储
export function getStorageWithExpiry(key) {
  const itemStr = localStorage.getItem(key)
  if (!itemStr) return null

  try {
    const item = JSON.parse(itemStr)
    const now = new Date()

    if (now.getTime() > item.expiry) {
      localStorage.removeItem(key)
      return null
    }
    return item.value
  } catch {
    return null
  }
}

// 获取所有 key
export function getStorageKeys() {
  return Object.keys(localStorage)
}

// 获取存储大小（字节）
export function getStorageSize() {
  let size = 0
  for (let key in localStorage) {
    if (localStorage.hasOwnProperty(key)) {
      size += localStorage[key].length * 2
    }
  }
  return size
}

// 判断 key 是否存在
export function hasStorage(key) {
  return localStorage.getItem(key) !== null
}

// 批量设置
export function setStorageBatch(items) {
  for (const [key, value] of Object.entries(items)) {
    setStorage(key, value)
  }
}

// 批量获取
export function getStorageBatch(keys) {
  const result = {}
  for (const key of keys) {
    result[key] = getStorage(key)
  }
  return result
}

// 批量删除
export function removeStorageBatch(keys) {
  for (const key of keys) {
    localStorage.removeItem(key)
  }
}

// 获取存储项数量
export function getStorageLength() {
  return localStorage.length
}

// 判断 localStorage 是否可用
export function isStorageAvailable() {
  try {
    const test = '__storage_test__'
    localStorage.setItem(test, test)
    localStorage.removeItem(test)
    return true
  } catch (e) {
    return false
  }
}

// 监听 storage 变化
export function onStorageChange(callback) {
  const handler = (e) => {
    callback({
      key: e.key,
      oldValue: e.oldValue,
      newValue: e.newValue,
      url: e.url
    })
  }
  window.addEventListener('storage', handler)
  return () => window.removeEventListener('storage', handler)
}

// ========== sessionStorage ==========

// 设置 sessionStorage
export function setSession(key, value) {
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  sessionStorage.setItem(key, value)
}

// 获取 sessionStorage
export function getSession(key, defaultValue = null) {
  const data = sessionStorage.getItem(key)
  if (data === null) return defaultValue
  try {
    return JSON.parse(data)
  } catch {
    return data
  }
}

// 删除 sessionStorage
export function removeSession(key) {
  sessionStorage.removeItem(key)
}

// 清空 sessionStorage
export function clearSession() {
  sessionStorage.clear()
}

// ========== Cookie ==========

// 设置 Cookie
export function setCookie(name, value, options = {}) {
  let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`

  if (options.expires) {
    if (typeof options.expires === 'number') {
      options.expires = new Date(Date.now() + options.expires * 864e5)
    }
    cookieString += `; expires=${options.expires.toUTCString()}`
  }

  if (options.path) {
    cookieString += `; path=${options.path}`
  }

  if (options.domain) {
    cookieString += `; domain=${options.domain}`
  }

  if (options.secure) {
    cookieString += '; secure'
  }

  if (options.sameSite) {
    cookieString += `; samesite=${options.sameSite}`
  }

  document.cookie = cookieString
}

// 获取 Cookie
export function getCookie(name) {
  const cookies = document.cookie.split(';')
  for (let cookie of cookies) {
    const [cookieName, cookieValue] = cookie.trim().split('=')
    if (decodeURIComponent(cookieName) === name) {
      return decodeURIComponent(cookieValue)
    }
  }
  return null
}

// 删除 Cookie
export function removeCookie(name, options = {}) {
  setCookie(name, '', { ...options, expires: new Date(0) })
}

// 获取所有 Cookie
export function getAllCookies() {
  const cookies = {}
  document.cookie.split(';').forEach(cookie => {
    const [name, value] = cookie.trim().split('=')
    if (name) {
      cookies[decodeURIComponent(name)] = decodeURIComponent(value)
    }
  })
  return cookies
}

// 判断 Cookie 是否存在
export function hasCookie(name) {
  return getCookie(name) !== null
}

// ========== IndexedDB 封装 ==========

let dbPromise = null
let dbName = 'app-db'
let storeName = 'app-store'

// 初始化 IndexedDB
export function initIndexedDB(name = 'app-db', version = 1, store = 'app-store') {
  dbName = name
  storeName = store

  return new Promise((resolve, reject) => {
    const request = indexedDB.open(name, version)

    request.onerror = () => reject(request.error)
    request.onsuccess = () => resolve(request.result)

    request.onupgradeneeded = (event) => {
      const db = event.target.result
      if (!db.objectStoreNames.contains(store)) {
        db.createObjectStore(store, { keyPath: 'id', autoIncrement: true })
      }
    }
  })
}

// 添加数据到 IndexedDB
export function addToIndexedDB(data) {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName)
    request.onsuccess = (event) => {
      const db = event.target.result
      const transaction = db.transaction([storeName], 'readwrite')
      const store = transaction.objectStore(storeName)
      const addRequest = store.add(data)
      addRequest.onsuccess = () => resolve(addRequest.result)
      addRequest.onerror = () => reject(addRequest.error)
    }
    request.onerror = () => reject(request.error)
  })
}

// 从 IndexedDB 获取数据
export function getFromIndexedDB(id) {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName)
    request.onsuccess = (event) => {
      const db = event.target.result
      const transaction = db.transaction([storeName], 'readonly')
      const store = transaction.objectStore(storeName)
      const getRequest = store.get(id)
      getRequest.onsuccess = () => resolve(getRequest.result)
      getRequest.onerror = () => reject(getRequest.error)
    }
    request.onerror = () => reject(request.error)
  })
}

// 更新 IndexedDB 数据
export function updateInIndexedDB(data) {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName)
    request.onsuccess = (event) => {
      const db = event.target.result
      const transaction = db.transaction([storeName], 'readwrite')
      const store = transaction.objectStore(storeName)
      const putRequest = store.put(data)
      putRequest.onsuccess = () => resolve(putRequest.result)
      putRequest.onerror = () => reject(putRequest.error)
    }
    request.onerror = () => reject(request.error)
  })
}

// 删除 IndexedDB 数据
export function deleteFromIndexedDB(id) {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName)
    request.onsuccess = (event) => {
      const db = event.target.result
      const transaction = db.transaction([storeName], 'readwrite')
      const store = transaction.objectStore(storeName)
      const deleteRequest = store.delete(id)
      deleteRequest.onsuccess = () => resolve()
      deleteRequest.onerror = () => reject(deleteRequest.error)
    }
    request.onerror = () => reject(request.error)
  })
}

// 清空 IndexedDB
export function clearIndexedDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName)
    request.onsuccess = (event) => {
      const db = event.target.result
      const transaction = db.transaction([storeName], 'readwrite')
      const store = transaction.objectStore(storeName)
      const clearRequest = store.clear()
      clearRequest.onsuccess = () => resolve()
      clearRequest.onerror = () => reject(clearRequest.error)
    }
    request.onerror = () => reject(request.error)
  })
}

// 获取所有 IndexedDB 数据
export function getAllFromIndexedDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName)
    request.onsuccess = (event) => {
      const db = event.target.result
      const transaction = db.transaction([storeName], 'readonly')
      const store = transaction.objectStore(storeName)
      const getAllRequest = store.getAll()
      getAllRequest.onsuccess = () => resolve(getAllRequest.result)
      getAllRequest.onerror = () => reject(getAllRequest.error)
    }
    request.onerror = () => reject(request.error)
  })
}