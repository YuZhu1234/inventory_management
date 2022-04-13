<template>
  <div class="top" >
  <el-form :model="InventoryCheckDetail" :label-width=LabeWidth label-position="right" v-loading="loading">
   <el-form :inline="true" class="demo-form-inline" style="margin-left:20px">
    <el-form-item  class="billProcStatus" label="处理状态:" :label-width=LabeWidth>
      <el-select v-model="InventoryCheckDetail.billProcStatus" placeholder="是否通过" style="width:120px">
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
       <el-select v-model="InventoryCheckDetail.isApproved" placeholder="是否通过" class="option">
         <el-option label="是" :value=1 ></el-option>
         <el-option label="否" :value=0 ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item class="purchaseearehouse1" label="是否关闭:" :label-width=LabeWidth>
      <el-select v-model="InventoryCheckDetail.isClosed" placeholder="是否关闭" class="option">
         <el-option label="是" :value=1 ></el-option>
         <el-option label="否" :value=0 ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item class="purchaseearehouse1" label="是否作废:" :label-width=LabeWidth>
      <el-select v-model="InventoryCheckDetail.isVoided" placeholder="是否作废" class="option">
         <el-option label="是" :value=1 ></el-option>
         <el-option label="否" :value=0 ></el-option>
      </el-select>
    </el-form-item>
   </el-form>

   <el-collapse v-model="activeNames" @change="handleChange" class="collapse">
      <el-collapse-item title="展开" name="1" class="collapse_item">

   <el-form :inline="true" :model="formInline" class="demo-form-inline">
     <el-form-item  class="purchaseearehouse1" label="创建时间:" :label-width=LabeWidth>
      <el-input disabled v-model="InventoryCheckDetail.createTime" placeholder="请输入创建时间"></el-input>
    </el-form-item>
    <el-form-item class="purchaseearehouse1" label="创建人:" :label-width=LabeWidth>
      <el-input disabled v-model="InventoryCheckDetail.createBy" placeholder="创建人" ></el-input>
    </el-form-item>
    <el-form-item class="purchaseearehouse1" label="创建部门:" :label-width=LabeWidth>
      <el-input disabled v-model="InventoryCheckDetail.sysOrgCode" placeholder="创建部门" ></el-input>
    </el-form-item>
   </el-form>

    <el-form :inline="true" :model="formInline" class="demo-form-inline">
     <el-form-item class="purchaseearehouse1" label="生效时间:" :label-width=LabeWidth>
      <el-input disabled v-model="InventoryCheckDetail.effectiveTime" placeholder="请输入生效时间"></el-input>
    </el-form-item>
    <el-form-item class="purchaseearehouse1" label="审核人:" :label-width=LabeWidth>
      <el-input disabled v-model="InventoryCheckDetail.approverId" placeholder="创建部门" ></el-input>
    </el-form-item>
    <el-form-item class="purchaseearehouse1" label="流程:" :label-width=LabeWidth>
     <el-input v-model="InventoryCheckDetail.flowId" placeholder="流程" ></el-input>
    </el-form-item>
   </el-form>

   <el-form :inline="true" :model="formInline" class="demo-form-inline">
     <el-form-item class="purchaseearehouse1" label="修改时间:" :label-width=LabeWidth>
      <el-input disabled v-model="InventoryCheckDetail.updateTime" placeholder="请输入创建时间"></el-input>
    </el-form-item>
    <el-form-item class="purchaseearehouse1" label="修改人:" :label-width=LabeWidth>
      <el-input disabled v-model="InventoryCheckDetail.updateBy" placeholder="请输入修改人"></el-input>
    </el-form-item>
    <el-form-item class="purchaseearehouse1" label="是否红字:" :label-width=LabeWidth>
      <el-select disabled v-model="InventoryCheckDetail.isRubric" placeholder="是否红字" class="option2">
         <el-option label="是" :value=1 ></el-option>
         <el-option label="否" :value=0 ></el-option>
      </el-select>
    </el-form-item>
   </el-form>

      </el-collapse-item>
   </el-collapse>

    <el-form :inline="true" :model="formInline" class="demo-form-inline">
     <el-form-item class="purchaseearehouse1" label="单据编号:" :label-width=LabeWidth required>
      <el-input v-model="InventoryCheckDetail.billNo" placeholder="单据编号"></el-input>
    </el-form-item>
    <el-form-item class="purchaseearehouse1" label="单据日期:" :label-width=LabeWidth required>
      <!-- <el-input v-model="InventoryCheckDetail.billDate" placeholder="单据日期" ></el-input> -->
      <el-date-picker v-model="InventoryCheckDetail.billDate" type="date" value-format="YYYY-MM-DD" placeholder="单据日期" style="width:186px!important"/>
    </el-form-item>
    <el-form-item class="purchaseearehouse1" label="制单人:" :label-width=LabeWidth>
     <el-input v-model="InventoryCheckDetail.createBy" placeholder="制单人" ></el-input>
    </el-form-item>
   </el-form>

   <el-form :inline="true" :model="formInline" class="demo-form-inline">
     <el-form-item class="purchaseearehouse1" label="盘点人:" :label-width=LabeWidth>
      <el-input v-model="InventoryCheckDetail.clerkId" placeholder="请输入盘点人"></el-input>
    </el-form-item>
   </el-form>
   
   <el-form :model="formInline">
    <el-form-item label="备注:" :label-width=LabeWidth class="full_input">
      <el-input v-model="InventoryCheckDetail.remark" placeholder="请输入备注"></el-input>
    </el-form-item>
    <!-- <el-form-item class="purchaseearehouse1" label="附件:" :label-width=LabeWidth>
      <el-button> 点击上传 </el-button>
    </el-form-item> -->
   </el-form>

   <!-- <div style="display:flex;justify-content:right">
       <el-button @click="handleClose">取消 </el-button>
       <el-button type="primary" @click="handleSave('header')">保存 </el-button>
    </div> -->

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
          <el-button type="primary" @click="handleConfirm('delete')" :disabled="multipleSelection.length === 0"><el-icon><minus /></el-icon>&nbsp;删除 </el-button>
          </div>
        <el-table 
             :data="InventoryCheckSubTableDetail" 
             highlight-current-row="true" 
             border 
             header-row-style="color:black" 
             style="border: 1px solid rgb(245,244,245)"
             @selection-change="handleSelectionChange"
             v-if="edit_type === 'edit'"
        >
        <el-table-column fixed type="selection" sortable width="55" />
        <el-table-column prop="detailNo" label="分录号" width="80" align="center">
          <template v-slot="scope">
           <el-input-number v-model="scope.row.detailNo" :controls="false" :disabled="scope.row.ioBillDetailId"> </el-input-number>
          </template>
        </el-table-column>
         <el-table-column prop="sourceDetailNo" label="源单分录号" width="120" align="center">
          <template v-slot="scope">
           <el-input v-model="scope.row.sourceDetailNo" :controls="false" :disabled="scope.row.ioBillDetailId"> </el-input>
          </template>
        </el-table-column>
          <el-table-column prop="materialId" label="物料" width="200" align="center">
          <template v-slot="scope">
           <el-select placeholder="否" v-model="scope.row.materialId" style="width:170px" :disabled="scope.row.ioBillDetailId" @change="handleSubtableSelectChange(scope.row.materialId,scope.row.warehouseId)">
             <div v-for="item in materialList" :key="item.materialId">
              <el-option :label="item.name" :value="item.materialId"></el-option>
             </div>
           </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="warehouseId" label="仓库" width="200" align="center">
          <template v-slot="scope">
           <el-select placeholder="否" v-model="scope.row.warehouseId" style="width:170px" :disabled="scope.row.ioBillDetailId" @change="handleSubtableSelectChange(scope.row.materialId,scope.row.warehouseId)">
             <div v-for="item in warehouseList" :key="item.warehouseId">
                <el-option :label="item.name" :value="item.warehouseId"></el-option>
             </div>>
           </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="batchNo" label="批次号" width="270" align="center">
          <template v-slot="scope">
           <el-select placeholder="否" v-model="scope.row.batchNo" style="width:240px" :disabled="scope.row.ioBillDetailId" @change="handleSubtableDetailChange(scope.row.batchNo)">
             <div v-for="item in batchNoList" :key="item.batchNo">
                <el-option :label="item.name" :value="item.batchNo"></el-option>
             </div>>
           </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="unitId" label="计量单位" width="130" align="center">
          <template v-slot="scope">
             <el-input v-if="scope.row.ioBillDetailId" v-model="scope.row.unitName" :controls="false" disabled class="el-input-number2"> </el-input>
             <el-input v-else v-model="batchNodetails.unitName " :controls="false" class="el-input-number2" disabled> </el-input>
          </template>
        </el-table-column>
        <el-table-column prop="qty" label="帐存数量" width="130" align="center" >
          <template v-slot="scope">
             <el-input v-if="scope.row.ioBillDetailId" v-model="scope.row.qty" :controls="false" disabled class="el-input-number2"> </el-input>
             <el-input v-else v-model="batchNodetails.qty " :controls="false" class="el-input-number2" disabled> </el-input>
          </template>
        </el-table-column>
        <el-table-column prop="trueQty" label="实存数量" width="130" align="center" >
          <template v-slot="scope">
           <el-input-number v-model="scope.row.trueQty" :controls="false" class="el-input-number2" :disabled="scope.row.ioBillDetailId"> </el-input-number>
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注" width="230" align="center">
          <template v-slot="scope">
           <el-input v-model="scope.row.remark" :disabled="scope.row.ioBillDetailId"> </el-input>
          </template>
        </el-table-column>
        <el-table-column prop="remark2" label="备注2" width="230" align="center">
          <template v-slot="scope">
           <el-input v-model="scope.row.remark2" :disabled="scope.row.ioBillDetailId" > </el-input>
          </template>
        </el-table-column>
        <el-table-column prop="remark3" label="备注2" width="230" align="center">
          <template v-slot="scope">
           <el-input v-model="scope.row.remark3" :disabled="scope.row.ioBillDetailId" > </el-input>
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
    <span class="confirm">确定删除此单据分录记录？<br/>(提示：记录删除不影响库存变化。)</span>
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
    <span class="confirm">确定增加此单据分录记录？<br/>(提示：增加记录将影响库存且不可修改。)</span>
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
import { defineComponent, onMounted, ref, reactive, toRefs } from 'vue'
import { AxiosApi } from '../../../utils/api'
import { AxiosResponse } from 'axios'
import { ElMessage } from 'element-plus'

export default defineComponent({
  name:'InventoryCheckDetail',
  components:{
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
    loadInventoryChecklist:{
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
    const InventoryCheckDetail = ref({
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
      stockIoName: '库存盘点',
      stockIoType: '401',
      supplierId: null,
      supplierName: '',
      sysOrgCode: '',
      updateBy: '',
      updateTime: undefined
    })
    const InventoryCheckSubTableDetail = ref([{}])
    const materialList = ref([{}])
    const supplierList = ref([{}])
    const unitList = ref([{}])
    const warehouseList = ref([{}])
    const loading = ref(false)
    const AddSubTable = ref(false)
    const multipleSelection = ref([{}])
    const dialogVisible = ref(false)
    const dialogVisible2 = ref(false)
    const batchNoList = ref([{}])
    const batchNoDetail = reactive({
      batchNodetails:{
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
        warehouseName: '',
        cost:null
      }
    })

    const success = (message:string) => {
      ElMessage({
        message: message,
        type: 'success'
      })
    }

    const error = (message:string) => {
      ElMessage.error(message)
    }

    const handleSave = () => {
      if (props.edit_type === 'edit') {
        if (AddSubTable.value === true) {
          loading.value = true
          const data = InventoryCheckDetail.value
          data.updateTime = undefined
          data.createTime = undefined
          AxiosApi.put('billHeader/update', JSON.stringify(data))
            .then((res:any) => {
              dialogVisible2.value = true
            })
            .catch((err:any) => {
              console.log(err)
              error('保存失败')
              loading.value = false
            })
        } else {
          loading.value = true
          const data = InventoryCheckDetail.value
          data.updateTime = undefined
          data.createTime = undefined
          AxiosApi.put('billHeader/update', JSON.stringify(data))
            .then((res:any) => {
              success('保存成功')
              props.loadInventoryChecklist(1)
              loading.value = false
            })
            .catch((err:any) => {
              console.log(err)
              error('保存失败')
              loading.value = false
            })
        }
      } else if (props.edit_type === 'add') {
        loading.value = true
        AxiosApi.post('billHeader/add', JSON.stringify(InventoryCheckDetail.value))
          .then((res:any) => {
            success('保存成功')
            props.loadInventoryChecklist(1)
            loading.value = false
          })
          .catch((err:any) => {
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
      InventoryCheckSubTableDetail.value.map((p:any) => {
        if (!p.ioBillDetailId) {
          const data:any = p
          data.modifiedDate = undefined
          data.batchNo = batchNoDetail.batchNodetails.batchNo
          data.supplierId = batchNoDetail.batchNodetails.supplierId
          data.unitId = batchNoDetail.batchNodetails.unitId
          data.qty = batchNoDetail.batchNodetails.qty
          AxiosApi.post('billDetail/add', JSON.stringify(data))
            .then((res:AxiosResponse) => {
              success('添加成功！')  
              loadInventoryCheckHeaderDetail()    
              props.loadInventoryChecklist(1)
              dialogVisible2.value = false
              loading.value = false
            })
            .catch((err:any) => {
              console.log(err)
              error('添加失败')
              loading.value = false
              dialogVisible2.value = false
            })
        }
      })
    }

    const handleAddSubtable = () => {
      InventoryCheckSubTableDetail.value.push({
        batchNo: '',
        changeCost: null,
        detailNo: null,
        inOut: null,
        ioBillDetailId: null,
        ioBillHeaderId: props.ioBillHeaderId,
        materialId: null,
        materialName: '',
        modifiedDate: '',
        profit: null,
        purBillNo: null,
        qty: 1.5,
        remark: '',
        remark2: '',
        remark3: '',
        sourceDetailId: null,
        sourceDetailNo: '',
        sourceType: null,
        supplierId: null,
        supplierName: '',
        transferId: null,
        trueQty: null,
        unitId: null,
        unitName: '',
        warehouseId: null,
        warehouseName: '',
        originCost:null
      })
      AddSubTable.value = true
    }

    const loadInventoryCheckSubtableDetail = (IoBillHeaderId:number) => {
      loading.value = true
      AxiosApi.get(`billDetail/list?ioBillHeaderId=${IoBillHeaderId}`)
        .then((res:AxiosResponse) => {
          if (props.edit_type === 'edit') {
            InventoryCheckSubTableDetail.value = res.data.result
          }
          materialList.value = res.data.materialList
          supplierList.value = res.data.supplierList
          unitList.value = res.data.unitList
          warehouseList.value = res.data.warehouseList
          loading.value = false
        })
    }

    const loadInventoryCheckHeaderDetail = () => {
      loading.value = true
      AxiosApi.get(`billHeader/find?billNo=${props.billNo}&stockIoName=库存盘点`)
        .then((res:AxiosResponse) => {
          InventoryCheckDetail.value = res.data.result
          loadInventoryCheckSubtableDetail(res?.data?.result?.ioBillHeaderId)
          loading.value = false
        })
    }

    const handleDeleteSubtable = () => {
      multipleSelection.value.map((m:any) => {
        if (m.ioBillDetailId) {
          AxiosApi.delete(`billDetail/delete?id=${m.ioBillDetailId}`)
            .then(() => {
              success('删除成功！')
            })
            .catch(() => {
              error('删除失败')
            })
        }
      })
      loadInventoryCheckHeaderDetail()
      dialogVisible.value = false
    }

    const handleSubtableDetailChange = (batchNO:string) => {
      const a = batchNoList.value?.map((item:any) => {
        if (item.batchNo === batchNO) {
          batchNoDetail.batchNodetails = item
        }
      })
    }

    const handleSubtableSelectChange = (id1:number, id2:number) => {
      console.log(id1, id2)
      if (id1 && id2) {
        loading.value = true
        batchNoList.value = []
        AxiosApi.get(`inventory/list?materialId=${id1}&warehouseId=${id2}`)
          .then((res:AxiosResponse) => {
            console.log(res.data.result)
            batchNoList.value = res.data.result
            loading.value = false
          })
          .catch((err) => {
            console.log(err)
            error('此仓库下无该物料！')
            loading.value = false
          })
      }
    }

    const handleConfirm = (type:string) => {
      if (type === 'delete') {
        dialogVisible.value = true
      }
    }

    onMounted(() => {
      if (props.edit_type === 'edit' && props.billNo !== '') {
        loadInventoryCheckHeaderDetail()
      } else if (props.edit_type === 'add') {
        loadInventoryCheckSubtableDetail(1)
      }
    })

    return {
      LabeWidth,
      activeName,
      InventoryCheckDetail,
      handleSave,
      InventoryCheckSubTableDetail,
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
      multipleSelection,
      handleSubtableSelectChange,
      batchNoList,
      ...toRefs(batchNoDetail),
      handleSubtableDetailChange
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

.el-input.is-disabled .el-input__inner{
  color: black !important;;
}
</style>
