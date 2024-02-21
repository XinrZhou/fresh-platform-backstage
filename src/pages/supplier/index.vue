<script setup lang='ts'>
  import { ref, computed, watchEffect } from 'vue';
  import { User } from '@/types/type';
  import { useUserStore } from '@/store/user/user';
  import { SUPPLIER_SIDEBAR_LIST } from '@/constant/sidebar';
  import TheSidebar from '@/components/TheSidebar.vue';
  import TheHeader from '@/components/TheHeader.vue';

  const userStore = useUserStore();
  const userInfoC = computed(() => userStore.userInfo);
  
  const logout = () => userStore.goLogout();

</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px">
        <TheSidebar :navList="SUPPLIER_SIDEBAR_LIST" baseUrl="supplier"/>
      </el-aside>
      <el-container>
        <el-header>
          <TheHeader :userInfo="userInfoC" @logout="logout"/>
        </el-header>
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
  .el-header {
    border: 1px solid var(--el-card-border-color);
    box-shadow: var(--el-box-shadow-light);
  }
  .el-main {
    background-color: #F6F8F9;
  }
  .el-menu {
    height: 100%;
  }
</style>