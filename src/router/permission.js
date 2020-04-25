import router from './index'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
NProgress.configure({ showSpinner: false })
// 路由守卫
router.beforeEach(async(to, from, next) => {
  NProgress.start()
  // set page title
  document.title = 'vue/' + to.meta.title
  next()
})
router.afterEach((to, from) => {
  NProgress.done()
})
