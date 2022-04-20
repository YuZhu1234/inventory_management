<template>
  <div class="home">
   <InOutManagement 
     route="入库管理 > 其他入库"
     stockType="199"
     stockName="其他入库"
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
