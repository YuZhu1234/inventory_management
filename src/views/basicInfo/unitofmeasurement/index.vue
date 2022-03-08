<template>
    <Card class="customer_card">
      <div class="header">
        <el-button type="text" class="header_button"><el-icon><plus /></el-icon>&nbsp;新增</el-button>
        <el-button type="text" class="header_button"><el-icon><download /></el-icon>&nbsp;导出</el-button>
        <el-button type="text" class="header_button"><el-icon><upload /></el-icon>&nbsp;导入</el-button>
      </div>
       <el-table
      :data="MeasurementUnitData"
      style="border: 1px solid rgb(245,244,245)"
      class="table"
      highlight-current-row="true"
      row-key="measureUnitId"
    >
       <el-table-column type="selection" sortable width="55" />
        <el-table-column fixed prop="name" sortable label="名称" width="600"/>
        <el-table-column  prop="symbol" sortable label="符号" width="200" />
        <el-table-column prop="factor" label="换算系数" sortable width="200" />
        <el-table-column prop="isEnabled" label="是否启用" sortable width="200" >
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
          <template #default>
            <el-button type="text" size="small" @click="handleClick">编辑</el-button>
            <el-divider direction="vertical"></el-divider>
             <el-dropdown>
              <el-button type="text" size="small">更多<el-icon><arrow-down /></el-icon></el-button>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>删除</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </template>
        </el-table-column>
    </el-table>
      <!-- <el-table :data="tableData" highlight-current-row="true" header-row-style="color:black" style="border: 1px solid rgb(245,244,245)">
        <el-table-column fixed type="selection" width="55" />
        <el-table-column fixed prop="date" label="名称" width="150"/>
        <el-table-column fixed prop="name" label="编码" width="300" />
        <el-table-column prop="state" label="电话" width="300" />
        <el-table-column prop="city" label="是否启用" width="120" />
        <el-table-column prop="address" label="备注" width="600" />
        <el-table-column fixed="right" label="操作" width="120">
          <template #default>
            <el-button type="text" size="small" @click="handleClick">编辑</el-button>
            <el-divider direction="vertical"></el-divider>
             <el-dropdown>
              <el-button type="text" size="small">更多<el-icon><arrow-down /></el-icon></el-button>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>删除</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table> -->
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
          <unitofmeasurementlist />
      </el-drawer>
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

export default defineComponent({
  name:'unitofmeasurement',
  components:{
    Plus,
    Download,
    Upload,
    ArrowDown,
    unitofmeasurementlist
  },
  setup () {
    const tableData = [
      {
        createBy: 'admin',
        createTime: '2020-03-24',
        factor: 1,
        isBased: 1,
        isEnabled: 1,
        measureUnitId: '1242301004380692481',
        name: '米',
        pid: '0',
        symbol: 'm',
        updateBy: null,
        updateTime: null,
        version: null,
        children:[
          {
            createBy: 'admin',
            createTime: '2020-03-24',
            factor: 0.01,
            isBased: 1,
            isEnabled: 1,
            measureUnitId: '1242301191434067970',
            name: '厘米',
            pid: '1242301004380692481',
            symbol: 'cm',
            updateBy: 'admin',
            updateTime: '2021-11-22',
            version: null
          },
          {             
            createBy: 'admin',
            createTime: '2020-03-25',
            factor: 1000,
            isBased: 0,
            isEnabled: 1,
            measureUnitId: '1242647149539823618',
            name: '千米',
            pid: '1242301004380692481',
            symbol: 'km',
            updateBy: 'admin',
            updateTime: '2020-03-25',
            version: null
          }
        ]
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
            tag: 'Home',
            children: [
              {
                id: 211,
                date: '2-1-1',
                name: 'Tom',
                state: 'California',
                city: 'Los Angeles',
                address: 'No. 189, Grove St, Los Angeles',
                zip: 'CA 90036',
                tag: 'Home'
              },
              {
                id: 212,
                date: '2-1-2',
                name: 'Tom',
                state: 'California',
                city: 'Los Angeles',
                address: 'No. 189, Grove St, Los Angeles',
                zip: 'CA 90036',
                tag: 'Home'
              }
            ]
          },
          {
            id: 22,
            date: '2-2',
            name: 'Tom',
            state: 'California',
            city: 'Los Angeles',
            address: 'No. 189, Grove St, Los Angeles',
            zip: 'CA 90036',
            tag: 'Office',
            children:[
              {
                id: 221,
                date: '2-2-1',
                name: 'Tom',
                state: 'California',
                city: 'Los Angeles',
                address: 'No. 189, Grove St, Los Angeles',
                zip: 'CA 90036',
                tag: 'Home'
              }
            ]
          }
        ]
      }   
    ]
    const drawer = ref(false)
    const MeasurementUnitData = ref([{}])

    const handleClick = () :void => {
      drawer.value = true
      console.log(drawer.value)
    }

    const handleMeasurementUnit = (Measurement:any) => {
      let datalist:any[] = []
      const a = Measurement?.filter((item:any) => {
        return item.pid === '0'
      })
      datalist = a
      for (let i = 0; i < a.length; i++) {
        const b = datalist.map((d:any, id:number) => {
          const c = Measurement?.filter((item:any) => {
            return item.pid === d.measureUnitId
          })
          datalist[id].children = c
        })
      }
      MeasurementUnitData.value = datalist
    }

    const LoadMeasurementUnit = () => {
      AxiosApi.get('measureUnit/list')
        .then((res:AxiosResponse) => {
          handleMeasurementUnit(res.data.result)
        }).catch((err) => {
          console.log(err)
        })
    }

    onMounted(() => {
      LoadMeasurementUnit()
    })
    return {
      tableData,
      drawer,
      handleClick,
      MeasurementUnitData
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

.table {
    max-width: 1480px;
}

</style>
