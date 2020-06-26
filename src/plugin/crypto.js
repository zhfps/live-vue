import CryptoJS from 'crypto-js'

// 加密
export function encrypt(word, key) {
  return CryptoJS.AES.encrypt(word, key).toString()
}
// 解密
export function decrypt(word, key) {
  const bytes = CryptoJS.AES.decrypt(word, key)
  return bytes.toString(CryptoJS.enc.Utf8)
}
