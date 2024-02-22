<script setup lang='ts'>
  import { defineProps } from 'vue';
  import router from '@/router';

  const props = defineProps(['navList', 'baseUrl']);

  const handleNavSelect = (key, keyPath) => {
      const navArr = key.split('-');
      const secondPath = navArr.length > 1 ? `/${props.navList[navArr[0]].children[navArr[1]].path}` : '';
      router.push(`/${props.baseUrl}/${props.navList[navArr[0]].path}${secondPath}`);
    }

</script>

<template>
  <el-menu
    default-active="0"
    @select="handleNavSelect"
  >
    <template 
      v-for="(item, index) in props.navList" 
      :key="item.alias"
      :index="index.toString()"
    >
      <el-menu-item 
        v-if="!item.children" 
        :index="index.toString()"
      >
        <component :is="item.icon" class="icon-wrapper" />
        <span>{{ item.name }}</span>
      </el-menu-item>
      <el-sub-menu
        v-else 
        :index="index.toString()" 
      >
        <template #title>
          <component :is="item.icon" class="icon-wrapper" />
          <span>{{ item.name }}</span>
        </template>
        <el-menu-item 
          v-for="(item1, index1) in item.children"
          :index="index.toString() + '-' + index1.toString()"
        >
          <component :is="item1.icon" class="icon-wrapper" />
          <span>{{ item1.name }}</span>
        </el-menu-item>
      </el-sub-menu>
    </template>
  </el-menu>
</template>

<style scoped>
  .icon-wrapper {
    width: 16px;
    margin-right: 4px;
  }

  /* .is-active {
    background-color: #ECF8F3;
  }

  .el-menu-item:hover {
    color: #41B58E;
    background-color: #ECF8F3;
  }

  .el-sub-menu .el-sub-menu__title:hover {
    color: #41B58E;
    background-color: #ECF8F3;
  } */
</style>