import store from '@/store'

// 時間換算相關
export const durationFilters = {
  filters: {
    // 秒 -> "xx(分) : xx(秒)"
    calculateDuration(secs) {
      const minutes = Math.floor(secs / 60)
      const seconds = Math.floor(secs % 60)
      const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`
      const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`

      return `${returnedMinutes}:${returnedSeconds}`
    },
    // 秒 -> x.x小時
    calculateDurationToHours(secs) {
      return secs % 3600 === 0 ? secs / 3600 : (secs / 3600).toFixed(1)
    },
  },
}

export const priceFilters = {
  filters: {
    // 簡化小數點後方多餘的0
    simplifyPrice(price) {
      return Number(price)
    },
    // 加上數字逗號
    toLocaleString(price) {
      return Number(price).toLocaleString()
    },
    // 省略到小數點後2位
    toFixedNumber(price) {
      return Number(price).toFixed(2)
    }
  },
}

export const dateFilters = {
  filters: {
    // 將日期從'2021-09-27T10:41:00.907840'中取出
    getDateFromTimeString(timeString) {
      const initialDate = timeString.split('T')[0]
      const date = initialDate.replaceAll('-', '/')
      return date
    },
    // 將時間從'2021-09-27T10:41:00.907840'中取出並簡化秒數
    getTimeFromTimeString(timeString) {
      const time = timeString.split('T')[1]
      const initialSecond = time.split(':')[2]
      const second = Number(initialSecond) < 10 ? `0${Number(initialSecond).toFixed(0)}` : Number(initialSecond).toFixed(0)
      return `${time.split(':')[0]}:${time.split(':')[1]}:${second}`
    }
  }
}

export const coinFilters = {
  filters: {
    // 轉化coinId為coin名稱
    translateCoinName(coinId) {
      if (coinId) {
        const coin = store.getters['getCoins'].find(coin => coin.id == coinId)
        return coin.name
      }
    },
  },
}
