import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import getters from './getters'

import system from './modules/system'
import user from './modules/user'
import coin from './modules/coin'

Vue.use(Vuex)

const modules = {
  system,
  user,
  coin,
}

const store = new Vuex.Store({
  modules,
  getters,
  // 這個插件讓Vuex的儲存區在網頁重整後不會消失
  plugins: [createPersistedState()],
})

export default store
