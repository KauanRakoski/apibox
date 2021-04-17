import Vue from 'vue'
import VueRouter from 'vue-router'
import Auth from '../views/Auth'
import Dashboard from '../views/Dashboard'


Vue.use(VueRouter)

const routes = [
  {path: '/dashboard', name: 'Dashboard',  component: Dashboard, props: true},
  { path: '/auth', name: 'Auth', component: Auth },
  {path: '/new', name:'New', component: () => import(/* webpackChunkName: "add" */ '../views/New.vue'), props: true},
  {path: '/settings', name:'Settings', component: () => import(/* webpackChunkName: "settings" */ '../views/Settings.vue')},
  {path: '/subscribe', name:'Subscription', component: () => import(/* webpackChunkName: "subscribe" */ '../views/Subscription.vue')},
  { path: '/qr/:id', component: () => import(/* webpackChunkName: "qr" */ '../views/Qresponse.vue') }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
