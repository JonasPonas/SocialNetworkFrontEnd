import Vue from 'vue'
import Vuex from 'vuex'
import account from './modules/account'
import createPersistedState from "vuex-persistedstate";

import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'

Vue.use(Vuex);

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)

const store = new Vuex.Store({
    modules: {
        account
    },
    plugins: [createPersistedState()]
});

export default store