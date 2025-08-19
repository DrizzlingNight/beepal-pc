import request from '@/utils/request'

export default {
  // 拉取當前使用者 基本資料
  currentUserInfoInit: async ({ commit }) => {
    try {
      const res = await request({ url: '/user/me/', method: 'get' })
      const data = res
      commit('setCurrentUserInfo', data)
      commit('setIsLogin', true)
      return true
    } catch (err) {
      console.log(err)
      commit('setIsLogin', false)
    }
  },

  // 拉取當前使用者 錢包資訊
  currentUserWalletInit: async ({ commit }) => {
    try {
      const res = await request({ url: '/user/wallet/', method: 'get' })
      // const data = res.results[0]
      const data = res.results
      commit('setCurrentUserWallet', data)
    } catch (err) {
      console.log(err)
    }
  },

  // 拉取當前使用者 錢包餘額
  currentUserBalancesInit: async ({ commit }) => {
    try {
      const res = await request({ url: '/user/balance/', method: 'get' })
      const data = res.results
      commit('setCurrentUserBalances', data)
    } catch(err) {
      console.log(err)
    }
  },

  // 拉取當前使用者 支付通道
  currentUserChannelInit: async ({ commit }) => {
    try {
      const res = await request({ url: '/user/payment/', method: 'get' })
      const data = res.results
      commit('setCurrentUserChannel', data)
    } catch (err) {
      console.log(err)
    }
  },

  // 重置 user 資料
  resetUserState: ({ commit }) => {
    commit('setCurrentUserInfo', {})
    commit('setCurrentUserWallet', [])
    commit('setCurrentUserBalances', [])
    commit('setCurrentUserChannel', [])
    commit('setIsLogin', false)
  }
}
