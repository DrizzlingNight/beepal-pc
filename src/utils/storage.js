// Storage 儲存操作

class Storage {
  constructor() {
    this.ls = window.localStorage
    this.ss = window.sessionStorage
  }

  // ****************** COOKIE ************************

  // 設置 cookie，參數: key,value, 過期時間預設10分鐘
  setCookie(key, value, expires = 10) {
    // 取得現在時間
    const exp = new Date()
    // 設置過期時間點(now + 時效(毫秒))
    exp.setTime(exp.getTime() + expires * 60 * 1000)

    document.cookie = `${key}=${value};expires=${exp.toGMTString()}`
  }

  // 取得 cookie，參數: key
  // 注意: 過期後，得到的cookie為 null
  getCookie(key) {
    let arr
    const reg = new RegExp(`(^| )${key}=([^;]*)(;|$)`)

    if ((arr = document.cookie.match(reg))) {
      return unescape(arr[2])
    } else {
      return null
    }
  }

  // 刪除 cookie，參數: key
  removeCookie(key) {
    const exp = new Date()
    exp.setTime(exp.getTime() - 1)
    const value = this.getCookie(key)
    // 如果還沒過期就直接讓它過期
    if (value != null) {
      document.cookie = `${key}=${value};expires=${exp.toGMTString()}`
    }
  }

  // ***************** localStorage *******************

  // 設置 localStorage
  setLocal(key, value) {
    var setting = arguments[0]
    if (Object.prototype.toString.call(setting).slice(8, -1) === 'Object') {
      for (let i in setting) {
        this.ls.setItem(i, JSON.stringify(setting[i]))
      }
    } else {
      this.ls.setItem(key, JSON.stringify(value))
    }
  }

  // 獲得 localStorage
  getLocal(key) {
    const item = key ? this.ls.getItem(key) : null
    try {
      const result = JSON.parse(item)
      return result
    } catch (err) {
      console.log('getLocalError: ', err)
      return null
    }
  }

  // 刪除 localStorage
  removeLocal(key) {
    this.ls.removeItem(key)
  }

  // 清空全部 localStorage
  clearLocal() {
    this.ls.clear()
  }

  // ******************* sessionStorage **********************

  // 設置 sessionStorage
  setSession(key, value) {
    var setting = arguments[0]
    if (Object.prototype.toString.call(setting).slice(8, -1) === 'Object') {
      for (let i in setting) {
        this.ss.setItem(i, JSON.stringify(setting[i]))
      }
    } else {
      this.ss.setItem(key, JSON.stringify(value))
    }
  }

  // 獲得 sessionStorage
  getSession(key) {
    const item = key ? this.ss.getItem(key) : null
    try {
      const result = JSON.parse(item)
      return result
    } catch (err) {
      console.log('getSessionError: ', err)
      return null
    }
  }

  // 刪除 sessionStorage
  removeSession(key) {
    this.ss.removeItem(key)
  }

  // 清空 sessionStorage
  clearSession() {
    this.ss.clear()
  }
}

export default new Storage()
