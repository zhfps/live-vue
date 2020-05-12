const sideMenu = [
  {
    path: 'home',
    name: 'home',
    meta: { title: '首页', icon: 'dog', color: '#409EFF' }
  }, {
    path: 'hello',
    name: 'hello',
    meta: { title: 'hello', icon: 'dog', color: '#000' },
    children: [
      {
        path: 'home',
        name: 'xx',
        meta: { title: 'home', icon: 'dog', color: '#000' }
      }, {
        path: 'hello',
        name: 'zz',
        meta: { title: 'hello', icon: 'dog', color: '#000' }
      }
    ]
  },
  {
    path: 'hello',
    name: 'cc',
    meta: { title: 'home', icon: 'dog', color: '#000' }
  }, {
    path: 'test',
    name: 'Test',
    meta: { title: 'test', icon: 'dog', color: '#000' }
  },
  {
    path: '404',
    name: '404',
    meta: { title: '404', icon: 'dog', color: '#000' }
  }
]
export {
  sideMenu
}
