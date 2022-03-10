<template>
    <Card class="customer_card">
      <div class="header">
        <el-button type="text" class="header_button" @click="handleClick('','add')"><el-icon><plus /></el-icon>&nbsp;新增</el-button>
        <el-button type="text" class="header_button"><el-icon><download /></el-icon>&nbsp;导出</el-button>
        <el-button type="text" class="header_button"><el-icon><upload /></el-icon>&nbsp;导入</el-button>
      </div>
       <el-table
      :data="CurrencyData"
      class="table"
      highlight-current-row="true"
      border
    >
       <el-table-column fixed type="index" label="#" />
        <el-table-column fixed prop="code"  label="代码" />
        <el-table-column prop="name"  label="名称"  />
        <el-table-column prop="isFunctional" label="是否本币"  >
         <template v-slot="scope">
            <el-switch
                v-model="scope.row.isFunctional"
                class="ml-2"
                active-color="#13ce66"
                inactive-color="#ff4949"
                :active-value="1"
                :inactive-value="0"
                disabled
            />
            </template>
        </el-table-column>
        <el-table-column prop="isEnabled" label="是否启用"  >
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
        <el-table-column fixed="right" label="操作" sortable >
          <template v-slot="scope">
            <el-button type="text" size="small" @click="handleClick(scope.row.currencyId,'edit')">编辑</el-button>
            <el-divider direction="vertical"></el-divider>
             <el-dropdown>
              <el-button type="text" size="small">更多<el-icon><arrow-down /></el-icon></el-button>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item @click="handleClick(scope.row.currencyId, 'delete')">删除</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </template>
        </el-table-column>
    </el-table>
      <template class="pagination" >
        <el-pagination background="blue" layout="prev, pager, next" :total="1000">
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
          <CurrencyList 
            :CurrencyId="CurrencyId"
            :edit_type="edit_type"
            :handleCloseDrawer="handleCloseDrawer"
            :LoadCurrrencyData="LoadCurrrencyData"
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
import CurrencyList from './currencyList.vue'
import { AxiosApi } from '../../../utils/api'
import { AxiosResponse } from 'axios'
import { ElMessage } from 'element-plus'

export default defineComponent({
  name:'Currency',
  components:{
    Plus,
    Download,
    Upload,
    ArrowDown,
    CurrencyList
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
    const CurrencyData = ref([{}])
    const drawer = ref(false)
    const CurrencyId = ref('')
    const edit_type = ref('')
    const dialogVisible2 = ref(false)

    const handleClick = (currencyId:string, type:string) :void => {
      if (type === 'edit') {
        drawer.value = true
        CurrencyId.value = currencyId
        edit_type.value = 'edit'
      } else if (type === 'delete') {
        dialogVisible2.value = true
        CurrencyId.value = currencyId
      } else if (type === 'add') {
        edit_type.value = 'add'
        drawer.value = true
      } 
    }

    const handleCloseDrawer = () => {
      drawer.value = false
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
      AxiosApi.delete(`currency/delete?id=${CurrencyId.value}`)
        .then((res) => {
          success('删除成功！')
          dialogVisible2.value = false
          LoadCurrrencyData()
        })
        .catch((err) => {
          error('删除失败！')
          dialogVisible2.value = false
          console.log(err)
        })
    }

    const LoadCurrrencyData = () => {
      AxiosApi.get('currency/list')
        .then((res:AxiosResponse) => {
          CurrencyData.value = res.data.result
        }).catch((err) => {
          console.log(err)
          error('获取币种信息失败!')
        })
    }

    onMounted(() => {
      LoadCurrrencyData()
    })
    return {
      drawer,
      handleClick,
      CurrencyData,
      CurrencyId,
      edit_type,
      handleCloseDrawer,
      dialogVisible2,
      handleDelete,
      LoadCurrrencyData
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
  margin-right: 50px;
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

.table {
    border: 1px solid rgb(245,244,245);
    /* width: 850px;
    left: 50%;
    margin-left: -425px; */
}

</style>
