<template>
    <div class="root">
        <el-form
            :label-position="right"
            label-width="100px"
            :model="formLabelAligns"
            style="max-width: 460px"
        >
            <el-form-item label="批号" required>
                <el-input v-model="formLabelAligns.batchNo"></el-input>
            </el-form-item>
            <el-form-item label="仓库" required>
                <el-input v-model="formLabelAligns.warehouseName"></el-input>
            </el-form-item>
            <el-form-item label="物料" required >
                <el-input v-model="formLabelAligns.materialName"></el-input>
            </el-form-item>
            <el-form-item label="计量单位" required>
               <el-input v-model="formLabelAligns.materialName"></el-input>
            </el-form-item>
            <el-form-item label="数量" required>
                <el-input v-model="formLabelAligns.qty"></el-input>
            </el-form-item>
            <el-form-item label="成本" required>
                <el-input v-model="formLabelAligns.cost"></el-input>
            </el-form-item>
            <el-form-item label="单供应商" required>
                <el-select v-model="formLabelAligns.isSingleSupplier" class="select">
                   <el-option label="是" :value='1' ></el-option>
                   <el-option label="否" :value='0' ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="供应商" >
              <el-input v-model="formLabelAligns.supplierName"></el-input>
                <!-- <el-select v-model="formLabelAligns.isEnabled" class="select">
                   <el-option label="是" :value='1' ></el-option>
                   <el-option label="否" :value='0' ></el-option>
                </el-select> -->
            </el-form-item>
            <el-form-item label="是否关闭" required>
                <el-select v-model="formLabelAligns.isClosed" class="select">
                   <el-option label="是" :value='1' ></el-option>
                   <el-option label="否" :value='0' ></el-option>
                </el-select>
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
            <el-button @click="handleClose">取消</el-button>
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
    batchNo:{
      type:String,
      required:true
    },
    warehouseId:{
      type:String,
      required:true
    },
    materialId:{
      type:String,
      required:true
    },
    edit_type:{
      type:String,
      required:true
    },
    handleClose:{
      type:Function,
      required:true
    },
    loadRealtimeInventorylist:{
      type:Function,
      required:true  
    }
  },
  setup (props, context) {
    const formLabelAlign = reactive({
      formLabelAligns:{
        batchNo: '',
        cost: null,
        createBy: '',
        createTime: '',
        discontinuedDate: null,
        inventoryId: null,
        isClosed: null,
        isSingleSupplier: null,
        materialId: null,
        materialName: '',
        modifiedDate: null,
        qty: null,
        safetyStockLevel: null,
        sellEndDate: null,
        sellStartDate: null,
        supplierId: null,
        supplierName: '',
        sysOrgCode: '',
        updateBy: '',
        updateTime: '',
        warehouseId: null,
        warehouseName: ''
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
            props.handleClose()
            dialogVisible.value = false
            props.loadRealtimeInventorylist()
            success('修改成功！')
          })
          .catch((err) => {
            console.log(err)
            dialogVisible.value = false
            props.handleClose()
            error('修改失败！')
          })
      } else if (props.edit_type === 'add' || props.edit_type === 'subordinate') {
        AxiosApi.post('materialCategory/add', JSON.stringify(formLabelAlign.formLabelAligns))
          .then((res) => {
            props.handleClose()
            dialogVisible.value = false
            props.loadRealtimeInventorylist()
            success('添加成功！')
          })
          .catch((err) => {
            console.log(err)
            dialogVisible.value = false
            props.handleClose()
            error('添加失败！')
          })
      }
    }

    const loadMaterialist = () => {
      AxiosApi.get(`inventory/list?batchNo=${props.batchNo}&materialId=${props.materialId}&warehouseId=${props.warehouseId}`)
        .then((res) => {
          console.log(res)
          formLabelAlign.formLabelAligns = res.data.result[0]
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
        // formLabelAlign.formLabelAligns.pid = props.inventory
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
