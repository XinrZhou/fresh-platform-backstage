<script setup lang='ts'>

</script>

<template>
  <el-page-header title="logout">
    <template #content>
      <div class="flex items-center" style="display: flex;justify-content: center;align-items: center;">
        <el-avatar :size="32" class="mr-3" :icon="Avatar" />
        <el-tag>测试数据</el-tag>
      </div>
    </template>
    <template #extra>
      <div class="flex items-center">
        <el-button type="primary" class="ml-2" >Edit</el-button>
      </div>
    </template>
  </el-page-header>
</template>

<style scoped>

</style>