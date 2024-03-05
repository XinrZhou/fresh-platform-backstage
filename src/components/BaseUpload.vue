<script setup lang='ts'>
  import { ElMessage } from 'element-plus';

  const props = defineProps(['imageUrl'])
  const emits = defineEmits(['onUpload', 'onRemove'])

  const handleRequest = (data) => {
      const isPFX = data.file.type === 'image/jpeg' || data.file.type === 'image/jpg' || data.file.type === 'image/png';
      if (!isPFX) {
          ElMessage.error("图片只能是 JPG、PNG、JPEG 格式!");
      } else {
        emits('onUpload', data.file);
      }
  }

  const handleRemove = () => emits('onRemove');
</script>

<template>
  <el-upload
    class="avatar-uploader" 
    action=""
    :show-file-list="false"
    :http-request="handleRequest" 
    :on-remove="handleRemove"
  >
    <img v-if="props.imageUrl" :src="props.imageUrl" class="avatar" />
    <component v-else is="Plus" class="icon-wrapper" />
  </el-upload>
</template>


<style scoped>
  .avatar-uploader .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }

  .avatar-uploader {
    position: relative;
    overflow: hidden;
    width: 128px;
    height: 128px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    transition: var(--el-transition-duration-fast);
    cursor: pointer;
  }

  .icon-wrapper {
    width: 28px;
    color: #8c939d;
  }
</style>