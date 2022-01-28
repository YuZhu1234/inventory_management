<template>
    <Card class="customer_card">
      <el-form :inline="true" class="demo-form-inline">
       <el-form-item label="名称" class="encode">
        <el-select placeholder="请选择查找类型" v-model="findType">
        <el-option label="编码" value="编码"></el-option>
        <el-option label="ID" value="ID"></el-option>
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
  <el-table :data="CustomerData" class="tabel" >
    <el-table-column prop="customerCode" label="编码" :width="columnwidth" fixed />
    <el-table-column prop="name" label="名称" :width="columnwidth" />
    <el-table-column prop="shortName" label="简称" :width="columnwidth" />
    <el-table-column prop="customerLevelText" label="等级" :width="columnwidth" />
    <el-table-column prop="creditLimit" label="欠款额度" :width="columnwidth" />
    <el-table-column prop="customerTypeText" label="客户分类" :width="columnwidth" />
    <el-table-column prop="website" label="客户网站" :width="columnwidth" />
    <el-table-column prop="corporate" label="法人代表" :width="columnwidth" />
    <el-table-column prop="corporatePhone" label="法人电话" :width="columnwidth" />
    <el-table-column fixed="right" label="操作" width="120" type="index">
      <template v-slot="scope">
      <el-button type="text" size="small" @click="handleDetail(scope.row)">详情</el-button>
        <el-button type="text" size="small" @click="handleAdit(scope.row)"
          >编辑</el-button
        >
        <el-button type="text" size="small" @click="handleConfirm(scope.row.customerId)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <template class="pagination" >
    <el-pagination background="blue" layout="prev, pager, next" :total="1000">
    </el-pagination>
  </template>
  <el-dialog
    v-model="dialogVisible"
    title="客户-详情"
    width="1000px"
    destroy-on-close
  >
    <CustomerDetails :customerId="customerId" :handleClose="handleClose" :loadCustomers="loadCustomers" :type="type"/>
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
import CustomerDetails from '../../../components/customerdetails/index.vue'
import { AxiosApi } from '../../../utils/api'
import { AxiosResponse } from 'axios'
import { ElMessageBox } from 'element-plus'

export default defineComponent({
  name:'asside',
  components:{
    CustomerDetails
  },
  setup () {
    const dialogVisible = ref(false)
    const CustomerData = ref([])
    const customerId = ref()
    const dialogVisible2 = ref(false)
    const deleteID = ref()
    const findValue = ref()
    const type = ref('add')
    const findType = ref('编码')
    const columnwidth = ref('150px')

    const onAdd = ():void => {
      type.value = 'add'
      dialogVisible.value = true
    }

    const onQuery = ():void => {
      if (findType.value === 'ID') {
        AxiosApi.get(`customer/find?id=${findValue.value}`)
          .then((res) => {
            CustomerData.value = []
            CustomerData.value = res.data.result
            // CustomerData.value.push(res.data.result)
          }).catch((err) => {
            console.log(err)
          })
      } else if (findType.value === '编码') {
        AxiosApi.get(`customer/list?code=${findValue.value}`).then((res) => {
          CustomerData.value = res.data.result
        }).catch((err) => {
          console.log(err)
        })
      } else {
        AxiosApi.get(`customer/list?name=${findValue.value}`).then((res) => {
          CustomerData.value = res.data.result
        }).catch((err) => {
          console.log(err)
        })
      }
    }
    const handleClose = () => {
      dialogVisible.value = false
    }

    const handleAdit = (customer:any) :void => {
      type.value = 'adit'
      customerId.value = customer.customerId
      dialogVisible.value = true
    }

    const loadCustomers = () :void => {
      AxiosApi.get('customer/list')
        .then((res:AxiosResponse) => {
          CustomerData.value = res.data.result
        }).catch((err) => {
          console.log(err)
        })
    }

    const handleConfirm = (customerId:number) :void => {
      deleteID.value = customerId
      dialogVisible2.value = true
    }

    const handledetele = () :void => {
      AxiosApi.delete(`customer/delete?id=${deleteID.value}`)
        .then((res) => {
          loadCustomers()
          dialogVisible2.value = false
        }).catch((err) => {
          console.log(err)
        })
    }

    const handleDetail = (customer:any) :void => {
      type.value = 'detail'
      customerId.value = customer.customerId
      dialogVisible.value = true
    }
    onMounted(() => {
      loadCustomers()
    })
    return {
      CustomerData,
      dialogVisible,
      handleAdit,
      handledetele,
      onQuery,
      handleClose,
      customerId,
      loadCustomers,
      dialogVisible2,
      handleConfirm,
      findValue,
      type,
      onAdd,
      findType,
      handleDetail,
      columnwidth
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
