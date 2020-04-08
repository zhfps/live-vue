import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
const Test = [
  {
    path: '/home',
    component: () => import('@/pages/Home')
  }, {
    path: '/',
    component: () => import('@/pages/HelloWorld')
  }
]
const router = new VueRouter({
  routes: Test
})
export default router
