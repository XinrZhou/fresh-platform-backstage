<script setup lang='ts'>
  const props = defineProps(['activityInfo']);
</script>

<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-text class="title">
          {{ activityInfo.title }}
        </el-text>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-text class="title">
          {{ activityInfo.content }}
        </el-text>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-text class="title">
          {{ activityInfo.startTime }} - {{ activityInfo.endTime }}
        </el-text>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped>

</style>