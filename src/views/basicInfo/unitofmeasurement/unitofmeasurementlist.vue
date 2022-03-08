<template>
    <div class="root">
        <el-form
            :label-position="right"
            label-width="100px"
            :model="formLabelAligns"
            style="max-width: 460px"
        >
            <el-form-item label="名称" required>
               <el-input v-model="formLabelAligns.name"></el-input>
            </el-form-item>
            <el-form-item label="符号" required>
                <el-input v-model="formLabelAligns.symbol"></el-input>
            </el-form-item>
            <el-form-item label="基准单位">
                <el-select v-model="formLabelAligns.pid" class="select" placeholder="请选择">
                    <el-option label="请选择" value="0"></el-option>
                    <div v-for="item in MeasurementUnitData" :key="item.measureUnitId">
                        <el-option :label="item.name" :value="item.measureUnitId"></el-option>
                    </div>
                </el-select>
            </el-form-item>
            <el-form-item label="换算系数" required>
               <el-input v-model="formLabelAligns.factor"></el-input>
            </el-form-item>
            <el-form-item label="是否启用" required>
                <el-select v-model="formLabelAligns.isEnabled" class="select" placeholder="请选择">
                   <el-option label="启用" :value='1' ></el-option>
                   <el-option label="禁用" :value='0' ></el-option>
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
            <el-button @click="handleCloseDrawer">取消</el-button>
            <el-button type="primary" @click="handleConfirm" >确定</el-button>
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
  name:'UnitOfMeasurementlist',
  props: {
    measureUnitId:{
      type:String,
      required:true
    },
    LoadMeasurementUnit:{
      type:Function,
      required:true
    },
    handleCloseDrawer:{
      type:Function,
      required:true
    },
    save_type:{
      type:String,
      required:true
    }
  },
  setup (props, context) {
    const formLabelAlign = reactive({
      formLabelAligns: {
        createBy: '',
        createTime: null,
        factor: null,
        isBased: null,
        isEnabled: null,
        measureUnitId: '',
        name: '',
        pid: '',
        symbol: '',
        updateBy: '',
        updateTime: null,
        version: null
      }
    })
    const Reference_unit = ref('')
    const MeasurementUnitData = ref([{}])
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

    const loadMeasurementUnit = () => {
      AxiosApi.get(`measureUnit/find?id=${props.measureUnitId}`)
        .then((res) => {
          formLabelAlign.formLabelAligns = res.data.result
          console.log(formLabelAlign.formLabelAligns)
        })
        .catch((err) => {
          console.log(err)
        })
    }

    const handleSave = () => {
      if (props.save_type === 'edit') {
        AxiosApi.put('measureUnit/update', JSON.stringify(formLabelAlign.formLabelAligns))
          .then((res) => {
            props.handleCloseDrawer()
            dialogVisible.value = false
            props.LoadMeasurementUnit()
            success('修改成功！')
          })
          .catch((err) => {
            console.log(err)
            dialogVisible.value = false
            props.handleCloseDrawer()
            error('修改失败！')
          })
      } else if (props.save_type === 'add') {
        // const data = {
        //   'createBy': 'test',
        //   'factor': 0,
        //   'isBased': 0,
        //   'isEnabled': 0,
        //   'measureUnitId': formLabelAlign.formLabelAligns.ersion,
        //   'name': formLabelAlign.formLabelAligns.name,
        //   'pid': 'string',
        //   'symbol': formLabelAlign.formLabelAligns.symbol,
        //   'updateBy': 'test',
        //   'version': formLabelAlign.formLabelAligns.version
        // }      
        AxiosApi.put('measureUnit/add', JSON.stringify(formLabelAlign.formLabelAligns))
          .then((res) => {
            props.handleCloseDrawer()
            dialogVisible.value = false
            props.LoadMeasurementUnit()
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

    const handleConfirm = () => {
      dialogVisible.value = true
    }

    const LoadMeasurementUnitlist = () => {
      AxiosApi.get('measureUnit/list')
        .then((res:AxiosResponse) => {
          MeasurementUnitData.value = res.data.result
        }).catch((err) => {
          console.log(err)
        })
    }
    
    onMounted(() => {
      if (props.save_type === 'edit') {
        loadMeasurementUnit()
      }
      LoadMeasurementUnitlist()
    })
    return {
      ...toRefs(formLabelAlign),
      Reference_unit,
      MeasurementUnitData,
      dialogVisible,
      handleSave,
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
    margin-top: 60px;
    padding-right: 95px;
    display: flex;
    justify-content: right;
}
</style>
