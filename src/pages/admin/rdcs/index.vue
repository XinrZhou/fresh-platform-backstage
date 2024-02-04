<script setup lang='ts'>
  import { ref, computed } from 'vue';
  import { RDC_SCHEMA, RDC_UI_SCHEMA } from './schema';
  import { OPERATION_TYPE } from '@/constant/enums';
  import { useRdcStore } from '@/store/admin/rdc';
  import { Rdc } from "@/types/type";
  import BaseDialog from '@/components/BaseDialog.vue';

  let dialogVisibleR = ref<Boolean>(false);
  let operationTypeR = ref<string>('');
  const rdcDataR = ref({});

  const onDialogClose = () => {
    rdcDataR.value = {};
    dialogVisibleR.value = false;
  }

  const handleAdd = () => {
    dialogVisibleR.value = true;
    operationTypeR.value = OPERATION_TYPE.ADD;
  }

  const handleEdit = (data: Rdc) => {
    dialogVisibleR.value = true;
    operationTypeR.value = OPERATION_TYPE.EDIT;
    rdcDataR.value = data;
  }

  const handleDelete = (rid: string) => {
    ElMessageBox.confirm('是否确认删除？', 'Tips', {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      type: 'warning',
    })
    .then(() => {
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
  <BaseDialog
    :schema='RDC_SCHEMA'
    :ui-schema="RDC_UI_SCHEMA"
    :operationType="operationTypeR" 
    :dialogVisible="dialogVisibleR" 
    :formData="categoryDataR"
    @closeDialog="onDialogClose"
  />
</template>

<style scoped>
  .operation-btn {
    float: right;
    margin-bottom: 10px;
    margin-right: 10px;
  }
</style>