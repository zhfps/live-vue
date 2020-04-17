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
        meta: { title: 'home', icon: 'dog' }
      }, {
        path: 'hello',
        name: 'hello',
        component: PageView,
        meta: { title: 'hello', icon: 'dog' },
        children: [
          {
            path: 'yy',
            name: 'home',
            component: PageView,
            meta: { title: 'home', icon: 'dog' },
            children: [
              {
                path: 'xx',
                name: 'home',
                component: () => import('@/pages/HelloWorld'),
                meta: { title: 'home', icon: 'dog' }
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
