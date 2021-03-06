import Vue from 'vue'
import App from '@/App.vue'
import axios from 'axios'
import router from '@/router'
import store from '@/store/index'
import event from '@/utils/event'


Vue.prototype.$event = event
Vue.prototype.$axios = axios

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
