<script setup lang='ts'>
  import { ref, computed } from 'vue';
  import { ElMessage, ElMessageBox } from 'element-plus';
  import { useOrderStore } from '@/store/supplier/order';

  const orderStore = useOrderStore();
  orderStore.getOrders();
</script>

<template>
  <h3>订单管理</h3>
</template>

<style scoped>

</style>