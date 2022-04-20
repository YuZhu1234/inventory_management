<template>
  <div class="home">
   <InOutManagement 
     route="出库管理 > 盘亏出库"
     stockType="202"
     stockName="盘亏出库"
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
