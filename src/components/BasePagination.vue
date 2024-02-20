<script setup lang='ts'>
  import { ref, defineEmits, defineProps } from 'vue';

  const props = defineProps(['total'])
  const emits = defineEmits(['onPageChange'])
  const page = ref(1)
  const pageSize = ref(20)

  const handleCurrentChange = () => emits('onPageChange', page.value, pageSize.value);
  
</script>

<template>
  <el-pagination layout="prev, pager, next"
    background  
    v-model:current-page="page" 
    :page-size="pageSize" 
    :total="props.total" 
    @current-change="handleCurrentChange"
  />
</template>

<style scoped>
  .el-pagination {
    margin-top: 20px;
    justify-content: center;
  }
</style>