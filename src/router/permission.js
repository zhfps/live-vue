import router from './index'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import state from '@/state'
import _ from 'lodash'
NProgress.configure({ showSpinner: false })
// 路由守卫
router.beforeEach(async(to, from, next) => {
  NProgress.start()
  if (to.path === '/login' || to.path === '/404') {
    document.title = 'vue'
    next()
    NProgress.done()
  } else {
    const custom = state.getters.custom
    if (_.isEmpty(custom)) {
      document.title = 'vue/login'
      next('/login')
      NProgress.done()
    } else {
      next()
      document.title = to.name
      NProgress.done()
    }
  }
})
router.afterEach((to, from) => {
  NProgress.done()
})
