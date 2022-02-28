<template>
    <Card class="customer_card">
        <el-form :inline="true" class="demo-form-inline">
            <el-form-item label="编码" class="encode">
              <el-input placeholder="请输入编码"></el-input>
            </el-form-item>
            <el-form-item label="名称" class="encode">
              <el-input placeholder="请输入编码"></el-input>
            </el-form-item>
            <el-form-item  class="encode" label="物料分类">
               <el-select placeholder="请选择物料分类"></el-select>
            </el-form-item>
            <el-form-item>
            <el-button type="primary" class="query"><el-icon><search /></el-icon>&nbsp;查询</el-button>
            <el-button type="primary" class="query" ><el-icon><refresh /></el-icon>&nbsp;重置</el-button>
            </el-form-item>
       </el-form>
       <div class="header">
            <el-button type="text" class="header_button"><el-icon><plus /></el-icon>&nbsp;新增</el-button>
            <el-button type="text" class="header_button"><el-icon><download /></el-icon>&nbsp;导出</el-button>
            <el-button type="text" class="header_button"><el-icon><upload /></el-icon>&nbsp;导入</el-button>
       </div>
       <el-table :data="tableData" highlight-current-row="true" border header-row-style="color:black" style="border: 1px solid rgb(245,244,245)">
        <el-table-column fixed type="index" label="#" width="55" />
        <el-table-column fixed prop="name" label="编码" width="200" />
        <el-table-column fixed prop="date" label="名称" width="200"/>
        <el-table-column prop="state" label="分类" width="200" />
        <el-table-column prop="city" label="规格型号" width="200" />
        <el-table-column prop="address" label="计量单位" width="200" />
         <el-table-column prop="city" label="销售价格" width="200" />
        <el-table-column prop="address" label="税控编码" width="200" />
        <el-table-column prop="city" label="是否启用" width="200" />
        <el-table-column prop="address" label="备注" width="200" />
        <el-table-column fixed="right" label="操作" width="120">
          <template #default>
            <el-button type="text" size="small" @click="handleClick"
              >编辑</el-button
            >
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
    </Card>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import {
  Refresh,
  Search,
  Plus,
  Download,
  Upload
} from '@element-plus/icons-vue'

export default defineComponent({
  name:'Material',
  components:{
    Refresh,
    Search,
    Plus,
    Download,
    Upload
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
