import axios from 'axios'

import Storage from '@/utils/storage'

// axios.defaults.baseURL = 'http://beepal-dev-api-2.ap-northeast-1.elasticbeanstalk.com'

// 產生 instance 並夾帶 api base url
const axiosInstance = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 10000, // timeout 時間暫定為10秒
})

// 建立請求佇列
let pendingQueue = new Map()
// 建立 axios CancelToken constructor function
let CancelToken = axios.CancelToken

// 判斷request是否在佇列中，如果在就對佇列中的request取消操作
const judgePendingFunc = function(config) {
  if (pendingQueue.has(`${config.method}->${config.url}`)) {
    pendingQueue.get(`${config.method}->${config.url}`)() //注意這裡的括號不要漏掉
  }
}

// 刪除佇列中對應已執行的request
const removeResolvedFunc = function(config) {
  if (pendingQueue.has(`${config.method}->${config.url}`)) {
    pendingQueue.delete(`${config.method}->${config.url}`)
  }
}

// 請求 攔截
axiosInstance.interceptors.request.use(
  config => {
    // 先取消正在pending的相同request
    judgePendingFunc(config)

    // 將pending佇列中的請求設定為當前
    config.cancelToken = new CancelToken(cb => {
      // cb就是取消該請求的方法，呼叫它就能cancel掉當前請求
      pendingQueue.set(`${config.method}->${config.url}`, cb)
    })

    const token = Storage.getLocal('token') || '' // 從 localStorage 取出token

    // 若 token 存在 就在header中置入 token (Bearer token)
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },

  // 錯誤處裡
  err => Promise.reject(err)
)

// 回應 攔截
axiosInstance.interceptors.response.use(
  // response 攔截處理
  response => {
    const res = response.data

    // 呼叫removeResolvedFunc在佇列中刪除執行過的請求
    removeResolvedFunc(response.config)

    // response status 錯誤處理
    if (response.status < 200 || response.status >= 400) {
      console.log('response status !== 2xx, 3xx')

      return Promise.reject(
        new Error(res.message || 'service.interceptors.response------Error')
      )
    } else {
      return res
    }
  },

  // error 攔截處理
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 400:
          console.log('-----------400----------')
          return Promise.reject(error.response)
        case 401:
          // 登出時回應401，且無其他response
          console.log('-----------401 Unauthorized----------')
          return Promise.reject(error.response)
        case 403:
          // 登入失敗或是無權訪問
          console.log('-----------403 Forbidden----------')
          return Promise.reject(error.response)
        default:
          console.error('response-default-error!')
          return Promise.reject(error.response)
      }
    } else {
      return Promise.reject(error.response)
    }
  }
)

async function request({
  url,
  method,
  data = {},
  params = {},
  timeout = 10000,
  cancel = true,
}) {
  return new Promise((resolve, reject) => {
    axiosInstance({
      url,
      method,
      data,
      params,
      timeout,
      cancel,
    })
      .then(res => {
        if (res.message.toLowerCase() !== 'success') {
          reject(res)
        } else {
          resolve(res.data)
        }
      })
      .catch(error => {
        if (error) {
        console.log('error: ', error)
        // 為了做 token 過期判斷 回傳 false 給 router
        if (error.status == 403) {
          reject(false)
          return
        }
        reject(error)
        }
      })
  })
}

// 輸出 request
export default request
