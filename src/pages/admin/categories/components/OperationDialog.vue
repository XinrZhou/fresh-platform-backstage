<script setup lang='ts'>
  import { computed, ref, watch } from 'vue';
  import { useCategoryStore } from '@/store/admin/category';
  import { useOssStore } from '@/store/user/oss';
  import { ElMessage } from 'element-plus';
  import { DEFAULT_PAGE, DEFAULT_PAGESIZE } from '@/constant/enums';
  import type { FormInstance } from 'element-plus';
  import { Category } from '@/types/type';
  import { OPERATION_TYPE, CATEGORY_LEVEL, CATEGORY_OPTIONS } from '@/constant/enums';
  import BaseUpload from '@/components/BaseUpload.vue';
  
  const categoryStore = useCategoryStore();
  const parentLevelOptionsC = computed(() => categoryStore.parentLevelOptions);
  const ossStore = useOssStore();
  
  const props = defineProps(['dialogVisible', 'categoryData', 'operationType']);
  const emits = defineEmits(['onDialogClose', 'changeExpandedKeys', 'getDataList']);
  
  const ruleFormRef = ref<FormInstance>(null);
  const categoryR = ref<Category>({});
  
  watch(() => ossStore.imageUrl, () => {
    categoryR.value.imageUrl = ossStore.imageUrl;
  });
  
  watch(() => props.categoryData, () => {
    categoryR.value = props.categoryData;
    if (categoryR.value.parentId && categoryR.value.level) {
      handleLevelChange(categoryR.value.level);
    }
  });
  
  const handleLevelChange = (level: number) => {
    categoryStore.getParentLevelOptions(level - 1);
  };
  
  const onCancel = () => {
    emits('onDialogClose');
    categoryR.value = {};
  };
  
  const handleImageUpload = (file: File) => {
    ossStore.uploadImage(file);
  };
  
  const handleImageRemove = () => {
    categoryR.value.imageUrl = '';
  };
  
  const addCategory = () => {
    ruleFormRef.value?.validate((valid, fields) => {
      if (valid) {
        categoryStore.addCategory(categoryR.value).then(() => {
          emits('getDataList');
          emits('changeExpandedKeys', categoryR.value.parentId);
          emits('onDialogClose');
          ElMessage.success(`${props.operationType.title}成功！`);
        });
      } else {
        ElMessage.error('请填写必要表单项！');
      }
    });
  };
</script>
  
<template>
  <el-dialog 
    :model-value="props.dialogVisible"
    :title="props.operationType.title"
    width="500"
    @close="onCancel"
    @open="onDialogOpen"
  >
    <el-form label-width="100" ref="ruleFormRef" :model="categoryR">
      <el-form-item label="是否使用" prop="status" required>
        <el-switch 
          v-model="categoryR.status"
          :active-value="1"
          :inactive-value="0"
        />
      </el-form-item>
      <el-form-item label="类目层级" prop="level" required>
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
        prop="parentId" 
        label="上级类目" 
        v-show="categoryR.level && categoryR.level !== CATEGORY_LEVEL.FIRST"
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
      <el-form-item label="类目名称" prop="name" required>
        <el-input v-model="categoryR.name" />
      </el-form-item>
      <el-form-item label="类目图片" prop="imageUrl">
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
  