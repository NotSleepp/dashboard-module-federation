import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('admin-module/AdminApp')
  },
  {
    path: '/admin/users',
    name: 'users',
    component: () => import('admin-module/AdminApp')
  },
  {
    path: '/admin/menu-config',
    name: 'menu-config',
    component: () => import('admin-module/AdminApp')
  }
]

export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
}) 