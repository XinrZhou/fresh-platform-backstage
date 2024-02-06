<script setup lang='ts'>
  import { ref, computed, watchEffect } from 'vue';
  import { User } from '@/types/type';
  import { useUserStore } from '@/store/user/user';
  import { ADMIN_SIDEBAR_LIST } from '@/constant/sidebar';
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
        <TheSidebar :navList="ADMIN_SIDEBAR_LIST" baseUrl="admin"/>
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

  .el-menu {
    height: 100%;
  }
</style>