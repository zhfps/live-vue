import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
const Test = [
  {
    path: '/',
    component: () => import('@/layout/LayOut'),
    redirect: '/home',
    children: [
      {
        path: 'home',
        component: () => import('@/pages/Home')
      }, {
        path: 'hello',
        component: () => import('@/pages/HelloWorld')
      }
    ]
  }
]
const router = new VueRouter({
  routes: Test
})
export default router
