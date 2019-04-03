import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    component: () => import('../views/GoodsList'),
    // children: [
    //     {
    //         path: 'title',
    //         component: () => import('../components/title'),
    //     },
    //     {
    //         path: 'img',
    //         component: () => import('../components/img'),
    //     },
    //     {
    //         path: 'cart',
    //         component: () => import('../views/cart'),
    //     },
    // ]
}]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router