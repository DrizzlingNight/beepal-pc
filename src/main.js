// common
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import i18n from './lang/i18n'
import qs from 'qs'
import VueMeta from 'vue-meta'

// modules
import storage from '@/utils/storage'
import request from '@/utils/request'
import alert from '@/utils/alert'

// css
import '@/styles/main.scss'

Vue.config.productionTip = false

Vue.use(VueMeta)

// request.js
Vue.prototype.$request = request
// queryString parser
Vue.prototype.$qs = qs
// Storage.js
Vue.prototype.$storage = storage
// alert.js
Vue.prototype.$alert = alert

new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: h => h(App),
}).$mount('#app')
