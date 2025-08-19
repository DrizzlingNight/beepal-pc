export default {
  setCoins: (state, data) => {
    state.coins = [...data]
  },

  setQuotes: (state, data) => {
    state.quotes = [...data]
  },
}
