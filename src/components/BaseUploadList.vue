<script lang="ts" setup>
  import { ref } from 'vue';
  import { Plus } from '@element-plus/icons-vue';
  import type { UploadProps, UploadUserFile } from 'element-plus';

  const props = defineProps(['imageList', 'moduleType']);
  const emits = defineEmits(['onUpload', 'onRemove'])
  
  const uploadId = Math.random().toString(36).substring(2).toLocaleUpperCase();
  
  const dialogImageUrl = ref('');
  const dialogVisible = ref(false);

  const handleRequest = async(data) => {
    const isPFX = data.file.type === 'image/jpeg' || data.file.type === 'image/jpg' || data.file.type === 'image/png';
    if (!isPFX) {
      ElMessage.error("图片只能是 JPG、PNG、JPEG 格式!");
    } else {
      emits('onUpload', data.file, props.moduleType);
    }
  }
  
  const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
    emits('onRemove', uploadFile, uploadFiles, props.moduleType);
  }
  
  const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile) => {
    dialogImageUrl.value = uploadFile.url!
    dialogVisible.value = true
  }
</script>

<template>
  <el-upload
    :ref="`Uploader-${uploadId}`"
    :name="uploadId"
    :file-list="imageList"
    action=""
    :http-request="handleRequest"
    list-type="picture-card"
    :on-preview="handlePictureCardPreview"
    :on-remove="handleRemove"
    class="upload-list"
  >
    <el-icon><Plus /></el-icon>
  </el-upload>
  <el-dialog v-model="dialogVisible">
    <img w-full :src="dialogImageUrl" alt="Preview Image" />
  </el-dialog>
</template>

<style scoped>
</style>

