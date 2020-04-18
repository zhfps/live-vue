// 导入所有图标
const modulesFiles = require.context('./svg', true, /\.js$/)

const icons = modulesFiles.keys().map((item) => {
  return item.replace(/^.\//g, '').replace(/.js/g, '')
})
export default icons
