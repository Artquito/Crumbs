import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Calendar from 'v-calendar'

Vue.config.productionTip = false
Vue.use(Calendar,{
  componentPrefix:"vc"
});
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
