<script setup lang='ts'>
  import ActivityCard from './components/ActivityCard.vue';
  import { activityList } from './marketing';
</script>

<template>
  <el-card shadow="never">
    <h3 class="table-title">活动列表</h3>
    <el-row>
      <el-col 
        v-for="(item, index) in activityList.slice(0, 3)" 
        :key="index"
        :span="8" 
      >
        <ActivityCard :activityInfo="item"/>
      </el-col>
    </el-row>
  </el-card>
</template>

<style scoped>
  .table-title {
    margin-bottom: 20px;
  }
</style>