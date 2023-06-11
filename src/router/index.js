import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Landing.vue'
import Authenticate from '../views/Authenticate.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/auth',
      name: 'authenticate',
      component: Authenticate
    }
  ]
})

export default router
