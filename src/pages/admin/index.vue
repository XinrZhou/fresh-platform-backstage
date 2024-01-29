<script setup lang='ts'>
  import BaseNav from '@/components/BaseNav.vue'
  import Header from '@/components/Header.vue';
  import { ADMIN_NAV_LIST } from '@/types/Const';

</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px">
        <BaseNav :navList="ADMIN_NAV_LIST" baseUrl="admin"/>
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