<script setup lang='ts'>
  import { ref, computed, watchEffect } from 'vue';
  import { ElMessage, ElMessageBox } from 'element-plus'
  import { Category } from '@/types/type';
  import { OPERATION_TYPE } from '@/constant/enums';
  import { useCategoryStore } from '@/store/admin/category';
  import BaseDialog from '@/components/BaseDialog.vue';
  import OperationDialog from './components/OperationDialog.vue';

  const categoryStore = useCategoryStore();
  categoryStore.getCategories();

  const categoryList = computed(() => categoryStore.categoryList);

  let dialogVisibleR = ref<Boolean>(false);
  let operationTypeR = ref<string>('');
  const categoryDataR = ref<Category>({});

  const onDialogClose = () => {
    categoryDataR.value = {};
    dialogVisibleR.value = false;
  }

  const handleAdd = () => {
    dialogVisibleR.value = true;
    operationTypeR.value = OPERATION_TYPE.ADD;
  }

  const handleEdit = (data: Category) => {
    dialogVisibleR.value = true;
    operationTypeR.value = OPERATION_TYPE.EDIT;
    categoryDataR.value = data;
  }

  const handleDelete = (cid: string) => {
    ElMessageBox.confirm('是否确认删除？', 'Tips', {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      type: 'warning',
    })
    .then(() => {
      categoryStore.deleteCategory(cid);
    });
  }
</script>

<template>
  <div>
    <el-row gutter="24">
      <el-col :span="24">
        <el-card>
          <el-link
            type="primary"
            :underline="false"
            @click="handleAdd"
          >
            添加
          </el-link>
          <el-table :data="categoryList" style="width: 100%" stripe border max-height="600">
            <el-table-column prop="id" label="类目id"/>
            <el-table-column label="类目层级">
              <template #default="scope">
                <span>
                  {{ scope.row.parentName ? "二级" : "一级" }}
                </span>
              </template>
            </el-table-column>
            <el-table-column label="类目名称">
              <template #default="scope">
                <span>
                  {{ 
                    scope.row.parentName ? 
                      `${scope.row.parentName} > ${scope.row.categoryName}` : 
                      scope.row.categoryName
                   }}
                </span>
              </template>
            </el-table-column>
            <el-table-column fixed="right" label="类目图片" width="200">
              <template #default="scope">
                <el-image :src="scope.row.imageUrl" :fit="fit" />
              </template>
            </el-table-column>
            <el-table-column prop="updateTime" label="修改时间" />
            <el-table-column fixed="right" label="操作" width="120">
              <template #default="scope">
                <el-button link type="primary" size="small" @click="handleEdit(scope.row)">
                  编辑
                </el-button>
                <el-button link type="primary" size="small" @click="handleDelete(scope.row.id)">
                  删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
    <OperationDialog
      :operationType="operationTypeR" 
      :dialogVisible="dialogVisibleR" 
      :categoryData="categoryDataR"
      @closeDialog="onDialogClose"
    />
    <!-- <BaseDialog 
      :operationType="operationTypeR" 
      :dialogVisible="dialogVisibleR" 
      :formData="categoryDataR"
      @closeDialog="onDialogClose"
    /> -->
  </div>
</template>

<style scoped>
  .el-link {
    float: right;
    margin-bottom: 10px;
    margin-right: 10px;
  }
  .el-row {
    width: 100%;
  }
  .el-image {
    width: 100px;
    height: 100px;
  }
</style>