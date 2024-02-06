<script setup lang='ts'>
    import { defineProps } from 'vue';
    import router from '@/router';
    import { useRoute } from 'vue-router';

    const props = defineProps(['navList', 'baseUrl']);
    const route = useRoute();
    console.log(route)

    const handleNavSelect = (key, keyPath) => {
      router.push(`/${props.baseUrl}/${props.navList[key].path}`);
    }
</script>

<template>
  <el-menu
    active-text-color="#41B58E"
    default-active="0"
    @select="handleNavSelect"
  >
    <el-menu-item 
      v-for="(item, index) in navList" 
      :key="item.alias" 
      :index="index.toString()"
    >
      <component :is="item.icon" class="icon-wrapper" />
      <span>{{ item.name }}</span>
    </el-menu-item>
  </el-menu>
</template>

<style scoped>
  .icon-wrapper {
    width: 16px;
    margin-right: 4px;
  }

  .is-active {
    background-color: #ECF8F3;
  }

  .el-menu-item:hover {
    color: #41B58E;
    background-color: #ECF8F3;
  }
</style>