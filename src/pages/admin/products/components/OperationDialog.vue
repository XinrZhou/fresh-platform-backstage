<script setup lang='ts'>
  import { defineProps, computed,toRaw, ref, defineEmits, watch } from 'vue';
  import { useCategoryStore } from '@/store/admin/category';
  import { useSpuStore } from '@/store/admin/spu';
  import { ElMessage, ElMessageBox } from 'element-plus';
  import type { FormInstance} from 'element-plus';
  import { Category } from '@/types/type';

  const categoryStore = useCategoryStore();
  const categoryTreeOptionsC = computed(() => categoryStore.categoryTreeOptions);

  const spuStore = useSpuStore();
  const spuOptionsListC = computed(() => spuStore.spuOptionsList);

  const props = defineProps(['dialogVisible']);
  const emits = defineEmits(['onDialogClose', 'onSubmit']);
  
  const formDataR = ref({spuIds: []});
  const selectCheckedR = ref(false);
  const ruleFormRef = ref<FormInstance>(null);
  const cascaderProps = {
    label: 'name',
    value: 'id',
    checkStrictly: true,
  }

  const onDialogOpen = () => categoryStore.getCategoriesOptions();

  const onCancel = () => emits('onDialogClose');

  const onConfirm = () => {
    ruleFormRef.value.validate((valid, fields) => {
      if (valid) {
        console.log('submit!');
        emits('onSubmit', toRaw(formDataR.value));
      } else {
        Elmessage.error('请填写必要表单项！');
      }
    });
  }

  const handleCascaderChange = (cids: string[]) => {
    spuStore.getSpuListByCategoryId(cids[cids.length - 1]);
  }

  const handleSelectAllChange = () => {
    if (selectCheckedR.value) {
      formDataR.value.spuIds = spuOptionsListC.value.map(item => item.id);
    } else {
      formDataR.value.spuIds = [];
    }
  }

  watch(() => formDataR.value.spuIds, (newVal) => {
    selectCheckedR.value = newVal.length === spuOptionsListC.value.length;
  })

</script>

<template>
  <el-dialog 
    :model-value="props.dialogVisible"
    title="添加商品"
    width="500"
    @close="onCancel"
    @open="onDialogOpen"
  >
    <el-form label-width="100" ref="ruleFormRef" :model="formDataR">
      <el-form-item label="类目" prop="categoryId" required >
        <el-cascader
          v-model="formDataR.categoryId"
          :options="categoryTreeOptionsC"
          :props="cascaderProps"
          @change="handleCascaderChange"
        />
      </el-form-item>
      <el-form-item label="商品" prop="spuIds" required >
        <el-select
          :disabled="!formDataR.categoryId" 
          v-model="formDataR.spuIds" 
          placeholder="请选择商品" 
          clearable
          multiple 
          collapse-tags
          collapse-tags-tooltip
        >
          <el-checkbox 
            v-model="selectCheckedR" 
            @change="handleSelectAllChange"
            label="全选"
          />
          <el-option
            v-for="item in spuOptionsListC"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onConfirm">
          确定
        </el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<style scoped>
  .el-checkbox {
    margin-left: 18px;
  }
</style>