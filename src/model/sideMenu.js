const sideMenu = [
  {
    path: 'home',
    name: 'home',
    meta: { title: '首页', icon: 'dog', color: '#409EFF' }
  }, {
    path: 'hello',
    name: 'hello',
    meta: { title: 'hello', icon: 'dog', color: '#eee' },
    children: [
      {
        path: 'home',
        name: 'xx',
        meta: { title: 'home', icon: 'dog', color: '#eee' }
      }, {
        path: 'hello',
        name: 'zz',
        meta: { title: 'hello', icon: 'dog', color: '#eee' }
      }
    ]
  },
  {
    path: 'hello',
    name: 'cc',
    meta: { title: 'home', icon: 'dog', color: '#eee' }
  }, {
    path: 'test',
    name: 'Test',
    meta: { title: 'test', icon: 'dog', color: '#eee' }
  }
]
export {
  sideMenu
}
