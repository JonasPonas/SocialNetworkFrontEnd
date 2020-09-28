import Vue from 'vue'
import VueRouter from 'vue-router'

import LoginRegister from '../components/LoginRegister.vue'
import Feed from "../components/Feed.vue";

Vue.use(VueRouter)

const routes = [{
        path: "/signin",
        name: 'LoginRegister',
        component: LoginRegister
    },
    {
        path: "/",
        name: 'Feed',
        component: Feed,
        meta: {
            requiresAuth: true
        }
    }
]

export default new VueRouter({
    routes // short for `routes: routes`
})