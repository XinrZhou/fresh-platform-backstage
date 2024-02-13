<script setup lang='ts'>
  import { ref, computed } from 'vue';
  import { ElMessage, ElMessageBox } from 'element-plus';
  import { Category } from '@/types/type';
  import { OPERATION_TYPE, CATEGORY_LEVEL } from '@/constant/enums';
  import { useCategoryStore } from '@/store/admin/category';
  import OperationDialog from './components/OperationDialog.vue';

  const categoryStore = useCategoryStore();
  categoryStore.getCategories();

  const categoryList = computed(() => categoryStore.categoryList);
  const categoryTreeList = computed(() => categoryStore.categoryTreeList);

  let dialogVisibleR = ref<Boolean>(false);
  let operationTypeR = ref<string>('');
  let categoryDataR = ref<Category>({status: 1});

  const handleClose = () => {
    categoryDataR.value = {};
    dialogVisibleR.value = false;
  }

  const handleAdd = () => {
    dialogVisibleR.value = true;
    operationTypeR.value = OPERATION_TYPE.ADD;
    categoryDataR.value = {level: currentNodeR.value.level};
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
      ElMessage.success('删除成功！');
    });
  }

  const handleNodeClick = (data: Category) => {
    categoryDataR.value = data;
    if (data.level) {
      if (data.level !== CATEGORY_LEVEL.THIRD) {
        categoryStore.getCategoriesByParentId(data.id);
      } else {
        ElMessage.success('三级类目无子类目！')
      }
    } else {
      categoryStore.getCategories();
    }
  }
</script>

<template>
  <div>
    <el-row justify="space-around">
      <el-col :span="4">
        <el-card>
          <el-tree
            :data="categoryTreeList"
            :props="{ children: 'children', label: 'name'}"
            :expand-on-click-node="false"
            accordion
            highlight-current
            default-expand-all
            @node-click="handleNodeClick"
          />
        </el-card>
      </el-col>
      <el-col :span="19">
        <el-card>
          <div class="btn-wrapper">
            <el-button 
              type="primary" 
              @click="handleEdit(categoryDataR)" 
              :disabled="!categoryDataR.id"
            >
              编辑
            </el-button>
            <el-button type="primary" @click="handleAdd">
              新增
            </el-button>
          </div>
          <el-table :data="categoryList" style="width: 100%" stripe border max-height="800">
            <el-table-column prop="id" label="类目id" width="200"/>
            <el-table-column prop="level" label="类目层级" />
            <el-table-column prop="name" label="类目名称" />
            <el-table-column fixed="right" label="类目图片" width="130">
              <template #default="scope">
                <el-image :src="scope.row.imageUrl"/>
              </template>
            </el-table-column>
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
      @on-dialog-close="handleClose"
    />
  </div>
</template>

<style scoped>
  .btn-wrapper {
    margin-bottom: 10px;
  }
  .el-row {
    width: 100%;
  }
  .el-image {
    width: 100px;
    height: 100px;
  }
</style>