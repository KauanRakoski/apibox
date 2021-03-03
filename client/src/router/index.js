import Vue from 'vue'
import VueRouter from 'vue-router'
import Auth from '../views/Auth'
import Dashboard from '../views/Dashboard'
import Subscription from '../views/Subscription'

Vue.use(VueRouter)

const routes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/auth',
    name: 'Auth',
    component: Auth
  },
  {path: '/new', name:'New', component: () => import(/* webpackChunkName: "add" */ '../views/New.vue'), props: true},
  {path: '/settings', name:'Settings', component: () => import(/* webpackChunkName: "settings" */ '../views/Settings.vue')},
  {path: '/subscribe', name:'Subscription', Subscription}
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
