<script setup lang='ts'>
  import { ref } from 'vue';
  import ChatModel from './ChatModel.vue';
  import ImageModel from './ImageModel.vue';

  const PAGE_TYPE = {
    IMAGE: {
      name: '绘画模型',
      value: 0
    },
    CHAT: {
      name: '大语言模型', 
      value: 1
    }
  }

  const activeName = ref(PAGE_TYPE.CHAT.value);
</script>

<template>
  <el-card>
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane 
        :label="PAGE_TYPE.CHAT.name" 
        :name="PAGE_TYPE.CHAT.value"
      >
        <ChatModel
          :page-type="PAGE_TYPE.CHAT"
        />
      </el-tab-pane>
      <el-tab-pane 
        :label="PAGE_TYPE.IMAGE.name" 
        :name="PAGE_TYPE.IMAGE.value"
      >
        <ImageModel 
          :page-type="PAGE_TYPE.IMAGE"
        />
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<style scoped>

</style>