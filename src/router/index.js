import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Sandbox from '../views/Sandbox.vue'
import Credits from '../views/Credits.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/Sandbox',
    name: 'sandbox',
    component: Sandbox,
    meta: {showNav: true}
  },
  {
    path: '/Credits',
    name: 'credits',
    component: Credits,
    meta: {showNav: true}
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes
})

export default router