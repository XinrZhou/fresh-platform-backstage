<script setup lang='ts'>
  import { ref } from 'vue';
  import type { TabsPaneContext } from 'element-plus';
  import { useModelStore } from '@/store/admin/model';
  import { PAGE_TYPE } from '@/constant/enums';
  import { CHAT_MODEL_SCHEMA, CHAT_MODEL_UI_SCHEMA } from './chatSchema';
  import { IMAGE_MODEL_SCHEMA, IMAGE_MODEL_UI_SCHEMA } from './imageSchema';
  import ModelDetail from './ModelDetail.vue'

  const defaultPage = 1;
  const defaultPageSize = 20;

  const activeName = ref(PAGE_TYPE.CHAT.value);
  const modelStore = useModelStore();
  modelStore.getModels(defaultPage, defaultPageSize, activeName.value);

  const handleClick = (tab: TabsPaneContext ) => {
    modelStore.getModels(defaultPage, defaultPageSize, tab.props.name);
  }
</script>

<template>
  <el-card>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane 
        :label="PAGE_TYPE.CHAT.name" 
        :name="PAGE_TYPE.CHAT.value"
      >
        <ModelDetail
          :page-type="PAGE_TYPE.CHAT"
          :schema="CHAT_MODEL_SCHEMA"
          :ui-schema="CHAT_MODEL_UI_SCHEMA"
        />
      </el-tab-pane>
      <el-tab-pane 
        :label="PAGE_TYPE.IMAGE.name" 
        :name="PAGE_TYPE.IMAGE.value"
      >
        <ModelDetail
          :page-type="PAGE_TYPE.IMAGE"
          :schema="IMAGE_MODEL_SCHEMA"
          :ui-schema="IMAGE_MODEL_UI_SCHEMA"
        />
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<style scoped>

</style>