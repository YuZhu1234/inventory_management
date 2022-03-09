<template>
    <div class="root">
        <el-form
            :label-position="right"
            label-width="100px"
            :model="formLabelAligns"
            style="max-width: 460px"
        >
            <el-form-item label="编码">
               <el-input v-model="formLabelAligns.code"></el-input>
            </el-form-item>
            <el-form-item label="名称">
                <el-input v-model="formLabelAligns.name"></el-input>
            </el-form-item>
            <el-form-item label="分类">
                <el-input v-model="formLabelAligns.categoryId"></el-input>
            </el-form-item>
            <el-form-item label="计量单位">
               <el-input v-model="formLabelAligns.model"></el-input>
            </el-form-item>
            <el-form-item label="销售价格">
                <el-input v-model="formLabelAligns.model"></el-input>
            </el-form-item>
            <el-form-item label="税控编码">
                <el-input v-model="formLabelAligns.model"></el-input>
            </el-form-item>
            <el-form-item label="是否启用">
                <el-select v-model="formLabelAligns.isEnabled" class="select">
                   <el-option label="启用" :value='1' ></el-option>
                   <el-option label="禁用" :value='0' ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="备注">
                <el-input v-model="formLabelAligns.remark"></el-input>
            </el-form-item>
            <el-form-item label="创建人" >
               <el-input v-model="formLabelAligns.createBy" disabled></el-input>
            </el-form-item>
            <el-form-item label="创建时间">
                <el-input v-model="formLabelAligns.createTime" disabled></el-input>
            </el-form-item>
            <el-form-item label="修改人">
                <el-input v-model="formLabelAligns.updateBy" disabled></el-input>
            </el-form-item>
            <el-form-item label="修改时间">
                <el-input v-model="formLabelAligns.updateTime" disabled></el-input>
            </el-form-item>
        </el-form>
        <div class="footer">
            <el-button @click="handleCloseDrawer">取消</el-button>
            <el-button type="primary" @click="handleSave">确定</el-button>
        </div>
         <el-dialog
            v-model="dialogVisible"
            title="提示"
            width="20%"
            destroy-on-close
        >
            <span class="confirm">确定保存修改？</span>
            <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="handleSave"
                >确定</el-button
                >
            </span>
            </template>
        </el-dialog>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref, toRefs } from 'vue'
import { AxiosApi } from '../../../utils/api'
import { AxiosResponse } from 'axios'
import { ElMessage } from 'element-plus'

export default defineComponent({
  name:'Materiallist',
  props: {
    MateriaId:{
      type:String,
      required:true
    },
    edit_type:{
      type:String,
      required:true
    },
    handleCloseDrawer:{
      type:Function,
      required:true
    },
    loadMateriaData:{
      type:Function,
      required:true  
    }
  },
  setup (props, context) {
    const formLabelAlign = reactive({
      formLabelAligns:{
        createBy: '',
        createTime: null,
        isEnabled: null,
        materialId: '',
        name: '',
        remark:'',
        updateBy: '',
        updateTime: null,
        version: null,
        categoryId:'',
        unitId:''
      }
    })
    const dialogVisible = ref(false)

    const success = (message:string) => {
      ElMessage({
        message: message,
        type: 'success'
      })
    }

    const error = (message:string) => {
      ElMessage.error(message)
    }

    const loadMaterialist = () => {
      AxiosApi.get(`material/find?id=${props.MateriaId}`)
        .then((res) => {
          formLabelAlign.formLabelAligns = res.data.result
        })
        .catch((err) => {
          console.log(err)
          error('获取仓库信息失败！')
        })
    }

    const handleSave = () => {
      if (props.edit_type === 'edit') {
        AxiosApi.put('material/update', JSON.stringify(formLabelAlign.formLabelAligns))
          .then((res) => {
            props.handleCloseDrawer()
            dialogVisible.value = false
            props.loadMateriaData()
            success('修改成功！')
          })
          .catch((err) => {
            console.log(err)
            dialogVisible.value = false
            props.handleCloseDrawer()
            error('修改失败！')
          })
      } else if (props.edit_type === 'add') {
        AxiosApi.post('material/add', JSON.stringify(formLabelAlign.formLabelAligns))
          .then((res) => {
            props.handleCloseDrawer()
            dialogVisible.value = false
            props.loadMateriaData()
            success('添加成功！') 
          })
          .catch((err) => {
            console.log(err)
            dialogVisible.value = false
            props.handleCloseDrawer()
            error('添加失败！')
          })
      }
    }

    onMounted(() => {
      if (props.edit_type === 'edit') {
        loadMaterialist()
      }
    })
    return {
      ...toRefs(formLabelAlign),
      handleSave,
      dialogVisible
    }
  }
})
</script>

<style scoped>
.root {
  height: 100%;
  overflow: scroll;
}

.select {
  width: 360px;
}

.footer {
  margin-top: 30px;
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

</style>
