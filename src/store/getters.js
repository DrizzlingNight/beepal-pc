// 從 Vuex中取值的方法

// Vue Getter 一律用 VG__ 開頭
import { getKtFromListByKf } from '@/utils'

const getters = {
  // ******** 系統狀態相關 ******** //

  // 取得登入對話框開啟狀態
  getIsLoginDialogActive: state => state.system.isLoginDialogActive,

  // 取得系統語言
  getLocale: state => state.system.locale,

  // ******** 當前使用者相關 ******** //

  // 取得當前使用者基本資料
  getCurrentUserInfo: state => state.user.currentUserInfo,

  // 取得當前使用者登入狀態
  getIsLogin: state => state.user.isLogin,

  // 取得當前使用者錢包資訊列表
  getCurrentUserWallet: state => state.user.currentUserWallet,

  // 取得當前使用者錢包餘額列表
  getCurrentUserBalances: state => state.user.currentUserBalances,

  // 取得當前使用者錢包總餘額(USDT)
  getCurrentUserWalletTotal: state => {
    const balances = state.user.currentUserBalances
    const quotes = state.coin.quotes
    let total = 0

    balances.forEach(balance => {
      const targetQuote = quotes.find(quote => quote.id == balance.coin)
      if (targetQuote) {
        total += Number(balance.amount) * Number(targetQuote.rate)
      }
    })

    return total
  },

  // 取得當前使用者錢包指定幣種餘額
  getCurrentUserCoinBalance: state => coinId =>
    getKtFromListByKf(
      state.user.currentUserBalances,
      'coin',
      'amount',
      coinId,
      0
    ),

  // 取得當前使用者支付渠道列表
  getCurrentUserChannel: state => state.user.currentUserChannel,

  // ******** 幣種相關 ******** //

  // 取得全部幣種資料
  getCoins: state => state.coin.coins,

  // 取得全部虛擬幣資料
  getCryptoCoins: state => state.coin.coins.filter(coin => coin.is_crypto),

  // 取得全部匯率資料
  getQuotes: state => state.coin.quotes,

  // 取得全部虛擬幣匯率資料
  getCryptoQuotes: state => state.coin.quotes.filter(quote => quote.is_crypto),

  // 取得具有真實行情的資料
  getKlineQuotes: state => state.coin.quotes.filter(quote => quote.kline),

  // 取得單一幣種匯率資料
  getQuote: state => coinId => state.coin.quotes.find(quote => quote.id == coinId)
}

//     // ******** 使用者資訊 ******** //
//     VG__userInfo: state => state.user.userInfo || storage.getLocal('userInfo'),
//     VG__userChannel: state => state.user.userChannel,

//     // ******** 幣幣資訊 ******** //
//     VG__coinList: state => storage.getLocal('coinList') || state.data.coinList,
//     VG__crypto_coinList: state => state.data.coinList.filter(o => o.isCrypto),
//     VG__show_crypto_coinList: state => state.data.coinList.filter(o => o.isCrypto && o.is_show),
//     VG__coinListWithoutCny: state => state.data.coinList.filter(o => o.id !== 1), // 1是cny的id
//     VG__getCoinLabelById: state => val =>
//     getKtFromListByKf(state.data.coinList, 'id', 'label', val, ''),
//     VG__getCoinInfoById: state => val =>
//         state.data.coinList.find(o => o.id === val),
//     VG__getCoinInfoByCode: state => val =>
//         state.data.coinList.find(o => o.code === val),
//     VG__getCoinIdByLabel: state => val =>
//         getKtFromListByKf(state.data.coinList, 'label', 'id', val, -1),
//     VG__getUSDTId: state =>
//         getKtFromListByKf(state.data.coinList, 'label', 'id', 'USDT', -1),
//     VG__getCoinDecimalPlacesById: state => val =>
//         getKtFromListByKf(state.data.coinList, 'id', 'decimalPlaces', val, 4),
//     VG__getCoinDecimalPlacesByLabel: state => val =>
//         getKtFromListByKf(state.data.coinList, 'label', 'decimalPlaces', val, 4),
//     VG__getCoinDecimalPlacesByCode: state => val =>
//         getKtFromListByKf(state.data.coinList, 'label', 'code', val, 4),

//     // ******** 錢包資訊 ******** //
//     VG__userWallet: state => state.user.userWallet,
//     VG__getWalletById: state => val =>
//         getKtFromListByKf(state.user.userWallet, 'coin', 'address', val, ''),
//     VG__getWalletByCode: state => val => {
//         // myConsole.info('val', val)
//         // myConsole.info('user.userWallet', state.user.userWallet)
//         return state.user.userWallet.find(o => o.coin_code === val)
//     },
//     VG__getWalletByCoin: state => val =>
//         state.user.userWallet.find(o => o.coin === val),
//     VG__getTIM: state => state.timweb.TIM,

//     // ******** tpay中的功能 ******** //
//     TPG__getFriends: state => val => {
//         // myConsole.info('state.tpay', state.tpay)
//         return state.tpay.friends.find(o => o.friend.id === val)
//     },

//     // ******** 腾讯IM的getters内容 ******** //
//     TG__getConversations: state => state.timweb.conversations,
//     TG__haveConversations: state => val => state.timweb.conversations.find(o => o.conversationID === val),
//     TG__get_one_msg: state => (val) => state.timweb.to_user_msg[val],
//     TG__msgChange: state => state.timweb.msgChange,
//     TG__status: state => state.timweb.login && state.timweb.ready,

export default getters
