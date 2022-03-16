<template>
  <div class="top">
  <el-form :model="PurchaseWarehousingDetail" :label-width=LabeWidth label-position="right">
   <el-form :inline="true" class="demo-form-inline" style="margin-left:20px">
    <el-form-item  class="billProcStatus" label="处理状态:" :label-width=LabeWidth>
      <el-input v-model="PurchaseWarehousingDetail.billProcStatus" placeholder="处理状态"></el-input>
    </el-form-item>
    <el-form-item class="purchaseearehouse1" label="是否通过:" :label-width=LabeWidth>
      <el-select v-model="PurchaseWarehousingDetail.isApproved" placeholder="是否通过" class="option">
         <el-option label="是" value=1 ></el-option>
         <el-option label="否" value=0 ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item class="purchaseearehouse1" label="是否关闭:" :label-width=LabeWidth>
      <el-select v-model="PurchaseWarehousingDetail.isClosed" placeholder="是否关闭" class="option">
         <el-option label="是" value=1 ></el-option>
         <el-option label="否" value=0 ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item class="purchaseearehouse1" label="是否作废:" :label-width=LabeWidth>
      <el-select v-model="PurchaseWarehousingDetail.isVoided" placeholder="是否作废" class="option">
         <el-option label="是" value=1 ></el-option>
         <el-option label="否" value=0 ></el-option>
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
     <el-form-item class="purchaseearehouse1" label="单据编号:" :label-width=LabeWidth>
      <el-input v-model="PurchaseWarehousingDetail.billNo" placeholder="单据编号"></el-input>
    </el-form-item>
    <el-form-item class="purchaseearehouse1" label="单据日期:" :label-width=LabeWidth>
      <el-input v-model="PurchaseWarehousingDetail.billDate" placeholder="单据日期" ></el-input>
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
         <el-option label="供应商1" value=3 ></el-option>
         <el-option label="否" value=1 ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item class="purchaseearehouse1" label="入库经办:" :label-width=LabeWidth>
     <el-input v-model="PurchaseWarehousingDetail.handlerId" placeholder="入库经办"></el-input>
    </el-form-item>
   </el-form>

   <el-form :inline="true" :model="formInline" class="demo-form-inline">
     <el-form-item class="purchaseearehouse1" label="源单类型:" :label-width=LabeWidth>
      <el-input  v-model="PurchaseWarehousingDetail.sourceType" placeholder="源单类型"></el-input>
    </el-form-item>
    <el-form-item class="purchaseearehouse1" label="源单号:" :label-width=LabeWidth>
      <el-input  v-model="PurchaseWarehousingDetail.sourceNo" placeholder="源单号"></el-input>
    </el-form-item>
    <el-form-item class="purchaseearehouse1" label="结算数量和金额是否等于入库:" label-width='230px'>
      <el-select v-model="PurchaseWarehousingDetail.isSameSettle" placeholder="否" style="width:60px">
         <el-option label="是" value=1 ></el-option>
         <el-option label="否" value=0 ></el-option>
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

   </el-form>

   <div style="margin:30px">
      <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane label="明细" name="明细">
          <div style="display:flex;margin-bottom:20px">
          <el-button type="primary"><el-icon><plus /></el-icon>&nbsp;新增 </el-button>
          <el-button type="primary"><el-icon><minus /></el-icon>&nbsp;删除 </el-button>
          </div>
        <el-table :data="MateriaData" highlight-current-row="true" border header-row-style="color:black" style="border: 1px solid rgb(245,244,245)">
        <el-table-column fixed type="selection" sortable width="55" />
        <el-table-column prop="number" label="分录号" width="80" align="center">
          <template v-slot="scope">
           <el-input-number v-model="scope.row.number" :controls="false"> </el-input-number>
          </template>
        </el-table-column>
         <el-table-column prop="number" label="源单分录号" width="120" align="center">
          <template v-slot="scope">
           <el-input v-model="scope.row.number" :controls="false"> </el-input>
          </template>
        </el-table-column>
         <el-table-column prop="number" label="物料" width="200" align="center">
          <template v-slot="scope">
           <el-select placeholder="否" v-model="scope.row.number" style="width:170px">
             <el-option label="是" value=1 ></el-option>
             <el-option label="否" value=2 ></el-option>
           </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="number" label="计量单位" width="130" align="center">
          <template v-slot="scope">
           <el-select placeholder="否" v-model="scope.row.number" style="width:100px">
             <el-option label="是" value=1 ></el-option>
             <el-option label="否" value=2 ></el-option>
           </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="number" label="入库数量" width="130" align="center">
          <template v-slot="scope">
           <el-input-number v-model="scope.row.number" :controls="false" class="el-input-number2"> </el-input-number>
          </template>
        </el-table-column>
         <el-table-column prop="number" label="入库成本" width="130" align="center">
          <template v-slot="scope">
           <el-input-number v-model="scope.row.number" :controls="false" class="el-input-number2"> </el-input-number>
          </template>
        </el-table-column>
        <el-table-column prop="number" label="成本含税" width="100" align="center">
          <template v-slot="scope">
           <el-select placeholder="否" v-model="scope.row.number" style="width:70px">
             <el-option label="是" value=1 ></el-option>
             <el-option label="否" value=2 ></el-option>
           </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="number" label="仓库" width="200" align="center">
          <template v-slot="scope">
           <el-select placeholder="否" v-model="scope.row.number" style="width:170px">
             <el-option label="是" value=1 ></el-option>
             <el-option label="否" value=2 ></el-option>
           </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="number" label="批次号" width="230" align="center">
          <template v-slot="scope">
           <el-input v-model="scope.row.number" :controls="false"> </el-input>
          </template>
        </el-table-column>
        <el-table-column prop="number" label="结算数量" width="130" align="center">
          <template v-slot="scope">
           <el-input-number v-model="scope.row.number" :controls="false" class="el-input-number2"> </el-input-number>
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
        </el-table-column>
        <el-table-column prop="number" label="备注" width="230" align="center">
          <template v-slot="scope">
           <el-input v-model="scope.row.number"> </el-input>
          </template>
        </el-table-column>
        <el-table-column prop="number" label="备注2" width="230" align="center">
          <template v-slot="scope">
           <el-input v-model="scope.row.number" > </el-input>
          </template>
        </el-table-column>
        
      </el-table>
        </el-tab-pane>
      </el-tabs>
   </div>
    <div style="display:flex;justify-content:right">
       <el-button @click="handleClose">取消 </el-button>
       <el-button type="primary" @click="handleSave">保存 </el-button>
       <el-button type="primary">提交 </el-button>
    </div>
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
    }
  },
  setup (props, context) {
    const LabeWidth = ref('100px')
    const activeName = ref('明细')
    const PurchaseWarehousingDetail = ref({
      approverId: 'admin',
      attachment: null,
      billDate: '',
      billNo: '',
      billProcStatus: '23',
      clerkId: '',
      createBy: '',
      createTime: '',
      customerId: null,
      customerName: null,
      effectiveTime: '',
      flowId: null,
      handlerId: '',
      hasRp: '',
      ioBillHeaderId: null,
      isApproved: '',
      isAuto: 0,
      isClosed: '',
      isRubric: 0,
      isSameSettle: '',
      isVoided: '',
      remark: '',
      sourceId: null,
      sourceNo: null,
      sourceType: null,
      stockIoName: '',
      stockIoType: '',
      supplierId: '',
      supplierName: '',
      sysOrgCode: '',
      updateBy: '',
      updateTime: ''
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
        AxiosApi.put('billHeader/update', JSON.stringify(PurchaseWarehousingDetail.value))
          .then((res:AxiosResponse) => {
            console.log(res)
            success('保存成功！')
            props.handleClose()
            props.loadPurchaseWarehousinglist()
          })
          .catch((err) => {
            error('保存失败！')
            console.log(err)
          })
      }
    }

    const loadPurchaseWarehousingDetail = () => {
      AxiosApi.get(`billHeader/find?billNo=${props.billNo}&stockIoName=采购入库`)
        .then((res:AxiosResponse) => {
          PurchaseWarehousingDetail.value = res.data.result
        })
    }

    onMounted(() => {
      if (props.edit_type === 'edit' && props.billNo !== '') {
        loadPurchaseWarehousingDetail()
      }
    })

    return {
      LabeWidth,
      activeName,
      PurchaseWarehousingDetail,
      handleSave
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
