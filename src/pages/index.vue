<script setup lang='ts'>
  import { useUserStore } from '@/store/user/user';

  const userStore = useUserStore();
  userStore.getUserInfo();

</script>

<template>
  <router-view></router-view>
</template>

<style scoped>
</style>