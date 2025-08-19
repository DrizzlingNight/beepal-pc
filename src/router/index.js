import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/home'

import store from '@/store'

import alert from '@/utils/alert'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    redirect: '/',
  },
  // TODO 首頁
  {
    path: '/',
    name: 'Home',
    // component: Home,
    redirect: '/quotes'
  },
  // TODO 關於
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/about')
  },
  // TODO 買幣頁
  {
    path: '/buy/:id',
    name: 'Buy',
    component: () => import('@/views/buy')
  },
  // TODO 賣幣頁
  {
    path: '/sell/:id',
    name: 'Sell',
    component: () => import('@/views/sell')
  },
  // 註冊頁
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/register')
  },
  // 行情主頁
  {
    path: '/quotes',
    name: 'Quotes',
    component: () => import('@/views/quotes'),
  },
  // 幣幣兌換
  {
    path: '/exchange',
    name: 'Exchange',
    component: () => import('@/views/exchange')
  },
  // 錢包主頁
  {
    path: '/wallet',
    name: 'Wallet',
    component: () => import('@/views/wallet'),
  },
  // 課程介紹頁
  {
    path: '/courses/:id/info',
    name: 'CourseInfo',
    component: () => import('@/views/courseInfo'),
  },
  // 課程學習頁
  {
    path: '/courses/:id',
    name: 'Course',
    component: () => import('@/views/course'),
  },
  // TODO 資訊頁
  {
    path: '/information',
    name: 'Information',
    component: () => import('@/views/information')
  },
  // TODO 發現頁
  {
    path: '/explore',
    name: 'Explore',
    component: () => import('@/views/explore')
  },
  // TODO 廣告商頁
  {
    path: '/advertisers',
    name: 'Advertisers',
    component: () => import('@/views/advertisers')
  },
  // TODO 帳號頁
  {
    path: '/account',
    name: 'Account',
    component: () => import('@/views/account')
  },
  // TODO 通知頁
  {
    path: '/notification',
    name: 'Notification',
    component: () => import('@/views/notification')
  },
  // 錯誤路徑先導到首頁
  // {
  //   path: '*',
  //   redirect: '/'
  // },
  // 404
  {
    path: '*',
    name: '404',
    component: () => import('../views/NotFound.vue'),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
  linkActiveClass: 'active',
})

router.beforeEach(async (to, from, next) => {
  const isLogin = store.state.user.isLogin
  
  // 那些 不用登入就能造訪的 開放頁面
  const pathWithoutLogin = ['Home', 'Register', 'Quotes', '404']

  // 那些 "不能"被登入使用者造訪的 限定頁面
  const pathWithNoLogin = ['Register']

  // 那些 還沒準備好的頁面 需要導到H5 >>
  const pathNotReady = ['About', 'Information', 'Buy', 'Sell', 'Explore', 'Account', 'Advertisers', 'Notification']


  // 每次跳轉前都先關閉 vuex 的 系統彈窗狀態
  store.commit('system/closeAllSystemDialogs')

  if (isLogin) {
    const isTokenFresh = await store.dispatch('user/currentUserInfoInit')
    // 登入狀態下 token 過期
    if (!isTokenFresh) {
      store.dispatch('user/resetUserState')
      next('/home')
      return
    }

    // 登入狀態下想要進入 僅限非登入頁面
    if (pathWithNoLogin.includes(to.name)) {
      next('/home')
    }

  } else {
    // 非登入狀態下 想訪問 須登入頁面
    if (!pathWithoutLogin.includes(to.name)) {
      // 彈出 登入對話框 ( 先關閉再打開 )
      store.commit('system/setLoginDialogStatus', false)
      store.commit('system/setLoginDialogStatus', true)
      // 如果沒有 from.name 就表示由網址進入，就踢到首頁
      if (!from.name) {
        next('/home')
      }
      return
    }
  }

  // 只要想進到未完成頁面就導流
  if (pathNotReady.includes(to.name)) {
    // 彈出 H5導流對話框
    alert.toast.fire({
      icon: 'warning',
      title: '功能未完成，請轉往H5版本'
    })
    return
  }

  next()
})

export default router
