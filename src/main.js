import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import store from './store';

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import App from './App.vue'
import router from './router'


Vue.use(BootstrapVue, axios, VueAxios)
Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (store.state.account.user == null) {
      next({ name: 'SignIn' });
    } else {
      next()
    }
  } else {
    next() // does not require auth, make sure to always call next()!
  }
})

new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  store,
  render: h => h(App)
})