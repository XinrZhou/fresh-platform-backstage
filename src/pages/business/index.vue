<script setup lang='ts'>
  import BaseNav from '@/components/BaseNav';
  import BaseHeader from '@/components/BaseHeader';
  import { BUSINESS_NAV_LIST } from '@/types/Const';

</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px">
        <BaseNav :nav-list="BUSINESS_NAV_LIST" :base-url="business"/>
      </el-aside>
      <el-container>
        <el-header>Header</el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped>
  .el-container {
    height: 100vh;
  }

  .el-menu {
    height: 100%;
  }
</style>