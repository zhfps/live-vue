const sideMenu = [
  {
    path: 'home',
    name: 'home',
    meta: { title: '首页', icon: 'dog', color: '#409EFF' }
  }, {
    path: 'common',
    name: 'Common',
    meta: { title: '基础数据', icon: 'dog', color: '#000' },
    children: [
      {
        path: 'menu',
        name: 'Menu',
        meta: { title: '菜单管理', icon: 'dog', color: '#000' }
      }
    ]
  }
]
export {
  sideMenu
}
