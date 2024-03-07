<script setup lang='ts'>
  import { ref, computed } from 'vue';
  import { ElMessage, ElMessageBox } from 'element-plus'
  import { DEFAULT_PAGE, DEFAULT_PAGESIZE, OPERATION_TYPE } from '@/constant/enums';
  import { useAttributeStore } from '@/store/admin/attribute';
  import { Attribute } from "@/types/type";
  import { ATTRIBUTE_SCHEMA, ATTRIBUTE_UI_SCHEMA } from './schema';
  import BaseDialog from '@/components/BaseDialog.vue';
  import BasePagination from '@/components/BasePagination.vue';

  const attributeStore = useAttributeStore();
  const getDataList = async (page = DEFAULT_PAGE, pageSize = DEFAULT_PAGESIZE) => {
    await attributeStore.getAttributes(page, pageSize);
  };
  getDataList();
  const totalC = computed(() => attributeStore.total);
  const attributeListC = computed(() => attributeStore.attributeList);

  const dialogVisibleR = ref<Boolean>(false);
  const operationTypeR = ref<string>('');
  const attributeDataR = ref({
    name: '',
    isNumeric: 0,
    isGeneric: 1,
    categoryId: []
  });

  const handleClose = () => {
    attributeDataR.value = {
      name: '',
      isNumeric: 0,
      isGeneric: 1,
      categoryId: []
    };
    dialogVisibleR.value = false;
  }

  const handleEdit = (data: Attribute) => {
    dialogVisibleR.value = true;
    operationTypeR.value = OPERATION_TYPE.EDIT;
    attributeDataR.value = data;
  }

  const handleAdd = () => {
    dialogVisibleR.value = true;
    operationTypeR.value = OPERATION_TYPE.ADD;
  }

  const handleDelete = (attribute: Attribute) => {
    ElMessageBox.confirm(`是否确认删除${attribute.name}属性？`, 'Tips', {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      type: 'warning',
    })
    .then(() => {
      attributeStore.deleteAttribute(attribute.id).then(() => {
        handleClose();
        getDataList();
        ElMessage.success('删除成功！');
      });
    });
  }

  const handleSubmit = (attributeData: Attribute) => {
    attributeStore.addAttribute(attributeData).then(() => {
      ElMessage.success(`${operationTypeR.value.title}成功！`);
      getDataList();
      handleClose();
    });
  }

  const handlePageChange = (page, pageSize) => {
    getDataList(defaultPage, defaultPageSize);
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
        <el-table :data="attributeListC" style="width: 100%" stripe border max-height="600">
          <el-table-column prop="id" label="id" width="200"/>
          <el-table-column prop="name" label="属性名称" width="120"/>
          <el-table-column prop="categoryName" label="关联类目" width="120"/>
          <el-table-column label="是否数字类型" width="120">
            <template #default="scope">
              <span>
                {{ scope.row.isNumeric ? '是' : '否' }}
              </span>
            </template>
          </el-table-column>
          <el-table-column label="单位" width="60">
            <template #default="scope">
              <span>
                {{ scope.row.unit || '---' }}
              </span>
            </template>
          </el-table-column>
          <el-table-column label="是否通用属性" width="120">
            <template #default="scope">
              <span>
                {{ scope.row.isGeneric? '是' : '否' }}
              </span>
            </template>
          </el-table-column>
          <el-table-column label="属性值">
            <template #default="scope">
              <el-tag
                v-if="scope.row.value.length" 
                v-for="(item, index) in scope.row.value" 
                :key="index"
              >
                {{ item }}
              </el-tag> 
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
  <BaseDialog
    :schema='ATTRIBUTE_SCHEMA'
    :ui-schema="ATTRIBUTE_UI_SCHEMA"
    :operation-type="operationTypeR" 
    :dialog-visible="dialogVisibleR" 
    :form-data="attributeDataR"
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
  .el-tag {
    margin-bottom: 6px;
    margin-right: 6px;
  }
</style>