<script setup lang='ts'>
  import { ref, watch } from 'vue';
  import type { UploadProps, UploadUserFile } from 'element-plus';
  import { ElMessage } from 'element-plus';

  const props = defineProps(['imageUrl', 'imageType'])
  const emits = defineEmits(['onUpload', 'onRemove'])

  const imageList = ref<UploadUserFile[]>([]);
  const hideUpload = ref<Boolean>(false);

  watch(() => props.imageUrl, (newValue) => {
    if (newValue) {
      imageList.value = [{ url: newValue }];
    } else {
      imageList.value = [];
    }
  });
  
  const dialogImageUrl = ref('');
  const dialogVisible = ref(false);

  const handleChange: UploadProps['onChange'] = (uploadFile, uploadFiles) => {
    hideUpload.value = uploadFiles.length > 0;
  }

  const handleRequest = (data) => {
      const isPFX = data.file.type === 'image/jpeg' || data.file.type === 'image/jpg' || data.file.type === 'image/png';
      if (!isPFX) {
          ElMessage.error("图片只能是 JPG、PNG、JPEG 格式!");
      } else {
        emits('onUpload', data.file, props.imageType);
      }
  }

  const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile) => {
    dialogImageUrl.value = uploadFile.url!
    dialogVisible.value = true
  }

  const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => emits('onRemove');
</script>

<template>
  <el-upload
    :file-list="imageList"
    action=""
    :limit="1"
    :http-request="handleRequest"
    :on-change="handleChange"
    list-type="picture-card"
    :on-preview="handlePictureCardPreview"
    :on-remove="handleRemove"
    :class="{ 'hidden':hideUpload }"
  >
    <el-icon> <Plus /></el-icon>
  </el-upload>
  <el-dialog v-model="dialogVisible">
    <img w-full :src="dialogImageUrl" alt="Preview Image" />
  </el-dialog>
</template>


<style>
  .hidden .el-upload--picture-card {
    display: none;
  }
</style>