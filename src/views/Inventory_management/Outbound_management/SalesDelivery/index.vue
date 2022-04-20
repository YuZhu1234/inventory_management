<template>
  <div class="home">
   <InOutManagement 
     route="出库管理 > 销售出库"
     stockType="201"
     stockName="销售出库"
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
