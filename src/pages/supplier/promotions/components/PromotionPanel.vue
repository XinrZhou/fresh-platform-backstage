<script setup lang='ts'>
  import { ref, computed } from 'vue';
  import { chartList } from '../promotion';
  import router from '@/router';
  import { useMarketingStore } from '@/store/admin/marketing';
  import { OPERATION_TYPE } from '@/constant/enums';
  import BaseEcharts from '@/components/BaseEcharts.vue';
  import BaseDialog from '@/components/BaseDialog.vue';
  import ActivityCard from './ActivityCard.vue';
  import AdvertisementList from './AdvertisementList.vue';

  const marketingStore = useMarketingStore();
  marketingStore.getActivities();
  const activityListC = computed(() => marketingStore.activityList);
  
  const dialogVisibleR = ref<Boolean>(false);
  const operationTypeR = ref<string>('');

  const handleClose = () => dialogVisibleR.value = false; 
  const handleOpen = () => dialogVisibleR.value = true;

  const goActivityListPage = () => router.push('/supplier/promotion/activity');
</script>

<template>
  <el-card shadow="never" class="activity-card">
    <el-row class="card-header" justify="space-between" >
      <el-col :span="20">
        <h3 class="card-title">
          <el-icon>
            <Calendar />
          </el-icon>
          活动列表
        </h3>
      </el-col>
      <el-col :span="1">
        <el-button 
          type="primary" 
          @click="goActivityListPage" 
          link
        >
          查看更多
        </el-button>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col 
        v-for="(item, index) in activityListC.slice(0, 3)" 
        :key="index"
        :span="8" 
      >
        <ActivityCard 
          :activityInfo="item"
          @click="goActivityListPage"
        />
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
  <el-card shadow="never" class="activity-card">
    <el-row class="card-header" justify="space-between" >
      <el-col :span="22">
        <h3 class="card-title">
          <el-icon :size="size" :color="color">
            <Bell />
          </el-icon>
          价格列表
        </h3>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <AdvertisementList 
        :dialogVisible="dialogVisibleR"
        @on-dialog-open="handleOpen" 
        @on-dialog-close="handleClose"
      />
    </el-row>
  </el-card>
  <BaseDialog
  />
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
  .charts-card {
    margin-bottom: 20px;
  }
</style>../marketing../promotion