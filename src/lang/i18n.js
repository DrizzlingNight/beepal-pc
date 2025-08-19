import Vue from 'vue'
import VueI18n from 'vue-i18n'
import tw from '@/lang/zh-TW'
// import cn from '@/lang/zh-CN'
import en from '@/lang/en-US'
import Storage from '@/utils/storage'

Vue.use(VueI18n)

// 從瀏覽器存區拿出locale，預設為繁體中文
const locale = Storage.getLocal('locale') || 'tw'
console.log('locale: ', JSON.stringify(Storage.getLocal('locale')))

const i18n = new VueI18n({
  locale,
  messages: {
    tw,
    en,
    // cn,
  },
})

export default i18n
