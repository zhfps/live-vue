import router from './index'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import state from '@/state'
import _ from 'lodash'
NProgress.configure({ showSpinner: false })

const whiteList = ['/login', '/404']
const user = state.getters.user
// 路由守卫
router.beforeEach(async(to, from, next) => {
  NProgress.start()
  // set page title
  document.title = 'vue/' + to.meta.title
  const path = _.find(whiteList, function(item) {
    item === to.path
  })
  if (path) {
    next()
  } else {
    if (user) {
      next()
    } else {
      next({ path: '/' })
    }
  }
})
router.afterEach((to, from) => {
  NProgress.done()
})
