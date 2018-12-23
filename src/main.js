import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// plugins
import '@/plugins/element'
// app css
import 'font-awesome/css/font-awesome.min.css'
import '@/assets/css/app.scss'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')