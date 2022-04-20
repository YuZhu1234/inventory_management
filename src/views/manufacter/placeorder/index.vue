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
      生产制造 > 生成订单
      </div>
   <el-form :inline="true" class="demo-form">
      <el-form-item label="订单日期：" class="datepick">
        <el-date-picker
          v-model="dateValue"
          type="daterange"
          range-separator="至"
          start-placeholder="请选择开始"
          end-placeholder="请选择结束"
          value-format="YYYY-MM-DD"
        />
      </el-form-item>
      <el-form-item class="buttongroup">
        <el-button type="primary" class="button" @click="handleSearch"><el-icon><search /></el-icon>&nbsp;查询</el-button>
        <el-button type="primary" class="button" @click="handleReset"><el-icon><refresh /></el-icon>&nbsp;重置</el-button>
      </el-form-item>
    </el-form>
    <div class="header">
        <el-button type="text" class="header_button" @click="handleClick('',0,'add')"><el-icon><plus /></el-icon>&nbsp;新增</el-button>
        <!-- <el-button type="text" class="header_button"><el-icon><download /></el-icon>&nbsp;导出</el-button>
        <el-button type="text" class="header_button"><el-icon><upload /></el-icon>&nbsp;导入</el-button> -->
        <span class="text">已选择<span style="color:rgb(53,137,255);margin-left:10px;margin-right:10px;font-weight:bold;">{{selectNum}}</span>项 </span>
        <!-- <el-button type="text" class="header_button" @click="refreshSelection">清空</el-button> -->
        <el-button v-if="selectNum > 0" type="text" @click="dialogVisible2 = true" class="header_button">删除</el-button>
    </div>
    <el-table 
      :data="Placeorderlist" 
      highlight-current-row="true" 
      border 
      header-row-style="color:black" 
      style="border: 1px solid rgb(245,244,245)"
      @selection-change="handleSelectionChange"
      >
        <el-table-column align='center' fixed type="selection" sortable width="55" />
        <el-table-column align='center' fixed type="index" label="#" width="55" />
        <el-table-column align='center' fixed prop="purchaseOrderId" label="订单号" width="200" />
        <el-table-column align='center' prop="orderDate" label="订单日期" width="200"/>
        <el-table-column align='center' prop="requester" label="下单人" width="200" />
        <el-table-column align='center' prop="supplierName" label="供应商" width="200" />
        <el-table-column align='center' prop="shipToId" label="邮寄地址" width="200" />
        <el-table-column align='center' prop="remarks" label="备注" width="200" />
        <el-table-column align='center' prop="createBy" label="创建人" width="200" />
        <el-table-column align='center' prop="createTime" label="创建时间" width="200" />
        <el-table-column align='center' prop="updateBy" label="更新人" width="200" />
        <el-table-column align='center' prop="updateTime" label="更新时间" width="200" />
        <el-table-column align='center' fixed="right" label="操作" width="120">
          <template v-slot="scope">
            <el-button type="text" size="small" @click="handleClick(scope.row.id, scope.row.purchaseOrderId, 'edit')">编辑</el-button
            >
            <el-divider direction="vertical"></el-divider>
            <el-dropdown>
              <el-button type="text" size="small">更多<el-icon><arrow-down /></el-icon></el-button>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item @click="handleClick(scope.row.id, scope.row.purchaseOrderId, 'delete')">删除</el-dropdown-item>
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
    <el-dialog
    v-model="dialogVisible"
    title="生成订单-编辑"
    width="1100px"
    :fullscreen='fullscreen'
    destroy-on-close
  >
    <div style="position:relative">
    <el-divider class="divider"></el-divider>
    <PlaceorderDetail 
    :id="id" 
    :handleClose="handleClose" 
    :loadPlaceorderlist="loadPlaceorderlist" 
    :purchaseOrderId="purchaseOrderId"
    :edit_type="edit_type"
    />
    </div>
  </el-dialog>
   <el-dialog
        v-model="dialogVisible2"
        title="提示"
        width="20%"
        destroy-on-close
      >
    <span class="confirm">确定增加此记录？</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible2 = false">取消</el-button>
        <el-button type="primary" @click="handleDelete">确定</el-button>
      </span>
    </template>
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
  ArrowDown,
  Loading
} from '@element-plus/icons-vue'
import PlaceorderDetail from './placeorderdetail.vue'
import { AxiosApi } from '../../../utils/api'
import { AxiosResponse } from 'axios'
import { ElMessage } from 'element-plus'

export default defineComponent({
  name:'Placeorder',
  components:{
    Refresh,
    Search,
    Plus,
    // Download,
    // Upload,
    ArrowDown,
    PlaceorderDetail
  },
  setup () {
    const dialogVisible = ref(false)
    const fullscreen = ref(false)
    const Placeorderlist = ref([{}])
    const total = ref(0)
    const current_page = ref(1)
    const edit_type = ref('')
    const id = ref('')
    const selectNum = ref(0)
    const purchaseOrderId = ref(0)
    const dateValue = ref([])
    const loading = ref(false)
    const multipleSelection = ref([{}])
    const dialogVisible2 = ref(false)

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
      multipleSelection.value = val
    }

    const handleCurrentChange = (val: number) :void => {
      current_page.value = val
      loadPlaceorderlist(val)
    }

    const handleReset = () => {
      dateValue.value = []
      loadPlaceorderlist(1)
    }

    const handleSearch = () => {
      loadPlaceorderlist(1, dateValue.value[1], dateValue.value[0])
    }

    const handleClick = (ID:string, PurchaseOrderId:number, type:string) => {
      if (type === 'edit') {
        dialogVisible.value = true
        edit_type.value = 'edit'
        purchaseOrderId.value = PurchaseOrderId
        id.value = ID
      } else if (type === 'add') {
        dialogVisible.value = true
        edit_type.value = 'add'
        id.value = ''
      } else if (type === 'delete') {
        multipleSelection.value = [{ id:ID }]
        dialogVisible2.value = true
      }
    }

    const handleDelete = () => {
      multipleSelection.value.map((m:any) => {
        if (m.id) {
          AxiosApi.delete(`orderHeader/delete?id=${m.id}`)
            .then(() => {
              success('删除成功！')
              loadPlaceorderlist(1)
              dialogVisible2.value = false
            })
            .catch(() => {
              error('删除失败')
            })
        }
      })
    }

    const handleClose = () => {
      dialogVisible.value = false
    }

    const loadPlaceorderlist = (current_page:number, updateEndTime?:string, updateStartTime?:string) :void => {
      loading.value = true
      AxiosApi.get(`orderHeader/list?pageNum=${current_page}${updateEndTime ? `&updateEndTime=${updateEndTime}&updateStartTime=${updateStartTime}` : '&pageSize=10'}`)
        .then((res:AxiosResponse) => {
          Placeorderlist.value = res.data.result
          total.value = res.data.totalNum
          loading.value = false
        })
        .catch((err) => {
          console.log(err)
          loading.value = false
        }) 
    }

    onMounted(() => {
      loadPlaceorderlist(1)
    })

    return {
      dialogVisible,
      fullscreen,
      Placeorderlist,
      total,
      current_page,
      handleCurrentChange,
      handleClick,
      edit_type,
      id,
      loadPlaceorderlist,
      handleClose,
      handleSelectionChange,
      selectNum,
      purchaseOrderId,
      dateValue,
      handleSearch,
      handleReset,
      handleDelete,
      dialogVisible2
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
</style>
