import Vue from 'vue'
import VueRouter from 'vue-router'
import LayOut from '@/layout/LayOut'
import PageView from '@/pages/PageView'
Vue.use(VueRouter)
export const Test = [
  {
    path: '/',
    name: '/',
    component: LayOut,
    redirect: '/home',
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import('@/pages/Home'),
        meta: { title: 'home', icon: 'dog', color: '#409EFF' }
      }, {
        path: 'hello',
        name: 'hello',
        component: PageView,
        meta: { title: 'hello', icon: 'dog', color: '#eee' },
        children: [
          {
            path: 'home',
            name: 'xx',
            component: () => import('@/pages/Home'),
            meta: { title: 'home', icon: 'dog', color: '#eee' }
          }, {
            path: 'hello',
            name: 'zz',
            component: () => import('@/pages/HelloWorld'),
            meta: { title: 'hello', icon: 'dog', color: '#eee' }
          }
        ]
      },
      {
        path: 'hello',
        name: 'cc',
        component: () => import('@/pages/Home'),
        meta: { title: 'home', icon: 'dog', color: '#eee' }
      }, {
        path: 'test',
        name: 'Test',
        component: () => import('@/pages/Test'),
        meta: { title: 'test', icon: 'dog', color: '#eee' }
      }
    ]
  }
]
const router = new VueRouter({
  routes: Test
})
export default router
