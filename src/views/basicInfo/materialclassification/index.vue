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
      基础数据 > 物料分类
      </div>
       <div class="header">
            <el-button type="text" class="header_button" @click="handleClick('none', 'add')"><el-icon><plus /></el-icon>&nbsp;新增</el-button>
            <!-- <el-button type="text" class="header_button"><el-icon><download /></el-icon>&nbsp;导出</el-button>
            <el-button type="text" class="header_button"><el-icon><upload /></el-icon>&nbsp;导入</el-button> -->
       </div>
       <el-table 
         :data="materialClassificationData"
         highlight-current-row="true" 
         header-row-style="color:black" 
         style="border: 1px solid rgb(245,244,245); max-width:1690px"
         row-key="materialCategoryId"
         v-loading="loading"
        >
        <el-table-column fixed type="selection" sortable width="55" />
        <el-table-column fixed prop="name" sortable label="名称" width="300"/>
        <el-table-column fixed prop="code" sortable label="编码" width="300" />
        <el-table-column prop="fullname" sortable label="全名" width="300" />
        <el-table-column prop="isEnabled" sortable label="是否启用" width="300" >
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
        <el-table-column fixed="right" label="操作" width="200">
          <template v-slot="scope">
            <el-button type="text" size="small" @click="handleClick(scope.row.materialCategoryId, 'edit')">编辑</el-button>
            <el-divider direction="vertical"></el-divider>
            <el-dropdown>
              <el-button type="text" size="small">更多<el-icon><arrow-down /></el-icon></el-button>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item @click="handleClick(scope.row.materialCategoryId, 'subordinate')">添加下级</el-dropdown-item>
                  <el-dropdown-item @click="handleClick(scope.row.materialCategoryId, 'delete')">删除</el-dropdown-item>
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
          <MateriaClassificationlist 
            :MaterialCategoryId="MaterialCategoryId" 
            :loadMarehousedata="loadMarehousedata" 
            :handleCloseDrawer="handleCloseDrawer"
            :edit_type="edit_type"
          />
        </div>
      </el-drawer>
      <el-dialog
        v-model="dialogVisible2"
        title="提示"
        width="400px"
        destroy-on-close
      >
    <span class="confirm">确定删除此物料分类<span style="color:red">(包括其以下层次所有物料)</span>？</span>
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
import { AxiosApi } from '../../../utils/api'
import { AxiosResponse } from 'axios'
import { ElMessage } from 'element-plus'
import MateriaClassificationlist from './materiaclassificationlist.vue'

export default defineComponent({
  name:'MaterialClassification',
  components:{
    Plus,
    // Download,
    // Upload,
    ArrowDown,
    MateriaClassificationlist
  },
  setup () {
    const materialClassificationData = ref([{}])
    const MaterialCategoryId = ref('')
    const drawer = ref(false)
    const dialogVisible2 = ref(false)
    const edit_type = ref('')
    const loading = ref(false)

    const success = (message:string) => {
      ElMessage({
        message: message,
        type: 'success'
      })
    }

    const error = (message:string) => {
      ElMessage.error(message)
    }

    const handleClick = (materialCategoryId:string, type:string) => {
      if (type === 'edit') {
        MaterialCategoryId.value = materialCategoryId
        edit_type.value = 'edit'
        drawer.value = true
      } else if (type === 'delete') {
        MaterialCategoryId.value = materialCategoryId
        dialogVisible2.value = true
      } else if (type === 'add') {
        MaterialCategoryId.value = ''
        edit_type.value = 'add'
        drawer.value = true
      } else if (type === 'subordinate') {
        MaterialCategoryId.value = materialCategoryId
        edit_type.value = 'subordinate'
        drawer.value = true
      }
    }

    const handleDelete = () => {
      AxiosApi.delete(`materialCategory/delete?id=${MaterialCategoryId.value}`)
        .then((res) => {
          dialogVisible2.value = false
          success('删除成功！')
          loadMarehousedata()
        })
        .catch((err) => {
          console.log(err)
          dialogVisible2.value = false
          error('删除失败！')
        })
    }

    const handleCloseDrawer = () => {
      drawer.value = false
    }

    const handleClassification = (Classification:any) => {
      loading.value = true
      let datalist:any[] = []
      const a = Classification?.filter((item:any) => {
        return item.pid === 0
      })
      datalist = a
      const findChildren = (list:any) => {
        for (let i = 0; i < list.length; i++) {
          const b = list.map((d:any, id:number) => {
            const c = Classification?.filter((item:any) => {
              return item.pid === d.materialCategoryId
            })
            if (c.length > 0) {
              findChildren(c) // 采用递归算法进行树的查找
            }
            list[id].children = c
          })
        }
      }
      findChildren(datalist)
      materialClassificationData.value = datalist
      loading.value = false
    }

    const loadMarehousedata = () => {
      loading.value = true
      AxiosApi.get('materialCategory/list')
        .then((res:AxiosResponse) => {
          loading.value = false
          handleClassification(res.data.result)
        }).catch((err) => {
          console.log(err)
          error('获取物料分类信息失败!')
          loading.value = false
        })
    }

    onMounted(() => {
      loadMarehousedata()
    })
    return {
      materialClassificationData,
      drawer,
      dialogVisible2,
      handleClick,
      handleDelete,
      edit_type,
      handleCloseDrawer,
      MaterialCategoryId,
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

.encode {
    margin-right: 100px!important;
}

.demo-form-inline {
    display: flex;
    justify-content: left;
}

.divider {
  position: absolute;
  top: 30px;
  left: 0px;
}

.header {
  display: flex;
  justify-content: left;
  margin-bottom: 20px;
}

.header_button {
  margin-left: 50px;
  margin-right: 50px;
  font-weight: bold;
}

.pagination{
  margin-top: 40px;
  display: flex;
  justify-content: right;
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
