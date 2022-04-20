<template>
  <div class="top" >
  <el-form :model="OrderfeedbackDetail" :label-width=LabeWidth label-position="right" v-loading="loading">

   <el-form :inline="true" :model="formInline" class="demo-form-inline">
     <el-form-item  class="purchaseearehouse1" label="产品型号:" :label-width=LabeWidth required>
      <el-input v-model="OrderfeedbackDetail.currentCustomerProduct" placeholder="产品型号"></el-input>
    </el-form-item>
    <el-form-item class="purchaseearehouse1" label="晶圆厂LOT ID:" :label-width=LabeWidth required>
      <el-input v-model="OrderfeedbackDetail.fabLotId" placeholder="晶圆厂LOT ID" ></el-input>
    </el-form-item>
    <el-form-item class="purchaseearehouse1" label="客户LOT ID:" :label-width=LabeWidth required>
      <el-input v-model="OrderfeedbackDetail.customerLotId" placeholder="客户LOT ID"></el-input>
    </el-form-item>
   </el-form>

   <el-form :inline="true" :model="formInline" class="demo-form-inline">
     <el-form-item class="purchaseearehouse1" label="晶圆厂产品型号:" :label-width=LabeWidth>
      <el-input v-model="OrderfeedbackDetail.fabProduct" placeholder="晶圆厂产品型号"></el-input>
    </el-form-item>
     <el-form-item class="purchaseearehouse1" label="客户订单号:" :label-width=LabeWidth >
      <el-input v-model="OrderfeedbackDetail.customerPo" placeholder="客户订单号"></el-input>
    </el-form-item>
    <el-form-item class="purchaseearehouse1" label="fab厂订单号:" :label-width=LabeWidth >
      <el-input v-model="OrderfeedbackDetail.fabOrderLine" placeholder="fab厂订单号" ></el-input>
      <!-- <el-date-picker v-model="OrderfeedbackDetail.fabOrderLine" type="date" value-format="YYYY-MM-DD" placeholder="单据日期" style="width:186px!important"/> -->
    </el-form-item>
   </el-form>

   <el-form :inline="true" :model="formInline" class="demo-form-inline">
     <el-form-item class="purchaseearehouse1" label="预计交期:" :label-width=LabeWidth>
      <!-- <el-input v-model="OrderfeedbackDetail.requester" placeholder="下单人" ></el-input> -->
      <el-date-picker v-model="OrderfeedbackDetail.forecastCommittedDate" type="date" value-format="YYYY-MM-DD" placeholder="单据日期" style="width:138px!important"/>
    </el-form-item>
   <el-form-item class="purchaseearehouse1" label="实际交期:" :label-width=LabeWidth>
      <el-date-picker v-model="OrderfeedbackDetail.committedDate" type="date" value-format="YYYY-MM-DD" placeholder="单据日期" style="width:138px!important"/>
     <!-- <el-input v-model="OrderfeedbackDetail.requester" placeholder="下单人" ></el-input> -->
    </el-form-item>
    <el-form-item class="purchaseearehouse1" label="hold状态:" :label-width=LabeWidth>
      <el-input v-model="OrderfeedbackDetail.custHoldFlag" placeholder="hold状态" ></el-input>
    </el-form-item>
   </el-form>

    <el-form :inline="true" :model="formInline" class="demo-form-inline">
     <el-form-item class="purchaseearehouse1" label="当前已生产wafer数量:" :label-width=LabeWidth>
      <el-input v-model="OrderfeedbackDetail.currentQty" placeholder="晶圆厂产品型号"></el-input>
    </el-form-item>
     <el-form-item class="purchaseearehouse1" label="总wafer数量:" :label-width=LabeWidth >
      <el-input v-model="OrderfeedbackDetail.waferQty" placeholder="客户订单号"></el-input>
    </el-form-item>
    <el-form-item class="purchaseearehouse1" label="已交货数量:" :label-width=LabeWidth >
      <el-input v-model="OrderfeedbackDetail.shippedQuantity" placeholder="fab厂订单号" ></el-input>
    </el-form-item>
   </el-form>

    <el-form :inline="true" :model="formInline" class="demo-form-inline">
     <el-form-item class="purchaseearehouse1" label="当前阶段:" :label-width=LabeWidth>
      <el-input v-model="OrderfeedbackDetail.currentStage" placeholder="晶圆厂产品型号"></el-input>
    </el-form-item>
     <el-form-item class="purchaseearehouse1" label="总的STEP:" :label-width=LabeWidth >
      <el-input v-model="OrderfeedbackDetail.totalStep" placeholder="客户订单号"></el-input>
    </el-form-item>
    <el-form-item class="purchaseearehouse1" label="当前STEP:" :label-width=LabeWidth >
      <el-input v-model="OrderfeedbackDetail.currentStep" placeholder="fab厂订单号" ></el-input>
    </el-form-item>
   </el-form>

    <el-form :inline="true" :model="formInline" class="demo-form-inline">
     <el-form-item class="purchaseearehouse1" label="wip原始数据:" :label-width=LabeWidth>
      <el-input v-model="OrderfeedbackDetail.rawData" placeholder="晶圆厂产品型号"></el-input>
    </el-form-item>
     <el-form-item class="purchaseearehouse1" label="日期:" :label-width=LabeWidth >
       <el-date-picker disabled v-model="OrderfeedbackDetail.createTime" type="date" value-format="YYYY-MM-DD" placeholder="单据日期" style="width:138px!important"/>
    </el-form-item>
   </el-form>

   </el-form>
   <div style="display:flex;justify-content:right">
       <el-button @click="handleClose">取消 </el-button>
       <el-button type="primary" @click="dialogVisible2 = true">保存 </el-button>
       <el-button type="primary">提交 </el-button>
    </div>
  <el-dialog
        v-model="dialogVisible2"
        title="提示"
        width="20%"
        destroy-on-close
      >
    <span class="confirm">确定保存？</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible2 = false">取消</el-button>
        <el-button type="primary" @click="handleSave">确定</el-button>
      </span>
    </template>
  </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { AxiosApi } from '../../../utils/api'
import { AxiosResponse } from 'axios'
import { ElMessage } from 'element-plus'

export default defineComponent({
  name:'OrderfeedbackDetail',
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
    loadOrderfeedbacklist:{
      type:Function,
      required:true  
    }
  },
  setup (props, context) {
    const LabeWidth = ref('150px')
    const OrderfeedbackDetail = ref({
      id: 0,
      currentCustomerProduct: '',
      fabLotId: '',
      customerLotId: null,
      fabProduct: '',
      customerPo: '',
      fabOrderLine: '',
      forecastCommittedDate: null,
      committedDate: '',
      custHoldFlag: null,
      currentQty: '',
      waferQty: '',
      shippedQuantity: null,
      currentStage: '',
      totalStep: '',
      currentStep: '',
      rawData: null,
      createTime: null
    })
    const loading = ref(false)
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

    const handleSave = () => {
      loading.value = true
      const data:any = OrderfeedbackDetail.value
      data.createTime = undefined
      if (props.edit_type === 'edit') {   
        AxiosApi.put('wip/update', JSON.stringify(data))
          .then((res:AxiosResponse) => {
            console.log(res)
            success('保存成功')
            props.loadOrderfeedbacklist(1)
            dialogVisible2.value = false
            loading.value = false
          })
          .catch((err) => {
            error('保存失败！')
            console.log(err)
            loading.value = false
          })
      } else if (props.edit_type === 'add') {
        AxiosApi.post('wip/add', JSON.stringify(OrderfeedbackDetail.value))
          .then((res) => {
            console.log(res)
            success('保存成功')
            props.loadOrderfeedbacklist(1)
            dialogVisible2.value = false
            loading.value = false
          })
          .catch((err) => {
            console.log(err)
            error('保存失败')
            loading.value = false
          })
      }
    }

    const loadOrderfeedbackHeaderDetail = () => {
      loading.value = true
      AxiosApi.get(`wip/find?id=${props.id}`)
        .then((res:AxiosResponse) => {
          OrderfeedbackDetail.value = res.data.result
          loading.value = false
        }).catch(() => {
          loading.value = false
          error('获取详情信息失败')
        })
    }

    onMounted(() => {
      if (props.edit_type === 'edit' && props.id !== '') {
        loadOrderfeedbackHeaderDetail()
      }
    })

    return {
      LabeWidth,
      OrderfeedbackDetail,
      handleSave,
      loading,
      dialogVisible2
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
