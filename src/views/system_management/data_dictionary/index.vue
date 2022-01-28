<template>
    <Card class="customer_card">
     <el-form :inline="true" class="demo-form-inline">
    <el-form-item class="encode" label="字典名称：">
     <el-input placeholder="请输入字典名称"></el-input>
    </el-form-item>
    <el-form-item class="encode" label="字典编号：">
      <el-input placeholder="请输入字典编号"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary"  class="query">查询</el-button>
      <el-button type="primary"  class="query" >重置</el-button>
    </el-form-item>
    </el-form>
    <div class="button_group">
       <el-button type="primary"  class="query">
         <el-icon><plus /></el-icon>&nbsp;添加
       </el-button>
       <el-button type="primary"  class="query" >
         <el-icon><download /></el-icon>&nbsp;导出
       </el-button>
       <el-button type="primary"  class="query">
         <el-icon><upload /></el-icon>&nbsp;导入
       </el-button>
       <el-button type="primary"  class="query" >
         <el-icon><refresh /></el-icon>&nbsp;刷新缓存
       </el-button>
       <el-button type="primary"  class="query" >
         <el-icon><brush /></el-icon>&nbsp;回收站
       </el-button>
    </div>
    <div class="body">
    <el-table class="tabel" :data="DataDictionary" border v-loading="loading">
    <el-table-column  label="ID" prop="sysDictHeaderId" width="120px" fixed />
    <el-table-column  label="字典名称" prop="dictName" width="275px" />
    <el-table-column  label="字典编号"  prop="dictCode" width="275px" />
    <el-table-column  label="描述" prop="description" width="490px" />
    <el-table-column fixed="right" label="操作" width="300px" type="index">
      <template v-slot="scope">
      <el-button type="text" size="small" @click="handleConfirm1(scope.row)"><el-icon><edit /></el-icon>编辑</el-button>
        <el-button type="text" size="small" @click="handleConfirm2(scope.row)" ><el-icon><setting /></el-icon>字典配置</el-button
        >
        <el-button type="text" size="small" @click="handleConfirm(scope.row)"><el-icon><delete /></el-icon>删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <template class="pagination" >
    <el-pagination 
      :page-size="10" 
      background="blue" 
      layout="prev, pager, next" 
      :total="total"
      v-model:currentPage="current_page"
      @current-change="handleCurrentChange"
    >
    </el-pagination>
  </template>
  </div>
  <el-drawer
    v-model="drawer"
    title="字典列表"
    :direction="direction"
    :before-close="handleClose"
    size="600px"
    destroy-on-close
  >
  <el-divider class="divider"></el-divider>
    <DataDictionaryList :dictData="aditData"/>
  </el-drawer>
   <el-dialog
    v-model="dialogVisible"
    title="提示"
    width="20%"
    destroy-on-close
  >
    <span class="confirm" v-loading="loading">确定删除此字段？</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleDetele"
          >确定</el-button
        >
      </span>
    </template>
  </el-dialog>
   <el-dialog
    v-model="dialogVisible2"
    title="编辑"
    width="600px"
    destroy-on-close
  >
    <el-form class="form1" :data="aditData">
    <el-form-item label="字典名称：" label-width="120px" required>
     <el-input placeholder="请输入字典名称" v-model="aditData.dictName"></el-input>
    </el-form-item>
    <el-form-item label="字典编号：" label-width="120px" required>
      <el-input placeholder="请输入字典编号" v-model="aditData.dictCode"></el-input>
    </el-form-item>
    <el-form-item label="描述：" label-width="120px">
      <el-input placeholder="请输入字典描述" v-model="aditData.description"></el-input>
    </el-form-item>
    </el-form>
     <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible2 = false">取消</el-button>
        <el-button type="primary" @click="handleAdit"
          >确定</el-button
        >
      </span>
    </template>
  </el-dialog>
    </Card>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { AxiosApi } from '../../../utils/api'
import { AxiosResponse } from 'axios'
import {
  Plus,
  Download,
  Upload,
  Refresh,
  Brush,
  Setting,
  Edit,
  Delete
} from '@element-plus/icons-vue'
import DataDictionaryList from '../../../components/system_manage/data_dictionary_list/index.vue'
import { ElMessage } from 'element-plus'

export default defineComponent({
  name:'DataDictionary',
  components:{
    Plus,
    Download,
    Upload,
    Refresh,
    Brush,
    DataDictionaryList,
    Setting,
    Edit,
    Delete
  },
  setup () {
    const DataDictionary = ref([])
    const dialogVisible = ref(false)
    const dialogVisible2 = ref(false)
    const total = ref(0)
    const aditData = ref({})
    const drawer = ref(false)
    const loading = ref(false)
    const current_page = ref(1)

    const loadDictionary = (val: number) :void => {
      loading.value = true
      AxiosApi.get(`sysdict/header/list?page=${val}&size=10`)
        .then((res:AxiosResponse) => {
          if (res.data?.result) {
            DataDictionary.value = res.data?.result.records
            total.value = res.data?.result.total
          }
          loading.value = false
        }).catch((err:any) => {
          console.log(err)
          loading.value = false
        })
    }

    const handleCurrentChange = (val: number) :void => {
      loadDictionary(val)
    }

    const handleAdit = () :void => {
      loading.value = true
      const data:any = aditData.value
      data.createTime = undefined
      data.updateTime = undefined
      AxiosApi.put('sysdict/header/update', JSON.stringify(data))
        .then((res) => {
          console.log(res)
          loadDictionary(current_page.value)
          loading.value = false
          dialogVisible2.value = false
          success('修改成功！')
        }).catch((err) => {
          console.log(err)
          loadDictionary(current_page.value)
          loading.value = false
          error('修改失败！')
        })
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

    const handleDetele = () :void => {
      loading.value = true
      const data:any = aditData.value
      AxiosApi.get(`sysdict/list?type=${data.dictCode}`)
        .then((res) => {
          if (res.data?.result[`${data.dictCode}`]?.length === 0 || !res.data?.result[`${data.dictCode}`]) {
            AxiosApi.delete(`sysdict/header/delete?headerid=${data?.sysDictHeaderId}`)
              .then((res) => {
                dialogVisible.value = false
                loadDictionary(current_page.value)
                loading.value = false
                success('删除成功！')
              }).catch((err) => {
                console.log(err)
                dialogVisible.value = false
                loading.value = false
                error('删除失败！')
              })
          } else {
            loading.value = false
            dialogVisible.value = false
            error('删除失败！请先确认该字段不包含任何值！')
          }
        }).catch((err) => {
          loading.value = false
          dialogVisible.value = false
          console.log(err)
          error('删除失败！请先确认该字段不包含任何值！')
        })
    }

    const handleConfirm1 = (row:any) :void => {
      aditData.value = row
      dialogVisible2.value = true
    }

    const handleConfirm = (row:any) :void => {
      aditData.value = row
      dialogVisible.value = true
    }

    const handleConfirm2 = (row:any) :void => {
      aditData.value = row
      drawer.value = true
    }

    onMounted(() => {
      loadDictionary(1)
    })
    return {
      DataDictionary,
      handleAdit,
      handleDetele,
      dialogVisible,
      handleConfirm,
      handleConfirm1,
      total,
      dialogVisible2,
      aditData,
      handleConfirm2,
      drawer,
      loading,
      current_page,
      handleCurrentChange
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
    width: 500px;
    margin-right: 30px;
    font-size: 14px;
    font-family: Arial;
    font-weight: bold;
}

.demo-form-inline {
    display: flex;
}

.button_group {
   display: flex;
}

.tabel {
  margin-top:20px;
  max-width: 1750px;
}

.pagination{
  margin-top: 40px;
  display: flex;
  justify-content: right;
}

.body {
  display: flex;
  flex-direction: column;
  max-width: 1750px;
}

.form1 {
  display: flex;
  flex-direction: column;
}

.divider {
  position: absolute;
  top: 30px;
  left: 0px;
}

</style>
