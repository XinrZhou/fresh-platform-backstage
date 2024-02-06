<script setup lang='ts'>
  import { defineProps, computed,toRaw, ref, defineEmits, watch } from 'vue';
  import { useCategoryStore } from '@/store/admin/category';
  import { OPERATION_TYPE } from '@/constant/enums';
  import BaseUpload from '@/components/BaseUpload.vue';

  const categoryStore = useCategoryStore();

  const parentCategoryListC = computed(() => categoryStore.parentCategoryList);
  const props = defineProps([
    'dialogVisible', 'categoryData', 'operationType'
  ]);
  const emits = defineEmits(['onDialogClose',]);

  let categoryR = ref<Category>({});

  watch(() => categoryStore.imageUrl, () => {
    categoryR.value.imageUrl = toRaw(categoryStore.imageUrl);
  })

  watch(() => props.categoryData, () => {
    categoryR.value = props.categoryData;
  })

  const onCancel = () => {
    emits('onDialogClose');
    categoryR.value = {};
  }

  const handleImageUpload = (file) => {
    categoryStore.uoloadImage(file);
  }

  const handleImageRemove = () => {
    categoryR.value.imageUrl = '';
  }

  const addCategory = () => {
    categoryStore.addCategory(categoryR.value).then(() =>emits('onDialogClose'));
  }

  const onDialogOpen = () => {
    categoryStore.getParentCategories();
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
      <el-form-item label="根类目">
        <el-switch 
          v-model="categoryR.isParent"
          :active-value="1"
          :inactive-value="0"
          :disabled="props.operationType.name === OPERATION_TYPE.EDIT.name"
        />
      </el-form-item>
      <el-form-item label="上级类目" v-show="!categoryR.isParent">
        <el-select
          v-model="categoryR.parentId"
          placeholder="请选择类目"
          clearable 
        >
          <el-option 
            v-for="item in parentCategoryListC" 
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="类目名称" label-width="100px">
        <el-input v-model="categoryR.name" />
      </el-form-item>
      <el-form-item label="类目图片">
        <BaseUpload 
          :image-url="categoryR.imageUrl" 
          @on-upload="handleImageUpload"
          @on-remove="handleImageRemove"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addCategory">确定</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<style scoped>

</style>