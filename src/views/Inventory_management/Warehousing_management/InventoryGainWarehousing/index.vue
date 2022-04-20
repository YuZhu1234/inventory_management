<template>
  <div class="home">
   <InOutManagement 
     route="入库管理 > 盘盈入库"
     stockType="102"
     stockName="盘盈入库"
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
