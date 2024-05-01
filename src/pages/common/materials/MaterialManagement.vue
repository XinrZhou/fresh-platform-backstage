<script setup lang='ts'>
  import {  ref, computed } from 'vue';
  import { useMaterialStore } from '@/store/user/material';
  import { ElMessage, ElMessageBox } from 'element-plus';
  import { formatTime } from '@/utils';
  import BasePagination from '@/components/BasePagination.vue';

  const defaultPage = 1;
  const defaultPageSize = 20;

  const materialStore = useMaterialStore();
  materialStore.getImages(defaultPage, defaultPageSize);
  const imageListC = computed(() => materialStore.imageList);
  const totalC = computed(() => materialStore.total);

  const handlePageChange = (page, pageSize) => {
    materialStore.getImages(page, pageSize)
  }

  const handleDownLoad = (imageUrl: string) => {
    let a = document.createElement('a');
    a.href = imageUrl;
    a.download = imageUrl.split('/')[5] || 'image';
    a.click();
  }

  const handleDelete = (id: string) => {
    ElMessageBox.confirm(
      "是否确认删除？", 
      'Tips', 
      {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning',
        dangerouslyUseHTMLString: true
      }
    ).then(() => {
      materialStore.deleteImage(id).then(() => {
        ElMessage.success("删除成功！");
        materialStore.getImages(defaultPage, defaultPageSize);
      });
    });
  }
</script>

<template>
  <el-card>
    <el-table :data="imageListC">
      <el-table-column prop="id" label="id" width="200" />
      <el-table-column prop="prompt" label="正向提示词"/>
      <el-table-column prop="negativePrompt" label="反向提示词" />
      <el-table-column prop="samplerName" label="采样器" width="120" />
      <el-table-column prop="seed" label="图像生成种子" width="120" />
      <el-table-column prop="cfgScale" label="提示词引导系数" width="140" />
      <el-table-column prop="steps" label="步长"width="100" />
      <el-table-column label="图片" width="200">
        <template #default="scope">
          <el-image :src="scope.row.imageUrl" />
        </template>
      </el-table-column>
      <el-table-column label="创建时间" width="180">
        <template #default="scope">
          <span>
            {{ formatTime(scope.row.insertTime) }}
          </span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="120">
        <template #default="scope">
          <el-button link type="primary" size="small" @click="handleDownLoad(scope.row.imageUrl)">
            下载
          </el-button>
          <el-button link type="primary" size="small" @click="handleDelete(scope.row.id)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <BasePagination
      :total="totalC"
      @onPageChange="handlePageChange"
    />
  </el-card>
</template>
<style scoped>
  .el-image {
    width: 180px;
    height: 180px;
  }
</style>