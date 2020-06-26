// 设置缓存
export function setCache(key, value) {
  sessionStorage.setItem(key, value)
}
// 获取缓存
export function getCache(key) {
  sessionStorage.getItem(key)
}
// 删除缓存
export function deleteCache(key) {
  sessionStorage.removeItem(key)
}
