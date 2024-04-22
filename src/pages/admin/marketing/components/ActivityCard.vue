<script setup lang='ts'>
  const props = defineProps(['activityInfo']);
</script>

<template>
  <div class="info-wrapper">
    <el-row>
      <el-col class="title-wrapper" :span="24">
        <el-text class="info-title">
          {{ activityInfo.title }}
        </el-text>
        <el-tag type="success">
          {{ activityInfo.tag }}
        </el-tag>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-text class="info-content">
          {{ activityInfo.content }}
        </el-text>
      </el-col>
    </el-row>
    <el-row  justify="space-between">
      <el-col :span="12">
        <el-text class="title" type="info">
          截止时间
        </el-text>
      </el-col>
      <el-col :span="10">
        <el-text class="title" type="info">
          {{ activityInfo.endTime }}
        </el-text>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped>
  .info-wrapper {
    padding: 12px;
    border: 1px solid #e4e7ed;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .title-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .info-title {
    font-weight: bold;
  }
  .info-content {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
</style>