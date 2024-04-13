<script setup lang='ts'>
  import { ref } from 'vue';
  import BaseEcharts from '@/components/BaseEcharts.vue';
  import { headerCarts } from '@/constant/chart';


</script>

<template>
  <el-row justify="space-between">
    <el-col 
      v-for="(item, index) in headerCarts" 
      :key="index" 
      :span="item.span"
    >
      <BaseEcharts
        :title="item.title" 
        :option="item.option"
        height="200px" 
      />
    </el-col>
  </el-row>
</template>

<style scoped>
  .test {
    width: 100%;
    height: 100%;
  }
</style>