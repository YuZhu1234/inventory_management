<template>
    <div class="root">
        <el-form
            :label-position="right"
            label-width="100px"
            :model="formLabelAligns"
            style="max-width: 460px"
        >
            <el-form-item label="父节点">
                <el-select v-model="formLabelAligns.pid" class="select" placeholder="请选择" :disabled="disabled">
                    <el-option label="请选择" :value="0"></el-option>
                    <div v-for="item in ClassificationList" :key="item.materialCategoryId">
                        <el-option :label="item.name" :value="item.materialCategoryId"></el-option>
                    </div>
                </el-select>
            </el-form-item>
            <el-form-item label="名称" required>
                <el-input v-model="formLabelAligns.name"></el-input>
            </el-form-item>
            <el-form-item label="编码" re >
                <el-input v-model="formLabelAligns.code"></el-input>
            </el-form-item>
            <el-form-item label="全名">
               <el-input v-model="formLabelAligns.fullname"></el-input>
            </el-form-item>
            <el-form-item label="是否启用" required>
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
  name:'MateriaClassificationlist',
  props: {
    MaterialCategoryId:{
      type:Number,
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
    loadMarehousedata:{
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
        materialCategoryId: null,
        name: '',
        updateBy: '',
        updateTime: null,
        version: null,
        fullname:'',
        unitId:'',
        pid:0,
        code:''
      }
    })
    const dialogVisible = ref(false)
    const ClassificationList = ref([{}])
    const disabled = ref(false)

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
      if (props.edit_type === 'edit') {
        AxiosApi.put('materialCategory/update', JSON.stringify(formLabelAlign.formLabelAligns))
          .then((res) => {
            props.handleCloseDrawer()
            dialogVisible.value = false
            props.loadMarehousedata()
            success('修改成功！')
          })
          .catch((err) => {
            console.log(err)
            dialogVisible.value = false
            props.handleCloseDrawer()
            error('修改失败！')
          })
      } else if (props.edit_type === 'add' || props.edit_type === 'subordinate') {
        AxiosApi.post('materialCategory/add', JSON.stringify(formLabelAlign.formLabelAligns))
          .then((res) => {
            props.handleCloseDrawer()
            dialogVisible.value = false
            props.loadMarehousedata()
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

    const loadMaterialist = () => {
      AxiosApi.get(`materialCategory/find?id=${props.MaterialCategoryId}`)
        .then((res) => {
          formLabelAlign.formLabelAligns = res.data.result
        })
        .catch((err) => {
          console.log(err)
          error('获取物料分类信息失败！')
        })
    }

    const LoadMaterialClassificationlist = () => {
      AxiosApi.get('materialCategory/list')
        .then((res:AxiosResponse) => {
          ClassificationList.value = res.data.result
        }).catch((err) => {
          console.log(err)
          error('获取物料分类信息失败!')
        })
    }

    onMounted(() => {
      if (props.edit_type === 'edit') {
        loadMaterialist()
      } else if (props.edit_type === 'subordinate') {
        formLabelAlign.formLabelAligns.pid = props.MaterialCategoryId
        disabled.value = true
      }
      LoadMaterialClassificationlist()
    })
    return {
      ...toRefs(formLabelAlign),
      handleSave,
      dialogVisible,
      ClassificationList,
      disabled
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
