<script setup lang='ts'>
  import { ref, computed } from 'vue';
  import { useResoureStore } from '@/store/admin/resource';
  import AnalysisPanel from './AnalysisPanel.vue';
  import ResourceList from './ResourceList.vue';

  const activeName = ref('first');
  const tableData = ref([]);
  const resourceStore = useResoureStore();
  const usageListC = computed(() => resourceStore.usageList);

  resourceStore.getResourceUsage();
</script>

<template>
  <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
    <el-tab-pane label="用量分析" name="first">
      <AnalysisPanel :resources="usageListC" />
    </el-tab-pane>
    <el-tab-pane label="资源总览" name="second">
      <ResourceList />
    </el-tab-pane>
  </el-tabs>
</template>

<style scoped>
  :deep(.el-tabs__nav-scroll) {
    padding: 8px 10px;
    background-color: #fff;
  }
</style>