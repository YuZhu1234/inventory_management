<template>
  <Card>
    <div 
        style="height: 30px;
              margin-top: -10px;
              margin-bottom: 20px;
              text-align: left;
              color: #1890FF;
              font-size: 15px;
              border-bottom: 1px solid grey;"
      >
      库存管理 > 实时库存
      </div>
   <el-form :inline="true" class="demo-form">
      <el-form-item label="仓库：" class="encode">
        <el-select v-model="searchWarehouse" class="select" placeholder="请选择" :disabled="disabled">
            <el-option label="请选择" :value="0"></el-option>
            <div v-for="item in warehouseList" :key="item.warehouseId">
                <el-option :label="item.name" :value="item.warehouseId"></el-option>
            </div>
        </el-select>
      </el-form-item>
      <el-form-item label="物料：" class="datepick">
         <el-select v-model="searchMaterial" class="select" placeholder="请选择" :disabled="disabled">
            <el-option label="请选择" :value="0"></el-option>
            <div v-for="item in materialList" :key="item.materialId">
                <el-option :label="item.name" :value="item.materialId"></el-option>
            </div>
        </el-select>
      </el-form-item>
      <el-form-item class="buttongroup">
        <el-button type="primary" class="button" @click="handleSearch"><el-icon><search /></el-icon>&nbsp;查询</el-button>
        <el-button type="primary" class="button" @click="handleReset"><el-icon><refresh /></el-icon>&nbsp;重置</el-button>
      </el-form-item>
    </el-form>
    <el-table 
      :data="RealtimeInventorylist" 
      highlight-current-row="true" 
      border 
      header-row-style="color:black" 
      style="border: 1px solid rgb(245,244,245)"
      @selection-change="handleSelectionChange"
      v-loading="loading"
      >
        <el-table-column align='center' fixed type="selection" sortable width="55" />
        <el-table-column align='center' fixed type="index" label="#" width="55" />
        <el-table-column align='center' fixed prop="batchNo" label="批号" width="200" />
        <el-table-column align='center' prop="warehouseName" label="仓库" width="200"/>
        <el-table-column align='center' prop="materialName" label="物料" width="200" />
        <el-table-column align='center' prop="unitName" label="计量单位" width="200" />
        <el-table-column align='center' prop="qty" label="数量" width="200" />
        <el-table-column align='center' prop="cost" label="成本" width="200" />
        <el-table-column align='center' prop="isSingleSupplier" label="单供应商" width="200">
        <template v-slot="scope">
            <el-switch
                v-model="scope.row.isApproved"
                class="ml-2"
                active-color="#13ce66"
                inactive-color="#ff4949"
                :active-value="1"
                :inactive-value="0"
                disabled
            />
            </template>
          </el-table-column>
        <el-table-column align='center' prop="supplierName" label="供应商" width="200" />
        <el-table-column align='center' prop="isClosed" label="是否关闭" width="200" >
        <template v-slot="scope">
            <el-switch
                v-model="scope.row.isApproved"
                class="ml-2"
                active-color="#13ce66"
                inactive-color="#ff4949"
                :active-value="1"
                :inactive-value="0"
                disabled
            />
            </template>
          </el-table-column>
        <el-table-column align='center' prop="createTime" label="创建时间" width="200" />
        <el-table-column align='center' prop="sysOrgCode" label="创建部门" width="200" />
        <el-table-column align='center' prop="createBy" label="创建人" width="200" />
        <el-table-column align='center' prop="updateTime" label="修改时间" width="200"/>
        <el-table-column align='center' prop="updateBy" label="修改人" width="200" />
        <el-table-column align='center' fixed="right" label="操作" width="120">
          <template v-slot="scope">
            <el-button type="text" size="small" @click="handleClick(scope.row.batchNo, scope.row.warehouseId, scope.row.materialId, 'edit')">详情</el-button
            >
            <el-divider direction="vertical"></el-divider>
            <el-dropdown>
              <el-button type="text" size="small">更多<el-icon><arrow-down /></el-icon></el-button>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item disabled @click="handleClick(scope.row.batchNo, scope.row.warehouseId, scope.row.materialId, 'delete')">删除</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
     <template class="pagination" >
    <el-pagination
      :page-size="10" 
      background="blue" 
      layout="prev, pager, next" 
      :total="total"
      :currentPage="current_page"
      @current-change="handleCurrentChange"
    >
    </el-pagination>
  </template>
   <el-drawer
          v-model="dialogVisible"
          title="详情"
          :direction="direction"
          destroy-on-close
          size="511px"
        >
        <el-divider class="divider"></el-divider>
        <div class="overflowAuto">
          <RealtimeInventoryDetail 
            :batchNo="batchNo" 
            :warehouseId="warehouseId" 
            :materialId="materialId" 
            :loadRealtimeInventorylist="loadRealtimeInventorylist" 
            :edit_type="edit_type"
            :handleClose="handleClose" 
          />
        </div>
      </el-drawer>
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
import RealtimeInventoryDetail from './RealtimeInventoryDetail.vue'
import { AxiosApi } from '../../../utils/api'
import { AxiosResponse } from 'axios'
import { ElMessage } from 'element-plus'

export default defineComponent({
  name:'RealtimeInventory',
  components:{
    Refresh,
    Search,
    // Plus,
    // Download,
    // Upload,
    ArrowDown,
    RealtimeInventoryDetail
  },
  setup () {
    const dialogVisible = ref(false)
    const fullscreen = ref(false)
    const RealtimeInventorylist = ref([{}])
    const total = ref(0)
    const current_page = ref(1)
    const edit_type = ref('')
    const batchNo = ref('')
    const warehouseId = ref(0)
    const materialId = ref(0)
    const selectNum = ref(0)
    const ioBillHeaderId = ref(0)
    const dateValue = ref([])
    const searchId = ref('')
    const materialList = ref([{}])
    const warehouseList = ref([{}])
    const searchMaterial = ref(0)
    const searchWarehouse = ref(0)
    const loading = ref(false)

    const success = (message:string) => {
      ElMessage({
        message: message,
        type: 'success'
      })
    }

    const error = (message:string) => {
      ElMessage.error(message)
    }

    const handleSelectionChange = (val: any[]) => {
      selectNum.value = val?.length || 0
    }

    const handleCurrentChange = (val: number) :void => {
      current_page.value = val
      loadRealtimeInventorylist(val)
    }

    const handleReset = () => {
      searchMaterial.value = 0
      searchWarehouse.value = 0
      loadRealtimeInventorylist(1)
    }

    const handleSearch = () => {
      loading.value = true
      current_page.value = 1
      AxiosApi.get(`inventory/list?pageNum=${current_page.value}&pageSize=10${searchMaterial.value !== 0 ? `&materialId=${searchMaterial.value}` : ''}${searchWarehouse.value !== 0 ? `&warehouseId=${searchWarehouse.value}` : ''}`)
        .then((res:AxiosResponse) => {
          RealtimeInventorylist.value = res.data.result
          total.value = res.data.totalNum
          materialList.value = res.data.materialList
          warehouseList.value = res.data.warehouseList
          loading.value = false
        })
        .catch((err:any) => {
          console.log(err)
          loading.value = false
        }) 
    }

    const handleClick = (batchNO:string, warehouseid:number, materialid:number, type:string) => {
      if (type === 'edit') {
        dialogVisible.value = true
        edit_type.value = 'edit'
        warehouseId.value = warehouseid
        materialId.value = materialid
        batchNo.value = batchNO
      } else if (type === 'add') {
        dialogVisible.value = true
        edit_type.value = 'add'
        batchNo.value = ''
      }
    }

    const handleClose = () => {
      dialogVisible.value = false
    }

    const loadRealtimeInventorylist = (current_page:number) :void => {
      loading.value = true
      AxiosApi.get(`inventory/list?pageNum=${current_page}&pageSize=10`)
        .then((res:AxiosResponse) => {
          RealtimeInventorylist.value = res.data.result
          total.value = res.data.totalNum
          materialList.value = res.data.materialList
          warehouseList.value = res.data.warehouseList
          loading.value = false
        })
        .catch((err:any) => {
          console.log(err)
          loading.value = false
        }) 
    }

    const downloadExcel = () => {
      loading.value = true
      AxiosApi.get('billHeader/downLoadIn?&stockIoName=实时库存')
        .then((res:AxiosResponse) => {
          console.log(res)
          const url = window.URL.createObjectURL(new File([JSON.stringify(res)], 'application/json'))
          const link = document.createElement('a')
          link.download = '实时库存.xls'
          link.href = url
          link.click()
          loading.value = false
        })
        .catch((err) => {
          console.log(err)
          loading.value = false
        }) 
    }

    onMounted(() => {
      loadRealtimeInventorylist(1)
    })

    return {
      dialogVisible,
      fullscreen,
      RealtimeInventorylist,
      total,
      current_page,
      handleCurrentChange,
      handleClick,
      edit_type,
      batchNo,
      loadRealtimeInventorylist,
      handleClose,
      handleSelectionChange,
      selectNum,
      ioBillHeaderId,
      dateValue,
      handleSearch,
      handleReset,
      searchId,
      warehouseId,
      materialId,
      warehouseList,
      materialList,
      searchWarehouse,
      searchMaterial,
      loading,
      downloadExcel
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

.pagination{
  margin-top: 40px;
  display: flex;
  justify-content: right;
}

.overflowAuto {
    overflow: scroll;
    position: absolute;
    width: 100%;
    height: calc(100% - 100px);
}
.overflowAuto::-webkit-scrollbar {
    height: 6px;
    width: 6px;
}
.overflowAuto::-webkit-scrollbar-thumb {
    background: rgb(224, 214, 235);
}
</style>
