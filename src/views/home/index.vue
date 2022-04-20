<template>
  <div class="home">
    <div class="cardlist">
      <div>
        <div class="home_cord" @click="handleClick('purchasewarehousing')">
         <div class="card_icon">
           <el-icon><list /></el-icon>
         </div>
         <div>
          物品入库
          </div>
        </div>
        <div class="home_cord2" @click="handleClick('placeorder')">
          <div class="card_icon">
           <el-icon><management /></el-icon>
         </div>
         <div>
          生产制造
          </div>
        </div>
      </div>
      <div>
        <div class="home_cord2" @click="handleClick('salesdelivery')">
          <div class="card_icon">
           <el-icon><sold-out /></el-icon>
         </div>
         <div>
          物品出库
          </div>
        </div>
        <div class="home_cord" @click="handleClick('data_dictionary')">
          <div class="card_icon">
           <el-icon><setting /></el-icon>
         </div>
         <div>
          系统管理
          </div>
        </div>
      </div>
      <div>
        <div class="home_cord" @click="handleClick('realtimeinventory')">
          <div class="card_icon">
           <el-icon><grid /></el-icon>
         </div>
         <div>
          实时库存
          </div>
        </div>
        <div class="home_cord2" @click="handleClick('customer')">
          <div class="card_icon">
           <el-icon><connection /></el-icon>
         </div>
         <div>
          数据更新
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import {
  Setting,
  SoldOut,
  List,
  Grid,
  Management,
  Connection
} from '@element-plus/icons-vue'
import router from '../../router/index'

export default defineComponent({
  name: 'home',
  components: {
    Setting,
    List,
    Grid,
    Management,
    SoldOut,
    Connection
  },
  setup () {
    const handleClick = (path:string) => {
      router.push(`/${path}`)
    }
    return {
      handleClick
    }
  }
})
</script>

<style scoped>
.home{
    background: url('./home.png');
    background-size: cover;
    margin-top: -20px;
    height: calc(100% + 20px);
    margin-left: -20px;
    width: calc(100% + 40px);
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
}

.home_cord{
  background: white;
  width: 150px;
  height: 142px;
  border-radius: 0 30px;
  margin: 30px;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: #00A1D6;
  cursor: pointer;
}

.home_cord2 {
  background: #00A1D6;
  width: 150px;
  height: 142px;
  border-radius: 0 30px;
  margin: 30px;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: white;
  cursor: pointer;
}

.cardlist{
  width: 600px;
  height: 700px;
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.card_icon{
  font-size: 50px;
}

</style>
