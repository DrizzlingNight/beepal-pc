export default {

  // 置入 登入對話框開啟狀態
  setLoginDialogStatus: (state, data) => {
    state.isLoginDialogActive = data
  },

  // 關閉所有對話框
  closeAllSystemDialogs: state => {
    state.isLoginDialogActive = false
  },

  // 設置系統語言
  setLocale: (state, data) => state.locale = data,
}