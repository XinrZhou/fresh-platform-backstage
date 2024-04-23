<script setup lang='ts'>
  import { activityList, chartList } from '../marketing';
  import router from '@/router';
  import { useMarketingStore } from '@/store/admin/marketing';
  import BaseEcharts from '@/components/BaseEcharts.vue';
  import ActivityCard from './ActivityCard.vue';

  const marketing = useMarketingStore();

</script>

<template>
  <el-card shadow="never" class="activity-card">
    <el-row class="card-header" justify="space-between" >
      <el-col :span="20">
        <h3 class="card-title">
          <el-icon :size="size" :color="color">
            <Bell />
          </el-icon>
          活动列表
        </h3>
      </el-col>
      <el-col :span="2">
        <el-button 
          type="primary" 
          @click="() => router.push('/admin/marketing/activity')"
          link
        >
          查看更多
        </el-button>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col 
        v-for="(item, index) in activityList.slice(0, 3)" 
        :key="index"
        :span="8" 
      >
        <ActivityCard :activityInfo="item"/>
      </el-col>
    </el-row>
  </el-card>
  <el-card shadow="never" class="charts-card">
    <el-row justify="space-between" gutter="10">
      <el-col 
        v-for="(item, index) in chartList" 
        :key="index" 
        :span="item.span"
      >
        <BaseEcharts
          :title="item.title" 
          :option="item.option"
          :isMap="item.isMap"
          height="240px" 
        />
      </el-col>
    </el-row>
  </el-card>
</template>

<style scoped>
  .activity-card {
    margin-bottom: 20px;
  }
  .card-title {
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    gap: 10px;
  }
</style>../marketing