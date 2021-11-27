import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Word',
    component: () => import(/* webpackChunkName: "word" */ '../views/Word.vue'),
  },
  {
    path: '/my',
    name: 'my',
    component: () => import(/* webpackChunkName: "my" */ '../views/My.vue'),
  },
]

const router = new VueRouter({
  routes,
})

export default router
