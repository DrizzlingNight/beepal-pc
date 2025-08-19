import axios from 'axios'

export default {

  createShortUrl(requestObj) {
    const requestData = {
      ...requestObj,
      signature: '1d03274710',
      action: 'shorturl',
      format: 'json'
    }
    const formData = new FormData()
    Object.keys(requestData).forEach(key => formData.append(key, requestData[key]))
    return axios({
      method: 'post',
      url: 'https://kryptocoin.space/',
      data: formData
    })
  }

}
  
// 這些是回傳是 XML時要用的 XML parser
// const parser = new DOMParser()
//         const xmlDoc = parser.parseFromString(res.data, "text/xml")
//         const shortUrl = xmlDoc.getElementsByTagName("shorturl")[0].childNodes[0].nodeValue