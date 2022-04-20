<template>
  <div class="home">
   <InOutManagement 
     route="出库管理 > 其他出库"
     stockType="299"
     stockName="其他出库"
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
