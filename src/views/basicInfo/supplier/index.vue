<template>
    <Card class="customer_card">
      <el-form :inline="true" class="demo-form-inline">
       <el-form-item label="名称" class="encode">
        <el-select placeholder="请选择查找类型" v-model="findType">
        <el-option label="编码" value="编码"></el-option>
        <!-- <el-option label="ID" value="ID"></el-option> -->
        <el-option label="名称" value="名称"></el-option>
        </el-select>
      </el-form-item>
    <el-form-item :label="findType" class="encode">
      <el-input v-model="findValue" placeholder="请输入查询内容"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onQuery" class="query">查询</el-button>
      <el-button type="primary" @click="onAdd" class="query" >添加</el-button>
    </el-form-item>
  </el-form>
  <el-table :data="SupplierData" class="tabel" header-row-style="color:black" style="border: 1px solid rgb(245,244,245)" >
    <el-table-column prop="code" label="编码" :width="columnwidth" fixed />
    <el-table-column prop="name" label="名称" :width="columnwidth" />
    <el-table-column prop="shortName" label="简称" :width="columnwidth" />
    <el-table-column prop="supplierLevelText" label="等级" :width="columnwidth" />
    <el-table-column prop="taxScaleText" label="纳税规模" :width="columnwidth" />
    <el-table-column prop="bizArea" label="所属地区" :width="columnwidth" />
    <el-table-column prop="area" label="业务地域" :width="columnwidth" />
    <el-table-column prop="headquarters" label="所属总公司" :width="columnwidth" />
    <el-table-column prop="isEnabled" label="是否启用" :width="columnwidth" >
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
    <el-table-column fixed="right" label="操作" sortable width="120">
          <template v-slot="scope">
            <el-button type="text" size="small" @click="handleAdit(scope.row)">编辑</el-button>
            <el-divider direction="vertical"></el-divider>
             <el-dropdown>
              <el-button type="text" size="small">更多<el-icon><arrow-down /></el-icon></el-button>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item @click="handleConfirm(scope.row.supplierId)">删除</el-dropdown-item>
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
      :total="1000"
      v-model:currentPage="current_page"
      @current-change="handleCurrentChange"
    >
    </el-pagination>
  </template>
  <el-dialog
    v-model="dialogVisible"
    title="客户-详情"
    width="1000px"
    destroy-on-close
  >
    <SupplierDetails :supplierId="supplierId" :handleClose="handleClose" :loaderSupplier="loaderSupplier" :type="type"/>
  </el-dialog>
   <el-dialog
    v-model="dialogVisible2"
    title="提示"
    width="20%"
    destroy-on-close
  >
    <span class="confirm">确定删除此客户？</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible2 = false">取消</el-button>
        <el-button type="primary" @click="handledetele"
          >确定</el-button
        >
      </span>
    </template>
  </el-dialog>
    </Card>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import SupplierDetails from '../../../components/basicInfo/supplierdetails/index.vue'
import { AxiosApi } from '../../../utils/api'
import { AxiosResponse } from 'axios'
import { ElMessage } from 'element-plus'

export default defineComponent({
  name:'asside',
  components:{
    SupplierDetails
  },
  setup () {
    const dialogVisible = ref(false)
    const SupplierData = ref([])
    const supplierId = ref()
    const dialogVisible2 = ref(false)
    const deleteID = ref()
    const findValue = ref()
    const type = ref('add')
    const findType = ref('编码')
    const columnwidth = ref('150px')
    const current_page = ref(1)

    const onAdd = ():void => {
      type.value = 'add'
      supplierId.value = 0
      dialogVisible.value = true
    }

    const handleCurrentChange = (val: number) :void => {
      loaderSupplier(val)
    }

    const success = (message:string) => {
      ElMessage({
        message: message,
        type: 'success'
      })
    }

    const error = (message:string) => {
      ElMessage.error(message)
    }

    const onQuery = ():void => {
      // if (findType.value === 'ID') {
      //   AxiosApi.get(`supplier/find?id=${findValue.value}`)
      //     .then((res) => {
      //       SupplierData.value = new Array(res.data.result )
      //     }).catch((err) => {
      //       console.log(err)
      //     })
      // } else 
      if (findType.value === '编码') {
        AxiosApi.get(`supplier/list?code=${findValue.value}&pageNum=1&pageSize=1000`).then((res) => {
          SupplierData.value = res.data.result
          success('查找成功！')
        }).catch((err) => {
          console.log(err)
          error('查找失败！')
        })
      } else {
        AxiosApi.get(`supplier/list?name=${findValue.value}&pageNum=1&pageSize=1000`).then((res) => {
          SupplierData.value = res.data.result
          success('查找成功！')
        }).catch((err) => {
          console.log(err)
          error('查找失败！')
        })
      }
    }
    
    const handleClose = () => {
      dialogVisible.value = false
    }

    const handleAdit = (supplier:any) :void => {
      type.value = 'edit'
      supplierId.value = supplier.supplierId
      dialogVisible.value = true
    }

    const loaderSupplier = (curret_page: number) :void => {
      AxiosApi.get(`supplier/list?pageNum=${curret_page}&pageSize=10`)
        .then((res:AxiosResponse) => {
          SupplierData.value = res.data.result
        }).catch((err) => {
          console.log(err)
        })
    }

    const handleConfirm = (supplierId:number) :void => {
      deleteID.value = supplierId
      dialogVisible2.value = true
    }

    const handledetele = () :void => {
      AxiosApi.delete(`supplier/delete?id=${deleteID.value}`)
        .then((res) => {
          loaderSupplier(current_page.value)
          dialogVisible2.value = false
          success('删除成功！')
        }).catch((err) => {
          console.log(err)
          error('删除失败！')
        })
    }

    const handleDetail = (customer:any) :void => {
      type.value = 'detail'
      supplierId.value = customer.customerId
      dialogVisible.value = true
    }
    onMounted(() => {
      loaderSupplier(1)
    })
    return {
      SupplierData,
      dialogVisible,
      handleAdit,
      handledetele,
      onQuery,
      handleClose,
      supplierId,
      loaderSupplier,
      dialogVisible2,
      handleConfirm,
      findValue,
      type,
      onAdd,
      findType,
      handleDetail,
      columnwidth,
      current_page,
      handleCurrentChange
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

.demo-form-inline{
    width: 100%;
    padding: 0;
    text-align: left;
}

.name{
    margin-left: 100px;
}

.query{
    margin-left: 50px;
}

.confirm{
  font-size: 20px;
}

.pagination{
  margin-top: 40px;
  display: flex;
  justify-content: right;
}

.tabel {
  margin-top:20px;
  max-width: 1565px;
}

</style>
