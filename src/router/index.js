import Vue from 'vue'
import VueRouter from 'vue-router'
import LayOut from '@/layout/LayOut'
Vue.use(VueRouter)
export const routes = [
  {
    path: '/',
    name: '/',
    component: LayOut,
    redirect: '/home',
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import('@/pages/Home/Home'),
        meta: { title: '首页', icon: 'dog', color: '#409EFF' }
      },
      {
        path: 'hello/home',
        name: 'xx',
        component: () => import('@/pages/Home'),
        meta: { title: 'home', icon: 'dog', color: '#eee' }
      }, {
        path: 'hello/hello',
        name: 'zz',
        component: () => import('@/pages/HelloWorld'),
        meta: { title: 'hello', icon: 'dog', color: '#eee' }
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
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/pages/Login/Login'),
    meta: { title: 'home', icon: 'dog', color: '#eee' }
  }
]
const router = new VueRouter({
  routes
})
export default router
