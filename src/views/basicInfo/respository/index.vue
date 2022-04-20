<template>
    <Card class="customer_card">
      <div 
        style="height: 30px;
              margin-top: -20px;
              margin-bottom: 20px;
              text-align: left;
              color: #1890FF;
              font-size: 15px;
              border-bottom: 1px solid grey;"
      >
      基础数据 > 仓库
      </div>
      <div class="header">
        <el-button type="text" class="header_button" @click="handleAdd"><el-icon><plus /></el-icon>&nbsp;新增</el-button>
        <!-- <el-button type="text" class="header_button"><el-icon><download /></el-icon>&nbsp;导出</el-button>
        <el-button type="text" class="header_button"><el-icon><upload /></el-icon>&nbsp;导入</el-button> -->
      </div>
       <el-table
      :data="Warehousedata"
      style="border: 1px solid rgb(245,244,245)"
      highlight-current-row="true"
      row-key="warehouseId"
      v-loading="loading"
    >
       <el-table-column fixed type="index" label="#" sortable width="55" />
        <el-table-column fixed prop="name" sortable label="名称" width="300"/>
        <el-table-column fixed prop="code" sortable label="编码" width="300" />
        <el-table-column prop="phone" label="电话" sortable width="300" />
        <el-table-column prop="isEnabled" label="是否启用" sortable width="120" >
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
        <el-table-column prop="remark" label="备注" sortable width="600" />
        <el-table-column fixed="right" label="操作" sortable width="120">
          <template v-slot="scope">
            <el-button type="text" size="small" @click="handleClick(scope.row.warehouseId,'edit')">编辑</el-button>
            <el-divider direction="vertical"></el-divider>
             <el-dropdown>
              <el-button type="text" size="small">更多<el-icon><arrow-down /></el-icon></el-button>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item @click="handleClick(scope.row.warehouseId, 'delete')">删除</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </template>
        </el-table-column>
    </el-table>
      <!-- <template class="pagination" >
        <el-pagination background="blue" layout="prev, pager, next" :total="1000">
        </el-pagination>
      </template> -->
      <el-drawer
          v-model="drawer"
          title="编辑"
          :direction="direction"
          size="511px"
          destroy-on-close
        >
        <el-divider class="divider"></el-divider>
        <div class="overflowAuto">
          <Responsitorylist 
            :WarehouseId="WarehouseId"
            :edit_type="edit_type"
            :handleCloseDrawer="handleCloseDrawer"
            :loadMarehousedata="loadMarehousedata"
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
import Responsitorylist from './responsitorylist.vue'
import { AxiosApi } from '../../../utils/api'
import { AxiosResponse } from 'axios'
import { ElMessage } from 'element-plus'

export default defineComponent({
  name:'Respository',
  components:{
    Plus,
    // Download,
    // Upload,
    ArrowDown,
    Responsitorylist
  },
  setup () {
    const Warehousedata = ref([{}])
    const drawer = ref(false)
    const WarehouseId = ref('')
    const edit_type = ref('')
    const dialogVisible2 = ref(false)
    const loading = ref(false)

    const handleClick = (warehouseId:string, type:string) :void => {
      if (type === 'edit') {
        drawer.value = true
        WarehouseId.value = warehouseId
        edit_type.value = 'edit'
      } else if (type === 'delete') {
        dialogVisible2.value = true
        WarehouseId.value = warehouseId
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

    const handleWarehouse = (Warehouse:any) => {
      loading.value = true
      let datalist:any[] = []
      const a = Warehouse?.filter((item:any) => {
        return item.pid === 0
      })
      datalist = a
      const findChildren = (list:any) => {
        for (let i = 0; i < list.length; i++) {
          const b = list.map((d:any, id:number) => {
            const c = Warehouse?.filter((item:any) => {
              return item.pid === d.warehouseId
            })
            if (c.length > 0) {
              findChildren(c) // 采用递归算法进行树的查找
            }
            list[id].children = c
          })
        }
      }
      findChildren(datalist)
      Warehousedata.value = datalist
      loading.value = false
      console.log(datalist)
    }

    const handleDelete = () => {
      AxiosApi.delete(`warehouse/delete?id=${WarehouseId.value}`)
        .then((res) => {
          success('删除成功！')
          dialogVisible2.value = false
          loadMarehousedata()
        })
        .catch((err) => {
          error('删除失败！')
          dialogVisible2.value = false
          console.log(err)
        })
    }

    const loadMarehousedata = () => {
      loading.value = true
      AxiosApi.get('warehouse/list')
        .then((res:AxiosResponse) => {
          loading.value = false
          handleWarehouse(res.data.result)
        }).catch((err) => {
          console.log(err)
          error('获取仓库信息失败!')
          loading.value = false
        })
    }

    onMounted(() => {
      loadMarehousedata()
    })
    return {
      drawer,
      handleClick,
      Warehousedata,
      WarehouseId,
      handleAdd,
      edit_type,
      handleCloseDrawer,
      dialogVisible2,
      handleDelete,
      loadMarehousedata,
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
