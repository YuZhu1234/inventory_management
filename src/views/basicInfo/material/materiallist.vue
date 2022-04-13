<template>
    <div class="root">
        <el-form
            :label-position="right"
            label-width="100px"
            :model="formLabelAligns"
            style="max-width: 460px"
        >
            <el-form-item label="编码" required>
               <el-input v-model="formLabelAligns.code"></el-input>
            </el-form-item>
            <el-form-item label="名称" required>
                <el-input v-model="formLabelAligns.name"></el-input>
            </el-form-item>
            <el-form-item label="分类" required>
                <el-select v-model="formLabelAligns.categoryId" class="select" placeholder="请选择">
                    <el-option label="请选择" :value="0"></el-option>
                    <div v-for="(item, index) in materialClassificationData" :key="index">
                        <el-option :label="item.name" :value="item.materialCategoryId"></el-option>
                    </div>
                </el-select>
            </el-form-item>
             <el-form-item label="规格型号">
                <el-input v-model="formLabelAligns.model"></el-input>
            </el-form-item>
            <el-form-item label="计量单位" required>
               <el-select v-model="formLabelAligns.unitId" class="select" placeholder="请选择">
                    <el-option label="请选择" :value="0"></el-option>
                    <div v-for="(item, index) in MeasurementUnitData" :key="index">
                        <el-option :label="item.name" :value="item.measureUnitId"></el-option>
                    </div>
                </el-select>
            </el-form-item>
            <el-form-item label="是否启用" required>
                <el-select v-model="formLabelAligns.isEnabled" class="select" placeholder="请选择">
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
            <el-button type="primary" @click="handleConfirm">确定</el-button>
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
        isEnabled: 0,
        materialId: '',
        name: '',
        remark:'',
        updateBy: '',
        updateTime: null,
        version: null,
        categoryId: 0,
        categoryName:'',
        unitId:0,
        unitName:'',
        code:'',
        model:''
      }
    })
    const dialogVisible = ref(false)
    const MeasurementUnitData = ref([{}])
    const materialClassificationData = ref([{}])

    const success = (message:string) => {
      ElMessage({
        message: message,
        type: 'success'
      })
    }

    const error = (message:string) => {
      ElMessage.error(message)
    }

    const handleConfirm = () => {
      if (formLabelAlign.formLabelAligns.code === '' || formLabelAlign.formLabelAligns.name === '' || formLabelAlign.formLabelAligns.unitId === 0 || formLabelAlign.formLabelAligns.categoryId === 0) {
        error('请确认所有必选项均选择或填写！')
        return
      }
      dialogVisible.value = true
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
            props.loadMateriaData(1)
            success('修改成功！')
          })
          .catch((err) => {
            console.log(err)
            dialogVisible.value = false
            props.handleCloseDrawer()
            error('修改失败！')
          })
      } else if (props.edit_type === 'add') {
        const data = {
          code: formLabelAlign.formLabelAligns.code,
          createBy: 'test',
          categoryId:formLabelAlign.formLabelAligns.categoryId,
          categoryName: '',
          isEnabled: formLabelAlign.formLabelAligns.isEnabled,
          materialId: 0,
          model:formLabelAlign.formLabelAligns.model,
          name: formLabelAlign.formLabelAligns.name,
          remark: formLabelAlign.formLabelAligns.remark,
          unitId:formLabelAlign.formLabelAligns.unitId,
          unitName:'s',
          updateBy: formLabelAlign.formLabelAligns.updateBy,
          version: 0
        }
        AxiosApi.post('material/add', JSON.stringify(data))
          .then((res) => {
            props.handleCloseDrawer()
            dialogVisible.value = false
            props.loadMateriaData(1)
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

    const LoadMeasurementUnitlist = () => {
      AxiosApi.get('measureUnit/list')
        .then((res:AxiosResponse) => {
          MeasurementUnitData.value = res.data.result
        }).catch((err) => {
          console.log(err)
        })
    }

    const loadMarehousedata = () => {
      AxiosApi.get('materialCategory/list')
        .then((res:AxiosResponse) => {
          materialClassificationData.value = res.data.result
        }).catch((err) => {
          console.log(err)
          error('获取物料分类信息失败!')
        })
    }

    onMounted(() => {
      if (props.edit_type === 'edit') {
        loadMaterialist()
      }
      LoadMeasurementUnitlist()
      loadMarehousedata()
    })
    return {
      ...toRefs(formLabelAlign),
      handleSave,
      dialogVisible,
      MeasurementUnitData,
      materialClassificationData,
      handleConfirm
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

.el-input.is-disabled .el-input__inner{
  color: black !important;;
}

</style>
