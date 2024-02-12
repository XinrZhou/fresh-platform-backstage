<script setup lang='ts'>
  import { defineProps, computed,toRaw, ref, defineEmits, watch } from 'vue';
  import { useCategoryStore } from '@/store/admin/category';
  import { ElMessage, ElMessageBox } from 'element-plus';
  import { Category } from '@/types/type';
  import { OPERATION_TYPE, CATEGORY_OPTIONS, CATEGORY_LEVEL } from '@/constant/enums';
  import BaseUpload from '@/components/BaseUpload.vue';

  const categoryStore = useCategoryStore();

  const props = defineProps([
    'dialogVisible', 'categoryData', 'operationType'
  ]);
  const emits = defineEmits(['onDialogClose',]);

  const parentLevelOptionsC = computed(() => categoryStore.parentLevelOptions);
  let categoryR = ref<Category>({status: 1});

  watch(() => categoryStore.imageUrl, () => {
    categoryR.value.imageUrl = toRaw(categoryStore.imageUrl);
  })

  watch(() => props.categoryData, () => {
    categoryR.value = props.categoryData;
    categoryR.value.parentId && handleLevelChange(categoryR.value.level)
  })

  const handleLevelChange = (level) => {
    categoryStore.getParentLevelOptions(level - 1);
  }

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
    categoryStore.addCategory(categoryR.value).then(() => {
      ElMessage.success(`${props.operationType.title}成功！`);
      emits('onDialogClose');
    });
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
      <el-form-item label="是否使用">
        <el-switch 
          v-model="categoryR.status"
          :active-value="1"
          :inactive-value="0"
        />
      </el-form-item>
      <el-form-item label="类目层级">
        <el-select
          v-model="categoryR.level"
          placeholder="Select"
          :disabled="props.operationType.name === OPERATION_TYPE.EDIT.name"
          @change="handleLevelChange"
        >
          <el-option
            v-for="item in CATEGORY_OPTIONS"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item 
        label="上级类目" 
        v-show="categoryR.level &&categoryR.level !== CATEGORY_LEVEL.FIRST"
      >
        <el-select
          v-model="categoryR.parentId"
          placeholder="请选择类目"
          clearable 
        >
          <el-option 
            v-for="item in parentLevelOptionsC" 
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