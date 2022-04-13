<template>
  <div>
  <el-form ref="service" :model="CustomerDetails" :label-width=LabeWidth label-position="right">
   <el-form :inline="true" class="demo-form-inline">
    <el-form-item label="编码" :label-width=LabeWidth required >
      <el-input v-model="CustomerDetails.customerCode" placeholder="客户编码" :disabled="disabled"></el-input>
    </el-form-item>
    <el-form-item label="名称" :label-width=LabeWidth required >
      <el-input v-model="CustomerDetails.name" placeholder="名称" :disabled="disabled"></el-input>
    </el-form-item>
   </el-form>

   <el-form :inline="true" :model="formInline" class="demo-form-inline">
     <el-form-item label="简称" :label-width=LabeWidth>
      <el-input v-model="CustomerDetails.shortName" placeholder="简称" :disabled="disabled"></el-input>
    </el-form-item>
    <el-form-item label="等级" :label-width=LabeWidth >
      <el-select v-model="CustomerDetails.customerLevelValue" placeholder="一级" class="option" :disabled="disabled">
         <el-option label="一级" value=1 ></el-option>
         <el-option label="二级" value=2 ></el-option>
      </el-select>
    </el-form-item>
   </el-form>

    <el-form :inline="true" class="demo-form-inline">
     <el-form-item label="纳税规模" :label-width=LabeWidth>
       <el-select v-model="CustomerDetails.taxScale" placeholder="请输入纳税规模" class="option" :disabled="disabled">
         <el-option label="一般纳税人" value=1 ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="欠款额度" :label-width=LabeWidth>
      <el-input v-model="CustomerDetails.creditLimit" placeholder="请输入欠款额度" :disabled="disabled"></el-input>
    </el-form-item>
   </el-form>

   <el-form :inline="true" class="demo-form-inline">
     <el-form-item label="客户分类" :label-width=LabeWidth>
      <el-select v-model="CustomerDetails.customerTypeValue" placeholder="一级" class="option" :disabled="disabled">
         <el-option label="vip客户" value=0 class="option"></el-option>
         <el-option label="普通客户" value=1 class="option"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="收件信息邮箱" :label-width=LabeWidth>
      <el-input v-model="CustomerDetails.postcodeReceipt" placeholder="请输入收件信息邮箱" :disabled="disabled"></el-input>
    </el-form-item>
   </el-form>

   <el-form :inline="true" class="demo-form-inline">
    <el-form-item label="所属地区" :label-width=LabeWidth>
      <el-input v-model="CustomerDetails.bizArea" placeholder="请输入所属地区" :disabled="disabled"></el-input>
    </el-form-item>
    <el-form-item label="业务区域" :label-width=LabeWidth>
      <el-input v-model="CustomerDetails.area" placeholder="请输入业务区域" :disabled="disabled"></el-input>
    </el-form-item>
   </el-form>

   <el-form :inline="true" class="demo-form-inline">
    <el-form-item label="客户网站" :label-width=LabeWidth>
      <el-input v-model="CustomerDetails.website" placeholder="请输入客户网站" :disabled="disabled"></el-input>
    </el-form-item>
    <el-form-item label="法人代表" :label-width=LabeWidth >
      <el-input v-model="CustomerDetails.corporate" placeholder="请输入法人代表" :disabled="disabled"></el-input>
    </el-form-item>
   </el-form>

   <el-form :inline="true" class="demo-form-inline">
    <el-form-item label="法人电话" :label-width=LabeWidth >
      <el-input v-model="CustomerDetails.corporatePhone" placeholder="请输入法人电话" :disabled="disabled"></el-input>
    </el-form-item>
    <el-form-item label="财务信息联系人" :label-width=LabeWidth >
      <el-input v-model="CustomerDetails.contactsFinancial" placeholder="请输入财务信息联系人" :disabled="disabled"></el-input>
    </el-form-item>
   </el-form>

   <el-form :inline="true" class="demo-form-inline">
    <el-form-item label="财务信息联系电话" :label-width=LabeWidth>
      <el-input v-model="CustomerDetails.phoneFinancial" placeholder="请输入财务信息联系电话" :disabled="disabled"></el-input>
    </el-form-item>
    <el-form-item label="开票信息单位名称" :label-width=LabeWidth>
      <el-input v-model="CustomerDetails.unitInvoice" placeholder="请输入开票信息单位名称" :disabled="disabled"></el-input>
    </el-form-item>
   </el-form>

   <el-form :inline="true" class="demo-form-inline">
    <el-form-item label="开票信息税号" :label-width=LabeWidth>
      <el-input v-model="CustomerDetails.taxInvoice" placeholder="请输入开票信息税号" :disabled="disabled"></el-input>
    </el-form-item>
    <el-form-item label="开票信息联系电话" :label-width=LabeWidth>
      <el-input v-model="CustomerDetails.phoneInvoice" placeholder="请输入开票信息联系电话" :disabled="disabled"></el-input>
    </el-form-item>
   </el-form>

   <el-form :inline="true" class="demo-form-inline">
    <el-form-item label="办款资料单位名称" :label-width=LabeWidth>
      <el-input v-model="CustomerDetails.unitPayment" placeholder="请输入办款资料单位名称" :disabled="disabled"></el-input>
    </el-form-item>
    <el-form-item label="开票信息账号" :label-width=LabeWidth>
      <el-input v-model="CustomerDetails.accountInvoice" placeholder="请输入开票信息账号" :disabled="disabled"></el-input>
    </el-form-item>
   </el-form>

   <el-form :inline="true" class="demo-form-inline">
    <el-form-item label="办款资料行号" :label-width=LabeWidth>
      <el-input v-model="CustomerDetails.bankidPayment" placeholder="请输入办款资料行号" :disabled="disabled"></el-input>
    </el-form-item>
    <el-form-item label="办款资料账号" :label-width=LabeWidth>
      <el-input v-model="CustomerDetails.accountPayment" placeholder="请输入办款资料账号" :disabled="disabled"></el-input>
    </el-form-item>
   </el-form>

   <el-form :inline="true" >
    <el-form-item label="所属总公司" :label-width=LabeWidth class="full_input">
      <el-input v-model="CustomerDetails.headquarters" placeholder="请输入所属总公司" :disabled="disabled"></el-input>
    </el-form-item>
   </el-form>

    <el-form :inline="true" >
    <el-form-item label="开票信息开户行" :label-width=LabeWidth class="full_input">
      <el-input v-model="CustomerDetails.bankInvoice" placeholder="请输入开票信息开户行" :disabled="disabled"></el-input>
    </el-form-item>
   </el-form>

    <el-form :inline="true" >
        <el-form-item label="办款资料开户行" :label-width=LabeWidth class="full_input">
      <el-input v-model="CustomerDetails.bankPayment" placeholder="请输入办款资料开户行" :disabled="disabled"></el-input>
    </el-form-item>
   </el-form>

    <el-form :inline="true">
    <el-form-item label="开票地址" :label-width=LabeWidth class="full_input">
      <el-input v-model="CustomerDetails.addressInvoice" placeholder="请输入开票地址" :disabled="disabled"></el-input>
    </el-form-item>
   </el-form>

    <el-form :inline="true" >
    <el-form-item label="收件信息地址" :label-width=LabeWidth class="full_input">
      <el-input v-model="CustomerDetails.accountReceipt" placeholder="请输入收件信息地址" :disabled="disabled"></el-input>
    </el-form-item>
   </el-form>

   <el-form :inline="true" class="demo-form-inline">
    <el-form-item label="收件信息收件人" :label-width=LabeWidth>
      <el-input v-model="CustomerDetails.addressReceipt" placeholder="请输入收件信息收件人" :disabled="disabled"></el-input>
    </el-form-item>
    <el-form-item label="收件信息联系电话" :label-width=LabeWidth>
      <el-input v-model="CustomerDetails.phoneReceipt" placeholder="请输入收件信息联系电话" :disabled="disabled"></el-input>
    </el-form-item>
   </el-form>

   <el-form :inline="true" class="demo-form-inline">
    <el-form-item label="收件信息传真" :label-width=LabeWidth>
      <el-input v-model="CustomerDetails.faxReceipt" placeholder="请输入收件信息传真" :disabled="disabled"></el-input>
    </el-form-item>
    <el-form-item label="备注" :label-width=LabeWidth>
      <el-input v-model="CustomerDetails.remark"  placeholder="请输入备注" :disabled="disabled"></el-input>
    </el-form-item>
   </el-form>

  <el-form :inline="true" class="demo-form-inline">
    <el-form-item label="附件" :label-width=LabeWidth>
      <el-input  type="file"  placeholder="附件" class="upload" :disabled="disabled"></el-input>
    </el-form-item>
      <el-form-item label="是否启用" v-model="CustomerDetails.isEnabled" :label-width=LabeWidth :disabled="disabled">
      <div class="option">
     <el-radio :label=0 v-model="CustomerDetails.isEnabled">是</el-radio>
     <el-radio :label=1 v-model="CustomerDetails.isEnabled">否</el-radio>
      </div>
    </el-form-item>
   </el-form>

   <el-form :inline="true" class="demo-form-inline">
     <el-form-item label="创建人" :label-width=LabeWidth>
      <el-input v-model="CustomerDetails.createBy" disabled placeholder="创建人" ></el-input>
    </el-form-item>
    <el-form-item label="创建时间" :label-width=LabeWidth>
      <el-input v-model="CustomerDetails.createTime" disabled placeholder="创建时间"></el-input>
    </el-form-item>
   </el-form>

    <el-form :inline="true"  class="demo-form-inline">
    <el-form-item label="修改人" :label-width=LabeWidth>
      <el-input v-model="CustomerDetails.updateBy" disabled placeholder="修改人"></el-input>
    </el-form-item>
    <el-form-item label="修改时间" v-model="CustomerDetails.updateTime" :label-width=LabeWidth>
      <el-input disabled placeholder="修改时间"></el-input>
    </el-form-item>
   </el-form>
  </el-form>
  <el-button type="primary" @Click="handleConfirm" :disabled="disabled">保存</el-button>
  <el-button type="primary" @Click="handleColse">关闭</el-button>
  <el-dialog
    v-model="dialogVisible2"
    title="提示"
    width="20%"
    destroy-on-close
  >
    <span class="confirm">确定保存修改？</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible2 = false">取消</el-button>
        <el-button type="primary" @click="handleSave"
          >确定</el-button
        >
      </span>
    </template>
  </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref, toRefs } from 'vue'
import { AxiosApi } from '../../../utils/api'
import { CustomerFormat } from '../../../utils/type/customer'
import { ElMessage } from 'element-plus'

export default defineComponent({
  name:'customerdetails',
  props: {
    customerId:Number,
    handleClose:{
      type:Function,
      required:true
    },
    loadCustomers:{
      type:Function,
      required:true
    },
    type:String
  },
  setup (props, context) {
    const CustomerDetail = reactive({
      CustomerDetails:{
        customerId:props.customerId,
        customerCode:'',
        name:'',
        shortName:'',
        customerLevelValue:'',
        taxScale_value:'',
        creditLimit: 0,
        customerTypeValue:'',
        headquarters:'',
        bizArea:'',
        area:'',
        website:'',
        corporate:'',
        corporatePhone:'',
        contactsFinancial:'',
        phoneFinancial:'',
        unitInvoice:'',
        bankInvoice:'',
        bankidInvoice:'',
        taxInvoice:'',
        phoneInvoice:'',
        accountInvoice:'',
        addressInvoice:'',
        unitPayment:'',
        bankPayment:'',
        bankidPayment:'',
        accountPayment:'',
        accountReceipt:'',
        postcodeReceipt:'',
        addressReceipt:'',
        phoneReceipt:'',
        faxReceipt:'',
        attachment:'',
        remark:'',
        isEnabled:0,
        createBy:'',
        createTime:'',
        updateBy:'',
        updateTime:'',
        modifiedDate:''
      }
    })
    const disabled = ref(false)
    const dialogVisible2 = ref(false)

    const handleColse = () => {
      props.handleClose()
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

    const handleConfirm = () => {
      if (CustomerDetail.CustomerDetails.customerCode === '' || CustomerDetail.CustomerDetails.name === '') {
        error('编码和名称不能为空')
        return
      }
      dialogVisible2.value = true
    }

    const handleSave = () => {
      if (props.customerId) {
        AxiosApi.put('customer/update', JSON.stringify(CustomerDetail.CustomerDetails))
          .then((res) => {
            console.log(res)
            dialogVisible2.value = false
            handleColse()
            success('修改成功！')
          }).catch((err) => {
            console.log(err)
            dialogVisible2.value = false
            handleColse()
            error('修改失败')
          })
      } else {
        AxiosApi.post('customer/add', JSON.stringify(CustomerDetail.CustomerDetails))
          .then((res) => {
            props.loadCustomers(1)
            dialogVisible2.value = false
            handleColse()
            success('添加成功！')
          }).catch((err) => {
            console.log(err)
            dialogVisible2.value = false
            handleColse()
            error('修改失败')
          })
      }
    }
    const findCustomerDetails = (customerId:number) => {
      AxiosApi.get(`customer/find?id=${customerId}`)
        .then((res) => {
          CustomerDetail.CustomerDetails = res.data.result
          // console.log(CustomerDetails)
        }).catch((err) => {
          console.log(err)
          error('获取客户数据失败')
        })
    }
    onMounted(() => {
      if (props.type === 'adit' || props.type === 'detail') {
        if (props.type === 'detail') {
          disabled.value = true
        }
        findCustomerDetails(props.customerId ? props.customerId : 0)
      }
    })
    return {
      formInline: {
        user: '',
        region: ''
      },
      LabeWidth: '200px',
      handleColse,
      handleSave,
      disabled,
      dialogVisible2,
      handleConfirm,
      ...toRefs(CustomerDetail)
    }
  }
})
</script>

<style scoped>
.upload{
  width: 178px
}
.option{
  width: 202.5px
}
.full_input{
  width: 810px;
}
</style>
