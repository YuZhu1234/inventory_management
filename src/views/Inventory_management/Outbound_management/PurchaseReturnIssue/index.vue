<template>
  <div class="home">
   <InOutManagement 
     route="出库管理 > 采购退货出库"
     stockType="1011"
     stockName="采购入库-红字"
   />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import InOutManagement from '../../../../components/InOutManagement/index.vue'

export default defineComponent({
  name: 'Inventoryloss',
  components:{
    InOutManagement
  }
})
</script>
