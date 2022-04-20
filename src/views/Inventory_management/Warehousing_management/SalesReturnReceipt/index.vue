<template>
  <div class="home">
   <InOutManagement 
     route="入库管理 > 销售退货入库"
     stockType="2011"
     stockName="销售出库-红字"
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
