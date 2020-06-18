const sideMenu = [
  {
    path: 'home',
    name: 'home',
    meta: { title: '首页', icon: 'dog', color: '#409EFF' }
  }, {
    path: 'common',
    name: 'Common',
    meta: { title: '系统管理', icon: 'dog', color: '#000' },
    children: [
      {
        path: 'menu',
        name: 'Menu',
        meta: { title: '菜单管理', icon: 'dog', color: '#000' }
      }, {
        path: 'permission',
        name: 'Permission',
        meta: { title: '权限管理', icon: 'dog', color: '#000' }
      }
    ]
  }
]
export {
  sideMenu
}
