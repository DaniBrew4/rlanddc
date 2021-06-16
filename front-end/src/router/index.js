import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import User from '../views/User.vue'
import Admin from '../views/Admin.vue'
import Uploader from '../views/Uploader.vue'


Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/user',
        name: 'user',
        component: User
    },
    {
        path: '/admin',
        name: 'admin',
        component: Admin
    },
    {
        path: '/user/:id',
        name: 'uploader',
        component: Uploader
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
