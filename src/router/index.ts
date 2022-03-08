import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Login from '../views/login/index.vue'
import Layout from '../views/layout/index.vue'
import Customer from '../views/basicInfo/customer/index.vue'
import Respository from '../views/basicInfo/respository/index.vue'
import DataDictionary from '../views/system_management/data_dictionary/index.vue'
import Material from '../views/basicInfo/material/index.vue'
import MaterialClassification from '../views/basicInfo/materialclassification/index.vue'
import Supplier from '../views/basicInfo/supplier/index.vue'
import Unitofmeasurement from '../views/basicInfo/unitofmeasurement/index.vue'

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
        path: 'respository',
        component: Respository
      },
      {
        path: 'customer',
        component: Customer
      },
      {
        path: 'data_dictionary',
        component: DataDictionary
      },
      {
        path: 'material',
        component: Material
      },
      {
        path:'materialclassification',
        component: MaterialClassification
      },
      {
        path: 'supplier',
        component: Supplier
      },
      {
        path: 'unitofmeasurement',
        component: Unitofmeasurement
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
