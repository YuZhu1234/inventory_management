<template>
    <div class="root">
        <el-form
            :label-position="right"
            label-width="100px"
            :model="formLabelAligns"
            style="max-width: 460px"
        >
            <el-form-item label="父级">
               <el-select v-model="formLabelAligns.pid" class="select" placeholder="请选择">
                    <el-option label="请选择" :value="0"></el-option>
                    <div v-for="item in Warehousedata" :key="item.warehouseId">
                        <el-option :label="item.name" :value="item.warehouseId"></el-option>
                    </div>
                </el-select>
            </el-form-item>
            <el-form-item label="编码" required>
                <el-input v-model="formLabelAligns.code"></el-input>
            </el-form-item>
            <el-form-item label="名称">
                <el-input v-model="formLabelAligns.name"></el-input>
            </el-form-item>
            <el-form-item label="电话">
               <el-input v-model="formLabelAligns.phone"></el-input>
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
  name:'Responsitorylist',
  props: {
    WarehouseId:{
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
        isBased: null,
        isEnabled: null,
        warehouseId: '',
        name: '',
        remark:'',
        pid: '',
        updateBy: '',
        updateTime: null,
        version: null
      }
    })
    const dialogVisible = ref(false)
    const Warehousedata = ref([{}])

    const success = (message:string) => {
      ElMessage({
        message: message,
        type: 'success'
      })
    }

    const error = (message:string) => {
      ElMessage.error(message)
    }

    const loadMarehouse = () => {
      AxiosApi.get(`warehouse/find?id=${props.WarehouseId}`)
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
        AxiosApi.put('warehouse/update', JSON.stringify(formLabelAlign.formLabelAligns))
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
      } else if (props.edit_type === 'add') {
        AxiosApi.post('warehouse/add', JSON.stringify(formLabelAlign.formLabelAligns))
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

    const loadMarehousedata = () => {
      AxiosApi.get('warehouse/list')
        .then((res:AxiosResponse) => {
          Warehousedata.value = res.data.result
        }).catch((err) => {
          console.log(err)
          error('获取仓库信息失败!')
        })
    }

    onMounted(() => {
      if (props.edit_type === 'edit') {
        loadMarehouse()
      }
      loadMarehousedata()
    })
    return {
      ...toRefs(formLabelAlign),
      handleSave,
      dialogVisible,
      Warehousedata
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
