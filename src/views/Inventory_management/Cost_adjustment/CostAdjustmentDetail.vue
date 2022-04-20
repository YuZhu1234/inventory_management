<template>
  <div class="top" >
  <el-form :model="CostAdjustmentDetail" :label-width=LabeWidth label-position="right" v-loading="loading">
   <el-form :inline="true" class="demo-form-inline" style="margin-left:20px">
    <el-form-item  class="billProcStatus" label="处理状态:" :label-width=LabeWidth>
      <el-select v-model="CostAdjustmentDetail.billProcStatus" placeholder="是否通过" style="width:120px">
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
       <el-select v-model="CostAdjustmentDetail.isApproved" placeholder="是否通过" class="option">
         <el-option label="是" :value=1 ></el-option>
         <el-option label="否" :value=0 ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item class="purchaseearehouse1" label="是否关闭:" :label-width=LabeWidth>
      <el-select v-model="CostAdjustmentDetail.isClosed" placeholder="是否关闭" class="option">
         <el-option label="是" :value=1 ></el-option>
         <el-option label="否" :value=0 ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item class="purchaseearehouse1" label="是否作废:" :label-width=LabeWidth>
      <el-select v-model="CostAdjustmentDetail.isVoided" placeholder="是否作废" class="option">
         <el-option label="是" :value=1 ></el-option>
         <el-option label="否" :value=0 ></el-option>
      </el-select>
    </el-form-item>
   </el-form>

   <el-collapse v-model="activeNames" @change="handleChange" class="collapse">
      <el-collapse-item title="展开" name="1" class="collapse_item">

   <el-form :inline="true" :model="formInline" class="demo-form-inline">
     <el-form-item  class="purchaseearehouse1" label="创建时间:" :label-width=LabeWidth>
      <el-input disabled v-model="CostAdjustmentDetail.createTime" placeholder="请输入创建时间"></el-input>
    </el-form-item>
    <el-form-item class="purchaseearehouse1" label="创建人:" :label-width=LabeWidth>
      <el-input disabled v-model="CostAdjustmentDetail.createBy" placeholder="创建人" ></el-input>
    </el-form-item>
    <el-form-item class="purchaseearehouse1" label="创建部门:" :label-width=LabeWidth>
      <el-input disabled v-model="CostAdjustmentDetail.sysOrgCode" placeholder="创建部门" ></el-input>
    </el-form-item>
   </el-form>

    <el-form :inline="true" :model="formInline" class="demo-form-inline">
     <el-form-item class="purchaseearehouse1" label="生效时间:" :label-width=LabeWidth>
      <el-input disabled v-model="CostAdjustmentDetail.effectiveTime" placeholder="请输入生效时间"></el-input>
    </el-form-item>
    <el-form-item class="purchaseearehouse1" label="审核人:" :label-width=LabeWidth>
      <el-input disabled v-model="CostAdjustmentDetail.approverId" placeholder="创建部门" ></el-input>
    </el-form-item>
    <el-form-item class="purchaseearehouse1" label="流程:" :label-width=LabeWidth>
     <el-input v-model="CostAdjustmentDetail.flowId" placeholder="流程" ></el-input>
    </el-form-item>
   </el-form>

   <el-form :inline="true" :model="formInline" class="demo-form-inline">
     <el-form-item class="purchaseearehouse1" label="修改时间:" :label-width=LabeWidth>
      <el-input disabled v-model="CostAdjustmentDetail.updateTime" placeholder="请输入创建时间"></el-input>
    </el-form-item>
    <el-form-item class="purchaseearehouse1" label="修改人:" :label-width=LabeWidth>
      <el-input disabled v-model="CostAdjustmentDetail.updateBy" placeholder="请输入修改人"></el-input>
    </el-form-item>
    <el-form-item class="purchaseearehouse1" label="是否红字:" :label-width=LabeWidth>
      <el-select disabled v-model="CostAdjustmentDetail.isRubric" placeholder="是否红字" class="option2">
         <el-option label="是" :value=1 ></el-option>
         <el-option label="否" :value=0 ></el-option>
      </el-select>
    </el-form-item>
   </el-form>

      </el-collapse-item>
   </el-collapse>

   <el-form :inline="true" :model="formInline" class="demo-form-inline">
     <el-form-item class="purchaseearehouse1" label="单据编号:" :label-width=LabeWidth required>
      <el-input v-model="CostAdjustmentDetail.billNo" placeholder="单据编号"></el-input>
    </el-form-item>
    <el-form-item class="purchaseearehouse1" label="单据日期:" :label-width=LabeWidth required>
      <!-- <el-input v-model="CostAdjustmentDetail.billDate" placeholder="单据日期" ></el-input> -->
      <el-date-picker v-model="CostAdjustmentDetail.billDate" type="date" value-format="YYYY-MM-DD" placeholder="单据日期" style="width:186px!important"/>
    </el-form-item>
    <el-form-item class="purchaseearehouse1" label="制单人:" :label-width=LabeWidth>
     <el-input v-model="CostAdjustmentDetail.createBy" placeholder="制单人" ></el-input>
    </el-form-item>
   </el-form>

   <el-form :inline="true" :model="formInline" class="demo-form-inline">
     <el-form-item class="purchaseearehouse1" label="业务员:" :label-width=LabeWidth>
      <el-input v-model="CostAdjustmentDetail.clerkId" placeholder="请输入创建时间"></el-input>
    </el-form-item>
    <el-form-item class="purchaseearehouse1" label="供应商:" :label-width=LabeWidth>
      <el-select v-model="CostAdjustmentDetail.supplierId" placeholder="供应商" class="option2">
         <div v-for="item in supplierList" :key="item.supplierId">
              <el-option :label="item.name" :value="item.supplierId"></el-option>
          </div>
      </el-select>
    </el-form-item>
    <el-form-item class="purchaseearehouse1" label="入库经办:" :label-width=LabeWidth>
     <el-input v-model="CostAdjustmentDetail.handlerId" placeholder="入库经办"></el-input>
    </el-form-item>
   </el-form>

   <el-form :inline="true" :model="formInline" class="demo-form-inline">
     <el-form-item class="purchaseearehouse1" label="源单类型:" :label-width=LabeWidth required>
      <el-input  v-model="CostAdjustmentDetail.stockIoName" placeholder="源单类型" disabled></el-input>
    </el-form-item>
    <el-form-item class="purchaseearehouse1" label="源单号:" :label-width=LabeWidth>
      <el-input  v-model="CostAdjustmentDetail.sourceNo" placeholder="源单号"></el-input>
    </el-form-item>
    <el-form-item class="purchaseearehouse1" label="结算数量和金额是否等于入库:" label-width='230px'>
      <el-select v-model="CostAdjustmentDetail.isSameSettle" placeholder="否" style="width:60px">
         <el-option label="是" :value=1 ></el-option>
         <el-option label="否" :value=0 ></el-option>
      </el-select>
    </el-form-item>
   </el-form>

   <el-form :model="formInline">
     <el-form-item label="备注:" :label-width=LabeWidth class="full_input">
      <el-input v-model="CostAdjustmentDetail.remark" placeholder="请输入创建时间"></el-input>
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
          <div style="display:flex;margin-bottom:20px" v-if="edit_type === 'edit'">
          <el-button type="primary" @click="handleAddSubtable"><el-icon><plus /></el-icon>&nbsp;新增 </el-button>
          <el-button type="primary" @click="handleConfirm('delete')"><el-icon><minus /></el-icon>&nbsp;删除 </el-button>
          </div>
        <el-table 
             :data="CostAdjustmentSubTableDetail" 
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
        <el-table-column prop="unitId" label="库存单位" width="130" align="center">
           <template v-slot="scope">
             <el-input v-if="scope.row.ioBillDetailId" v-model="scope.row.unitName" :controls="false" disabled class="el-input-number2"> </el-input>
             <el-input v-else v-model="batchNodetails.unitName " :controls="false" class="el-input-number2" disabled> </el-input>
          </template>
        </el-table-column>
        <el-table-column prop="qty" label="库存数量" width="130" align="center" >
           <template v-slot="scope">
             <el-input v-if="scope.row.ioBillDetailId" v-model="scope.row.qty" :controls="false" disabled class="el-input-number2"> </el-input>
             <el-input v-else v-model="batchNodetails.qty " :controls="false" class="el-input-number2" disabled> </el-input>
          </template>
        </el-table-column>
        <el-table-column prop="cost" label="库存成本" width="130" align="center" >
          <template v-slot="scope">
             <el-input v-if="scope.row.ioBillDetailId" v-model="scope.row.originCost" :controls="false" disabled class="el-input-number2"> </el-input>
             <el-input v-else v-model="batchNodetails.cost " :controls="false" class="el-input-number2" disabled> </el-input>
          </template>
        </el-table-column>
        <el-table-column prop="changeCost" label="调整金额（+/-）" width="130" align="center">
           <template v-slot="scope">
           <el-input-number v-model="scope.row.changeCost" :controls="false" :disabled="scope.row.ioBillDetailId" class="el-input-number2"> </el-input-number>
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
import { defineComponent, onMounted, reactive, ref, toRefs } from 'vue'
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
  name:'CostAdjustmentDetail',
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
    loadCostAdjustmentlist:{
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
    const CostAdjustmentDetail = ref({
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
      stockIoName: '成本调整',
      stockIoType: '801',
      supplierId: null,
      supplierName: '',
      sysOrgCode: '',
      updateBy: '',
      updateTime: undefined
    })
    const CostAdjustmentSubTableDetail = ref([{}])
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

    const handleSave = (type:string) => {
      if (props.edit_type === 'edit') {
        if (AddSubTable.value === true) {
          loading.value = true
          const data = CostAdjustmentDetail.value
          data.updateTime = undefined
          data.createTime = undefined
          AxiosApi.put('billHeader/update', JSON.stringify(data))
            .then((res:AxiosResponse) => {
              dialogVisible2.value = true
            })
            .catch((err:any) => {
              error('保存失败！')
              console.log(err)
              loading.value = false
            })
        } else {
          loading.value = true
          const data = CostAdjustmentDetail.value
          data.updateTime = undefined
          data.createTime = undefined
          AxiosApi.put('billHeader/update', JSON.stringify(data))
            .then((res:AxiosResponse) => {
              console.log(res)
              success('保存成功！')
              props.handleClose()
              props.loadCostAdjustmentlist(1)
              loading.value = false
            })
            .catch((err:any) => {
              error('保存失败！')
              console.log(err)
              loading.value = false
            })
        }
      } else if (props.edit_type === 'add') {
        loading.value = true
        AxiosApi.post('billHeader/add', JSON.stringify(CostAdjustmentDetail.value))
          .then((res:any) => {
            console.log(res)
            success('保存成功')
            props.loadCostAdjustmentlist(1)
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
      CostAdjustmentSubTableDetail.value.map((p:any) => {
        if (!p.ioBillDetailId) {
          const data:any = p
          data.modifiedDate = undefined
          data.batchNo = batchNoDetail.batchNodetails.batchNo
          data.supplierId = batchNoDetail.batchNodetails.supplierId
          data.unitId = batchNoDetail.batchNodetails.unitId
          AxiosApi.post('billDetail/add', JSON.stringify(data))
            .then((res:AxiosResponse) => {
              console.log(res)  
              success('添加成功！')  
              loadCostAdjustmentHeaderDetail()  
              props.loadCostAdjustmentlist(1)  
              dialogVisible2.value = false
              loading.value = false
            })
            .catch((err:any) => {
              console.log(err)
              error('添加失败!请保证所有信息填写完整且分录号不重复！')
              loading.value = false
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
      CostAdjustmentSubTableDetail.value.push({
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
        qty: null,
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

    const loadCostAdjustmentSubtableDetail = (IoBillHeaderId:number) => {
      loading.value = true
      AxiosApi.get(`billDetail/list?ioBillHeaderId=${IoBillHeaderId}`)
        .then((res:AxiosResponse) => {
          if (props.edit_type === 'edit') {
            CostAdjustmentSubTableDetail.value = res.data.result
          }
          materialList.value = res.data.materialList
          supplierList.value = res.data.supplierList
          unitList.value = res.data.unitList
          warehouseList.value = res.data.warehouseList
          loading.value = false
        })
    }

    const loadCostAdjustmentHeaderDetail = () => {
      loading.value = true
      AxiosApi.get(`billHeader/find?billNo=${props.billNo}&stockIoName=成本调整`)
        .then((res:AxiosResponse) => {
          CostAdjustmentDetail.value = res.data.result
          loadCostAdjustmentSubtableDetail(res?.data?.result?.ioBillHeaderId)
          loading.value = false
        })
    }

    const handleDeleteSubtable = () => {
      multipleSelection.value.map((m:any) => {
        if (m.ioBillDetailId) {
          AxiosApi.delete(`billDetail/delete?id=${m.ioBillDetailId}`)
            .then(() => {
              success('删除成功！')
              loadCostAdjustmentHeaderDetail()
            })
            .catch(() => {
              error('删除失败')
            })
        } else {
          CostAdjustmentSubTableDetail.value.pop()
          AddSubTable.value = false
        }
      })
      dialogVisible.value = false
    }

    const handleConfirm = (type:string) => {
      if (type === 'delete') {
        dialogVisible.value = true
      }
    }

    const handleSubtableSelectChange = (id1:number, id2:number) => {
      console.log(id1, id2)
      if (id1 && id2) {
        loading.value = true
        AxiosApi.get(`inventory/list?materialId=${id1}&warehouseId=${id2}`)
          .then((res:AxiosResponse) => {
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

    const handleSubtableDetailChange = (BatchNO:string) => {
      const a = batchNoList.value?.map((item:any) => {
        if (item.batchNo === BatchNO) {
          batchNoDetail.batchNodetails = item
        }
      })
    }

    onMounted(() => {
      if (props.edit_type === 'edit' && props.billNo !== '') {
        loadCostAdjustmentHeaderDetail()
      } else if (props.edit_type === 'add') {
        loadCostAdjustmentSubtableDetail(1)
      }
    })

    return {
      LabeWidth,
      activeName,
      CostAdjustmentDetail,
      handleSave,
      CostAdjustmentSubTableDetail,
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
      handleSubtableSelectChange,
      batchNoList,
      handleSubtableDetailChange,
      ...toRefs(batchNoDetail)
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
  color:black;
}
</style>
