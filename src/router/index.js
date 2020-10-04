import Vue from 'vue'
import VueRouter from 'vue-router'

import SignIn from '../components/SignIn.vue'
import Feed from "../components/Feed.vue";
import Profile from "../components/Profile.vue";

Vue.use(VueRouter)

const routes = [{
        path: "/signin",
        name: 'SignIn',
        component: SignIn
    },
    {
        path: "/",
        name: 'Feed',
        component: Feed,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: "/user",
        name: 'Profile',
        component: Profile,
        meta: {
            requiresAuth: true
        }
    }
]

export default new VueRouter({
    routes // short for `routes: routes`
})