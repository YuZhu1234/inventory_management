<template>
    <Card class="customer_card">
        <el-form :inline="true" class="demo-form-inline">
            <el-form-item label="编码" class="encode">
              <el-input placeholder="请输入编码" v-model="searchCode"></el-input>
            </el-form-item>
            <el-form-item label="名称" class="encode">
              <el-input placeholder="请输入编码" v-model="searchName"></el-input>
            </el-form-item>
            <el-form-item  class="encode" label="物料分类">
               <el-select v-model="classificationSelect" class="select" placeholder="请选择">
                  <el-option label="请选择" :value="0"></el-option>
                  <div v-for="(item, index) in materialClassificationData" :key="index">
                      <el-option :label="item.name" :value="item.materialCategoryId"></el-option>
                  </div>
                </el-select>
            </el-form-item>
            <el-form-item class="buttongroup">
              <el-button type="primary" class="button" @click="onQuery"><el-icon><search /></el-icon>&nbsp;查询</el-button>
              <el-button type="primary" class="button" @click="refresh"><el-icon><refresh /></el-icon>&nbsp;重置</el-button>
            </el-form-item>
       </el-form>
       <div class="header">
            <el-button type="text" class="header_button" @click="handleAdd"><el-icon><plus /></el-icon>&nbsp;新增</el-button>
            <!-- <el-button type="text" class="header_button"><el-icon><download /></el-icon>&nbsp;导出</el-button>
            <el-button type="text" class="header_button"><el-icon><upload /></el-icon>&nbsp;导入</el-button> -->
       </div>
       <el-table 
         :data="MateriaData" 
         highlight-current-row="true" 
         border 
         header-row-style="color:black" 
         style="border: 1px solid rgb(245,244,245)"
         v-loading="loading"
        >
        <el-table-column fixed type="index" label="#" width="55" />
        <el-table-column fixed prop="code" label="编码" width="200" />
        <el-table-column fixed prop="name" label="名称" width="200"/>
        <el-table-column prop="categoryName" label="分类" width="200" />
        <el-table-column prop="model" label="规格型号" width="200" />
        <el-table-column prop="unitName" label="计量单位" width="200" />
        <el-table-column prop="isEnabled" label="是否启用" width="200" >
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
        <el-table-column prop="remark" label="备注" width="200" />
        <el-table-column fixed="right" label="操作" width="120">
          <template v-slot="scope">
            <el-button type="text" size="small" @click="handleClick(scope.row.materialId, 'edit')">编辑</el-button
            >
            <el-divider direction="vertical"></el-divider>
            <el-dropdown>
              <el-button type="text" size="small">更多<el-icon><arrow-down /></el-icon></el-button>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item @click="handleClick(scope.row.materialId, 'delete')">删除</el-dropdown-item>
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
          class="el-drawer"
        >
        <el-divider class="divider"></el-divider>
        <div class="overflowAuto">
          <Materiallist 
            :MateriaId="MateriaId"
            :edit_type="edit_type"
            :handleCloseDrawer="handleCloseDrawer"
            :loadMateriaData="loadMateriaData"
          />
        </div>
      </el-drawer>
       <el-dialog
        v-model="dialogVisible2"
        title="提示"
        width="20%"
        destroy-on-close
      >
    <span class="confirm">确定删除此物料数据？</span>
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
  Refresh,
  Search,
  Plus,
  Download,
  Upload,
  ArrowDown
} from '@element-plus/icons-vue'
import Materiallist from './materiallist.vue'
import { AxiosApi } from '../../../utils/api'
import { AxiosResponse } from 'axios'
import { ElMessage } from 'element-plus'

export default defineComponent({
  name:'Materia',
  components:{
    Plus,
    // Download,
    // Upload,
    ArrowDown,
    Materiallist,
    Refresh,
    Search
  },
  setup () {
    const MateriaData = ref([{}])
    const drawer = ref(false)
    const MateriaId = ref('')
    const edit_type = ref('')
    const dialogVisible2 = ref(false)
    const materialClassificationData = ref([{}])
    const classificationSelect = ref(null)
    const searchCode = ref('')
    const searchName = ref('')
    const current_page = ref(1)
    const total = ref(0)
    const loading = ref(false)

    const handleCurrentChange = (val: number) :void => {
      current_page.value = val
      loadMateriaData(val)
    }

    const handleClick = (materiaId:string, type:string) :void => {
      if (type === 'edit') {
        drawer.value = true
        MateriaId.value = materiaId
        edit_type.value = 'edit'
      } else if (type === 'delete') {
        dialogVisible2.value = true
        MateriaId.value = materiaId
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

    const refresh = () => {
      loadMateriaData(1)
      searchName.value = ''
      searchCode.value = ''
      classificationSelect.value = null
    }

    const onQuery = () => {
      console.log(searchCode.value, searchName.value, classificationSelect.value)
      AxiosApi.get(`material/list?${searchCode.value && `code=${searchCode.value}`}${searchName.value && `&name=${searchName.value}`}${classificationSelect.value !== null ? `&categoryId=${classificationSelect.value}` : ''}`)
        .then((res:AxiosResponse) => {
          MateriaData.value = res.data.result
        }).catch((err) => {
          console.log(err)
        })
    }

    const handleDelete = () => {
      AxiosApi.delete(`material/delete?id=${MateriaId.value}`)
        .then((res) => {
          success('删除成功！')
          dialogVisible2.value = false
          loadMateriaData(1)
        })
        .catch((err) => {
          error('删除失败！')
          dialogVisible2.value = false
          console.log(err)
        })
    }

    const LoadMeasurementUnitlist = () => {
      AxiosApi.get('materialCategory/list')
        .then((res:AxiosResponse) => {
          materialClassificationData.value = res.data.result
        }).catch((err) => {
          console.log(err)
        })
    }

    const loadMateriaData = (page:number) => {
      loading.value = true
      AxiosApi.get(`material/list?pageNum=${page}&pageSize=10`)
        .then((res:AxiosResponse) => {
          MateriaData.value = res.data.result
          loading.value = false
          console.log(res)
        }).catch((err:any) => {
          console.log(err)
          loading.value = false
          error('获取物料信息失败!')
        })
    }

    onMounted(() => {
      loadMateriaData(1)
      LoadMeasurementUnitlist()
    })
    return {
      drawer,
      handleClick,
      MateriaData,
      MateriaId,
      handleAdd,
      edit_type,
      handleCloseDrawer,
      dialogVisible2,
      handleDelete,
      loadMateriaData,
      materialClassificationData,
      classificationSelect,
      onQuery,
      refresh,
      searchCode,
      searchName,
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
  min-width: 1090px;
}

.demo-form-inline {
  display: flex;
  justify-content: space-between;
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

.divider {
  position: absolute;
  top: 30px;
  left: 0px;
}

.el-drawer {
  background: rebeccapurple!important;
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
  color: black !important;
}

</style>
