import Vue from 'vue'
import Buefy from 'buefy'
import Cookie from 'vue-cookie'
import VueAxios from 'vue-axios'
import VueClipboard from 'vue-clipboard2'
import { sync } from 'vuex-router-sync'

import axios from 'axios'
import 'buefy/dist/buefy.css'

import App from './App.vue'

import router from './router/index'
import store from './store/index'

Vue.config.productionTip = false
VueClipboard.config.autoSetContainer = true

Vue.use(Buefy)
Vue.use(Cookie)
Vue.use(VueClipboard)
Vue.use(VueAxios, axios)

sync(store, router)

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
