<script setup lang='ts'>
  import { defineProps, computed, ref, defineEmits, watch } from 'vue';
  import { useCategoryStore } from '@/store/admin/category';
  import BaseUpload from '@/components/BaseUpload.vue';

  const categoryStore = useCategoryStore();

  const parentCategoryListC = computed(() => categoryStore.parentCategoryList);
  const props = defineProps(['dialogVisible', 'categoryData']);
  const emits = defineEmits(['closeDialog',]);

  let categoryR = ref<Category>({});

  watch(() => categoryStore.imageUrl, () => {
    categoryR.value.imageUrl = categoryStore.imageUrl;
  })

  watch(() => props.categoryData, () => {
    categoryR.value = props.categoryData;
    categoryR.value.updateTime = '';
  })

  const onCancel = () => {
    categoryR.value = {};
    emits('closeDialog');
  }

  const onImageUpload = (file) => {
    categoryStore.uoloadImage(file);
  }

  const onImageRemove = () => {
    categoryR.value.imageUrl = '';
  }

  const addCategory = () => {
    categoryStore.addCategory(categoryR.value).then(() => onCancel())
  }

  const onDialogOpen = () => {
    categoryStore.getParentCategories();
  }

</script>

<template>
  <el-dialog 
    :model-value="props.dialogVisible"
    title="添加类目"
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
        />
      </el-form-item>
      <el-form-item label="上级类目">
        <el-select
          v-model="categoryR.parentId"
          :disabled="categoryR.isParent"
          clearable 
        >
          <el-option 
            v-for="item in parentCategoryListC" 
            :key="item.id"
            :label="item.categoryName"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="类目名称" label-width="100px">
        <el-input v-model="categoryR.categoryName" />
      </el-form-item>
      <el-form-item label="类目图片">
        <BaseUpload 
          :imageUrl="categoryR.imageUrl" 
          @onUpload="onImageUpload"
          @onRemove="onImageRemove"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addCategory">添加</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<style scoped>

</style>