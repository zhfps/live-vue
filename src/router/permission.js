import router from './index'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
NProgress.configure({ showSpinner: false })
router.beforeEach(async(to, from, next) => {
  NProgress.start()
  next()
  NProgress.done()
})
