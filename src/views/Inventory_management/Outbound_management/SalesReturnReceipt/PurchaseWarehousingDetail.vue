<template>
  <div class="top" >
  <el-form :model="PurchaseWarehousingDetail" :label-width=LabeWidth label-position="right" v-loading="loading">
   <el-form :inline="true" class="demo-form-inline" style="margin-left:20px">
    <el-form-item  class="billProcStatus" label="处理状态:" :label-width=LabeWidth>
      <el-select v-model="PurchaseWarehousingDetail.billProcStatus" placeholder="是否通过" style="width:120px">
         <el-option label="编制" :value=1 ></el-option>
         <el-option label="审核完成" value=23 ></el-option>
         <el-option label="编制完成" :value=13 ></el-option>
         <el-option label="审核" :value=2></el-option>
         <el-option label="执行" :value=3 ></el-option>
         <el-option label="执行完成" :value=33 ></el-option>
         <el-option label="编制中" :value=12 ></el-option>
         <el-option label="审核中" :value=22 ></el-option>
         <el-option label="执行中" :value=32 ></el-option>
         <el-option label="执行完成" :value=33 ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item class="purchaseearehouse1" label="是否通过:" :label-width=LabeWidth>
       <el-select v-model="PurchaseWarehousingDetail.isApproved" placeholder="是否通过" class="option">
         <el-option label="是" :value=1 ></el-option>
         <el-option label="否" :value=0 ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item class="purchaseearehouse1" label="是否关闭:" :label-width=LabeWidth>
      <el-select v-model="PurchaseWarehousingDetail.isClosed" placeholder="是否关闭" class="option">
         <el-option label="是" :value=1 ></el-option>
         <el-option label="否" :value=0 ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item class="purchaseearehouse1" label="是否作废:" :label-width=LabeWidth>
      <el-select v-model="PurchaseWarehousingDetail.isVoided" placeholder="是否作废" class="option">
         <el-option label="是" :value=1 ></el-option>
         <el-option label="否" :value=0 ></el-option>
      </el-select>
    </el-form-item>
   </el-form>

   <el-collapse v-model="activeNames" @change="handleChange" class="collapse">
      <el-collapse-item title="展开" name="1" class="collapse_item">

   <el-form :inline="true" :model="formInline" class="demo-form-inline">
     <el-form-item  class="purchaseearehouse1" label="创建时间:" :label-width=LabeWidth>
      <el-input disabled v-model="PurchaseWarehousingDetail.createTime" placeholder="请输入创建时间"></el-input>
    </el-form-item>
    <el-form-item class="purchaseearehouse1" label="创建人:" :label-width=LabeWidth>
      <el-input disabled v-model="PurchaseWarehousingDetail.createBy" placeholder="创建人" ></el-input>
    </el-form-item>
    <el-form-item class="purchaseearehouse1" label="创建部门:" :label-width=LabeWidth>
      <el-input disabled v-model="PurchaseWarehousingDetail.sysOrgCode" placeholder="创建部门" ></el-input>
    </el-form-item>
   </el-form>

    <el-form :inline="true" :model="formInline" class="demo-form-inline">
     <el-form-item class="purchaseearehouse1" label="生效时间:" :label-width=LabeWidth>
      <el-input disabled v-model="PurchaseWarehousingDetail.effectiveTime" placeholder="请输入生效时间"></el-input>
    </el-form-item>
    <el-form-item class="purchaseearehouse1" label="审核人:" :label-width=LabeWidth>
      <el-input disabled v-model="PurchaseWarehousingDetail.approverId" placeholder="创建部门" ></el-input>
    </el-form-item>
    <el-form-item class="purchaseearehouse1" label="流程:" :label-width=LabeWidth>
     <el-input v-model="PurchaseWarehousingDetail.flowId" placeholder="流程" ></el-input>
    </el-form-item>
   </el-form>

   <el-form :inline="true" :model="formInline" class="demo-form-inline">
     <el-form-item class="purchaseearehouse1" label="修改时间:" :label-width=LabeWidth>
      <el-input disabled v-model="PurchaseWarehousingDetail.updateTime" placeholder="请输入创建时间"></el-input>
    </el-form-item>
    <el-form-item class="purchaseearehouse1" label="修改人:" :label-width=LabeWidth>
      <el-input disabled v-model="PurchaseWarehousingDetail.updateBy" placeholder="请输入修改人"></el-input>
    </el-form-item>
    <el-form-item class="purchaseearehouse1" label="是否红字:" :label-width=LabeWidth>
      <el-select disabled v-model="PurchaseWarehousingDetail.isRubric" placeholder="是否红字" class="option2">
         <el-option label="是" :value=1 ></el-option>
         <el-option label="否" :value=0 ></el-option>
      </el-select>
    </el-form-item>
   </el-form>

      </el-collapse-item>
   </el-collapse>

   <el-form :inline="true" :model="formInline" class="demo-form-inline">
     <el-form-item class="purchaseearehouse1" label="单据编号:" :label-width=LabeWidth required>
      <el-input v-model="PurchaseWarehousingDetail.billNo" placeholder="单据编号"></el-input>
    </el-form-item>
    <el-form-item class="purchaseearehouse1" label="单据日期:" :label-width=LabeWidth required>
      <!-- <el-input v-model="PurchaseWarehousingDetail.billDate" placeholder="单据日期" ></el-input> -->
      <el-date-picker v-model="PurchaseWarehousingDetail.billDate" type="date" value-format="YYYY-MM-DD" placeholder="单据日期" style="width:186px!important"/>
    </el-form-item>
    <el-form-item class="purchaseearehouse1" label="制单人:" :label-width=LabeWidth>
     <el-input v-model="PurchaseWarehousingDetail.createBy" placeholder="制单人" ></el-input>
    </el-form-item>
   </el-form>

   <el-form :inline="true" :model="formInline" class="demo-form-inline">
     <el-form-item class="purchaseearehouse1" label="业务员:" :label-width=LabeWidth>
      <el-input v-model="PurchaseWarehousingDetail.clerkId" placeholder="请输入创建时间"></el-input>
    </el-form-item>
    <el-form-item class="purchaseearehouse1" label="供应商:" :label-width=LabeWidth>
      <el-select v-model="PurchaseWarehousingDetail.supplierId" placeholder="供应商" class="option2">
         <div v-for="item in supplierList" :key="item.supplierId">
              <el-option :label="item.name" :value="item.supplierId"></el-option>
          </div>
      </el-select>
    </el-form-item>
    <el-form-item class="purchaseearehouse1" label="入库经办:" :label-width=LabeWidth>
     <el-input v-model="PurchaseWarehousingDetail.handlerId" placeholder="入库经办"></el-input>
    </el-form-item>
   </el-form>

   <el-form :inline="true" :model="formInline" class="demo-form-inline">
     <el-form-item class="purchaseearehouse1" label="源单类型:" :label-width=LabeWidth required>
      <el-input  v-model="PurchaseWarehousingDetail.stockIoName" placeholder="源单类型" disabled></el-input>
    </el-form-item>
    <el-form-item class="purchaseearehouse1" label="源单号:" :label-width=LabeWidth>
      <el-input  v-model="PurchaseWarehousingDetail.sourceNo" placeholder="源单号"></el-input>
    </el-form-item>
    <el-form-item class="purchaseearehouse1" label="结算数量和金额是否等于入库:" label-width='230px'>
      <el-select v-model="PurchaseWarehousingDetail.isSameSettle" placeholder="否" style="width:60px">
         <el-option label="是" :value=1 ></el-option>
         <el-option label="否" :value=0 ></el-option>
      </el-select>
    </el-form-item>
   </el-form>

   <el-form :model="formInline">
     <el-form-item label="备注:" :label-width=LabeWidth class="full_input">
      <el-input v-model="PurchaseWarehousingDetail.remark" placeholder="请输入创建时间"></el-input>
    </el-form-item>
    <el-form-item class="purchaseearehouse1" label="附件:" :label-width=LabeWidth>
      <el-button> 点击上传 </el-button>
    </el-form-item>
   </el-form>

   <div style="display:flex;justify-content:right">
       <el-button @click="handleClose">取消 </el-button>
       <el-button type="primary" @click="handleSave('header')">保存 </el-button>
    </div>

   </el-form>

<!-- 从表部分 -->

   <div style="margin:30px">
      <el-tabs 
        v-model="activeName" 
        class="demo-tabs" 
        @tab-click="handleClick" 
        v-loading="loading">
        <el-tab-pane label="明细" name="明细">
          <div style="display:flex;margin-bottom:20px">
          <el-button type="primary" @click="handleAddSubtable"><el-icon><plus /></el-icon>&nbsp;新增 </el-button>
          <el-button type="primary" @click="handleConfirm"><el-icon><minus /></el-icon>&nbsp;删除 </el-button>
          </div>
        <el-table 
             :data="PurchaseWarehousingSubTableDetail" 
             highlight-current-row="true" 
             border 
             header-row-style="color:black" 
             style="border: 1px solid rgb(245,244,245)"
             @selection-change="handleSelectionChange"
        >
        <el-table-column fixed type="selection" sortable width="55" />
        <el-table-column prop="detailNo" label="分录号" width="80" align="center">
          <template v-slot="scope">
           <el-input-number v-model="scope.row.detailNo" :controls="false"> </el-input-number>
          </template>
        </el-table-column>
         <el-table-column prop="sourceDetailNo" label="源单分录号" width="120" align="center">
          <template v-slot="scope">
           <el-input v-model="scope.row.sourceDetailNo" :controls="false"> </el-input>
          </template>
        </el-table-column>
         <el-table-column prop="materialId" label="物料" width="200" align="center">
          <template v-slot="scope">
           <el-select placeholder="否" v-model="scope.row.materialId" style="width:170px">
             <div v-for="item in materialList" :key="item.materialId">
              <el-option :label="item.name" :value="item.materialId"></el-option>
             </div>
           </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="unitId" label="计量单位" width="130" align="center">
          <template v-slot="scope">
           <el-select placeholder="否" v-model="scope.row.unitId" style="width:100px">
             <div v-for="item in unitList" :key="item.measureUnitId">
                <el-option :label="item.name" :value="item.measureUnitId"></el-option>
             </div>
           </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="qty" label="入库数量" width="130" align="center">
          <template v-slot="scope">
           <el-input-number v-model="scope.row.qty" :controls="false" class="el-input-number2"> </el-input-number>
          </template>
        </el-table-column>
         <!-- <el-table-column prop="qty" label="入库成本" width="130" align="center">
          <template v-slot="scope">
           <el-input-number v-model="scope.row.qty" :controls="false" class="el-input-number2"> </el-input-number>
          </template>
        </el-table-column>
        <el-table-column prop="number" label="成本含税" width="100" align="center">
          <template v-slot="scope">
           <el-select placeholder="否" v-model="scope.row.number" style="width:70px">
             <el-option label="是" value=1 ></el-option>
             <el-option label="否" value=2 ></el-option>
           </el-select>
          </template>
        </el-table-column> -->
        <el-table-column prop="warehouseId" label="仓库" width="200" align="center">
          <template v-slot="scope">
           <el-select placeholder="否" v-model="scope.row.warehouseId" style="width:170px">
             <div v-for="item in warehouseList" :key="item.warehouseId">
                <el-option :label="item.name" :value="item.warehouseId"></el-option>
             </div>>
           </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="batchNo" label="批次号" width="230" align="center">
          <template v-slot="scope">
           <el-input v-model="scope.row.batchNo" :controls="false"> </el-input>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="qty" label="结算数量" width="130" align="center">
          <template v-slot="scope">
           <el-input-number v-model="scope.row.qty" :controls="false" class="el-input-number2"> </el-input-number>
          </template>
        </el-table-column>
        <el-table-column prop="number" label="含税单价" width="130" align="center">
          <template v-slot="scope">
           <el-input-number v-model="scope.row.number" :controls="false" class="el-input-number2"> </el-input-number>
          </template>
        </el-table-column>
        <el-table-column prop="number" label="税率" width="130" align="center">
          <template v-slot="scope">
           <el-input-number v-model="scope.row.number" :controls="false" class="el-input-number2"> </el-input-number>
          </template>
        </el-table-column>
         <el-table-column prop="number" label="税额" width="130" align="center">
          <template v-slot="scope">
           <el-input-number v-model="scope.row.number" :controls="false" class="el-input-number2"> </el-input-number>
          </template>
        </el-table-column>
        <el-table-column prop="number" label="折让金额" width="130" align="center">
          <template v-slot="scope">
           <el-input-number v-model="scope.row.number" :controls="false" class="el-input-number2"> </el-input-number>
          </template>
        </el-table-column>
        <el-table-column prop="number" label="折税金额" width="130" align="center">
          <template v-slot="scope">
           <el-input-number v-model="scope.row.number" :controls="false" class="el-input-number2"> </el-input-number>
          </template>
        </el-table-column>
        <el-table-column prop="number" label="结算金额" width="150" align="center">
          <template v-slot="scope">
           <el-input-number v-model="scope.row.number" :controls="false" class="el-input-number3"> </el-input-number>
          </template>
        </el-table-column>
        <el-table-column prop="number" label="已开票数量" width="150" align="center">
          <template v-slot="scope">
           <el-input-number v-model="scope.row.number" :controls="false" class="el-input-number3"> </el-input-number>
          </template>
        </el-table-column>
        <el-table-column prop="number" label="已开票金额" width="150" align="center">
          <template v-slot="scope">
           <el-input-number v-model="scope.row.number" :controls="false" class="el-input-number3"> </el-input-number>
          </template>
        </el-table-column> -->
        <el-table-column prop="remark" label="备注" width="230" align="center">
          <template v-slot="scope">
           <el-input v-model="scope.row.remark"> </el-input>
          </template>
        </el-table-column>
        <el-table-column prop="remark2" label="备注2" width="230" align="center">
          <template v-slot="scope">
           <el-input v-model="scope.row.remark2" > </el-input>
          </template>
        </el-table-column>
        <el-table-column prop="remark3" label="备注2" width="230" align="center">
          <template v-slot="scope">
           <el-input v-model="scope.row.remark3" > </el-input>
          </template>
        </el-table-column>
        
      </el-table>
        </el-tab-pane>
      </el-tabs>
   </div>
    <div style="display:flex;justify-content:right">
       <el-button @click="handleClose">取消 </el-button>
       <el-button type="primary" @click="handleSave('sub')">保存 </el-button>
       <el-button type="primary">提交 </el-button>
    </div>
     <el-dialog
        v-model="dialogVisible"
        title="提示"
        width="20%"
        destroy-on-close
      >
    <span class="confirm">确定删除此物料数据？</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleDeleteSubtable">确定</el-button>
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
import { AxiosApi } from '../../../../utils/api'
import { AxiosResponse } from 'axios'
import { ElMessage } from 'element-plus'

export default defineComponent({
  name:'PurchaseWarehousingDetail',
  components:{
    Plus,
    Minus
  },
  props: {
    edit_type:{
      type: String,
      required: true
    },
    billNo:{
      type:String,
      required:true
    },
    handleClose:{
      type:Function,
      required:true
    },
    loadPurchaseWarehousinglist:{
      type:Function,
      required:true  
    },
    ioBillHeaderId: {
      type:Number,
      required:true
    }
  },
  setup (props, context) {
    const LabeWidth = ref('100px')
    const activeName = ref('明细')
    const PurchaseWarehousingDetail = ref({
      approverId: '',
      attachment: '',
      billDate: '',
      billNo: '',
      billProcStatus: '',
      clerkId: '',
      createBy: '',
      createTime: undefined,
      customerId: null,
      customerName: null,
      effectiveTime: null,
      flowId: null,
      handlerId: '',
      hasRp: '',
      ioBillHeaderId: null,
      isApproved: 0,
      isAuto: 0,
      isClosed: 0,
      isRubric: 0,
      isSameSettle: 0,
      isVoided: 0,
      remark: '',
      sourceId: null,
      sourceNo: null,
      sourceType: '',
      stockIoName: '采购入库',
      stockIoType: '101',
      supplierId: null,
      supplierName: '',
      sysOrgCode: '',
      updateBy: '',
      updateTime: undefined
    })
    const PurchaseWarehousingSubTableDetail = ref([{}])
    const materialList = ref([{}])
    const supplierList = ref([{}])
    const unitList = ref([{}])
    const warehouseList = ref([{}])
    const loading = ref(false)
    const AddSubTable = ref(false)
    const multipleSelection = ref([{}])
    const dialogVisible = ref(false)

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
      if (props.edit_type === 'edit') {
        if (type === 'header') {
          const data = PurchaseWarehousingDetail.value
          data.updateTime = undefined
          data.createTime = undefined
          AxiosApi.put('billHeader/update', JSON.stringify(data))
            .then((res:AxiosResponse) => {
              console.log(res)
              success('保存成功！')
              props.handleClose()
              props.loadPurchaseWarehousinglist(1)
              loading.value = false
            })
            .catch((err) => {
              error('保存失败！')
              console.log(err)
              loading.value = false
            })
        } else if (type === 'sub' && AddSubTable.value === false) {
          PurchaseWarehousingSubTableDetail.value.map((p) => {
            const data:any = p
            data.modifiedDate = undefined
            AxiosApi.put('billDetail/update', JSON.stringify(data))
              .then((res:AxiosResponse) => {
                console.log(res)
                success('保存成功！')
                props.handleClose()
                props.loadPurchaseWarehousinglist(1)
                loading.value = false
              })
              .catch((err) => {
                error('保存失败！')
                console.log(err)
                loading.value = false
              })
          })
        } else if (type === 'sub' && AddSubTable.value === true) {
          AxiosApi.post('billDetail/add', JSON.stringify(PurchaseWarehousingSubTableDetail.value[PurchaseWarehousingSubTableDetail.value.length - 1]))
            .then((res) => {
              console.log(res)
              success('保存成功')
              props.loadPurchaseWarehousinglist(1)
              loading.value = false
            })
            .catch((err) => {
              console.log(err)
              error('保存失败')
              loading.value = false
            })
        }
      } else if (props.edit_type === 'add') {
        if (type === 'header') {
          AxiosApi.post('billHeader/add', JSON.stringify(PurchaseWarehousingDetail.value))
            .then((res) => {
              console.log(res)
              success('保存成功')
              props.loadPurchaseWarehousinglist(1)
              loading.value = false
            })
            .catch((err) => {
              console.log(err)
              error('保存失败')
              loading.value = false
            })
        } else if (type === 'sub') {
          AxiosApi.post('billDetail/add', JSON.stringify(PurchaseWarehousingSubTableDetail.value))
            .then((res) => {
              console.log(res)
              success('保存成功')
              props.loadPurchaseWarehousinglist(1)
              loading.value = false
            })
            .catch((err) => {
              console.log(err)
              error('保存失败')
              loading.value = false
            })
        }      
      }
    }

    const handleSelectionChange = (val: any[]) => {
      multipleSelection.value = val
    }

    const handleAddSubtable = () => {
      PurchaseWarehousingSubTableDetail.value.push({
        batchNo: '',
        detailNo: null,
        ioBillDetailId: null,
        ioBillHeaderId: props.ioBillHeaderId,
        materialId: null,
        materialName: '',
        modifiedDate: null,
        qty: null,
        remark: '',
        remark2: '',
        remark3: '',
        sourceDetailId: null,
        sourceDetailNo: '',
        sourceType: null,
        supplierId: null,
        supplierName: '',
        unitId: null,
        unitName: '',
        warehouseId: null,
        warehouseName: ''
      })
      AddSubTable.value = true
    }

    const loadPurchaseWarehousingSubtableDetail = (IoBillHeaderId:number) => {
      loading.value = true
      AxiosApi.get(`billDetail/list?ioBillHeaderId=${IoBillHeaderId}`)
        .then((res:AxiosResponse) => {
          if (props.edit_type === 'edit') {
            PurchaseWarehousingSubTableDetail.value = res.data.result
          }
          materialList.value = res.data.materialList
          supplierList.value = res.data.supplierList
          unitList.value = res.data.unitList
          warehouseList.value = res.data.warehouseList
          loading.value = false
        })
    }

    const loadPurchaseWarehousingHeaderDetail = () => {
      loading.value = true
      AxiosApi.get(`billHeader/find?billNo=${props.billNo}&stockIoName=采购入库`)
        .then((res:AxiosResponse) => {
          PurchaseWarehousingDetail.value = res.data.result
          loadPurchaseWarehousingSubtableDetail(res?.data?.result?.ioBillHeaderId)
          loading.value = false
        })
    }

    const handleDeleteSubtable = () => {
      multipleSelection.value.map((m:any) => {
        AxiosApi.delete(`billDetail/delete?id=${m.ioBillDetailId}`)
          .then(() => {
            success('删除成功！')
          })
          .catch(() => {
            error('删除失败')
          })
      })
      loadPurchaseWarehousingHeaderDetail()
      dialogVisible.value = false
    }

    const handleConfirm = () => {
      dialogVisible.value = true
    }

    onMounted(() => {
      if (props.edit_type === 'edit' && props.billNo !== '') {
        loadPurchaseWarehousingHeaderDetail()
      } else if (props.edit_type === 'add') {
        loadPurchaseWarehousingSubtableDetail(1)
      }
    })

    return {
      LabeWidth,
      activeName,
      PurchaseWarehousingDetail,
      handleSave,
      PurchaseWarehousingSubTableDetail,
      handleAddSubtable,
      materialList,
      supplierList,
      unitList,
      warehouseList,
      loading,
      handleSelectionChange,
      handleDeleteSubtable,
      dialogVisible,
      handleConfirm
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
