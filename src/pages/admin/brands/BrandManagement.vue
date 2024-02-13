<script setup lang='ts'>
  import { ref, computed } from 'vue';
  import { ElMessage, ElMessageBox } from 'element-plus'
  import { OPERATION_TYPE } from '@/constant/enums';
  import { useBrandStore } from '@/store/admin/brand';
  import { Brand } from "@/types/type";
  import { BRAND_SCHEMA, BRAND_UI_SCHEMA } from './schema';
  import BaseDialog from '@/components/BaseDialog.vue';

  const brandStore = useBrandStore();
  brandStore.getBrands();

  const brandListC = computed(() => brandStore.brandList);
  let dialogVisibleR = ref<Boolean>(false);
  let operationTypeR = ref<string>('');
  let brandDataR = ref({});

  const handleClose = () => {
    brandDataR.value = {};
    dialogVisibleR.value = false;
  }

  const handleEdit = (data: brand) => {
    dialogVisibleR.value = true;
    operationTypeR.value = OPERATION_TYPE.EDIT;
    brandDataR.value = data;
  }

  const handleAdd = () => {
    dialogVisibleR.value = true;
    operationTypeR.value = OPERATION_TYPE.ADD;
  }

  const handleDelete = (brand: Brand) => {
    ElMessageBox.confirm(
      `是否确认删除<span style="color:red">${brand.name}</span>品牌？`, 
      'Tips', 
      {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning',
        dangerouslyUseHTMLString: true
      }
    )
    .then(() => {
      brandStore.deleteBrand(brand.id);
    })
    .then(() => {
      handleClose();
      ElMessage.success('删除成功！');
    });
  }

  const handleSubmit = (brandData: Brand) => {
    brandStore.addBrand(brandData).then(() => {
      ElMessage.success(`${operationTypeR.value.title}成功！`);
      handleClose();
    });
  }
</script>

<template>
  <el-row gutter="24">
    <el-col :span="24">
      <el-card>
        <el-button
          class="operation-btn"
          type="primary"
          :underline="false"
          @click="handleAdd"
        >
          添加
        </el-button>
        <el-table :data="brandListC" style="width: 100%" stripe border max-height="600">
          <el-table-column prop="id" label="id"/>
          <el-table-column prop="name" label="品牌名称" />
          <el-table-column prop="categoryName" label="关联类目"/>
          <el-table-column fixed="right" label="操作" width="120">
            <template #default="scope">
              <el-button link type="primary" size="small" @click="handleEdit(scope.row)">
                编辑
              </el-button>
              <el-button link type="primary" size="small" @click="handleDelete(scope.row)">
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>
  </el-row>
  <BaseDialog
    :schema='BRAND_SCHEMA'
    :ui-schema="BRAND_UI_SCHEMA"
    :operation-type="operationTypeR" 
    :dialog-visible="dialogVisibleR" 
    :form-data="brandDataR"
    @on-data-submit="handleSubmit"
    @on-dialog-close="handleClose"
  />
</template>

<style scoped>
  .operation-btn {
    float: right;
    margin-bottom: 10px;
    margin-right: 10px;
  }
</style>