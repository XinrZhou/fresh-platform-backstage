<script setup lang='ts'>
  import { ref } from 'vue';
  import OperationDialog from './OperationDialog.vue';

  let dialogVisible = ref(false);
</script>

<template>
  <el-row>
    <el-col :span="12">一级类目</el-col>
    <el-col :span="12">
      <el-button
        @click="dialogVisible = true"
        type="text"
      >
        添加
      </el-button>
    </el-col>
  </el-row>
  
</template>

<style scoped>

</style>