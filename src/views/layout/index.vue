<template>
  <el-container class="layout-container">
    <el-aide>
      <AppAside/>
    </el-aide>
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
        <img class="avatar" src="https://img2.baidu.com/it/u=405014493,281423275&fm=253&fmt=auto&app=138&f=JPEG?w=400&h=400" alt="">
        <span>username</span>
       </div>
      </el-header>
      <el-main class="el-main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AppAside from './asside/index.vue'

export default defineComponent({
  name:'layout',
  components: {
    AppAside
  },
  setup () {
    const isCollapse = false
    const handleOpen = (key:number, keyPath:string) => {
      console.log(key, keyPath)
    }
    const handleClose = (key:number, keyPath:string) => {
      console.log(key, keyPath)
    }
    return {
      handleOpen,
      handleClose,
      isCollapse
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
    background-color: #1890ff;
    color: #333;
    text-align: center;
    line-height: 60px;
    border-bottom: solid 1px F1F1F1;
    color: #FFFFFF;
  }

  .el-aside {
    background-color: #333;
    color: #333;
    text-align: center;
    line-height: 200px;
  }

  .el-main {
    position: relative;
  }

  .aside-menu{
      height: 100%;
  }
  .left{
      float: left;
      font-weight: bold;
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
</style>
