<template>
<el-row>
    <el-col>
    <el-menu
        default-active="4"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        :collapse="isCollapse"
      >
       <div class="logo" >  </div>
        <el-menu-item width="200px" index="home" @click="(e)=>historyPush(e)">
          <span width="200px"><el-icon><home-filled /></el-icon>首页</span>
        </el-menu-item>
        <el-sub-menu index="2">
          <template #title>
          <span class="tittle"><el-icon><list /></el-icon>库存管理</span>
          </template>
          <el-sub-menu index="2-1">
            <template #title>入库管理</template>
            <el-menu-item index="purchasewarehousing" @click="(e)=>historyPush(e)">采购入库</el-menu-item>
            <el-menu-item index="salesreturnreceipt" @click="(e)=>historyPush(e)">销售退货入库</el-menu-item>
            <el-menu-item index="inventorygainwarehousing" @click="(e)=>historyPush(e)">盘盈入库</el-menu-item>
            <el-menu-item index="saturationofstackroom" @click="(e)=>historyPush(e)">涨库入库</el-menu-item>
            <el-menu-item index="otherwarehousing" @click="(e)=>historyPush(e)">其他入库</el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="2-2">
            <template #title>出库管理</template>
            <el-menu-item index="salesdelivery" @click="(e)=>historyPush(e)">销售出库</el-menu-item>
            <el-menu-item index="purchasereturnissue" @click="(e)=>historyPush(e)">采购退货出库</el-menu-item>
            <el-menu-item index="inventorylossdelivery" @click="(e)=>historyPush(e)">盘亏出库</el-menu-item>
            <el-menu-item index="otherdelivery" @click="(e)=>historyPush(e)">其他出库</el-menu-item>
          </el-sub-menu>
          <el-menu-item index="inventorytransfer" @click="(e)=>historyPush(e)">仓库调拨</el-menu-item>
          <el-menu-item index="inventoryadjustment" @click="(e)=>historyPush(e)">成本调整</el-menu-item>
          <el-menu-item index="inventorycheck" @click="(e)=>historyPush(e)">库存盘点</el-menu-item>
          <el-menu-item index="realtimeinventory" @click="(e)=>historyPush(e)">实时库存</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="3">
          <template #title>
            <span><el-icon><grid /></el-icon>基础数据</span>
          </template>
          <el-menu-item index="customer" @click="(e)=>historyPush(e)">客户</el-menu-item>
          <el-menu-item index="supplier" @click="(e)=>historyPush(e)">供应商</el-menu-item>
          <el-menu-item index="respository" @click="(e)=>historyPush(e)">仓库</el-menu-item>
          <el-menu-item index="materialclassification" @click="(e)=>historyPush(e)">物料分类</el-menu-item>
          <el-menu-item index="material" @click="(e)=>historyPush(e)">物料</el-menu-item>
          <el-menu-item index="unitofmeasurement" @click="(e)=>historyPush(e)">计量单位</el-menu-item>
          <el-menu-item index="currency" @click="(e)=>historyPush(e)">币种</el-menu-item>
          <el-menu-item index="bankaccount" @click="(e)=>historyPush(e)">银行账户</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="5">
          <template #title>
            <span><el-icon><setting /></el-icon>系统管理</span>
          </template>
          <el-menu-item index="data_dictionary" @click="(e)=>historyPush(e)">数据字典</el-menu-item>
        </el-sub-menu>
         <el-sub-menu index="6">
          <template #title>
            <span><el-icon><management /></el-icon>生产制造</span>
          </template>
          <el-menu-item index="placeorder" @click="(e)=>historyPush(e)">生成订单</el-menu-item>
          <el-menu-item index="orderfeedback" @click="(e)=>historyPush(e)">订单反馈</el-menu-item>
        </el-sub-menu>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import router from '../../../router/index'
import {
  Setting,
  HomeFilled,
  List,
  Grid,
  Management
} from '@element-plus/icons-vue'
import { useStore } from 'vuex'

export default defineComponent({
  name:'asside',
  components: {
    Setting,
    HomeFilled,
    List,
    Grid,
    Management
  },
  setup () {
    const store = useStore()
    const isCollapse = ref(false)
    const handleOpen = () => {
      // console.log(open)
    }
    const handleClose = () => {
      // console.log(close)
    }
    const historyPush = (e:any) => {
      store.commit('ADD_CURRENT', e.index)
      router.push(`/${e.index}`)
    }
    return {
      handleOpen,
      handleClose,
      historyPush,
      isCollapse
    }
  }
})
</script>

<style>

.logo{
  height: 100px;
  width: 100px;
  background: url(./avator2.png);
  border-radius: 50%;
  margin: 30px 45px;
  background-size: cover;
  /* border: 5px solid #1890ff; */
}

.tittle {
  font-size:14px;
  font-family: -apple-system,BlinkMacSystemFont,Segoe UI,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Helvetica Neue,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol;
}

.el-row {
  width: 200px;
}
</style>
