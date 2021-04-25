import Vue from 'vue'
import Router from 'vue-router'

// Layout
import Layout from '@/components/Layout'

Vue.use(Router)
// 静态路由
export const constantRoutes = [{
  path: '/login',
  component: () => import('@/views/Login'),
  hidden: true
}, {
  path: '/404',
  component: () => import('@/views/404'),
  hidden: true
},
{
  path: '/',
  component: Layout,
  redirect: '/home',
  children: [{
    path: '/home',
    name: 'Home',
    component: () => import('@/views/Home'),
    meta: {
      title: '首页',
      icon: 'icon-home'
    }
  }]
}]
const createRouter = () => new Router({
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRoutes
})

const router = createRouter()
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}
export default router
