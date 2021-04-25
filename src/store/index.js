import Vue from 'vue'
import Vuex from 'vuex'
import {
  getToken,
  setToken,
  removeToken
} from '../utils/cookies'
import api from '../request/api/user'
import {
  constantRoutes
} from '../router/index'
import Cookies from 'js-cookie'
Vue.use(Vuex)
const loadView = viewPath => {
  if (viewPath.indexOf('Layout') > -1) {
    // 存在
    return () => import(`@/components/${viewPath}.vue`)
  } else {
    // 用字符串模板实现动态 import 从而实现路由懒加载
    return () => import(`@/views/${viewPath}.vue`)
  }
}
export const permissionFun = data => {
  data.forEach(item => {
    item.component = loadView(item.component)
    if (item.children && item.children.length > 0) {
      permissionFun(item.children)
    }
    if (item.meta && item.children) {
      item.redirect = item.children[0].path
    }
  })
  return data
}
export default new Vuex.Store({
  state: {
    token: getToken() || '',
    name: '',
    avatar: null,
    menuList: [],
    isCollapse: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : false// 默认是展开的
  },
  getters: {
    isCollapse: state => state.isCollapse
  },
  mutations: {
    TOGGLE_SIDEBAR (state) {
      state.isCollapse = !state.isCollapse
      state.withoutAnimation = false
      // 解决展开或者收起菜单栏之后刷新界面不起作用的问题
      if (state.isCollapse) {
        Cookies.set('sidebarStatus', 1)
      } else {
        Cookies.set('sidebarStatus', 0)
      }
    },
    SET_NAME (state, name) {
      state.name = name
    },
    SET_TOKEN (state, token) {
      state.token = token
      setToken(token)
    },
    SET_AVATAR (state, avatar) {
      state.avatar = avatar
    },
    SET_MENU (state, data) {
      state.menuList = constantRoutes.concat(data)
    },
    REMOVE_INFO (state) {
      state.name = ''
      state.token = ''
      state.avatar = null
      state.menuList = []
    }
  },
  actions: {
    login ({
      commit
    }, userInfo) {
      const {
        phone,
        psd
      } = userInfo
      return new Promise((resolve, reject) => {
        api.login(phone, psd).then((res) => {
          const {
            data
          } = res
          commit('SET_TOKEN', data.token)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    logout (context) {
      return new Promise((resolve, reject) => {
        api.logOut().then((res) => {
          if (res.status === 1) {
            context.commit('REMOVE_INFO')
            removeToken()
            resolve()
          }
        }).catch(err => {
          reject(err)
        })
      })
    },
    getInfo ({
      commit,
      state
    }) {
      return new Promise((resolve, reject) => {
        api.getInfo(state.token).then(res => {
          const data = res
          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.avatar)
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    },
    getMenuLists ({
      commit,
      state
    }) {
      return new Promise((resolve, reject) => {
        let menus
        api.getMenuLists(state.token).then(res => {
          menus = permissionFun(res)
          menus.push = {
            path: '*',
            redirect: '/404',
            hidden: true
          }
          commit('SET_MENU', menus)
          resolve(menus)
        }).catch(err => {
          reject(err)
        })
      })
    },
    toggleSideBar ({
      commit
    }) {
      commit('TOGGLE_SIDEBAR')
    }
  },
  modules: {}
})
