import request from '@/utils/request'

export default {
  // 拉取全部幣種資料
  coinsInit: async ({ commit }) => {
    console.log('coins init!')
    // 這邊先將 page_size調整到 100 以拉取現階段全部幣種資料
    const res = await request({ url: '/coin/', method: 'get', params: { page_size: 100 } })
    const data = res.results
    commit('setCoins', data)
  },

  // 拉取全部匯率資料，並整理成匯率表
  quotesInit: async ({ commit }) => {
    const res = await request({ url: '/coin/rate/', method: 'get' })
    const initialQuotes = res
    const quotesToUSDT = initialQuotes.map(initialQuote => {
      const fromCoinId = initialQuote.from_coin.id
      const fromCoin = initialQuote.from_coin
      const toCoin = initialQuote.to_coin
      const initialRatio = Number(initialQuote.rate)

      let value
      let coin

      if (fromCoinId == 9) {
        // 如果是 from USDT 價值就是 1 / initialRatio 
        value = 1 / initialRatio
        coin = toCoin
      } else {
        // 如果是 to USDT 價值就是 initialRatio / 1
        value = initialRatio / 1
        coin = fromCoin
      }

      return {
        ...coin,
        rate: value
      }

    })

    // 最後再加入 USDT 自己
    const USDTInfo = initialQuotes.find(initialQuote => initialQuote.from_coin.id == 9).from_coin
    const USDTRatio = {
      ...USDTInfo,
      rate: 1
    }
    quotesToUSDT.push(USDTRatio)
    commit('setQuotes', quotesToUSDT)
  },

  // reset coin 資料
  resetCoinState: ({ commit }) => {
    commit('setCoins', [])
    commit('setQuotes', [])
  }
}
