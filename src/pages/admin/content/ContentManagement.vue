<script setup lang="ts">
  import _ from 'lodash';
  import { ref, computed, watch } from 'vue';
  import { HOME_MODULE_LIST } from '@/constant/page';
  import { UploadUserFile } from 'element-plus';
  import { useOssStore } from '@/store/user/oss';
  import { useContentStore } from '@/store/admin/content';
  import { ElMessage } from 'element-plus';
  import BaseUpload from '@/components/BaseUpload.vue';
  import BaseUploadList from '@/components/BaseUploadList.vue';

  enum MODULE_TYPE {
    BANNER = 'banner',
    RECOMMEND = 'recommend'
  }

  const PAGE_NAME = 'Home';

  const ossStore = useOssStore();
  
  const contentStore = useContentStore();
  contentStore.getPage(PAGE_NAME);
  const pageSettingsC = computed(() => contentStore.pageSettings);
  const { bannerImages, recommendImages, marketingText, marketingBg } = pageSettingsC;

  const currentIndex = ref(0);
  const pageSettings = ref({});
  const bannerList = ref<UploadUserFile[]>([]);
  const recommendList = ref<UploadUserFile[]>([]);

  watch(() => pageSettingsC.value, (newVal) => {
    pageSettings.value = _.cloneDeep(newVal);
    bannerList.value = _.cloneDeep(newVal.bannerImages).map(item => {
      return { url: item, uid: ''}
    });
    recommendList.value = _.cloneDeep(newVal.recommendImages).map(item => {
      return { url: item, uid: ''}
    });
  })

  const handleImageUpload = async(file) => {
    const { url} = await ossStore.uploadImage(file);
    pageSettings.value.marketingBg = url;
  }
  const handleImageRemove = () => {
    pageSettings.value.marketingBg = '';
  }

  const handleImageListUpload = async (file: File, moduleType: MODULE_TYPE) => {
    const { url } = await ossStore.uploadImage(file);
    const list = moduleType === MODULE_TYPE.BANNER ? bannerList : recommendList;
    list.value.push({ url, uid: file.uid });
  };
  
  const handleImageListRemove = (uploadFile, uploadFiles, moduleType: MODULE_TYPE) => {
    const list = moduleType === MODULE_TYPE.BANNER ? bannerList : recommendList;
    const index = list.value.findIndex(item => item.uid === uploadFile.uid);
    if (index !== -1) {
      list.value.splice(index, 1);
    }
  };

  const addPageSettings = () => {
    contentStore.addPageSettings(
      PAGE_NAME,
      pageSettings.value, 
      bannerList.value, 
      recommendList.value
    ).then(() => {
      ElMessage.success('保存成功');
      contentStore.getPage(PAGE_NAME);
    });
  }
</script>

<template>
  <el-row justify="space-evenly">
    <el-col :span="6">
      <el-card shadow="never" class="page-wrapper">
        <div v-for="(item, index) in HOME_MODULE_LIST" :key="index" 
             :class="'page-item ' + (currentIndex === index ? 'active' : '')"
             @click="currentIndex = index">
          <el-image :src="item.image" />
        </div>
      </el-card>
    </el-col>
    <el-col :span="15">
      <el-row justify="space-between" >
        <el-col :span="20">
          <h3 class="header-wrapper">页面配置</h3>
        </el-col>
        <el-col :span="2">
          <el-button 
            type="primary" 
            @click="addPageSettings"
            link
          >
            保存
          </el-button>
        </el-col>
      </el-row>
      <el-card shadow="never" class="content-wrapper">
        <el-form label-position="left" label-width="120px">
          <el-form-item 
            label="主题Banner"
            :class="'content-title ' + (currentIndex === 0 ? 'title-active' : '')" 
          />
          <el-form-item label="主题色">
            <el-color-picker 
              show-alpha 
              v-for="(item, index) in bannerList" 
              :key="index"  
              v-model="pageSettings[`themeColor${index + 1}`]" 
            />
          </el-form-item>
          <el-form-item label="Banner图片">
            <BaseUploadList 
              :imageList="bannerList" 
              :moduleType="MODULE_TYPE.BANNER"
              @on-upload="handleImageListUpload" 
              @on-remove="handleImageListRemove" 
            />
          </el-form-item>
          <el-form-item 
            label="胶囊Banner"
            :class="'content-title ' + (currentIndex === 2 ? 'title-active' : '')" 
          />
          <el-form-item label="营销文案">
            <el-input v-model="pageSettings.marketingText" type="textarea"/>
          </el-form-item>
          <el-form-item label="营销背景">
            <BaseUpload 
              :imageUrl="pageSettings.marketingBg"
              @on-upload="handleImageUpload"
              @on-remove="handleImageRemove"
            />
          </el-form-item>
          <el-form-item 
            label="商品Feeds"
            :class="'content-title ' + (currentIndex === 3 ? 'title-active' : '')" 
          />
          <el-form-item label="推荐位图片">
            <BaseUploadList 
              :imageList="recommendList" 
              :moduleType="MODULE_TYPE.RECOMMEND"
              @on-upload="handleImageListUpload" 
              @on-remove="handleImageListRemove" 
            />
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
  :deep(.el-color-picker) {
    margin-right: 10px;
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
  :deep(.content-title .el-form-item__label) {
    font-weight: 600;
    font-size: 16px;
  }
  :deep(.title-active .el-form-item__label) {
    color: #ff4135;
  }
</style>
