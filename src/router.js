import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/pages/Home.vue'
import Learn from '@/pages/Learn.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'index',
    redirect: '/home'
  },
  {
    path: '*',
    name: '404',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path: '/learn',
    name: 'learn',
    component: Learn
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
