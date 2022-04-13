<template>
    <Card class="customer_card">
      <div class="header">
        <el-button type="text" class="header_button" @click="handleAdd"><el-icon><plus /></el-icon>&nbsp;新增</el-button>
        <!-- <el-button type="text" class="header_button"><el-icon><download /></el-icon>&nbsp;导出</el-button>
        <el-button type="text" class="header_button"><el-icon><upload /></el-icon>&nbsp;导入</el-button> -->
      </div>
       <el-table
      :data="BankAccountData"
      style="border: 1px solid rgb(245,244,245)"
      highlight-current-row="true"
      v-loading="loading"
    >
       <el-table-column fixed type="index" label="#" width="55" />
        <el-table-column fixed prop="accountNo"  label="账号" width="300"/>
        <el-table-column fixed prop="name"  label="账户名称" width="300" />
        <el-table-column prop="currency" label="币种"  width="300" />
        <el-table-column prop="initBal"  label="初始余额" width="150"/>
        <el-table-column prop="bankNo"  label="行号" width="300" />
        <el-table-column prop="bankAddress" label="银行地址"  width="300" />
        <el-table-column prop="manager"  label="账号管理员" width="150"/>
        <el-table-column prop="isEnabled" label="是否启用" width="120" >
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
        <el-table-column prop="note" label="备注" width="300" />
        <el-table-column fixed="right" label="操作" sortable width="120">
          <template v-slot="scope">
            <el-button type="text" size="small" @click="handleClick(scope.row.bankAccountId,'edit')">编辑</el-button>
            <el-divider direction="vertical"></el-divider>
             <el-dropdown>
              <el-button type="text" size="small">更多<el-icon><arrow-down /></el-icon></el-button>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item @click="handleClick(scope.row.bankAccountId, 'delete')">删除</el-dropdown-item>
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
          :total="total"
          :currentPage="current_page"
          @current-change="handleCurrentChange"
        >
        </el-pagination>
      </template>
      <el-drawer
          v-model="drawer"
          title="编辑"
          :direction="direction"
          size="511px"
          destroy-on-close
        >
        <el-divider class="divider"></el-divider>
        <div class="overflowAuto">
          <BankAccountList 
            :BankAccountId="BankAccountId"
            :edit_type="edit_type"
            :handleCloseDrawer="handleCloseDrawer"
            :LoadBankAccountData="LoadBankAccountData"
          />
        </div>
      </el-drawer>
       <el-dialog
        v-model="dialogVisible2"
        title="提示"
        width="20%"
        destroy-on-close
      >
    <span class="confirm">确定删除此仓库数据？</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible2 = false">取消</el-button>
        <el-button type="primary" @click="handleDelete">确定</el-button>
      </span>
    </template>
  </el-dialog>
    </Card>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import {
  Plus,
  Download,
  Upload,
  ArrowDown
} from '@element-plus/icons-vue'
import BankAccountList from './bankaccountList.vue'
import { AxiosApi } from '../../../utils/api'
import { AxiosResponse } from 'axios'
import { ElMessage } from 'element-plus'

export default defineComponent({
  name:'BankAccount',
  components:{
    Plus,
    // Download,
    // Upload,
    ArrowDown,
    BankAccountList
  },
  setup () {
    const tableData = [
      {
        id: 1,
        date: '1',
        name: 'Tom',
        state: 'California',
        city: 'Los Angeles',
        address: 'No. 189, Grove St, Los Angeles',
        zip: 'CA 90036',
        tag: 'Home'
      },
      {
        id: 2,
        date: '2',
        name: 'Tom',
        state: 'California',
        city: 'Los Angeles',
        address: 'No. 189, Grove St, Los Angeles',
        zip: 'CA 90036',
        tag: 'Office',
        children:[
          {
            id: 21,
            date: '2-1',
            name: 'Tom',
            state: 'California',
            city: 'Los Angeles',
            address: 'No. 189, Grove St, Los Angeles',
            zip: 'CA 90036',
            tag: 'Home'
          },
          {
            id: 22,
            date: '2-2',
            name: 'Tom',
            state: 'California',
            city: 'Los Angeles',
            address: 'No. 189, Grove St, Los Angeles',
            zip: 'CA 90036',
            tag: 'Office'
          }
        ]
      }   
    ]
    const BankAccountData = ref([{}])
    const drawer = ref(false)
    const BankAccountId = ref('')
    const edit_type = ref('')
    const dialogVisible2 = ref(false)
    const current_page = ref(1)
    const total = ref(0)
    const loading = ref(false)

    const handleCurrentChange = (val: number) :void => {
      current_page.value = val
      LoadBankAccountData(val)
    }

    const handleClick = (bankAccountId:string, type:string) :void => {
      if (type === 'edit') {
        drawer.value = true
        BankAccountId.value = bankAccountId
        edit_type.value = 'edit'
      } else if (type === 'delete') {
        dialogVisible2.value = true
        BankAccountId.value = bankAccountId
      }
    }

    const handleCloseDrawer = () => {
      drawer.value = false
    }

    const handleAdd = () => {
      edit_type.value = 'add'
      drawer.value = true
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

    const handleDelete = () => {
      AxiosApi.delete(`bankAccount/delete?id=${BankAccountId.value}`)
        .then((res) => {
          success('删除成功！')
          dialogVisible2.value = false
          LoadBankAccountData(1)
        })
        .catch((err) => {
          error('删除失败！')
          dialogVisible2.value = false
          console.log(err)
        })
    }

    const LoadBankAccountData = (page:number) => {
      loading.value = true
      AxiosApi.get(`bankAccount/list?pageNum=${page}&pageSize=10`)
        .then((res:AxiosResponse) => {
          BankAccountData.value = res.data.result
          loading.value = false
        }).catch((err) => {
          console.log(err)
          error('获取银行账户信息失败!')
          loading.value = false
        })
    }

    onMounted(() => {
      LoadBankAccountData(1)
    })
    return {
      drawer,
      handleClick,
      BankAccountData,
      BankAccountId,
      handleAdd,
      edit_type,
      handleCloseDrawer,
      dialogVisible2,
      handleDelete,
      LoadBankAccountData,
      handleCurrentChange,
      total,
      loading
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

.header {
  display: flex;
  justify-content: left;
  margin-bottom: 20px;
}

.header_button {
  margin-left: 50px;
  font-weight: bold;
}

.pagination{
  margin-top: 40px;
  display: flex;
  justify-content: right;
}

.divider {
  position: absolute;
  top: 30px;
  left: 0px;
}

.overflowAuto {
    overflow: scroll;
    position: absolute;
    width: 100%;
    height: calc(100% - 100px);
}
.overflowAuto::-webkit-scrollbar {
    height: 6px;
    width: 6px;
}
.overflowAuto::-webkit-scrollbar-thumb {
    background: rgb(224, 214, 235);
}
.el-input.is-disabled .el-input__inner{
  color: black !important;;
}

</style>
