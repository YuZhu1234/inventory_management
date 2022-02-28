<template>
    <div class="root">
        <el-form
            :label-position="right"
            label-width="100px"
            :model="formLabelAlign"
            style="max-width: 460px"
        >
            <el-form-item label="父级">
               <el-input v-model="formLabelAlign.name"></el-input>
            </el-form-item>
            <el-form-item label="编码">
                <el-input v-model="formLabelAlign.region"></el-input>
            </el-form-item>
            <el-form-item label="名称">
                <el-input v-model="formLabelAlign.type"></el-input>
            </el-form-item>
            <el-form-item label="电话">
               <el-input v-model="formLabelAlign.name"></el-input>
            </el-form-item>
            <el-form-item label="是否启用">
                <el-select v-model="formLabelAlign.region" class="select">
                   <el-option label="启用" value=1 ></el-option>
                   <el-option label="禁用" value=2 ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="备注">
                <el-input v-model="formLabelAlign.type"></el-input>
            </el-form-item>
            <el-form-item label="创建人" >
               <el-input v-model="formLabelAlign.name" disabled></el-input>
            </el-form-item>
            <el-form-item label="创建时间">
                <el-input v-model="formLabelAlign.region" disabled></el-input>
            </el-form-item>
            <el-form-item label="修改人">
                <el-input v-model="formLabelAlign.type" disabled></el-input>
            </el-form-item>
            <el-form-item label="修改时间">
                <el-input v-model="formLabelAlign.type" disabled></el-input>
            </el-form-item>
        </el-form>
        <div class="footer">
            <el-button @click="dialogVisible = false">取消</el-button>
            <el-button type="primary" >确定</el-button>
        </div>
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
    // dictData:{
    //   type:Object,
    //   required:true
    // }
  },
  setup (props, context) {
    const formLabelAlign = reactive({
      name: '',
      region: '',
      type: ''
    })
    return {
      formLabelAlign
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
