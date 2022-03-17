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
import Currency from '../views/basicInfo/currency/index.vue'
import BankAccount from '../views/basicInfo/bankaccount/index.vue'
import InventoryGainWarehousing from '../views/Inventory_management/Warehousing_management/InventoryGainWarehousing/index.vue'
import OtherWarehousing from '../views/Inventory_management/Warehousing_management/OtherWarehousing/index.vue'
import PurchaseReturnIssue from '../views/Inventory_management/Warehousing_management/PurchaseReturnIssue/index.vue'
import PurchaseWarehousing from '../views/Inventory_management/Warehousing_management/PurchaseWarehousing/index.vue'
import SaturationOfStackRoom from '../views/Inventory_management/Warehousing_management/SaturationOfStackRoom/index.vue'
import SalesDelivery from '../views/Inventory_management/Outbound_management/SalesDelivery/index.vue'
import SalesReturnReceipt from '../views/Inventory_management/Outbound_management/SalesReturnReceipt/index.vue'
import Inventorylossdelivery from '../views/Inventory_management/Outbound_management/Inventorylossdelivery/index.vue'
import OtherDelivery from '../views/Inventory_management/Outbound_management/OtherDelivery/index.vue'

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
      },
      {
        path: 'currency',
        component: Currency
      },
      {
        path: 'bankaccount',
        component: BankAccount
      },
      {
        path:'inventorygainwarehousing',
        component: InventoryGainWarehousing
      },
      {
        path:'otherwarehousing',
        component: OtherWarehousing
      },
      {
        path:'purchasereturnissue',
        component: PurchaseReturnIssue
      },
      {
        path:'purchasewarehousing',
        component: PurchaseWarehousing
      },
      {
        path:'salesdelivery',
        component: SalesDelivery
      },
      {
        path:'salesreturnreceipt',
        component: SalesReturnReceipt
      },
      {
        path:'inventorylossdelivery',
        component: Inventorylossdelivery
      },
      {
        path:'otherdelivery',
        component: OtherDelivery
      },
      {
        path:'saturationofstackroom',
        component: SaturationOfStackRoom
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
