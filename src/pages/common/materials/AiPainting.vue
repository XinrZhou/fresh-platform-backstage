<script setup lang='ts'>
  import { ref, computed, watch } from 'vue';
  import _ from 'lodash';
  import { ElMessage } from 'element-plus';
  import { base64ToFile } from "@/utils";
  import { BASE_MODEL, SAMPLER, BASE_PARAMS, LORA_MODEL } from './model';
  import { useOssStore } from '@/store/user/oss';
  import { useUserStore } from '@/store/user/user';
  import { useMaterialStore } from '@/store/user/material';
  import BaseUpload from '@/components/BaseUpload.vue';
  import { request } from '@/api/http';

  const ossStore = useOssStore();
  const imageUrlC = computed(() => ossStore.imageUrl);
  const materialStore = useMaterialStore();

  const userStore = useUserStore();
  const userInfoC = computed(() => userStore.userInfo);

  const text2ImageParamsR = ref({});
  const controlnetImage = ref('');
  const imageListR = ref([]);
  const showCollectBtn = ref<Boolean>(true);

  watch(() => ossStore.imageUrl, () => {
    controlnetImage.value = ossStore.imageUrl;
  });

  const handleImageUpload = (file: File) => {
    ossStore.uploadImage(file);
  };
  
  const handleImageRemove = () => {
    text2ImageParamsR.alwayson_scripts.controlnet.args[0].image = '';
  };

  const handleSubmit = async() => {
    !showCollectBtn && (showCollectBtn.value = true);
    const params = {
      ...BASE_PARAMS,
      ...text2ImageParamsR.value,
    }
    params.override_settings.sd_model_checkpoint = text2ImageParamsR.value.baseModel;
    // params.alwayson_scripts.controlnet.args[0].image = controlnetImage.value
    const res = await request({
      url: `http://sd.fc-stable-diffusion-plus.1579841646926354.cn-hangzhou.fc.devsapp.net/sdapi/v1/txt2img`,
      method: 'post',
      data: _.omit(params, ['baseModel', 'lora'])
    })
    imageListR.value = res.data.images;
  }

  const collectImage = (imageBase64: String) => {
    const imageFile = base64ToFile(imageBase64, "file");
    ossStore.uploadImage(imageFile).then(() => {
      const userId = userInfoC.value.id;
      materialStore.collectImage({
        userId,
        imageUrl: imageUrlC.value,
        prompt: text2ImageParamsR.value.prompt,
        negativePrompt: text2ImageParamsR.value.negative_prompt,
        params: JSON.stringify(text2ImageParamsR.value),
      }).then(() => {
        ElMessage.success("收藏成功!");
      })
    }).catch(() => {
      ElMessage.error("收藏失败，请稍后重试!")
    });
  }
</script>

<template>
  <el-card class="container-wrapper" shadow="never">
    <el-form 
      :model="text2ImageParamsR" 
      label-width="auto" 
      label-position="top"
    >
      <el-row class="flex-wrapper">
        <el-col :span="5">
          <el-form-item label="Stable Diffusion模型(ckpt)">
            <el-select
              v-model="text2ImageParamsR.baseModel"
              placeholder="sd_model_checkpoint"
              style="width: 240px"
            >
              <el-option
                v-for="item in BASE_MODEL"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-button 
            type="primary" 
            class="form-button"
            @click="handleSubmit"
          >
            生成
          </el-button>
        </el-col>
      </el-row>
      <el-form-item label="正向提示词">
        <el-input
          v-model="text2ImageParamsR.prompt"
          type="textarea"
          :maxlength="500"
          show-word-limit
          placeholder="Prompt"
        />
      </el-form-item>
      <el-form-item label="反向提示词">
        <el-input
          v-model="text2ImageParamsR.negative_prompt"
          type="textarea"
          maxlength="500"
          show-word-limit
          placeholder="Negative Prompt"
        />
      </el-form-item>
      <el-row class="flex-wrapper">
        <el-col :span="12">
          <el-row>
            <el-col :span="12">
              <el-form-item label="采样器">
                <el-select
                  v-model="text2ImageParamsR.sampler_name"
                  placeholder="Sampler"
                  style="width: 240px"
                >
                  <el-option
                    v-for="item in SAMPLER"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="采样步数">
                <el-slider
                  v-model="text2ImageParamsR.steps"
                  max="150"
                  show-input
                  :show-input-controls="false"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class="flex-wrapper">
            <el-col :span="12">
              <el-form-item label="宽度">
                <el-input-number 
                  style="width: 240px;"
                  v-model="text2ImageParamsR.width" 
                  :min="64" 
                  :max="2048"
                />
              </el-form-item>
            </el-col>
            <el-col :span="4">
              X
            </el-col>
            <el-col :span="8">
              <el-form-item label="高度">
                <el-input-number 
                  style="width: 240px;"
                  v-model="text2ImageParamsR.height" 
                  :min="64" 
                  :max="2048"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class="flex-wrapper">
            <el-col :span="8">
              <el-form-item label="ControlNet 线稿">
                <BaseUpload 
                  :image-url="text2ImageParamsR.canny" 
                  @on-upload="handleImageUpload"
                  @on-remove="handleImageRemove"
                />
              </el-form-item>
            </el-col>
            <el-col :span="16">
              <el-form-item label="生成次数">
                <el-slider
                  v-model="text2ImageParamsR.batch_size"
                  :min="1"
                  :max="50"
                  show-input
                  :show-input-controls="false"
                />
              </el-form-item>
              <el-form-item label="每次数量">
                <el-slider
                  v-model="text2ImageParamsR.n_iter"
                  :min="1"
                  :max="10"
                  show-input
                  :show-input-controls="false"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="LoRA模型">
            <el-radio-group 
              v-model="text2ImageParamsR.lora" 
            >
              <el-radio-button
                v-for="item in LORA_MODEL" 
                :label="item.label" 
                :value="item.value" 
              />
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <div class="image-container">
            <div
              class="image-wrapper" 
              v-if="imageListR.length"
              v-for="(image, index) in imageListR"
            >
              <img  
                :src="`data:image/jpeg;base64,${image}`" 
                class="image-item"
                alt="图片生成失败，请重试..."
              />
              <el-button 
                type="primary" 
                class="collect-btn" 
                @click="collectImage(image)"
              >
                收藏
              </el-button>
            </div>
          </div>
        </el-col>
      </el-row>
    </el-form>
  </el-card>
</template>

<style scoped>
  .flex-wrapper {
    justify-content: space-between;
    align-items: center;
  }
  .form-button {
    width: 160px;
    height: 40px;
  }
  .image-container {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
  }
  .image-wrapper {
    margin: 10px;
  }
  .image-item {
    width: 260px;
    height: 'auto';
    object-fit: contain;
  }
  .collect-btn {
    top: 50%;
    transform: translateY(-50%);
    margin-left: 10px;
  }
</style>