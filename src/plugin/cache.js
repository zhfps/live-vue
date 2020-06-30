import { encrypt, decrypt } from '@/plugin/crypto'
// 设置缓存
export function setCache(key, value) {
  const str = value.toString()
  const word = encrypt(str, key)
  sessionStorage.setItem(key, word.toString())
}
// 获取缓存
export function getCache(key) {
  const word = sessionStorage.getItem(key)
  if (word) {
    const data = decrypt(word, key)
    const result = JSON.parse(data)
    return result
  } else {
    return null
  }
}
// 删除缓存
export function deleteCache(key) {
  sessionStorage.removeItem(key)
}
