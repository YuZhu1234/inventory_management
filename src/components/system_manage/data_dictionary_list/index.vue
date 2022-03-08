<template>
 <div class="root">
  <el-form :inline="true" class="demo-form-inline">
    <el-form-item class="encode" label="名称：">
     <el-input placeholder="请输入名称"></el-input>
    </el-form-item>
    <el-form-item class="encode" label="状态：">
      <el-select placeholder="请选择" class="option">
         <el-option label="启用" value=1 ></el-option>
         <el-option label="禁用" value=2 ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary"  class="query">搜索</el-button>
      <el-button type="primary"  class="query" >重置</el-button>
    </el-form-item>
  </el-form>
  <el-button type="primary"  class="add" @click="handleConfirm('no','add')">添加</el-button>
   <el-table class="tabel" border :data="MsgCategory" v-loading="loading">
        <el-table-column  label="名称" prop="itemText" width="160px" />
        <el-table-column  label="数据值" prop="itemValue" width="180px" />
        <el-table-column  label="操作" width="175px" type="index">
            <template v-slot="scope">
              <el-button type="text" size="small" @click="handleConfirm(scope.row,'edit')">编辑</el-button>
              &nbsp;&nbsp;&nbsp;|
              <el-button type="text" size="small" @click="handleConfirm(scope.row,'delete')">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
  </div>
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
    <el-form class="form1" :data="aditDatas" >
    <el-form-item label="名称：" label-width="120px" required>
     <el-input placeholder="请输入字典名称" v-model="aditDatas.itemText"></el-input>
    </el-form-item>
    <el-form-item label="数据值：" label-width="120px" required>
      <el-input placeholder="请输入字典编号" v-model="aditDatas.itemValue"></el-input>
    </el-form-item>
    <el-form-item label="描述：" label-width="120px">
      <el-input placeholder="请输入字典描述" v-model="aditDatas.description"></el-input>
    </el-form-item>
    <el-form-item label="排序值：" label-width="120px" class="input">
      <el-input class="input1" placeholder="排序值" v-model="aditDatas.sortOrder" type="number"></el-input>
    </el-form-item>
     <el-form-item label="是否启用：" label-width="120px" class="input">
          <el-switch v-model="status" inline-prompt active-text="启用" inactive-text="禁用"></el-switch>
    </el-form-item>
    </el-form>
     <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible2 = false">取消</el-button>
        <el-button type="primary" @click="handleSave"
          >确定</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref, toRefs } from 'vue'
import { AxiosApi } from '../../../utils/api'
import { AxiosResponse } from 'axios'
import { ElMessage } from 'element-plus'

export default defineComponent({
  name:'data_dictionary_list',
  props: {
    dictData:{
      type:Object,
      required:true
    }
  },
  setup (props, context) {
    const MsgCategory = ref([])
    const dialogVisible = ref(false)
    const aditData = reactive({
      aditDatas:{
        createBy: '',
        createTime: '',
        description: '',
        dictId: 0,
        itemText: '',
        itemValue: '',
        sortOrder: 0,
        status: 0,
        sysDictDetailId: 0,
        updateBy: '',
        updateTime: ''
      }
    })
    const edit_Data = ref('')
    const loading = ref(false)
    const dialogVisible2 = ref(false)
    const status = ref(true)
    const edit_type = ref('')

    const loadDict = () => {
      loading.value = true
      const name = props.dictData.dictCode
      AxiosApi.get(`sysdict/list?type=${props.dictData.dictCode}`)
        .then((res) => {
          if (res.data?.result[`${name}`]) {
            MsgCategory.value = res.data?.result[`${name}`]
          }
          loading.value = false
        }).catch((err) => {
          console.log(err)
          loading.value = false
        })
    }

    const handleConfirm1 = (row:any) :void => {
      aditData.aditDatas = row
      dialogVisible2.value = true
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
      loading.value = true
      const data:any = aditData.aditDatas
      data.status = data.status === true ? 1 : 0
      if (edit_type.value === 'edit') {
        AxiosApi.put('sysdict/detail/update', JSON.stringify(data))
          .then((res) => {
            console.log(res)
            loadDict()
            loading.value = false
            dialogVisible2.value = false
            success('修改成功！')
          }).catch((err) => {
            console.log(err)
            loadDict()
            loading.value = false
            error('修改失败！')
          })
      } else if (edit_type.value === 'add') {
        console.log('add')
      }
    }

    const handleDetele = () :void => {
      loading.value = true
      AxiosApi.delete(`sysdict/detail/delete?detailid=${edit_Data.value}`)
        .then((res) => {
          loading.value = false
          dialogVisible.value = false
          success('删除成功！')
          loadDict()
        }).catch((err) => {
          console.log(err)
          loading.value = false
          error('删除失败！')
        })
    }

    const AddData = () :void => {
      console.log('add')
    }

    const handleConfirm = (row:any, type:string) :void => {
      if (type === 'delete') {
        edit_type.value = 'delete'
        edit_Data.value = row.sysDictDetailId
        dialogVisible.value = true
      } else if (type === 'edit') {
        edit_type.value = 'edit'
        aditData.aditDatas = row
        dialogVisible2.value = true
      } else if (type === 'add') {
        edit_type.value = 'add'
        dialogVisible2.value = true
      }
    }

    onMounted(() => {
      loadDict()
    })
    return {
      MsgCategory,
      handleConfirm,
      handleConfirm1,
      dialogVisible,
      handleDetele,
      loading,
      dialogVisible2,
      edit_Data,
      handleSave,
      status,
      ...toRefs(aditData),
      AddData
    }
  }
})
</script>

<style scoped>
.encode{
  width: 170px;
  margin: 0;
}

.demo-form-inline {
  display: flex;
  width: 600px;
}

.root{
  display:flex;
  flex-direction:column;
  justify-content:left;
  border: 2px solid rgb(233,233,233);
  padding:20px;
}

.add{
    width:64px;
    margin-bottom:20px;
}

.form1 {
  display: flex;
  flex-direction: column;
}

.input {
  width:200px;
  display:flex;
}

.input1 {
  padding-right: 0px!important;
}

</style>
