import { createRouter, createWebHistory } from 'vue-router'
import UsersView from '../views/UsersView.vue'
import MenuConfigView from '../views/MenuConfigView.vue'

const routes = [
  {
    path: '/admin/users',
    name: 'users',
    component: UsersView
  },
  {
    path: '/admin/menu-config',
    name: 'menu-config',
    component: MenuConfigView
  }
]

export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
}) 