<template>
  <Card>
   <el-form :inline="true" class="demo-form">
      <el-form-item label="单据编号：" class="encode">
        <el-input placeholder="请输入单据编号"></el-input>
      </el-form-item>
      <el-form-item label="单据日期：" class="datepick">
        <el-date-picker
          v-model="value1"
          type="daterange"
          range-separator="至"
          start-placeholder="请选择开始"
          end-placeholder="请选择结束"
        />
      </el-form-item>
      <el-form-item class="buttongroup">
        <el-button type="primary" class="button"><el-icon><search /></el-icon>&nbsp;查询</el-button>
        <el-button type="primary" class="button"><el-icon><refresh /></el-icon>&nbsp;重置</el-button>
      </el-form-item>
    </el-form>
    <div class="header">
        <el-button type="text" class="header_button" @click="handleAdd"><el-icon><plus /></el-icon>&nbsp;新增</el-button>
        <el-button type="text" class="header_button"><el-icon><download /></el-icon>&nbsp;导出</el-button>
        <el-button type="text" class="header_button"><el-icon><upload /></el-icon>&nbsp;导入</el-button>
        <span class="text">已选择<span style="color:rgb(53,137,255);margin-left:10px;margin-right:10px;font-weight:bold;">0</span>项 </span>
        <el-button type="text" class="header_button">清空</el-button>
    </div>
    <el-table :data="MateriaData" highlight-current-row="true" border header-row-style="color:black" style="border: 1px solid rgb(245,244,245)">
        <el-table-column fixed type="selection" sortable width="55" />
        <el-table-column fixed type="index" label="#" width="55" />
        <el-table-column fixed prop="code" label="单据编号" width="200" />
        <el-table-column prop="name" label="单据日期" width="200"/>
        <el-table-column prop="categoryName" label="源单号" width="200" />
        <el-table-column prop="model" label="制单人" width="200" />
        <el-table-column prop="unitName" label="业务员" width="200" />
        <el-table-column prop="isEnabled" label="供应商" width="200" >
         <template v-slot="scope">
            <el-switch
                v-model="scope.row.isEnabled"
                class="ml-2"
                active-color="#13ce66"
                inactive-color="#ff4949"
                :active-value="1"
                :inactive-value="0"
                disabled
            />
            </template>
        </el-table-column>
        <el-table-column prop="code" label="是否通过" width="200" />
        <el-table-column prop="name" label="是否关闭" width="200"/>
        <el-table-column prop="categoryName" label="是否作废" width="200" />
        <el-table-column prop="model" label="备注" width="200" />
        <el-table-column prop="unitName" label="生效时间" width="200" />
        <el-table-column prop="remark" label="审核人" width="200" />
        <el-table-column prop="code" label="是否通过" width="200" />
        <el-table-column prop="name" label="是否关闭" width="200"/>
        <el-table-column prop="categoryName" label="是否作废" width="200" />
        <el-table-column prop="model" label="流程" width="200" />
        <el-table-column prop="unitName" label="创建时间" width="200" />
        <el-table-column prop="remark" label="创建部门" width="200" />
        <el-table-column prop="unitName" label="修改时间" width="200" />
        <el-table-column prop="remark" label="修改人" width="200" />
        <el-table-column fixed="right" label="操作" width="120">
          <template v-slot="scope">
            <el-button type="text" size="small" @click="handleClick(scope.row.materialId, 'edit')">编辑</el-button
            >
            <el-divider direction="vertical"></el-divider>
            <el-dropdown>
              <el-button type="text" size="small">更多<el-icon><arrow-down /></el-icon></el-button>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item @click="handleClick(scope.row.materialId, 'delete')">删除</el-dropdown-item>
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
    <el-dialog
    v-model="dialogVisible"
    title="采购入库-编辑"
    width="1100px"
    :fullscreen='fullscreen'
    destroy-on-close
  >
    <div style="position:relative">
    <el-divider class="divider"></el-divider>
    <PurchaseWarehousingDetail :customerId="customerId" :handleClose="handleClose" :loadCustomers="loadCustomers" :type="type"/>
    </div>
  </el-dialog>
  </Card>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import {
  Refresh,
  Search,
  Plus,
  Download,
  Upload,
  ArrowDown
} from '@element-plus/icons-vue'
import PurchaseWarehousingDetail from './PurchaseWarehousingDetail.vue'

export default defineComponent({
  name:'PurchaseWarehousing',
  components:{
    Refresh,
    Search,
    Plus,
    Download,
    Upload,
    ArrowDown,
    PurchaseWarehousingDetail
  },
  setup () {
    const value1 = ref('')
    const dialogVisible = ref(false)
    const fullscreen = ref(false)

    const handleAdd = () => {
      dialogVisible.value = true
    }

    return {
      value1,
      dialogVisible,
      fullscreen,
      handleAdd
    }
  }
})
</script>

<style lang="less">
.customer_card {
 position: absolute;
 box-sizing: border-box;
 width: 100%;
 left: 0;
 right: 0;
 padding: 8px 24px;
}

.demo-form{
  display: flex;
  justify-content: left;
  min-width:950px;
}

.header {
  display: flex;
  justify-content: left;
  margin-bottom: 20px;
  align-items: center;
}

.header_button {
  margin-left: 50px;
  margin-right: 50px;
  font-weight: bold;
}

.text {
  font-size: 15px;
  margin-left: 20px;
  margin-right: 20px;
}

.divider {
  position: absolute;
  top: -30px;
  left: 0px;
}

.datepick {
  width: 435px;
}
</style>
