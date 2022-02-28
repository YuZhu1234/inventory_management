<template>
    <Card class="customer_card">
      <div class="header">
        <el-button type="text" class="header_button"><el-icon><plus /></el-icon>&nbsp;新增</el-button>
        <el-button type="text" class="header_button"><el-icon><download /></el-icon>&nbsp;导出</el-button>
        <el-button type="text" class="header_button"><el-icon><upload /></el-icon>&nbsp;导入</el-button>
      </div>
      <el-table :data="tableData" highlight-current-row="true" header-row-style="color:black" style="border: 1px solid rgb(245,244,245)">
        <el-table-column fixed type="selection" width="55" />
        <el-table-column fixed prop="date" label="名称" width="150"/>
        <el-table-column fixed prop="name" label="编码" width="300" />
        <el-table-column prop="state" label="电话" width="300" />
        <el-table-column prop="city" label="是否启用" width="120" />
        <el-table-column prop="address" label="备注" width="600" />
        <el-table-column fixed="right" label="操作" width="120">
          <template #default>
            <el-button type="text" size="small" @click="handleClick">编辑</el-button>
            <el-divider direction="vertical"></el-divider>
             <el-dropdown>
              <el-button type="text" size="small">更多<el-icon><arrow-down /></el-icon></el-button>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>删除</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
      <template class="pagination" >
        <el-pagination background="blue" layout="prev, pager, next" :total="1000">
        </el-pagination>
      </template>
      <el-drawer
          v-model="drawer"
          title="编辑"
          :direction="direction"
          size="511px"
          destroy-on-close
        >
        <el-divider class="divider"></el-divider>
          <Responsitorylist />
      </el-drawer>
    </Card>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import {
  Plus,
  Download,
  Upload,
  ArrowDown
} from '@element-plus/icons-vue'
import Responsitorylist from './responsitorylist.vue'

export default defineComponent({
  name:'Respository',
  components:{
    Plus,
    Download,
    Upload,
    ArrowDown,
    Responsitorylist
  },
  setup () {
    const tableData = [
      {
        date: '2016-05-03',
        name: 'Tom',
        state: 'California',
        city: 'Los Angeles',
        address: 'No. 189, Grove St, Los Angeles',
        zip: 'CA 90036',
        tag: 'Home'
      },
      {
        date: '2016-05-02',
        name: 'Tom',
        state: 'California',
        city: 'Los Angeles',
        address: 'No. 189, Grove St, Los Angeles',
        zip: 'CA 90036',
        tag: 'Office'
      },
      {
        date: '2016-05-04',
        name: 'Tom',
        state: 'California',
        city: 'Los Angeles',
        address: 'No. 189, Grove St, Los Angeles',
        zip: 'CA 90036',
        tag: 'Home'
      },
      {
        date: '2016-05-01',
        name: 'Tom',
        state: 'California',
        city: 'Los Angeles',
        address: 'No. 189, Grove St, Los Angeles',
        zip: 'CA 90036',
        tag: 'Office'
      }
    ]
    const drawer = ref(false)

    const handleClick = () :void => {
      drawer.value = true
      console.log(drawer.value)
    }
    return {
      tableData,
      drawer,
      handleClick
    }
  }
})
</script>

<style scoped>
.customer_card {
 position: absolute;
 box-sizing: border-box;
 width: 100%;
 left: 0;
 right: 0;
 padding: 8px 24px;
}

.header {
  display: flex;
  justify-content: left;
  margin-bottom: 20px;
}

.header_button {
  margin-right: 50px;
  font-weight: bold;
}

.pagination{
  margin-top: 40px;
  display: flex;
  justify-content: right;
}

.divider {
  position: absolute;
  top: 30px;
  left: 0px;
}

</style>
