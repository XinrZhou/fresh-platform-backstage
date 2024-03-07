<script setup lang='ts'>
  import { ref, computed } from 'vue';
  import { ElMessage, ElMessageBox } from 'element-plus';
  import { Category } from '@/types/type';
  import { DEFAULT_PAGE, DEFAULT_PAGESIZE, OPERATION_TYPE, CATEGORY_LEVEL } from '@/constant/enums';
  import { useCategoryStore } from '@/store/admin/category';
  import OperationDialog from './components/OperationDialog.vue';
  import BasePagination from '@/components/BasePagination.vue';

  const ROOT_LEVEL = 0;
  const defaultCheckedKeys = ref(["0"]);
  const defaultExpandedKeys = ref(["0"]);
  const currentNode = ref({
    level: ROOT_LEVEL,
  });

  const categoryStore = useCategoryStore();
  const getDataList = () => {
    if (currentNode.value.level === ROOT_LEVEL) {
      categoryStore.getCategoriesTree();
      categoryStore.getCategories(DEFAULT_PAGE, DEFAULT_PAGESIZE);
    } else {
      categoryStore.getCategoriesTree();
      categoryStore.getCategoriesByParentId(currentNode.value.id, DEFAULT_PAGE, DEFAULT_PAGESIZE);
    }
  }
  getDataList();

  const totalC = computed(() => categoryStore.total);
  const categoryListC = computed(() => categoryStore.categoryList);
  const categoryTreeListC = computed(() => categoryStore.categoryTreeList);

  const dialogVisibleR = ref<boolean>(false);
  const operationTypeR = ref<string>('');
  const categoryDataR = ref<Category>({
    id: '0',
    level: 0, 
    status: 1,
    name: ''
  });

  const handleClose = () => {
    dialogVisibleR.value = false;
  }

  const handleAdd = () => {
    const isNewRoot = currentNode.value.level === ROOT_LEVEL;
    const newCategoryData = {
      status: 1,
      name: '',
      level: isNewRoot ? categoryDataR.value.level + 1 : currentNode.value.level + 1,
      parentId: isNewRoot ? categoryDataR.value.id : currentNode.value.id
    };

    categoryDataR.value = newCategoryData;
    operationTypeR.value = OPERATION_TYPE.ADD;
    dialogVisibleR.value = true;
  }

  const handleEdit = (data: Category) => {
    dialogVisibleR.value = true;
    operationTypeR.value = OPERATION_TYPE.EDIT;
    categoryDataR.value = data;
  }

  const handleDelete = (category: Category) => {
    const confirmMessage = `是否确认删除<span style="color:red">${category.name}</span>类目？`;
    ElMessageBox.confirm(confirmMessage, 'Tips', {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      type: 'warning',
      dangerouslyUseHTMLString: true
    }).then(() => {
      categoryStore.deleteCategory(category.id, category.parentId).then(() => {
        ElMessage.success('删除成功！');
        getDataList();
      })
    });
  }

  const handleNodeClick = (data: Category) => {
    currentNode.value = data;
    if (categoryDataR.value.id !== data.id) {
      categoryDataR.value = data;
      if (data.level && data.level !== CATEGORY_LEVEL.THIRD) {
        categoryStore.getCategoriesByParentId(data.id, DEFAULT_PAGE, DEFAULT_PAGESIZE);
      } else if (data.level === CATEGORY_LEVEL.THIRD) {
        ElMessage.success('三级类目无子类目！');
      }
    }
  }

  const handleChangeExpandedKeys = (pid) => {
    defaultExpandedKeys.value = ["0", pid];
  }

  const handlePageChange = (page, pageSize) => {
    if (categoryDataR.value.level) {
        categoryStore.getCategoriesByParentId(categoryDataR.value.id, DEFAULT_PAGE, DEFAULT_PAGESIZE);
    } else {
      categoryStore.getCategories(page, pageSize);
    }
  }

</script>

<template>
  <div>
    <el-row justify="space-around">
      <el-col :span="4">
        <el-card>
          <el-tree
            node-key="id"
            :data="categoryTreeListC"
            :props="{ children: 'children', label: 'name'}"
            :expand-on-click-node="false"
            :default-expanded-keys="defaultExpandedKeys"
            :default-checked-keys="defaultCheckedKeys"
            accordion
            highlight-current
            @node-click="handleNodeClick"
          />
        </el-card>
      </el-col>
      <el-col :span="19">
        <el-card>
          <div class="btn-wrapper">
            <el-button 
              type="primary" 
              @click="handleEdit(currentNode)" 
              :disabled="!currentNode.level"
            >
              编辑
            </el-button>
            <el-button type="primary" @click="handleAdd">
              新增
            </el-button>
            <el-button 
              type="danger" 
              @click="handleDelete(categoryDataR)" 
              :disabled="!categoryDataR.id"
            >
              删除
            </el-button>
          </div>
          <el-table :data="categoryListC" style="width: 100%" stripe border max-height="800">
            <el-table-column prop="id" label="类目id" width="200"/>
            <el-table-column prop="level" label="类目层级" />
            <el-table-column prop="name" label="类目名称" />
            <el-table-column fixed="right" label="类目图片" width="130">
              <template #default="scope">
                <el-image v-if="scope.row.imageUrl" :src="scope.row.imageUrl" />
                <span v-else>---</span>
              </template>
            </el-table-column>
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
          <BasePagination
            :total="totalC"
            @onPageChange="handlePageChange"
          />
        </el-card>
      </el-col>
    </el-row>
    <OperationDialog
      :operationType="operationTypeR" 
      :dialogVisible="dialogVisibleR" 
      :categoryData="categoryDataR"
      @on-dialog-close="handleClose"
      @change-expanded-keys="handleChangeExpandedKeys"
      @getDataList="getDataList"
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