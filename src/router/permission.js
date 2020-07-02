import router from './index'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import state from '@/state'
const token = state.getters.Access_Token
NProgress.configure({ showSpinner: false })
// 路由守卫
router.beforeEach(async(to, from, next) => {
  NProgress.start()
  if (to.path === '/login' || to.path === '/404') {
    document.title = 'vue'
    next()
    NProgress.done()
  } else {
    if (token === '' || token === undefined || token === null) {
      document.title = '登录'
      next('/login')
      NProgress.done()
    } else {
      next()
      document.title = to.meta.title === undefined ? '首页' : to.meta.title
      NProgress.done()
    }
  }
})
router.afterEach((to, from) => {
  NProgress.done()
})
