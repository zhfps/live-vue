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
        path: 'menu',
        name: 'Menu',
        component: () => import('@/pages/common/MenuPage/MenuPage'),
        meta: { title: '菜单管理', icon: 'dog', color: '#eee' }
      }, {
        path: 'permission',
        name: 'Permission',
        component: () => import('@/pages/common/Permission/PermissionPage'),
        meta: { title: '菜单管理', icon: 'dog', color: '#eee' }
      }
    ]
  },
  {
    path: '*',
    name: '404',
    component: () => import('@/pages/NotFound/NotFound')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/pages/Login/Login'),
    meta: { title: 'home', icon: 'dog', color: '#eee' }
  }
]
const router = new VueRouter({
  mode: 'history',
  routes
})
export default router
