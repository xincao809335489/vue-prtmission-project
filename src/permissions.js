import router from './router/index.js'
import store from './store/index.js'
import {
  getToken
} from '@/utils/cookies'
// 进度条引入
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
NProgress.configure({ showSpinner: false })
const whiteList = ['/login'] // no redirect whitelist
router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start()
  const hasToken = getToken()
  if (hasToken) {
    if (to.path === '/login') {
      next({
        path: '/'
      })
      NProgress.done()
    } else {
      const hasMenus = store.state.menuList && store.state.menuList.length > 0
      if (hasMenus) {
        next()
      } else {
        try {
          await store.dispatch('getInfo')
          const data = await store.dispatch('getMenuLists')
          router.addRoutes(data)
          next({
            ...to,
            replace: true
          })
        } catch (error) {
          await store.dispatch('REMOVE_INFO')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    /* has no token */
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
