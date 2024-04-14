<script setup lang='ts'>
  import { ref } from 'vue';
  import BaseEcharts from '@/components/BaseEcharts.vue';
  import { headerCarts, middleCharts } from '@/constant/chart';

</script>

<template>
  <div class="header-chart">
    <el-row justify="space-between" gutter="10">
      <el-col 
        v-for="(item, index) in headerCarts" 
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
  </div>
  <div class="middle-chart">
    <el-row justify="space-between" gutter="10">
      <el-col 
        v-for="(item, index) in middleCharts" 
        :key="index" 
        :span="item.span"
      >
        <BaseEcharts
          :title="item.title" 
          :option="item.option"
          :isMap="item.isMap"
          height="480px" 
        />
      </el-col>
    </el-row>
  </div>
</template>

<style scoped>
  .middle-chart {
    margin-top: 20px;
  }
</style>