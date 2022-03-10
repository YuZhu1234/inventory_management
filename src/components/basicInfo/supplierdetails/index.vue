<template>
  <div>
  <el-form ref="service" :model="SupplierDetails" :label-width=LabeWidth label-position="right">
   <el-form :inline="true" class="demo-form-inline">
    <el-form-item label="编码" :label-width=LabeWidth>
      <el-input v-model="SupplierDetails.code" placeholder="客户编码"></el-input>
    </el-form-item>
    <el-form-item label="名称" :label-width=LabeWidth>
      <el-input v-model="SupplierDetails.name" placeholder="名称"></el-input>
    </el-form-item>
   </el-form>

   <el-form :inline="true" :model="formInline" class="demo-form-inline">
     <el-form-item label="简称" :label-width=LabeWidth>
      <el-input v-model="SupplierDetails.shortName" placeholder="简称"></el-input>
    </el-form-item>
    <el-form-item label="等级" :label-width=LabeWidth>
      <el-select v-model="SupplierDetails.supplierLevel" placeholder="一级" class="option">
         <el-option label="一级" value=1 ></el-option>
         <el-option label="二级" value=2 ></el-option>
      </el-select>
    </el-form-item>
   </el-form>

    <el-form :inline="true" class="demo-form-inline">
     <el-form-item label="纳税规模" :label-width=LabeWidth>
      <el-select v-model="SupplierDetails.taxScale" placeholder="请输入纳税规模" class="option">
         <el-option label="一般纳税人" value=1 ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="供应商地址" :label-width=LabeWidth>
      <el-input v-model="SupplierDetails.address" placeholder="请输入供应商地址"></el-input>
    </el-form-item>
   </el-form>

   <el-form :inline="true" class="demo-form-inline">
     <el-form-item label="所属总公司" :label-width=LabeWidth>
      <el-input v-model="SupplierDetails.headquarters" placeholder="请输入所属总公司" ></el-input>
    </el-form-item>
    <el-form-item label="收件信息邮箱" :label-width=LabeWidth>
      <el-input v-model="SupplierDetails.postcodeReceipt" placeholder="请输入收件信息邮箱"></el-input>
    </el-form-item>
   </el-form>

   <el-form :inline="true" class="demo-form-inline">
    <el-form-item label="所属地区" :label-width=LabeWidth>
      <el-input v-model="SupplierDetails.bizArea" placeholder="请输入所属地区"></el-input>
    </el-form-item>
    <el-form-item label="业务区域" :label-width=LabeWidth>
      <el-input v-model="SupplierDetails.area" placeholder="请输入业务区域"></el-input>
    </el-form-item>
   </el-form>

   <el-form :inline="true" class="demo-form-inline">
    <el-form-item label="网站" :label-width=LabeWidth>
      <el-input v-model="SupplierDetails.website" placeholder="请输入供应商网站"></el-input>
    </el-form-item>
    <el-form-item label="法人代表" :label-width=LabeWidth>
      <el-input v-model="SupplierDetails.corporate" placeholder="请输入法人代表"></el-input>
    </el-form-item>
   </el-form>

   <el-form :inline="true" class="demo-form-inline">
    <el-form-item label="法人电话" :label-width=LabeWidth>
      <el-input v-model="SupplierDetails.corporatePhone" placeholder="请输入法人电话"></el-input>
    </el-form-item>
    <el-form-item label="财务信息联系人" :label-width=LabeWidth>
      <el-input v-model="SupplierDetails.contactsFinancial" placeholder="请输入财务信息联系人"></el-input>
    </el-form-item>
   </el-form>

   <el-form :inline="true" class="demo-form-inline">
    <el-form-item label="财务信息联系电话" :label-width=LabeWidth>
      <el-input v-model="SupplierDetails.phoneFinancial" placeholder="请输入财务信息联系电话"></el-input>
    </el-form-item>
    <el-form-item label="开票信息单位名称" :label-width=LabeWidth>
      <el-input v-model="SupplierDetails.unitInvoice" placeholder="请输入开票信息单位名称"></el-input>
    </el-form-item>
   </el-form>

   <el-form :inline="true" class="demo-form-inline">
    <el-form-item label="开票信息税号" :label-width=LabeWidth>
      <el-input v-model="SupplierDetails.taxInvoice" placeholder="请输入开票信息税号"></el-input>
    </el-form-item>
    <el-form-item label="开票信息联系电话" :label-width=LabeWidth>
      <el-input v-model="SupplierDetails.phoneInvoice" placeholder="请输入开票信息联系电话"></el-input>
    </el-form-item>
   </el-form>

   <el-form :inline="true" class="demo-form-inline">
    <el-form-item label="办款资料单位名称" :label-width=LabeWidth>
      <el-input v-model="SupplierDetails.unitPayment" placeholder="请输入办款资料单位名称"></el-input>
    </el-form-item>
    <el-form-item label="开票信息账号" :label-width=LabeWidth>
      <el-input v-model="SupplierDetails.accountInvoice" placeholder="请输入开票信息账号"></el-input>
    </el-form-item>
   </el-form>

   <el-form :inline="true" class="demo-form-inline">
    <el-form-item label="办款资料行号" :label-width=LabeWidth>
      <el-input v-model="SupplierDetails.bankidPayment" placeholder="请输入办款资料行号"></el-input>
    </el-form-item>
    <el-form-item label="办款资料账号" :label-width=LabeWidth>
      <el-input v-model="SupplierDetails.accountPayment" placeholder="请输入办款资料账号"></el-input>
    </el-form-item>
   </el-form>

    <el-form :inline="true" >
    <el-form-item label="开票信息开户行" :label-width=LabeWidth class="full_input">
      <el-input v-model="SupplierDetails.bankInvoice" placeholder="请输入开票信息开户行"></el-input>
    </el-form-item>
   </el-form>

    <el-form :inline="true" >
        <el-form-item label="办款资料开户行" :label-width=LabeWidth class="full_input">
      <el-input v-model="SupplierDetails.bankPayment" placeholder="请输入办款资料开户行"></el-input>
    </el-form-item>
   </el-form>

    <el-form :inline="true">
    <el-form-item label="开票地址" :label-width=LabeWidth class="full_input">
      <el-input v-model="SupplierDetails.addressInvoice" placeholder="请输入开票地址"></el-input>
    </el-form-item>
   </el-form>

    <el-form :inline="true" >
    <el-form-item label="收件信息地址" :label-width=LabeWidth class="full_input">
      <el-input v-model="SupplierDetails.accountReceipt" placeholder="请输入收件信息地址"></el-input>
    </el-form-item>
   </el-form>

   <el-form :inline="true" class="demo-form-inline">
    <el-form-item label="收件信息收件人" :label-width=LabeWidth>
      <el-input v-model="SupplierDetails.addressReceipt" placeholder="请输入收件信息收件人"></el-input>
    </el-form-item>
    <el-form-item label="收件信息联系电话" :label-width=LabeWidth>
      <el-input v-model="SupplierDetails.phoneReceipt" placeholder="请输入收件信息联系电话"></el-input>
    </el-form-item>
   </el-form>

   <el-form :inline="true" class="demo-form-inline">
    <el-form-item label="收件信息传真" :label-width=LabeWidth>
      <el-input v-model="SupplierDetails.faxReceipt" placeholder="请输入收件信息传真"></el-input>
    </el-form-item>
    <el-form-item label="备注" :label-width=LabeWidth>
      <el-input v-model="SupplierDetails.remark"  placeholder="请输入备注"></el-input>
    </el-form-item>
   </el-form>

  <el-form :inline="true" class="demo-form-inline">
    <el-form-item label="附件" :label-width=LabeWidth>
      <el-input  type="file"  placeholder="附件" class="upload" ></el-input>
    </el-form-item>
      <el-form-item label="是否启用" v-model="SupplierDetails.isEnabled" :label-width=LabeWidth>
      <div class="option">
     <el-radio :label=1 v-model="SupplierDetails.isEnabled">是</el-radio>
     <el-radio :label=0 v-model="SupplierDetails.isEnabled">否</el-radio>
      </div>
    </el-form-item>
   </el-form>

   <el-form :inline="true" class="demo-form-inline">
     <el-form-item label="创建人" :label-width=LabeWidth>
      <el-input v-model="SupplierDetails.createBy" disabled placeholder="创建人"></el-input>
    </el-form-item>
    <el-form-item label="创建时间" :label-width=LabeWidth>
      <el-input v-model="SupplierDetails.createTime" disabled placeholder="创建时间"></el-input>
    </el-form-item>
   </el-form>

    <el-form :inline="true"  class="demo-form-inline">
    <el-form-item label="修改人" :label-width=LabeWidth>
      <el-input v-model="SupplierDetails.updateBy" disabled placeholder="修改人"></el-input>
    </el-form-item>
    <el-form-item label="修改时间" v-model="SupplierDetails.updateTime" :label-width=LabeWidth>
      <el-input disabled placeholder="修改时间"></el-input>
    </el-form-item>
   </el-form>
  </el-form>
  <el-button type="primary" @Click="dialogVisible2 = true" :disabled="disabled">保存</el-button>
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
  name:'supplierdetails',
  props: {
    supplierId:Number,
    handleClose:{
      type:Function,
      required:true
    },
    loaderSupplier:{
      type:Function,
      required:true
    },
    type:String
  },
  setup (props, context) {
    const SupplierDetail = reactive({
      SupplierDetails:{
        supplierId:props.supplierId,
        name: '',
        code: '',
        shortName: '',
        headquarters: '',
        supplierLevel: null,
        taxScale: null,
        supplierCategory: '',
        area: '',
        bizArea: '',
        website: '',
        alterSupplier: '',
        corporate: '',
        address: '',
        corporatePhone: '',
        contactsFinancial: '',
        phoneFinancial: '',
        unitInvoice: '',
        bankInvoice: '',
        bankidInvoice: '',
        taxInvoice: '',
        phoneInvoice: '',
        accountInvoice: '',
        addressInvoice: '',
        unitPayment: '',
        bankPayment: '',
        bankidPayment: '',
        accountPayment: '',
        accountReceipt: '',
        postcodeReceipt: '',
        addressReceipt: '',
        phoneReceipt: '',
        faxReceipt: '',
        attachment: '',
        remark: '',
        isEnabled: 0,
        createBy: '',
        createTime: '',
        updateBy: '',
        updateTime: '',
        modifiedDate: '',
        supplierLevelText: '',
        taxScaleText: ''
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

    const handleSave = () => {
      if (props.supplierId) {
        AxiosApi.put('supplier/update', JSON.stringify(SupplierDetail.SupplierDetails))
          .then((res) => {
            console.log(res)
            dialogVisible2.value = false
            handleColse()
            success('修改成功！')
            props.loaderSupplier(1)
          }).catch((err) => {
            console.log(err)
            dialogVisible2.value = false
            handleColse()
            error('修改失败')
          })
      } else {
        AxiosApi.post('supplier/add', JSON.stringify(SupplierDetail.SupplierDetails))
          .then((res) => {
            dialogVisible2.value = false
            handleColse()
            success('添加成功！')
            props.loaderSupplier(1)
          }).catch((err) => {
            console.log(err)
            dialogVisible2.value = false
            handleColse()
            error('添加失败')
          })
      }
    }
    const findSupplierDetails = (supplierId:number) => {
      AxiosApi.get(`supplier/find?id=${supplierId}`)
        .then((res) => {
          SupplierDetail.SupplierDetails = res.data.result
          // console.log(SupplierDetails)
        }).catch((err) => {
          console.log(err)
          error('加载供应商数据失败！')
        })
    }
    onMounted(() => {
      if (props.type === 'edit' || props.type === 'detail') {
        if (props.type === 'detail') {
          disabled.value = true
        }
        findSupplierDetails(props.supplierId ? props.supplierId : 0)
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
      // SupplierDetails,
      ...toRefs(SupplierDetail)
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
