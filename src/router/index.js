import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
export const Test = [
  {
    path: '/',
    name: '/',
    component: () => import('@/layout/LayOut'),
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
        component: () => import('@/pages/HelloWorld'),
        meta: { title: 'hello', icon: 'eye', affix: true },
        children: [
          {
            path: 'home',
            name: 'home',
            component: () => import('@/pages/Home'),
            meta: { title: 'home', icon: 'eye' },
            children: [
              {
                path: 'home',
                name: 'home',
                component: () => import('@/pages/Home'),
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
