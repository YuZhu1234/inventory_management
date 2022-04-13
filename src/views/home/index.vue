<template>
  <div class="home">
    <div class="cardlist">
      <div>
        <div class="home_cord">
         <div class="card_icon">
           <el-icon><list /></el-icon>
         </div>
         <div>
          物品入库
          </div>
        </div>
        <div class="home_cord2">
          <div class="card_icon">
           <el-icon><management /></el-icon>
         </div>
         <div>
          生产制造
          </div>
        </div>
      </div>
      <div>
        <div class="home_cord2">
          <div class="card_icon">
           <el-icon><grid /></el-icon>
         </div>
         <div>
          物品出库
          </div>
        </div>
        <div class="home_cord">
          <div class="card_icon">
           <el-icon><setting /></el-icon>
         </div>
         <div>
          系统管理
          </div>
        </div>
      </div>
      <div>
        <div class="home_cord2">
          <div class="card_icon">
           <el-icon><grid /></el-icon>
         </div>
         <div>
          实时库存
          </div>
        </div>
        <div class="home_cord">
          <div class="card_icon">
           <el-icon><setting /></el-icon>
         </div>
         <div>
          单据查询
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
  HomeFilled,
  List,
  Grid,
  Management
} from '@element-plus/icons-vue'

export default defineComponent({
  name: 'home',
  components: {
    Setting,
    List,
    Grid,
    Management
  },
  setup () {
    return {

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
