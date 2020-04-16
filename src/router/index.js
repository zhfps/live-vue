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
        meta: { title: 'home', icon: 'eye' }
      }, {
        path: 'hello',
        name: 'hello',
        component: PageView,
        meta: { title: 'hello', icon: 'eye' },
        children: [
          {
            path: 'yy',
            name: 'home',
            component: PageView,
            meta: { title: 'home', icon: 'eye' },
            children: [
              {
                path: 'xx',
                name: 'home',
                component: () => import('@/pages/HelloWorld'),
                meta: { title: 'home', icon: 'eye' }
              }
            ]
          }
        ]
      }
    ]
  }
]
const router = new VueRouter({
  routes: Test
})
export default router
