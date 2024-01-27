<script setup lang='ts'>
  import LeftNav from '@/components/LeftNav.vue';
  import Header from '@/components/Header.vue';
  import { ADMIN_NAV_LIST } from '@/types/Const';

</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px">
        <LeftNav :navList="ADMIN_NAV_LIST"/>
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