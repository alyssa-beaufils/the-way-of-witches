import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Sandbox from '../views/Sandbox.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/sandbox',
    name: 'sandbox',
    component: Sandbox
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router