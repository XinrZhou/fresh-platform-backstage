<script setup lang='ts'>
  import { defineProps, computed,toRaw, ref, defineEmits, watch } from 'vue';
  import { useCategoryStore } from '@/store/admin/category';
  import { useBrandStore } from '@/store/admin/brand';
  import { useSpuStore } from '@/store/admin/spu';
  import { ElMessage, ElMessageBox } from 'element-plus';
  import { Spu } from '@/types/type';
  import { OPERATION_TYPE, CATEGORY_OPTIONS, CATEGORY_LEVEL } from '@/constant/enums';
  import BaseUpload from '@/components/BaseUpload.vue';

  const props = defineProps([
    'dialogVisible', 'categoryData', 'operationType'
  ]);
  const emits = defineEmits(['onDialogClose',]);

  const categoryStore = useCategoryStore();
  categoryStore.getCategories();
  const categoryTreeOptionsC = computed(() => categoryStore.categoryTreeOptions);
  
  const brandStore = useBrandStore();
  const brandListOptionsC = computed(() => brandStore.brandListOptions);

  let spuR = ref<Spu>({saleStatus: 1});

  const cascaderProps = {
    label: 'name',
    value: 'id',
  }

  watch(() => categoryStore.imageUrl, () => {
    spuR.value.imageUrl = toRaw(categoryStore.imageUrl);
  })

  watch(() => props.categoryData, () => {
    spuR.value = props.categoryData;
  })

  const handleCascaderChange = (cids: string[]) => {
    brandStore.getBrandsByCategoryId(cids[cids.length - 1]);
  }

  const onCancel = () => {
    emits('onDialogClose');
    spuR.value = {};
  }

  const handleImageUpload = (file) => {
    categoryStore.uploadImage(file);
  }

  const handleImageRemove = () => {
    spuR.value.imageUrl = '';
  }

  const addCategory = () => {
    categoryStore.addCategory(spuR.value).then(() => {
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
          :options="categoryTreeOptionsC"
          :props="cascaderProps"
          @change="handleCascaderChange"
        />
      </el-form-item>
      <el-form-item label="关联品牌" required >
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
          v-model="spuR.title" 
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