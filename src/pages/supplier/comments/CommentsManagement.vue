<script setup lang='ts'>
  import { ref, computed } from 'vue';
  import { ElMessage, ElMessageBox } from 'element-plus';
  import { commentList } from './comments';
  import BasePagination from '@/components/BasePagination.vue';

  const dialogVisibleR = ref<Boolean>(false);

  const handleClose = () => {
  }

  const handleEdit = () => {
  }

  const handleSubmit = () => {
  }
</script>

<template>
  <el-card>
    <h3 class="table-title">评价管理</h3>
    <el-table :data="commentList" style="width: 100%" stripe border max-height="600">
      <el-table-column prop="orderId" label="订单Id" width="200"/>
      <el-table-column prop="userId" label="用户Id" width="200"/>
      <el-table-column prop="userName" label="用户名" width="150"/>
      <el-table-column prop="content" label="内容" />
      <el-table-column prop="score" label="满意度" width="80"/>
      <el-table-column prop="createTime" label="评论时间" width="180"/>
    </el-table>
    <BasePagination :total="10" />
  </el-card>
</template>

<style scoped>
  .table-title {
    margin-bottom: 10px;
  }
</style>