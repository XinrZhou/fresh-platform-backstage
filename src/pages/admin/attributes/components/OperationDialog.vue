<script setup lang='ts'>
  import { defineProps, computed,toRaw, ref, defineEmits, watch } from 'vue';
  import { useCategoryStore } from '@/store/admin/category';
  import { useAttributeStore } from '@/store/admin/attribute';
  import { ElMessage, ElMessageBox } from 'element-plus';
  import { Attribute, AttributeParam } from '@/types/type';
  import { OPERATION_TYPE, CATEGORY_OPTIONS, CATEGORY_LEVEL } from '@/constant/enums';
  import BaseUpload from '@/components/BaseUpload.vue';

  const attributeStore = useAttributeStore();
  const categoryStore = useCategoryStore();
  categoryStore.getCategories();

  const props = defineProps([
    'dialogVisible', 'attributeData', 'operationType'
  ]);
  const emits = defineEmits(['onDialogClose',]);

  const categoryTreeOptionsC = computed(() => categoryStore.categoryTreeOptions);
  let attributeR = ref<Attribute>({});

  watch(() => props.attributeData, () => {
    attributeR.value = props.attributeData;
  })


  const onCancel = () => {
    emits('onDialogClose');
    attributeR.value = {};
  }

  const addAttribute = () => {
    attributeStore.addAttribute(attributeR.value).then(() => {
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
    <el-form label-width="120">
      <el-form-item label="名称">
        <el-input v-model="attributeR.name" />
      </el-form-item>
      <el-form-item label="关联类目">
        <el-cascader
          v-model="attributeR.categoryId"
          :options="categoryTreeOptionsC"
          :props="{ label: 'name', value: 'id', checkStrictly: true, }"
          @change="handleChange"
        />
      </el-form-item>
      <el-form-item label="是否数字类型">
        <el-switch 
          v-model="attributeR.isNumeric"
          :active-value="1"
          :inactive-value="0"
        />
      </el-form-item>
      <el-form-item label="单位" v-if="attributeR.isNumeric">
        <el-input v-model="attributeR.unit" />
      </el-form-item>
      <el-form-item label="是否通用属性">
        <el-switch 
          v-model="attributeR.isGeneric"
          :active-value="1"
          :inactive-value="0"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addAttribute">确定</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<style scoped>

</style>