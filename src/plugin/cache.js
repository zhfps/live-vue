import { encrypt, decrypt } from '@/plugin/crypto'
// 设置缓存
export function setCache(key, value, type) {
  if (type === 'object') {
    const str = JSON.stringify(value)
    const word = encrypt(str, key)
    sessionStorage.setItem(key, word)
  } else {
    const word = encrypt(value, key)
    sessionStorage.setItem(key, word)
  }
}
// 获取缓存
export function getCache(key, type) {
  const word = sessionStorage.getItem(key)
  if (word) {
    const data = decrypt(word, key)
    if (type === 'object') {
      const result = JSON.parse(data)
      return result
    } else {
      return data
    }
  } else {
    return null
  }
}
// 删除缓存
export function deleteCache(key) {
  sessionStorage.removeItem(key)
}
