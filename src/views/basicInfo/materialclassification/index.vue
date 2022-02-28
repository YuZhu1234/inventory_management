<template>
    <Card class="customer_card">
       <div class="header">
            <el-button type="text" class="header_button"><el-icon><plus /></el-icon>&nbsp;新增</el-button>
            <el-button type="text" class="header_button"><el-icon><download /></el-icon>&nbsp;导出</el-button>
            <el-button type="text" class="header_button"><el-icon><upload /></el-icon>&nbsp;导入</el-button>
       </div>
       <el-table :data="tableData" highlight-current-row="true" header-row-style="color:black" style="border: 1px solid rgb(245,244,245); max-width:1690px">
        <el-table-column fixed type="selection" width="55" />
        <el-table-column fixed prop="name" label="名称" width="300"/>
        <el-table-column fixed prop="code" label="编码" width="300" />
        <el-table-column prop="fullname" label="全名" width="300" />
        <el-table-column prop="state" label="是否启用" width="300" />
        <el-table-column fixed="right" label="操作" width="200">
          <template #default>
            <el-button type="text" size="small" @click="handleClick"
              >编辑</el-button
            >
            <el-divider direction="vertical"></el-divider>
            <el-dropdown>
              <el-button type="text" size="small">更多<el-icon><arrow-down /></el-icon></el-button>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>添加下级</el-dropdown-item>
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

export default defineComponent({
  name:'MaterialClassification',
  components:{
    Plus,
    Download,
    Upload,
    ArrowDown
  },
  setup () {
    const tableData = [
      {
        name: '甲醇',
        code: 'TomUs',
        fullname: '',
        state: '是'
      }
    ]
    return {
      tableData
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

.encode {
    margin-right: 100px!important;
}

.demo-form-inline {
    display: flex;
    justify-content: left;
}

.header {
  display: flex;
  justify-content: left;
  margin-bottom: 20px;
}

.header_button {
  margin-left: 50px;
  margin-right: 50px;
  font-weight: bold;
}

.pagination{
  margin-top: 40px;
  display: flex;
  justify-content: right;
}

</style>
