import Vue from 'vue'
import VueRouter from 'vue-router'
import LayOut from '@/layout/LayOut'
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
        meta: { title: 'home', icon: 'dog', color: '#eee' }
      }, {
        path: 'hello',
        name: 'hello',
        component: () => import('@/pages/HelloWorld'),
        meta: { title: 'hello', icon: 'dog', color: '#eee' }
      }
    ]
  }
]
const router = new VueRouter({
  routes: Test
})
export default router
