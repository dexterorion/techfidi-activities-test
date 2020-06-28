import Vue from 'vue'
import App from './App.vue'
import { store } from './store/store'
import VueMaterial from 'vue-material'
import "vue-material/dist/vue-material.min.css";
import "vue-material/dist/theme/default.css";

Vue.config.activityionTip = false

Vue.use(VueMaterial)

new Vue({
  render: h => h(App),
  store: store,
}).$mount('#app')
