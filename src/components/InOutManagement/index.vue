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
      库存管理 > {{route}}
      </div>
   <el-form :inline="true" class="demo-form">
      <el-form-item label="单据编号：" class="encode">
        <el-input placeholder="请输入单据编号" v-model="searchId"></el-input>
      </el-form-item>
      <el-form-item label="单据日期：" class="datepick">
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
        <el-button type="text" class="header_button"  @click="downloadExcel"><el-icon><download /></el-icon>&nbsp;导出</el-button>
        <span class="text">已选择<span style="color:rgb(53,137,255);margin-left:10px;margin-right:10px;font-weight:bold;">{{selectNum}}</span>项 </span>
        <!-- <el-button type="text" class="header_button" @click="refreshSelection">清空</el-button> -->
        <el-button v-if="selectNum > 0" type="text" @click="dialogVisible2 = true" class="header_button">删除</el-button>
    </div>
    <el-table 
      :data="Inventorylossdeliverylist" 
      highlight-current-row="true" 
      border 
      header-row-style="color:black" 
      style="border: 1px solid rgb(245,244,245)"
      @selection-change="handleSelectionChange"
      v-loading="loading"
      >
        <el-table-column align='center' fixed type="selection" sortable width="55" />
        <el-table-column align='center' fixed type="index" label="#" width="55" />
        <el-table-column align='center' fixed prop="billNo" label="单据编号" width="200" />
        <el-table-column align='center' prop="billDate" label="单据日期" width="200"/>
        <el-table-column align='center' prop="sourceNo" label="源单号" width="200" />
        <el-table-column align='center' prop="createBy" label="制单人" width="200" />
        <el-table-column align='center' prop="clerkId" label="业务员" width="200" />
        <el-table-column align='center' prop="supplierName" label="供应商" width="200" />
        <el-table-column align='center' prop="isApproved" label="是否通过" width="200" >
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
        <el-table-column align='center' prop="isClosed" label="是否关闭" width="200">
           <template v-slot="scope">
            <el-switch
                v-model="scope.row.isClosed"
                class="ml-2"
                active-color="#13ce66"
                inactive-color="#ff4949"
                :active-value="1"
                :inactive-value="0"
                disabled
            />
            </template>
        </el-table-column>
        <el-table-column align='center' prop="isVoided" label="是否作废" width="200" >
           <template v-slot="scope">
            <el-switch
                v-model="scope.row.isVoided"
                class="ml-2"
                active-color="#13ce66"
                inactive-color="#ff4949"
                :active-value="1"
                :inactive-value="0"
                disabled
            />
            </template>
        </el-table-column>
        <el-table-column align='center' prop="remark" label="备注" width="200" />
        <el-table-column align='center' prop="effectiveTime" label="生效时间" width="200" />
        <el-table-column align='center' prop="approverId" label="审核人" width="200" />
        <el-table-column align='center' prop="flowId" label="流程" width="200" />
        <el-table-column align='center' prop="createTime" label="创建时间" width="200" />
        <el-table-column align='center' prop="sysOrgCode" label="创建部门" width="200" />
        <el-table-column align='center' prop="updateTime" label="修改时间" width="200" />
        <el-table-column align='center' prop="updateBy" label="修改人" width="200" />
        <el-table-column align='center' fixed="right" label="操作" width="120">
          <template v-slot="scope">
            <el-button type="text" size="small" @click="handleClick(scope.row.billNo, scope.row.ioBillHeaderId, 'edit')">编辑</el-button
            >
            <el-divider direction="vertical"></el-divider>
            <el-dropdown>
              <el-button type="text" size="small">更多<el-icon><arrow-down /></el-icon></el-button>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item disabled @click="handleClick(scope.row.billNo, scope.row.ioBillHeaderId, 'delete')">删除</el-dropdown-item>
                  <el-dropdown-item @click="handleClick(scope.row.billNo, scope.row.ioBillHeaderId,'delete')">审核</el-dropdown-item>
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
    title="盘亏出库-编辑"
    width="1100px"
    :fullscreen='fullscreen'
    destroy-on-close
  >
    <div style="position:relative">
    <el-divider class="divider"></el-divider>
    <InventorylossdeliveryDetail 
    :billNo="billNo" 
    :handleClose="handleClose" 
    :loadInventorylossdeliverylist="loadInventorylossdeliverylist" 
    :ioBillHeaderId="ioBillHeaderId"
    :edit_type="edit_type"
    :stockType="stockType"
    :stockName="stockName"
    :route="route"
    />
    </div>
  </el-dialog>
  <el-dialog
        v-model="dialogVisible2"
        title="提示"
        width="300px"
        destroy-on-close
      >
    <span class="confirm">确定删除所选记录？</span>
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
  ArrowDown
} from '@element-plus/icons-vue'
import InventorylossdeliveryDetail from './InOutManagementDetail.vue'
import { AxiosApi } from '../../utils/api'
import { AxiosResponse } from 'axios'
import { ElMessage } from 'element-plus'

export default defineComponent({
  name:'Inventorylossdelivery',
  components:{
    Refresh,
    Search,
    Plus,
    // Download,
    // Upload,
    ArrowDown,
    InventorylossdeliveryDetail
  },
  props:{
    route:{
      type:String,
      required:true
    },
    stockName:{
      type:String,
      required:true
    },
    stockType:{
      type:String,
      required:true
    }
  },
  setup (props, context) {
    const dialogVisible = ref(false)
    const fullscreen = ref(false)
    const Inventorylossdeliverylist = ref([{}])
    const total = ref(0)
    const current_page = ref(1)
    const edit_type = ref('')
    const billNo = ref('')
    const selectNum = ref(0)
    const ioBillHeaderId = ref(0)
    const dateValue = ref([])
    const searchId = ref('')
    const multipleSelection = ref([{}])
    const dialogVisible2 = ref(false)
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
      multipleSelection.value = val
    }

    const handleCurrentChange = (val: number) :void => {
      current_page.value = val
      loadInventorylossdeliverylist(val)
    }

    const downloadExcel = () => {
      loading.value = true
      // window.location.href = `http://123.56.223.217:8080/billHeader/downLoadIn?&stockIoName=${props.stockName}`
      // loading.value = false
      AxiosApi.get(`billHeader/downLoadIn?&stockIoName=${props.stockName}`)
        .then((res:AxiosResponse) => {
          console.log(res)
          const url = window.URL.createObjectURL(new File([JSON.stringify(res)], 'application/json'))
          const link = document.createElement('a')
          link.download = `${props.stockName}.xls`
          link.href = url
          link.click()
          loading.value = false
        })
        .catch((err) => {
          console.log(err)
          loading.value = false
        }) 
    }

    const handleReset = () => {
      dateValue.value = []
      searchId.value = ''
      loadInventorylossdeliverylist(1)
    }

    const handleSearch = () => {
      loadInventorylossdeliverylist(1, dateValue.value[1], dateValue.value[0], searchId.value)
    }

    const handleClick = (id:string, IoBillHeaderId:number, type:string) => {
      if (type === 'edit') {
        dialogVisible.value = true
        edit_type.value = 'edit'
        ioBillHeaderId.value = IoBillHeaderId
        billNo.value = id
      } else if (type === 'add') {
        edit_type.value = 'add'
        billNo.value = ''
        dialogVisible.value = true
      }
    }

    const handleClose = () => {
      dialogVisible.value = false
    }

    const handleDelete = () => {
      multipleSelection.value.map((m:any) => {
        if (m.ioBillHeaderId) {
          AxiosApi.delete(`billHeader/delete?id=${m.ioBillHeaderId}`)
            .then(() => {
              success('删除成功！')
              loadInventorylossdeliverylist(1)
              dialogVisible2.value = false
            })
            .catch(() => {
              error('删除失败')
            })
        }
      })
    }

    const loadInventorylossdeliverylist = (current_page:number, updateEndTime?:string, updateStartTime?:string, searchId?:string) :void => {
      loading.value = true
      AxiosApi.get(`billHeader/list?pageNum=${current_page}&stockIoName=${props.stockName}${updateEndTime ? `&updateEndTime=${updateEndTime}&updateStartTime=${updateStartTime}` : '&pageSize=10'}${searchId ? `&billNo=${searchId}` : ''}`)
        .then((res:AxiosResponse) => {
          Inventorylossdeliverylist.value = res.data.result
          total.value = res.data.totalNum
          loading.value = false
        })
        .catch((err) => {
          console.log(err)
          loading.value = false
        }) 
    }

    onMounted(() => {
      loadInventorylossdeliverylist(1)
    })

    return {
      dialogVisible,
      fullscreen,
      Inventorylossdeliverylist,
      total,
      current_page,
      handleCurrentChange,
      handleClick,
      edit_type,
      billNo,
      loadInventorylossdeliverylist,
      handleClose,
      handleSelectionChange,
      selectNum,
      ioBillHeaderId,
      dateValue,
      handleSearch,
      handleReset,
      searchId,
      handleDelete,
      dialogVisible2,
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

.button_group {
  cursor: pointer;
  .button_s {
    width: 78px;
    /* margin: 5px; */
    color: #409EFF;
    font-size: 14px;
    background: none;
    border: none;
    text-decoration: none;
    cursor: pointer;
  }
  .button_s:hover {
    width: 78px;
    /* margin: 5px; */
    color: #409EFF;
    font-size: 14px;
    background: none;
    border: none;
    text-decoration: none;
    cursor: pointer;
  }
  .button_m {
    width: 100px;
    margin: 5px 10px 5px 5px;
  }
  .my_file {
    position: relative;
    .my_input {
      position: absolute;
      opacity: 0;
      width: 78px;
      height: 30px;
      top: 0;
      left: 0;
    }
  }
}

</style>
