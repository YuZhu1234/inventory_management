<template>
    <Card class="customer_card">
      <div class="header">
        <el-button type="text" class="header_button" @click="handleAdd"><el-icon><plus /></el-icon>&nbsp;新增</el-button>
        <!-- <el-button type="text" class="header_button"><el-icon><download /></el-icon>&nbsp;导出</el-button>
        <el-button type="text" class="header_button"><el-icon><upload /></el-icon>&nbsp;导入</el-button> -->
      </div>
       <el-table
      :data="MeasurementUnitData"
      style="border: 1px solid rgb(245,244,245)"
      class="table"
      highlight-current-row="true"
      row-key="measureUnitId"
      v-loading="loading"
    >
       <el-table-column type="selection" sortable  />
        <el-table-column prop="name" sortable label="名称"/>
        <el-table-column  prop="symbol" sortable label="符号" />
        <el-table-column prop="factor" label="换算系数" sortable />
        <el-table-column prop="isEnabled" label="是否启用" sortable >
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
        <el-table-column fixed="right" label="操作" sortable width="120">
          <template v-slot="scope">
            <el-button type="text" size="small" @click="handleClick(scope.row.measureUnitId, 'edit')">编辑</el-button>
            <el-divider direction="vertical"></el-divider>
             <el-dropdown>
              <el-button type="text" size="small">更多<el-icon><arrow-down /></el-icon></el-button>
              <template #dropdown >
                <el-dropdown-menu>
                  <el-dropdown-item @click="handleClick(scope.row.measureUnitId, 'delete')">删除</el-dropdown-item>
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
          destroy-on-close
          size="511px"
        >
        <el-divider class="divider"></el-divider>
        <div class="overflowAuto">
          <unitofmeasurementlist 
            :measureUnitId="measureUnitId" 
            :LoadMeasurementUnit="LoadMeasurementUnit" 
            :handleCloseDrawer="handleCloseDrawer"
            :save_type="save_type"
          />
        </div>
      </el-drawer>
      <el-dialog
        v-model="dialogVisible2"
        title="提示"
        width="20%"
        destroy-on-close
      >
    <span class="confirm">确定删除此单位？</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible2 = false">取消</el-button>
        <el-button type="primary" @click="handleDelete"
          >确定</el-button
        >
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
import unitofmeasurementlist from './unitofmeasurementlist.vue'
import { AxiosApi } from '../../../utils/api'
import { AxiosResponse } from 'axios'
import { ElMessage } from 'element-plus'

export default defineComponent({
  name:'unitofmeasurement',
  components:{
    Plus,
    // Download,
    // Upload,
    ArrowDown,
    unitofmeasurementlist
  },
  setup () {
    const drawer = ref(false)
    const MeasurementUnitData = ref([{}])
    const measureUnitId = ref('')
    const save_type = ref('')
    const dialogVisible2 = ref(false)
    const loading = ref(false)

    const handleClick = (id:string, type:string) :void => {
      if (type === 'edit') {
        save_type.value = 'edit'
        drawer.value = true
        measureUnitId.value = id 
      } else if (type === 'delete') {
        dialogVisible2.value = true
        measureUnitId.value = id
      }
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

    const handleMeasurementUnit = (Measurement:any) => {
      loading.value = true
      let datalist:any[] = []
      const a = Measurement?.filter((item:any) => {
        return item.pid === 0
      })
      datalist = a
      const findChildren = (list:any) => {
        for (let i = 0; i < list.length; i++) {
          const b = list.map((d:any, id:number) => {
            const c = Measurement?.filter((item:any) => {
              return item.pid === d.measureUnitId
            })
            if (c.length > 0) {
              findChildren(c) // 采用递归算法进行树的查找
            }
            list[id].children = c
          })
        }
      }
      findChildren(datalist)
      MeasurementUnitData.value = datalist
      loading.value = false
    }

    const LoadMeasurementUnit = () => {
      loading.value = true
      AxiosApi.get('measureUnit/list')
        .then((res:AxiosResponse) => {
          loading.value = false
          handleMeasurementUnit(res.data.result)
        }).catch((err) => {
          console.log(err)
          loading.value = false
        })
    }

    const handleAdd = () => {
      measureUnitId.value = ''
      save_type.value = 'add'
      drawer.value = true
    }

    const handleCloseDrawer = () => {
      drawer.value = false
    }

    const handleDelete = () => {
      AxiosApi.delete(`measureUnit/delete?id=${measureUnitId.value}`)
        .then((res) => {
          dialogVisible2.value = false
          success('删除成功！')
          LoadMeasurementUnit()
        })
        .catch((err) => {
          console.log(err)
          dialogVisible2.value = false
          error('删除失败！')
        })
    }

    onMounted(() => {
      LoadMeasurementUnit()
    })
    return {
      drawer,
      handleClick,
      MeasurementUnitData,
      measureUnitId,
      LoadMeasurementUnit,
      handleCloseDrawer,
      handleAdd,
      save_type,
      handleDelete,
      dialogVisible2,
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

.table {
    max-width: 1480px;
}

</style>
