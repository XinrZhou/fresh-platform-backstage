<script setup lang='ts'>
  import { ref } from 'vue';
  import { HOME_MODULE_LIST } from '@/constant/page';
  import type { UploadProps, UploadUserFile } from 'element-plus';
  import { useOssStore } from '@/store/user/oss';
  import { useContentStore } from '@/store/admin/content';
  import BaseUploadList from '@/components/BaseUploadList.vue';

  const MODULE_TYPE = {
    BANNER: 'banner',
    RECOMMEND: 'recommend'
  };
  const PAGE_NAME = 'Home';

  const ossStore = useOssStore();
  const contentStore = useContentStore();

  const currentIndexR = ref(0);
  const pageSettingsR = ref({
    themeColor: '',
    marketingText: '',
    marketingBg: ''
  });

  const bannerList = ref<UploadUserFile[]>([]);
  const recommendList = ref<UploadUserFile[]>([]);

  const handleImageUpload = async(file: File, moduleType: string) => {
    const { url } = await ossStore.uploadImage(file);
    const list = moduleType === MODULE_TYPE.BANNER ? bannerList : recommendList;
    list.value.push({
      url,
      uid: file.uid
    })
  };
  
  const handleImageRemove = (uploadFile, uploadFiles, moduleType: string) => {
    const list = moduleType === MODULE_TYPE.BANNER ? bannerList : recommendList;
    const index = list.value.findIndex(item => item.uid === uploadFile.uid);
    if (index !== -1) {
      list.value.splice(index, 1);
    };
  };

  const addPageSettings = () => {
    contentStore.addPageSettings(
      PAGE_NAME,
      pageSettingsR.value, 
      bannerList.value, 
      recommendList.value
    );
  }

</script>

<template>
  <el-row justify="space-evenly">
    <el-col :span="6">
      <el-card shadow="never" class="page-wrapper">
        <div
          v-for="(item, index) in HOME_MODULE_LIST"
          :key="index" 
          :class="'page-item ' + (currentIndexR === index ? 'active' : '')"
          @click="currentIndexR = index"
        >
          <el-image :src="item.image" />
        </div>
      </el-card>
    </el-col>
    <el-col :span="14">
      <h3 class="header-wrapper">
        页面配置
      </h3>
      <el-card shadow="never" class="content-wrapper">
        <el-form label-width="100px">
          <el-form-item label="主题色">
            <el-input
              type="color" 
              v-model="pageSettingsR.themeColor" 
            />
          </el-form-item>
          <el-form-item label="Banner图片">
            <BaseUploadList
              :imageList="bannerList"
              :moduleType="MODULE_TYPE.BANNER"
              @on-upload="handleImageUpload"
              @on-remove="handleImageRemove" 
            />
          </el-form-item>
          <el-form-item label="活动文案">
            <el-input v-model="pageSettingsR.marketingText" />
          </el-form-item>
          <el-form-item label="活动背景">
            <el-input v-model="pageSettingsR.marketingBg" />
          </el-form-item>
          <el-form-item label="推荐位图片">
            <BaseUploadList
              :imageList="recommendList"
              :moduleType="MODULE_TYPE.RECOMMEND"
              @on-upload="handleImageUpload"
              @on-remove="handleImageRemove" 
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="addPageSettings">保存</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </el-col>
  </el-row>
</template>

<style scoped>
  :deep(.el-card__body) {
    padding: 0;
  }
  .page-wrapper {
    border-radius: 12px;
  }
  .page-item {
    position: relative;
  }
  .active {
    position: relative;
    border: 2px solid  #ff4135;
  }
  .page-item:hover {
    border: 1px solid  #ff4135;
    cursor: pointer;
  }
  .item-title {
    position: absolute;
    top: 0;
    right: 10px;
    z-index: 10;
  }
  .header-wrapper {
    margin-bottom: 20px;
  }
  .content-wrapper {
    padding: 16px;
    border-radius: 12px;
  }
</style>