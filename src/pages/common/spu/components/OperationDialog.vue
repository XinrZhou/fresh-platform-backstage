<script setup lang='ts'>
  import { computed, toRaw, ref, watch } from 'vue';
  import router from '@/router';
  import { ElMessage, ElMessageBox } from 'element-plus';
  import { useCategoryStore } from '@/store/admin/category';
  import { useBrandStore } from '@/store/admin/brand';
  import { useOssStore } from '@/store/user/oss';
  import { useSpuStore } from '@/store/user/spu';
  import { IMAGE_TYPE } from '@/constant/enums';
  import { Spu } from '@/types/type';
  import { OPERATION_TYPE, CATEGORY_OPTIONS, CATEGORY_LEVEL } from '@/constant/enums';
  import BaseUpload from '@/components/BaseUpload.vue';

  const props = defineProps([
    'dialogVisible', 'spuData', 'operationType'
  ]);
  const emits = defineEmits(['onDialogClose', 'getDataList']);

  const categoryStore = useCategoryStore();
  categoryStore.getCategoriesOptions();
  const categoryTreeOptionsC = computed(() => categoryStore.categoryTreeOptions);
  
  const brandStore = useBrandStore();
  const brandListOptionsC = computed(() => brandStore.brandListOptions);

  const ossStore = useOssStore();
  const spuStore = useSpuStore();

  const spuR = ref<Spu>({saleStatus: 1});
  const imageTypeR = ref<String>('');

  const cascaderProps = {
    label: 'name',
    value: 'id',
  }

  watch(() => ossStore.imageUrl, () => {
    if (imageTypeR.value === IMAGE_TYPE.MAIN) {
      spuR.value.imageUrl = toRaw(ossStore.imageUrl);
    } else {
      spuR.value.detailImageUrl = toRaw(ossStore.imageUrl);
    }
    
  })

  watch(() => props.spuData, () => {
    spuR.value = props.spuData;
  })

  const handleCascaderChange = (cids: string[]) => {
    brandStore.getBrandsByCategoryId(cids[cids.length - 1]);
  }

  const onDialogOpen = () => {
    if (props.operationType.name === OPERATION_TYPE.EDIT.name) {
      brandStore.getBrandsByCategoryId(props.spuData.categoryId);
    }
  }

  const onCancel = () => {
    emits('onDialogClose');
    spuR.value = {};
  }

  const handleImageUpload = (file, imageType) => {
    imageTypeR.value = imageType;
    ossStore.uploadImage(file);
  }

  const handleImageRemove = () => {
    if (imageTypeR.value === IMAGE_TYPE.MAIN) {
      spuR.value.imageUrl = ''; 
    } else {
      spuR.value.detailImageUrl = ''; 
    }
  }

  const addSpu = () => {
    spuStore.addSpu(toRaw(spuR.value)).then(() => {
      ElMessage.success(`${props.operationType.title}成功！`);
      emits('onDialogClose');
      emits('getDataList');
    });
  }

  const addBrand = () => {
    router.push("/supplier/brand");
  }
</script>

<template>
  <el-dialog 
    :model-value="props.dialogVisible"
    :title=props.operationType.title
    width="500"
    @close="onCancel"
    @open="onDialogOpen"
  >
    <el-form label-width="100">
      <el-form-item label="商品名称" required >
        <el-input v-model="spuR.name" />
      </el-form-item>
      <el-form-item label="商品标题" required >
        <el-input
          type="textarea" 
          v-model="spuR.title" 
        />
      </el-form-item>
      <el-form-item label="关联类目" required >
        <el-cascader
          v-model="spuR.categoryId"
          :options="categoryTreeOptionsC"
          :props="cascaderProps"
          @change="handleCascaderChange"
        />
      </el-form-item>
      <el-form-item label="关联品牌" required >
        <el-row style="width: 100%;">
          <el-col :span="16">
            <el-select
              v-model="spuR.brandId"
            >
              <el-option
                v-for="item in brandListOptionsC"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-col>
          <el-col :span="6">
            <el-button
              @click="addBrand" 
              type="primary" 
              link
            >
              +申请新品牌
            </el-button>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="是否上架" required >
        <el-switch 
          v-model="spuR.saleStatus"
          :active-value="1"
          :inactive-value="0"
        />
      </el-form-item>
      <el-form-item label="商品描述" >
        <el-input
          type="textarea" 
          v-model="spuR.description" 
        />
      </el-form-item>
      <el-form-item label="商品主图" required>
        <BaseUpload 
          :image-url="spuR.imageUrl" 
          :image-type="IMAGE_TYPE.MAIN"
          @on-upload="handleImageUpload"
          @on-remove="handleImageRemove"
        />
      </el-form-item>
      <el-form-item label="商品详情图" required>
        <BaseUpload 
          :image-url="spuR.detailImageUrl" 
          :image-type="IMAGE_TYPE.DETAIL"
          @on-upload="handleImageUpload"
          @on-remove="handleImageRemove"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addSpu">确定</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<style scoped>

</style>