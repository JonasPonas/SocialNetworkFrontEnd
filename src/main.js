import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import store from './store';

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import App from './App.vue'
import router from './router'
import VueSession from 'vue-session'

axios.defaults.withCredentials = true
// axios.create({ withCredentials: true, })

// const instance = axios.create({
//   withCredentials: true,
//   baseURL: "http://localhost:5004"
// })
var options = {
  persist: true
}
Vue.use(BootstrapVue, axios, VueAxios, VueSession, options)
Vue.config.productionTip = false

Vue.directive('click-outside', {
  bind: function (el, binding, vnode) {
    el.clickOutsideEvent = function (event) {
      // here I check that click was outside the el and his children
      if (!(el == event.target || el.contains(event.target))) {
        // and if it did, call method provided in attribute value
        vnode.context[binding.expression](event);
      }
    };
    document.body.addEventListener('click', el.clickOutsideEvent)
  },
  unbind: function (el) {
    document.body.removeEventListener('click', el.clickOutsideEvent)
  },
});

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