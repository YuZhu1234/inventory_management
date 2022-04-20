<template>
  <div class="home">
   <InOutManagement 
     route="入库管理 > 采购入库"
     stockType="101"
     stockName="采购入库"
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
