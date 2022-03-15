<template>
  <div class="top">
  <el-form :model="CustomerDetails" :label-width=LabeWidth label-position="right">
   <el-form :inline="true" class="demo-form-inline">
    <el-form-item  class="purchaseearehouse1" label="处理状态:" :label-width=LabeWidth>
      <el-input placeholder="客户编码"></el-input>
    </el-form-item>
    <el-form-item class="purchaseearehouse1" label="是否通过:" :label-width=LabeWidth>
      <el-select placeholder="是否通过" class="option">
         <el-option label="是" value=1 ></el-option>
         <el-option label="否" value=2 ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item class="purchaseearehouse1" label="是否关闭:" :label-width=LabeWidth>
      <el-select placeholder="是否关闭" class="option">
         <el-option label="是" value=1 ></el-option>
         <el-option label="否" value=2 ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item class="purchaseearehouse1" label="是否作废:" :label-width=LabeWidth>
      <el-select placeholder="是否作废" class="option">
         <el-option label="是" value=1 ></el-option>
         <el-option label="否" value=2 ></el-option>
      </el-select>
    </el-form-item>
   </el-form>

   <el-form :inline="true" :model="formInline" class="demo-form-inline">
     <el-form-item class="purchaseearehouse1" label="创建时间:" :label-width=LabeWidth>
      <el-input placeholder="请输入创建时间"></el-input>
    </el-form-item>
    <el-form-item class="purchaseearehouse1" label="创建人:" :label-width=LabeWidth>
      <el-select placeholder="创建人" class="option2">
         <el-option label="管理员" value=1 ></el-option>
         <el-option class="purchaseearehouse1" label="否" value=2 ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item class="purchaseearehouse1" label="创建部门:" :label-width=LabeWidth>
      <el-select placeholder="创建部门" class="option2">
         <el-option label="北京国剧公司" value=1 ></el-option>
         <el-option label="否" value=2 ></el-option>
      </el-select>
    </el-form-item>
   </el-form>

    <el-form :inline="true" :model="formInline" class="demo-form-inline">
     <el-form-item class="purchaseearehouse1" label="生效时间:" :label-width=LabeWidth>
      <el-input placeholder="请输入创建时间"></el-input>
    </el-form-item>
    <el-form-item class="purchaseearehouse1" label="审核人:" :label-width=LabeWidth>
      <el-select placeholder="创建人" class="option2">
         <el-option label="管理员" value=1 ></el-option>
         <el-option label="否" value=2 ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item class="purchaseearehouse1" label="流程:" :label-width=LabeWidth>
      <el-select placeholder="创建部门" class="option2">
         <el-option label="北京国剧公司" value=1 ></el-option>
         <el-option label="否" value=2 ></el-option>
      </el-select>
    </el-form-item>
   </el-form>

   <el-form :inline="true" :model="formInline" class="demo-form-inline">
     <el-form-item class="purchaseearehouse1" label="修改时间:" :label-width=LabeWidth>
      <el-input placeholder="请输入创建时间"></el-input>
    </el-form-item>
    <el-form-item class="purchaseearehouse1" label="修改人:" :label-width=LabeWidth>
      <el-select placeholder="创建人" class="option2">
         <el-option label="管理员" value=1 ></el-option>
         <el-option label="否" value=2 ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item class="purchaseearehouse1" label="是否红字:" :label-width=LabeWidth>
      <el-select placeholder="创建部门" class="option2">
         <el-option label="北京国剧公司" value=1 ></el-option>
         <el-option label="否" value=2 ></el-option>
      </el-select>
    </el-form-item>
   </el-form>

   <el-form :inline="true" :model="formInline" class="demo-form-inline">
     <el-form-item class="purchaseearehouse1" label="单据编号:" :label-width=LabeWidth>
      <el-input placeholder="请输入创建时间"></el-input>
    </el-form-item>
    <el-form-item class="purchaseearehouse1" label="单据日期:" :label-width=LabeWidth>
      <el-select placeholder="创建人" class="option2">
         <el-option label="管理员" value=1 ></el-option>
         <el-option label="否" value=2 ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item class="purchaseearehouse1" label="制单人:" :label-width=LabeWidth>
      <el-select placeholder="创建部门" class="option2">
         <el-option label="北京国剧公司" value=1 ></el-option>
         <el-option label="否" value=2 ></el-option>
      </el-select>
    </el-form-item>
   </el-form>

   <el-form :inline="true" :model="formInline" class="demo-form-inline">
     <el-form-item class="purchaseearehouse1" label="业务员:" :label-width=LabeWidth>
      <el-input placeholder="请输入创建时间"></el-input>
    </el-form-item>
    <el-form-item class="purchaseearehouse1" label="供应商:" :label-width=LabeWidth>
      <el-select placeholder="创建人" class="option2">
         <el-option label="管理员" value=1 ></el-option>
         <el-option label="否" value=2 ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item class="purchaseearehouse1" label="入库经办:" :label-width=LabeWidth>
      <el-select placeholder="创建部门" class="option2">
         <el-option label="北京国剧公司" value=1 ></el-option>
         <el-option label="否" value=2 ></el-option>
      </el-select>
    </el-form-item>
   </el-form>

   <el-form :inline="true" :model="formInline" class="demo-form-inline">
     <el-form-item class="purchaseearehouse1" label="源单类型:" :label-width=LabeWidth>
      <el-input placeholder="请输入创建时间"></el-input>
    </el-form-item>
    <el-form-item class="purchaseearehouse1" label="源单号:" :label-width=LabeWidth>
      <el-select placeholder="创建人" class="option2">
         <el-option label="管理员" value=1 ></el-option>
         <el-option label="否" value=2 ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item class="purchaseearehouse1" label="结算数量和金额是否等于入库:" label-width='230px'>
      <el-select placeholder="否" style="width:60px">
         <el-option label="是" value=1 ></el-option>
         <el-option label="否" value=2 ></el-option>
      </el-select>
    </el-form-item>
   </el-form>

   <el-form :model="formInline">
     <el-form-item label="备注:" :label-width=LabeWidth class="full_input">
      <el-input placeholder="请输入创建时间"></el-input>
    </el-form-item>
    <el-form-item class="purchaseearehouse1" label="附件:" :label-width=LabeWidth>
      <el-button> 点击上传 </el-button>
    </el-form-item>
   </el-form>

   </el-form>

   <div style="margin:30px">
      <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane label="明细" name="明细">
          <div style="display:flex;margin-bottom:20px">
          <el-button type="primary"><el-icon><plus /></el-icon>&nbsp;新增 </el-button>
          <el-button type="primary"><el-icon><minus /></el-icon>&nbsp;删除 </el-button>
          </div>
        <el-table :data="MateriaData" highlight-current-row="true" border header-row-style="color:black" style="border: 1px solid rgb(245,244,245)">
        <el-table-column fixed type="selection" sortable width="55" />
        <el-table-column prop="number" label="分录号" width="80" align="center">
          <template v-slot="scope">
           <el-input-number v-model="scope.row.number" :controls="false"> </el-input-number>
          </template>
        </el-table-column>
         <el-table-column prop="number" label="源单分录号" width="120" align="center">
          <template v-slot="scope">
           <el-input v-model="scope.row.number" :controls="false"> </el-input>
          </template>
        </el-table-column>
         <el-table-column prop="number" label="物料" width="200" align="center">
          <template v-slot="scope">
           <el-select placeholder="否" v-model="scope.row.number" style="width:170px">
             <el-option label="是" value=1 ></el-option>
             <el-option label="否" value=2 ></el-option>
           </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="number" label="计量单位" width="130" align="center">
          <template v-slot="scope">
           <el-select placeholder="否" v-model="scope.row.number" style="width:100px">
             <el-option label="是" value=1 ></el-option>
             <el-option label="否" value=2 ></el-option>
           </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="number" label="入库数量" width="130" align="center">
          <template v-slot="scope">
           <el-input-number v-model="scope.row.number" :controls="false" class="el-input-number2"> </el-input-number>
          </template>
        </el-table-column>
         <el-table-column prop="number" label="入库成本" width="130" align="center">
          <template v-slot="scope">
           <el-input-number v-model="scope.row.number" :controls="false" class="el-input-number2"> </el-input-number>
          </template>
        </el-table-column>
        <el-table-column prop="number" label="成本含税" width="100" align="center">
          <template v-slot="scope">
           <el-select placeholder="否" v-model="scope.row.number" style="width:70px">
             <el-option label="是" value=1 ></el-option>
             <el-option label="否" value=2 ></el-option>
           </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="number" label="仓库" width="200" align="center">
          <template v-slot="scope">
           <el-select placeholder="否" v-model="scope.row.number" style="width:170px">
             <el-option label="是" value=1 ></el-option>
             <el-option label="否" value=2 ></el-option>
           </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="number" label="批次号" width="230" align="center">
          <template v-slot="scope">
           <el-input v-model="scope.row.number" :controls="false"> </el-input>
          </template>
        </el-table-column>
        <el-table-column prop="number" label="结算数量" width="130" align="center">
          <template v-slot="scope">
           <el-input-number v-model="scope.row.number" :controls="false" class="el-input-number2"> </el-input-number>
          </template>
        </el-table-column>
        <el-table-column prop="number" label="含税单价" width="130" align="center">
          <template v-slot="scope">
           <el-input-number v-model="scope.row.number" :controls="false" class="el-input-number2"> </el-input-number>
          </template>
        </el-table-column>
        <el-table-column prop="number" label="税率" width="130" align="center">
          <template v-slot="scope">
           <el-input-number v-model="scope.row.number" :controls="false" class="el-input-number2"> </el-input-number>
          </template>
        </el-table-column>
         <el-table-column prop="number" label="税额" width="130" align="center">
          <template v-slot="scope">
           <el-input-number v-model="scope.row.number" :controls="false" class="el-input-number2"> </el-input-number>
          </template>
        </el-table-column>
        <el-table-column prop="number" label="折让金额" width="130" align="center">
          <template v-slot="scope">
           <el-input-number v-model="scope.row.number" :controls="false" class="el-input-number2"> </el-input-number>
          </template>
        </el-table-column>
        <el-table-column prop="number" label="折税金额" width="130" align="center">
          <template v-slot="scope">
           <el-input-number v-model="scope.row.number" :controls="false" class="el-input-number2"> </el-input-number>
          </template>
        </el-table-column>
        <el-table-column prop="number" label="结算金额" width="150" align="center">
          <template v-slot="scope">
           <el-input-number v-model="scope.row.number" :controls="false" class="el-input-number3"> </el-input-number>
          </template>
        </el-table-column>
        <el-table-column prop="number" label="已开票数量" width="150" align="center">
          <template v-slot="scope">
           <el-input-number v-model="scope.row.number" :controls="false" class="el-input-number3"> </el-input-number>
          </template>
        </el-table-column>
        <el-table-column prop="number" label="已开票金额" width="150" align="center">
          <template v-slot="scope">
           <el-input-number v-model="scope.row.number" :controls="false" class="el-input-number3"> </el-input-number>
          </template>
        </el-table-column>
        <el-table-column prop="number" label="备注" width="230" align="center">
          <template v-slot="scope">
           <el-input v-model="scope.row.number"> </el-input>
          </template>
        </el-table-column>
        <el-table-column prop="number" label="备注2" width="230" align="center">
          <template v-slot="scope">
           <el-input v-model="scope.row.number" > </el-input>
          </template>
        </el-table-column>
        
      </el-table>
        </el-tab-pane>
      </el-tabs>
   </div>
    <div style="display:flex;justify-content:right">
       <el-button >取消 </el-button>
       <el-button type="primary">保存 </el-button>
       <el-button type="primary">提交 </el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import {
  Refresh,
  Search,
  Plus,
  Download,
  Upload,
  ArrowDown,
  Minus
} from '@element-plus/icons-vue'

export default defineComponent({
  name:'PurchaseWarehousingDetail',
  components:{
    Plus,
    Minus
  },
  setup () {
    const LabeWidth = ref('100px')
    const activeName = ref('明细')
    const MateriaData = ref([{ code:'123', number:2 }])

    return {
      LabeWidth,
      activeName,
      MateriaData
    }
  }
})
</script>

<style lang="less">
.top {
  font-size: 14px;
  font-family: -apple-system,BlinkMacSystemFont,Segoe UI,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Helvetica Neue,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol;
  margin-top: -30px;
}

.option {
  width: 60px;
}

.demo-form-inline {
  display: flex;
  width: 100%;
}

.purchaseearehouse1 {
  width: 288px;
  display: flex;
  justify-content: left;
  margin-left: 20px;
}

.el-form-item__content {
  text-align: left;
}

.el-input-number {
  width: 50px!important;
}

.el-input-number2 {
  width: 100px!important;
}

.el-input-number3 {
  width: 120px!important;
}

.full_input{
  width: 810px;
}
</style>
