export default {
  // 置入當前使用者資料
  setCurrentUserInfo: (state, data) => {
    state.currentUserInfo = {
      ...data,
    }
  },

  // 置入當前使用者錢包資訊
  setCurrentUserWallet: (state, data) => {
    state.currentUserWallet = {
      ...data,
    }
  },

  // 置入當前使用者餘額列表
  setCurrentUserBalances: (state, data) => {
    state.currentUserBalances = [...data]
  },

  // 置入當前使用者支付通道列表
  setCurrentUserChannel: (state, data) => {
    state.currentUserWallet = [...data]
  },

  // 改變是否登入的狀態
  setIsLogin: (state, data) => {
    state.isLogin = data
  }
}
