<template>
<el-row>
    <el-col >
    <el-menu
        default-active="4"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
      >
       <div class="logo" >
          <img src="https://img0.baidu.com/it/u=2343576150,486144126&fm=26&fmt=auto" width="50px" height="50px">
      </div>
        <el-menu-item index="1" width="200px">
          <span width="200px"><el-icon><home-filled /></el-icon>首页</span>
        </el-menu-item>
        <el-sub-menu index="2">
          <template #title>
          <span class="tittle"><el-icon><list /></el-icon>库存管理</span>
          </template>
          <el-menu-item index="2-1" @click="(e)=>historyPush(e)">入库管理</el-menu-item>
          <el-menu-item index="2-2">出库管理</el-menu-item>
          <el-menu-item index="2-3">库存调拨</el-menu-item>
          <el-menu-item index="2-4">库存盘点</el-menu-item>
          <el-menu-item index="2-5">实时库存</el-menu-item>
        </el-sub-menu>
        <el-menu-item index="3">
          <span><el-icon><money /></el-icon>往来管理</span>
        </el-menu-item>
        <el-sub-menu index="4">
          <template #title>
            <span><el-icon><grid /></el-icon>基础数据</span>
          </template>
          <el-menu-item index="customer" @click="(e)=>historyPush(e)">客户</el-menu-item>
          <el-menu-item index="4-2">供应商</el-menu-item>
          <el-menu-item index="respository" @click="(e)=>historyPush(e)">仓库</el-menu-item>
          <el-menu-item index="materialclassification" @click="(e)=>historyPush(e)">物料分类</el-menu-item>
          <el-menu-item index="material" @click="(e)=>historyPush(e)">物料</el-menu-item>
          <el-menu-item index="4-5">计量单位</el-menu-item>
        </el-sub-menu>
        <el-menu-item index="5">
          <span><el-icon><timer /></el-icon>系统监控</span>
        </el-menu-item>
        <el-sub-menu index="6">
          <template #title>
            <span><el-icon><setting /></el-icon>系统管理</span>
          </template>
          <el-menu-item index="6-1">用户管理</el-menu-item>
          <el-menu-item index="6-2">角色管理</el-menu-item>
          <el-menu-item index="6-3">菜单管理</el-menu-item>
          <el-menu-item index="data_dictionary" @click="(e)=>historyPush(e)">数据字典</el-menu-item>
          <el-menu-item index="4-5">部门管理</el-menu-item>
        </el-sub-menu>
        <el-menu-item index="7">
          <span><el-icon><user-filled /></el-icon>个人中心</span>
        </el-menu-item>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import router from '../../../router/index'
import {
  Setting,
  HomeFilled,
  List,
  Grid,
  Money,
  Timer,
  UserFilled
} from '@element-plus/icons-vue'

export default defineComponent({
  name:'asside',
  components: {
    Setting,
    HomeFilled,
    List,
    Grid,
    Money,
    Timer,
    UserFilled
  },
  setup () {
    const handleOpen = () => {
      // console.log(open)
    }
    const handleClose = () => {
      // console.log(close)
    }
    const historyPush = (e:any) => {
      router.push(`/${e.index}`)
    }
    return {
      handleOpen,
      handleClose,
      historyPush
    }
  }
})
</script>

<style>

.logo{
  height: 50px;
}

.tittle {
  font-size:14px;
  font-family: -apple-system,BlinkMacSystemFont,Segoe UI,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Helvetica Neue,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol;
}

.el-row {
  width: 200px;
}
</style>
