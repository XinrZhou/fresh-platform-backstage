<script setup lang='ts'>
  import { ref } from 'vue';
  import type { FormInstance } from 'element-plus';
  import { base64ToFile } from "@/utils";
  import { STYLE_LIST, RESOLUTION_LIST } from '@/constant/common'
  import { useOssStore } from '@/store/user/oss';
  import { useMaterialStore } from '@/store/user/material';
  
  const ossStore = useOssStore();
  const materialStore = useMaterialStore();

  const formDataR = ref({})
  const loading = ref(false)
  const ruleFormRef = ref<FormInstance>(null);
  
  const generateImages = () => {
    ruleFormRef.value?.validate((valid, fields) => {
      if (valid) {
        console.log('generateImage', formDataR.value)
      }
    }) 
  }
</script>

<template>
  <el-card>
    <h3>智能文生图</h3>
    <el-form 
      :model="formDataR" 
      ref="ruleFormRef"
      label-width="120" 
      class="form-container"
    >
      <el-form-item label="提示词示例">
        <div class="description-wrapper">
          盛开的玫瑰花
        </div>
        <div class="description-wrapper">
          阳光下新鲜的橙子
        </div>
      </el-form-item>
      <el-form-item label="正向提示词" prop="prompt" required>
        <el-input 
          v-model="formDataR.prompt" 
          size="large"
        />
      </el-form-item>
      <el-form-item label="反向提示词" prop="negativePrompt">
        <el-input 
          v-model="formDataR.negativePrompt"
          size="large"
        />
      </el-form-item>
      <el-form-item label="绘画风格" prop="styles" required >
        <el-radio-group v-model="formDataR.styles" size="large">
          <el-radio-button 
            v-for="item in STYLE_LIST" 
            :key="item.value" 
            :label="item.value" 
          >
            {{item.label}}
          </el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="尺寸与分辨率" prop="resultConfig">
        <el-radio-group v-model="formDataR.resultConfig" size="large">
          <el-radio-button
            v-for="item in RESOLUTION_LIST"
            :key="item.value"
            :label="item.value"
          >
            {{ item.label }}
          </el-radio-button>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <el-row>
      <el-col :span="24">
        <el-button 
          type="primary" 
          size="large" 
          class="submit-btn"
          @click="generateImages"
        >
          生成图片
        </el-button>
        <el-text type="info">
          图片由AI随机生成，请及时保存/收藏至素材库
        </el-text>
      </el-col>
    </el-row>
    <div class="picture-container" v-loading="loading">
      <image  />
    </div>
  </el-card>
</template>

<style scoped>
  .form-container {
    margin-top: 16px;
  }
  .description-wrapper {
    margin-right: 10px;
    padding-left: 12px;
    padding-right: 12px;
    border-radius: 16px;
    font-size: 12px;
    background-color: #c6e6e8;
  }
  .el-radio-button {
    margin-right: 16px;
    margin-bottom: 8px;
    border: none;
    border-left: 1px solid #dcdfe6;
  }
  .el-radio-button:first-child {
    border-left: none;
  }
  .el-radio-button__original-radio {
    border: none;
  }
  .submit-btn {
    margin-top: -6px;
    margin-left: 16px;
    margin-right: 6px;
  }
</style>