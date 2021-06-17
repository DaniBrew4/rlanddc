import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import User from '../views/User.vue'
import Admin from '../views/Admin.vue'
import Uploader from '../views/Uploader.vue'
import About from '../views/About.vue'
import Services from '../views/Services.vue'
import Dyslexia from '../views/Dyslexia.vue'
import Contact from '../views/Contact.vue'

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
    {
        path: '/admin',
        name: 'admin',
        component: Admin
    },
    {
        path: '/about-us',
        name: 'about',
        component: About
    },
    {
        path: '/services',
        name: 'services',
        component: Services
    },
    {
        path: '/dyslexia',
        name: 'dyslexia',
        component: Dyslexia
    },
    {
        path: '/contact-us',
        name: 'contact',
        component: Contact
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
