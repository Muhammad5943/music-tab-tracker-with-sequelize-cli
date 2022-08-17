import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import { sync } from 'vuex-router-sync'
import VueYouTubeEmbed from 'vue-youtube-embed'
import Panel from './components/global/Panel.vue'


Vue.config.productionTip = false
Vue.use(VueYouTubeEmbed)

// make component globally imported
Vue.component('panel', Panel)

sync(store, router)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
