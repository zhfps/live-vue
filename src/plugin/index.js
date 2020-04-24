export function findMenuItem(data, name) {
  data.map(item => {
    if (item.children && (item.children).length > 0) {
      return findMenuItem(item.children, name)
    } else {
      if (item.name === name) {
        item.meta.color = '#409EFF'
      } else {
        item.meta.color = '#eee'
      }
    }
  })
}
