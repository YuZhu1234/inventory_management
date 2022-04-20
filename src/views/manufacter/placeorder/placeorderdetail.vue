<template>
  <div class="top" >
  <el-form :model="PlaceorderDetail" :label-width=LabeWidth label-position="right" v-loading="loading">

   <el-form :inline="true" :model="formInline" class="demo-form-inline">
     <el-form-item  class="purchaseearehouse1" label="创建时间:" :label-width=LabeWidth>
      <el-input disabled v-model="PlaceorderDetail.createTime" placeholder="请输入创建时间"></el-input>
    </el-form-item>
    <el-form-item class="purchaseearehouse1" label="创建人:" :label-width=LabeWidth>
      <el-input disabled v-model="PlaceorderDetail.createBy" placeholder="创建人" ></el-input>
    </el-form-item>
    <el-form-item class="purchaseearehouse1" label="修改时间:" :label-width=LabeWidth>
      <el-input disabled v-model="PlaceorderDetail.updateTime" placeholder="请输入创建时间"></el-input>
    </el-form-item>
    <el-form-item class="purchaseearehouse1" label="修改人:" :label-width=LabeWidth>
      <el-input disabled v-model="PlaceorderDetail.updateBy" placeholder="请输入修改人"></el-input>
    </el-form-item>
   </el-form>

   <el-form :inline="true" :model="formInline" class="demo-form-inline">
     <el-form-item class="purchaseearehouse1" label="订单号:" :label-width=LabeWidth required>
      <el-input v-model="PlaceorderDetail.purchaseOrderId" placeholder="单据编号"></el-input>
    </el-form-item>
    <el-form-item class="purchaseearehouse1" label="订单日期:" :label-width=LabeWidth required>
      <!-- <el-input v-model="PlaceorderDetail.billDate" placeholder="单据日期" ></el-input> -->
      <el-date-picker v-model="PlaceorderDetail.orderDate" type="date" value-format="YYYY-MM-DD" placeholder="单据日期" style="width:186px!important"/>
    </el-form-item>
    <el-form-item class="purchaseearehouse1" label="下单人:" :label-width=LabeWidth>
     <el-input v-model="PlaceorderDetail.requester" placeholder="下单人" ></el-input>
    </el-form-item>
   </el-form>

   <el-form :inline="true" :model="formInline" class="demo-form-inline">
    <el-form-item class="purchaseearehouse1" label="供应商:" :label-width=LabeWidth>
      <el-select v-model="PlaceorderDetail.vendorId" placeholder="供应商" class="option2">
         <div v-for="item in SupplierData" :key="item.supplierId">
              <el-option :label="item.name" :value="item.supplierId"></el-option>
          </div>
      </el-select>
    </el-form-item>
    <el-form-item class="purchaseearehouse1" label="邮寄地址:" :label-width=LabeWidth>
      <el-input v-model="PlaceorderDetail.shipToId" placeholder="邮寄地址" ></el-input>
    </el-form-item>
   </el-form>

   <el-form :model="formInline">
     <el-form-item label="备注:" :label-width=LabeWidth class="full_input">
      <el-input v-model="PlaceorderDetail.remarks" placeholder="请输入备注"></el-input>
    </el-form-item>

   </el-form>

   </el-form>

<!-- 从表部分 -->

   <div style="margin:30px" >
      <el-tabs 
        v-model="activeName" 
        class="demo-tabs" 
        @tab-click="handleClick" 
        v-loading="loading">
        <el-tab-pane label="明细" name="明细">
          <div style="display:flex;margin-bottom:20px" v-if="edit_type === 'edit'">
          <el-button type="primary" @click="handleAddSubtable" ><el-icon><plus /></el-icon>&nbsp;新增 </el-button>
          <el-button type="primary" @click="handleConfirm('delete')"><el-icon><minus /></el-icon>&nbsp;删除 </el-button>
          </div>
        <el-table 
             :data="PlaceorderSubTableDetail" 
             highlight-current-row="true" 
             border 
             header-row-style="color:black" 
             style="border: 1px solid rgb(245,244,245)"
             @selection-change="handleSelectionChange"
             v-if="edit_type === 'edit'"
        >
        <el-table-column fixed type="selection" sortable width="55" />
        <el-table-column prop="description" label="详细描述" width="300" align="center">
          <template v-slot="scope">
           <el-input v-model="scope.row.description" :controls="false" :disabled="scope.row.id"> </el-input>
          </template>
        </el-table-column>
         <el-table-column prop="sourceDetailNo" label="数量" width="200" align="center">
          <template v-slot="scope">
            <el-input-number style="width:170px !important" v-model="scope.row.qty" :controls="false" :disabled="scope.row.id"  @change="handleChange(scope.row.qty,scope.row.unitPrice)"> </el-input-number>
          </template>
        </el-table-column>
         <el-table-column prop="unitPrice" label="单价(元)" width="200" align="center">
          <template v-slot="scope">
           <el-input-number style="width:170px !important" v-model="scope.row.unitPrice" :controls="false" :disabled="scope.row.id" @change="handleChange(scope.row.qty,scope.row.unitPrice)"> </el-input-number>
          </template>
        </el-table-column>
        <el-table-column prop="extension" label="数量*单价" width="200" align="center">
          <template v-slot="scope">
           <el-input-number style="width:170px !important" v-if="scope.row.id" v-model="scope.row.extension" :controls="false" disabled> </el-input-number>
           <el-input-number style="width:170px !important" v-else v-model="extension2" :controls="false" disabled> </el-input-number>
          </template>
        </el-table-column>
        <el-table-column prop="createBy" label="创建人" width="230" align="center" required>
          <template v-slot="scope">
           <el-input  required v-model="scope.row.createBy" :controls="false" disabled> </el-input>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="230" align="center">
          <template v-slot="scope">
           <el-input v-model="scope.row.createTime" disabled> </el-input>
          </template>
        </el-table-column>
        <el-table-column prop="updateBy" label="更新人" width="230" align="center">
          <template v-slot="scope">
           <el-input v-model="scope.row.updateBy" disabled > </el-input>
          </template>
        </el-table-column>
        <el-table-column prop="updatedTime" label="更新时间" width="230" align="center">
          <template v-slot="scope">
           <el-input v-model="scope.row.updatedTime" disabled > </el-input>
          </template>
        </el-table-column>
        
      </el-table>
        </el-tab-pane>
      </el-tabs>
   </div>
    <div style="display:flex;justify-content:right">
       <el-button @click="handleClose">取消 </el-button>
       <el-button type="primary" @click="handleSave()">保存 </el-button>
       <el-button type="primary">提交 </el-button>
    </div>
     <el-dialog
        v-model="dialogVisible"
        title="提示"
        width="20%"
        destroy-on-close
      >
    <span class="confirm">确定删除此记录？<br/>(提示：记录删除不影响库存变化。)</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleDeleteSubtable">确定</el-button>
      </span>
    </template>
  </el-dialog>
  <el-dialog
        v-model="dialogVisible2"
        title="提示"
        width="20%"
        destroy-on-close
      >
    <span class="confirm">确定增加此记录？<br/>(提示：增加记录将影响库存且不可修改。)</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible2 = false">取消</el-button>
        <el-button type="primary" @click="addSubTable">确定</el-button>
      </span>
    </template>
  </el-dialog>
  </div>
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
  Minus
} from '@element-plus/icons-vue'
import { AxiosApi } from '../../../utils/api'
import { AxiosResponse } from 'axios'
import { ElMessage } from 'element-plus'

export default defineComponent({
  name:'PlaceorderDetail',
  components:{
    Plus,
    Minus
  },
  props: {
    edit_type:{
      type: String,
      required: true
    },
    id:{
      type:String,
      required:true
    },
    handleClose:{
      type:Function,
      required:true
    },
    loadPlaceorderlist:{
      type:Function,
      required:true  
    },
    purchaseOrderId: {
      type:Number,
      required:true
    }
  },
  setup (props, context) {
    const LabeWidth = ref('100px')
    const activeName = ref('明细')
    const PlaceorderDetail = ref({
      id: null,
      purchaseOrderId: '',
      orderDate: null,
      requester: '',
      vendorId: null,
      shipToId: '',
      remarks: null,
      createBy: '',
      createTime: undefined,
      updateBy: '',
      updateTime: undefined
    })
    const PlaceorderSubTableDetail = ref([{}])
    const materialList = ref([{}])
    const supplierList = ref([{}])
    const unitList = ref([{}])
    const warehouseList = ref([{}])
    const loading = ref(false)
    const AddSubTable = ref(false)
    const multipleSelection = ref([{}])
    const dialogVisible = ref(false)
    const dialogVisible2 = ref(false)
    const extension2 = ref(0)
    const SupplierData = ref([{}])

    const success = (message:string) => {
      ElMessage({
        message: message,
        type: 'success'
      })
    }

    const error = (message:string) => {
      ElMessage.error(message)
    }

    const handleSave = (type:string) => {
      loading.value = true
      const data:any = PlaceorderDetail.value
      data.updateTime = undefined
      data.createTime = undefined
      data.timestamp = undefined
      if (props.edit_type === 'edit') {
        if (AddSubTable.value === true) {      
          AxiosApi.put('orderHeader/update', JSON.stringify(data))
            .then((res:AxiosResponse) => {
              dialogVisible2.value = true
            })
            .catch((err) => {
              error('保存失败！')
              console.log(err)
              loading.value = false
            })
        } else {
          AxiosApi.put('orderHeader/update', JSON.stringify(data))
            .then((res:AxiosResponse) => {
              console.log(res)
              success('保存成功！')
              props.handleClose()
              props.loadPlaceorderlist(1)
              loading.value = false
            })
            .catch((err) => {
              error('保存失败！')
              console.log(err)
              loading.value = false
            })
        }
      } else if (props.edit_type === 'add') {    
        loading.value = true
        AxiosApi.post('orderHeader/add', JSON.stringify(PlaceorderDetail.value))
          .then((res) => {
            console.log(res)
            success('保存成功')
            props.loadPlaceorderlist(1)
            loading.value = false
          })
          .catch((err) => {
            console.log(err)
            error('保存失败')
            loading.value = false
          })
      }
    }

    const handleSelectionChange = (val: any[]) => {
      multipleSelection.value = val
    }

    const addSubTable = () => {
      PlaceorderSubTableDetail.value.map((p:any) => {
        if (!p.ioBillDetailId) {
          const data:any = p
          data.createTime = undefined
          data.updatedTime = undefined
          AxiosApi.post('orderDetail/add', JSON.stringify(data))
            .then((res:AxiosResponse) => {
              console.log(res)  
              success('添加成功！')  
              loadPlaceorderHeaderDetail()    
              dialogVisible2.value = false
              loading.value = false
              props.loadPlaceorderlist(1)
            })
            .catch((err) => {
              console.log(err)
              loading.value = false
              error('添加失败!请保证所有信息填写完整且分录号不重复！')
              dialogVisible2.value = false
            })
        }
      })
    }

    const handleAddSubtable = () => {
      if (AddSubTable.value === true) {
        success('每次只能新增一条数据，请先保存或删除新增数据后再增加；')
        return
      }
      PlaceorderSubTableDetail.value.push({
        createBy: 'test-yu',
        description: '',
        extension: 0,
        id: 0,
        poHeaderId: props.id,
        qty: 0,
        reference: null,
        unitPrice: 0,
        updateBy: 'test-yu',
        createTime:undefined,
        updatedTime:undefined
      })
      AddSubTable.value = true
    }

    const loadPlaceorderSubtableDetail = () => {
      loading.value = true
      AxiosApi.get(`orderDetail/list?id=${props?.id}`)
        .then((res:AxiosResponse) => {
          if (props.edit_type === 'edit') {
            PlaceorderSubTableDetail.value = res.data.result
          }
          materialList.value = res.data.materialList
          supplierList.value = res.data.supplierList
          unitList.value = res.data.unitList
          warehouseList.value = res.data.warehouseList
          loading.value = false
        })
    }

    const loadPlaceorderHeaderDetail = () => {
      loading.value = true
      AxiosApi.get(`orderHeader/find?purchaseOrderId=${props.purchaseOrderId}`)
        .then((res:AxiosResponse) => {
          PlaceorderDetail.value = res.data.result
          loadPlaceorderSubtableDetail()
          loading.value = false
        }).catch(() => {
          loading.value = false
          error('获取详情信息失败')
        })
    }

    const handleDeleteSubtable = () => {
      multipleSelection.value.map((m:any) => {
        if (m.id) {
          AxiosApi.delete(`orderDetail/delete?id=${m.id}`)
            .then(() => {
              success('删除成功！')
              loadPlaceorderHeaderDetail()
            })
            .catch(() => {
              error('删除失败')
              AddSubTable.value = false
            })
        }
      })
      dialogVisible.value = false
    }

    const handleChange = (qty:number, price:number) => {
      extension2.value = qty * price
    }

    const loadSupplier = () => {
      AxiosApi.get('supplier/list?pageSize=999')
        .then((res:AxiosResponse) => {
          SupplierData.value = res.data.result
        }).catch((err) => {
          console.log(err)
          error('获取供应商信息失败')
        })
    }

    const handleConfirm = (type:string) => {
      if (type === 'delete') {
        dialogVisible.value = true
      }
    }

    onMounted(() => {
      if (props.edit_type === 'edit' && props.id !== '') {
        loadPlaceorderHeaderDetail()
      }
      loadSupplier()
      // else if (props.edit_type === 'add') {
      //   loadPlaceorderSubtableDetail()
      // }
    })

    return {
      LabeWidth,
      activeName,
      PlaceorderDetail,
      handleSave,
      PlaceorderSubTableDetail,
      handleAddSubtable,
      materialList,
      supplierList,
      unitList,
      warehouseList,
      loading,
      handleSelectionChange,
      handleDeleteSubtable,
      dialogVisible,
      handleConfirm,
      AddSubTable,
      dialogVisible2,
      addSubTable,
      extension2,
      handleChange,
      SupplierData
    }
  }
})
</script>

<style lang="less">
.top {
  font-size: 14px;
  font-family: -apple-system,BlinkMacSystemFont,Segoe UI,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Helvetica Neue,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol;
  margin-top: -30px;
}

.option {
  width: 60px;
}

.demo-form-inline {
  display: flex;
  width: 100%;
}

.purchaseearehouse1 {
  width: 288px;
  display: flex;
  justify-content: left;
  margin-left: 20px;
}

.el-form-item__content {
  text-align: left;
}

.el-input-number {
  width: 50px!important;
}

.el-input-number2 {
  width: 100px!important;
}

.el-input-number3 {
  width: 120px!important;
}

.full_input{
  width: 810px;
  margin-left: 20px;
}

.collapse{
  border: none!important;
  margin-top: -30px;
  margin-bottom: -20px;
}

.collapse_item{
 border: none!important;
}

.el-collapse-item__header {
  width: 60px;
  color:#409EFF!important;
  border:none!important;
  position: relative;
  left: 95%;
  top: 20px;
}

.el-collapse-item__wrap{
  border:none!important;
}
</style>
