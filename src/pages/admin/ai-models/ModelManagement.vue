<script setup lang='ts'>
  import { ref } from 'vue';
  import ChatModel from './ChatModel.vue';
  import ImageModel from './ImageModel.vue';

  const activeName = ref('first');
</script>

<template>
  <el-card>
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane label="绘画模型" name="first">
        <ImageModel />
      </el-tab-pane>
      <el-tab-pane label="语言模型" name="second">
        <ChatModel/>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<style scoped>

</style>