<script setup lang='ts'>
  import { ref } from 'vue';
  import BaseEcharts from '@/components/BaseEcharts.vue';
  import { topCarts, bottomCharts } from '@/constant/supplier-chart.ts';

</script>

<template>
  <div class="top-chart">
    <el-row justify="space-between" gutter="10">
      <el-col 
        v-for="(item, index) in topCarts" 
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
  <div class="bottom-chart">
    <el-row justify="space-between" gutter="10">
      <el-col 
        v-for="(item, index) in bottomCharts" 
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
  .bottom-chart {
    margin-top: 20px;
  }
</style>