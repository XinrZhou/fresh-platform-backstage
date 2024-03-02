<script setup lang='ts'>
  import { ref } from 'vue';
  import { CHAT_MODEL_SCHEMA, CHAT_MODEL_UI_SCHEMA } from './schema';
  import { OPERATION_TYPE } from '@/constant/enums';
  import BaseDialog from '@/components/BaseDialog.vue';

  const DIALOG_TITLE = {
    name: 'settings',
    title: '参数配置'
  }

  const dialogVisibleR = ref(false);
  const modelParamsR = ref({});
  const operationType = DIALOG_TITLE

  const updateModelParams = () => {
    dialogVisibleR.value = true;
  }
</script>

<template>
  <div class="container-wrapper">
    <el-descriptions title="基本信息">
      <el-descriptions-item label="模型">
        通义千问
      </el-descriptions-item>
      <el-descriptions-item label="更新时间">
        2024年2月29日
      </el-descriptions-item>
      <el-descriptions-item label="模型名称">
        qwen-max
      </el-descriptions-item>
      <el-descriptions-item label="部署状态">
        <el-tag size="small" type="success">部署成功</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="部署版本">
        <el-tag size="small" type="info">1.2.2</el-tag>
        <el-button size="small" type="primary" link @click="updateModelParams">
          更新
        </el-button>
      </el-descriptions-item>
    </el-descriptions>
    <div class="table-wrapper">
      <p class="table-title">历史版本</p>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="date" label="版本号" width="180" />
        <el-table-column prop="name" label="时间" width="180" />
        <el-table-column prop="address" label="详细信息" />
        <el-table-column fixed="right" label="操作" width="120">
          <template #default="scope">
            <el-button link type="primary" size="small" @click="handleEdit(scope.row)">
              应用
            </el-button>
            <el-button link type="primary" size="small" @click="handleDelete(scope.row)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
  <BaseDialog
    :schema='CHAT_MODEL_SCHEMA'
    :ui-schema="CHAT_MODEL_UI_SCHEMA"
    :operation-type="operationType" 
    :dialog-visible="dialogVisibleR" 
    :form-data="rdcDataR"
    @on-data-submit="handleSubmit"
    @on-dialog-close="handleClose"
  />
</template>

<style scoped>
  .container-wrapper {
    margin-top: 16px;
  }
  .table-wrapper {
    margin-top: 16px;
  }
  .table-title {
    margin-bottom: 8px;
    color: #303133;
    font-size: 16px;
    font-weight: 700;
  }
</style>