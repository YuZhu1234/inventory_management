import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Login from '../views/login/index.vue'
import Layout from '../views/layout/index.vue'
import Customer from '../views/basicInfo/customer/index.vue'
import Stock from '../views/basicInfo/stock/index.vue'
import DataDictionary from '../views/system_management/data_dictionary/index.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'Home',
    component: Login
  },
  {
    path: '/',
    name: 'layout',
    component: Layout,
    children:[
      {
        path: 'stock',
        component: Stock
      },
      {
        path: 'customer',
        component: Customer
      },
      {
        path: 'data_dictionary',
        component: DataDictionary
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
