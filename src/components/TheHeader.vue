<script setup lang='ts'>
  import { defineProps, defineEmits } from 'vue';
  import { ArrowDown, User, SwitchButton, userFilled } from '@element-plus/icons-vue';

  const props = defineProps(['userInfo']);
  const emits = defineEmits(['logout']);
  const defaultAvatar = 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png';

  const goLogout = () => emits('logout');
</script>

<template>
  <el-row>
    <el-col :span="24">
      <div class="info-wrapper">
        <el-avatar
          class="info-avatar"
          :size="50"
          :src="userInfo.avatar || defaultAvatar"
        />
        <el-dropdown>
          <span class="el-dropdown-link">
            {{ userInfo.name }}
            <el-icon class="el-icon--right">
              <arrow-down />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>
                <el-icon class="el-icon-arrow-left">
                  <user />
                </el-icon>
                个人中心
              </el-dropdown-item>
              <el-dropdown-item @click="goLogout">
                <el-icon class="el-icon-arrow-left">
                  <SwitchButton />
                </el-icon>
                退出登录
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </el-col>
  </el-row>
</template>

<style scoped>
  .info-wrapper {
    margin: 6px 12px;
    float: right;
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .info-avatar {
    margin-right: 6px;
  }

  .el-dropdown-link {
    cursor: pointer;
    display: flex;
  }
</style>