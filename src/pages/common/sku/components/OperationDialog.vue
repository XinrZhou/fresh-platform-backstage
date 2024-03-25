<script setup lang='ts'>
  import { computed, toRaw, ref, watch } from 'vue';
  import { useSpuStore } from '@/store/user/spu';
  import { useOssStore } from '@/store/user/oss';
  import { useSkuStore } from '@/store/user/sku';
  import { useCategoryStore } from '@/store/admin/category';
  import { ElMessage } from 'element-plus';
  import type { FormInstance} from 'element-plus';
  import { Sku } from '@/types/type';
  import { OPERATION_TYPE, CATEGORY_OPTIONS, CATEGORY_LEVEL, IMAGE_TYPE, } from '@/constant/enums';
  import BaseUpload from '@/components/BaseUpload.vue';

  const props = defineProps([
    'dialogVisible', 'skuData', 'operationType', 'spuInfo'
  ]);
  const emits = defineEmits(['onDialogClose', 'getDataList']);
  
  const skuStore = useSkuStore();
  const skuR = ref<Sku>({ 
      isDeault: 1,
      enable: 1, 
      name: '',
      unit: '',
    });
  const imageTypeR = ref<String>('');

  watch(() => props.skuData, () => {
    skuR.value = props.skuData;
  })

  const spuStore = useSpuStore();
  const spuOptionsListC = computed(() => spuStore.spuOptionsList);

  const categoryStore = useCategoryStore();
  categoryStore.getCategoriesOptions();
  const categoryTreeOptionsC = computed(() => categoryStore.categoryTreeOptions);

  const ossStore = useOssStore();
  const handleImageUpload = (file, imageType) => {
    imageTypeR.value = imageType;
    ossStore.uploadImage(file);
  }
  const handleImageRemove = () => {
    skuR.value.imageUrl = '';
  }
  watch(() => ossStore.imageUrl, () => {
    if (imageTypeR.value === IMAGE_TYPE.MAIN) {
      skuR.value.imageUrl = toRaw(ossStore.imageUrl);
    } else {
      skuR.value.detailImageUrl = toRaw(ossStore.imageUrl);
    }
  })

  const ruleFormRef = ref<FormInstance>(null);

  const onCancel = () => {
    emits('onDialogClose');
    skuR.value = {};
  }

  const handleSubmit = () => {
    ruleFormRef.value.validate((valid, fields) => {
      if (valid) {
        skuStore.addSku({...toRaw(skuR.value), spuId: props.spuInfo.id}).then(() => {
          ElMessage.success(`${props.operationType.title}成功！`);
          emits('getDataList');
          emits('onDialogClose'); 
        });
      } else {
        Elmessage.error('请填写必要表单项！');
      }
    });
  }
</script>

<template>
  <el-dialog 
    :model-value="props.dialogVisible"
    :title=props.operationType.title
    width="600"
    @close="onCancel"
    @open="onDialogOpen"
  >
    <el-form label-width="100" ref="ruleFormRef" :model="skuR">
      <el-form-item label="SKU名称" prop="name" required >
        <el-input v-model="skuR.name" />
      </el-form-item>
      <el-form-item label="是否有效" prop="enable" required >
        <el-switch 
          v-model="skuR.enable"
          :active-value="1"
          :inactive-value="0"
        />
      </el-form-item>
      <el-form-item label="商品描述" prop="description">
        <el-input
          type="textarea" 
          v-model="skuR.description" 
        />
      </el-form-item>
      <el-form-item label="库存" prop="stock" required >
        <el-input-number 
          v-model="skuR.stock" 
          :min="1" 
          :max="99999"
        />
      </el-form-item>
      <el-form-item label="原始价格" prop="originPrice" required >
        <el-input-number 
          v-model="skuR.originPrice" 
          :precision="2" 
          :step="0.1" 
          :max="999999" 
        />
      </el-form-item>
      <el-form-item label="折扣价格" prop="discountPrice" required >
        <el-input-number 
          v-model="skuR.discountPrice" 
          :precision="2" 
          :step="0.1" 
          :max="999999" 
        />
      </el-form-item>
      <el-form-item label="单位" prop="unit" required >
        <el-input v-model="skuR.unit" />
      </el-form-item>
      <el-form-item label="商品主图" prop="imageUrl" required>
        <BaseUpload 
          :image-url="skuR.imageUrl" 
          :image-type="IMAGE_TYPE.MAIN"
          @on-upload="handleImageUpload"
          @on-remove="handleImageRemove"
        />
      </el-form-item>
      <el-form-item label="商品详情图" prop="detailImageUrl" required>
        <BaseUpload 
          :image-url="skuR.detailImageUrl" 
          :image-type="IMAGE_TYPE.DETAIL"
          @on-upload="handleImageUpload"
          @on-remove="handleImageRemove"
        />
      </el-form-item>
      <el-form-item>
        <el-button 
          type="primary" 
          @click="handleSubmit"
        >
          提交
        </el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<style scoped>
  .el-icon {
    margin-top: 8px;
    margin-left: 16px;
    cursor: pointer;
  }
</style>