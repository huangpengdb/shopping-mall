import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import axios from 'axios'
import VueLazyLoad from 'vue-lazyload'
import infiniteScroll from 'vue-infinite-scroll'

Vue.use(infiniteScroll)
Vue.prototype.axios = axios
Vue.use(VueRouter)
Vue.use(VueLazyLoad, {
    preLoad: 1.3,
    error: require('./assets/logo.png'),
    loading: require('./assets/static/loading-svg/loading-spin.svg'),
    attempt: 1
})

import router from './router/index.js'

Vue.config.productionTip = false

new Vue({
    router,
	render: h => h(App),
}).$mount('#app')