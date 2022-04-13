<template>
  <el-container class="layout-container">
    <el-aside>
      <AppAside/>
    </el-aside>
    <el-container>
      <el-header>
        <div >
        <i :class= "{
          'el-icon-s-unfold':isCollapse,
          'el-icon-s-fold':!isCollapse
          }"
        @click="isCollapse=!isCollapse"></i>
        <span class="left">IC设计企业库存管理系统</span>
        </div>
        <div class="right">
        <img class="avatar" src="./avator.png" alt="">
        <span>test-yu</span>
       </div>
      </el-header>
      <el-main class="el-main">
        <!--<el-breadcrumb :separator-icon="ArrowRight">
         <el-breadcrumb-item style="bread" >
            {{store.state.currentMenu}}
          </el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/' }">homepage</el-breadcrumb-item>
          <template v-for="(item,index) in breadList">
            <el-breadcrumb-item
              :key="index"
              @click="breadCrumbClick(item)"
              v-if="item.name"
              style="cursor:pointer"
            >
              {{item.name}}
            </el-breadcrumb-item>
          </template> 
          <el-breadcrumb-item>promotion list</el-breadcrumb-item>
          <el-breadcrumb-item>promotion detail</el-breadcrumb-item>
        </el-breadcrumb> -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AppAside from './asside/index.vue'
import { useStore } from 'vuex'
import router from '../../router'

export default defineComponent({
  name:'layout',
  components: {
    AppAside
  },
  setup () {
    const isCollapse = false
    const breadList = [
      {
        path: 'respository',
        name: '仓库'
      },
      {
        path: 'customer',
        name: '客户'
      },
      {
        path: 'data_dictionary',
        name: '供应商'
      },
      {
        path: 'material',
        name: '物料'
      },
      {
        path:'materialclassification',
        name: '物料分类'
      },
      {
        path: 'supplier',
        name: '供应商'
      },
      {
        path: 'unitofmeasurement',
        name: '计量单位'
      },
      {
        path: 'currency',
        name: '货币'
      },
      {
        path: 'bankaccount',
        name: '银行账户'
      },
      {
        path:'inventorygainwarehousing',
        name: '盘盈入库'
      },
      {
        path:'otherwarehousing',
        name: '其他入库'
      },
      {
        path:'purchasereturnissue',
        name: '采购退货出库'
      },
      {
        path:'purchasewarehousing',
        name: '采购入库'
      },
      {
        path:'salesdelivery',
        name: '销售出库'
      },
      {
        path:'salesreturnreceipt',
        name: '销售退货入库'
      },
      {
        path:'inventorylossdelivery',
        name: '盘亏出库'
      },
      {
        path:'otherdelivery',
        name: '其他出库'
      },
      {
        path:'saturationofstackroom',
        name: '涨库入库'
      },
      {
        path:'inventorytransfer',
        name: '仓库调拨'
      },
      {
        path:'inventorycheck',
        name: '库存盘点'
      },
      {
        path:'realtimeinventory',
        name: '实时库存'
      },
      {
        path:'inventoryadjustment',
        name: '成本调整'
      },
      {
        path:'placeorder',
        name: '生成订单'
      },
      {
        path:'orderfeedback',
        name: '订单反馈'
      }
    ]
    const store = useStore()

    const handleOpen = (key:number, keyPath:string) => {
      console.log(key, keyPath)
    }
    const handleClose = (key:number, keyPath:string) => {
      console.log(key, keyPath)
    }

    const breadCrumbClick = () => {
      router.push('/')
    }
    return {
      handleOpen,
      handleClose,
      isCollapse,
      breadCrumbClick,
      breadList,
      store
    }
  }
})
</script>

<style scoped>
.layout-container{  /* 这种方式可以将整个布局撑起来至整个页面 */
    position: fixed;
    bottom: 0;
    top: 0;
    left: 0;
    right: 0;
}
 .el-header{
    /* background-color: #1890ff; */
    color: #333;
    text-align: center;
    line-height: 60px;
    border-bottom: solid 1px F1F1F1;
    color: #1890ff;
  }

  .el-aside {
    text-align: center;
    line-height: 200px;
    width: 200px;
    border-right: 1px solid rgb(245,244,245);
  }

  .el-main {
    position: relative;
    background: #F0F2F5;

  }

  .aside-menu{
    height: 100%;
  }
  .left{
      float: left;
      font-weight: bold;
      font-size: 20px;
  }
  .right{
      float:right;
      display: flex;
      justify-content: center;
      align-items: center;
      font-family: Arial;
  }
  .el-dropdown-link {
    cursor: pointer;
    color: #0b0d0f;
  }
  .el-dropdown-link:hover{
    color:#00A1D6;
  }
  .el-dropdown-link span{
    top:10px
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
  .avatar-wrap {
    display: flex;
    align-items: center;
    color: #0b0d0f;
  }
  .avatar-wrap:hover{
      color: #00A1D6;
  }
  .avatar {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      margin-right: 10px;
  }
  .el-breadcrumb__item {
    margin-bottom: 20px;
    width: 100%;
    font-weight: bold;
    border-bottom: 1px solid #e0e0e0;
    padding-bottom: 10px;
  }
  .el-input.is-disabled .el-input__inner{
  color: black !important;;
}
</style>
