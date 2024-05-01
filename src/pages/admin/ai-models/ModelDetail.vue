<script setup lang='ts'>
  import { ref, computed } from 'vue';
  import { ElMessage } from 'element-plus';
  import { CHAT_MODEL_SCHEMA, CHAT_MODEL_UI_SCHEMA } from './chatSchema';
  import { useModelStore } from '@/store/admin/model';
  import { MODEL_TYPE } from '@/constant/enums';
  import { Model } from "@/types/type";
  import { formatTime } from '@/utils'
  import BasePagination from '@/components/BasePagination.vue';
  import BaseDialog from '@/components/BaseDialog.vue';

  const DIALOG_TITLE = {
    name: 'settings',
    title: '参数配置'
  }
  const DESCRIPTION_COLUMNS_CHAT = 3;
  const DESCRIPTION_COLUMNS_IMAGE = 4;

  const defaultPage = 1;
  const defaultPageSize = 20;

  const props = defineProps(['pageType', 'schema', 'uiSchema']);

  const modelStore = useModelStore();
  const modelListC = computed(() => modelStore.modelList);
  const latestModelC = computed(() => modelStore.latestModel);
  const totalC = computed(() => modelStore.total);
  const modelNameC = computed(() => {
    if (props.pageType.value === MODEL_TYPE.CHAT.value) {
      return latestModelC?.value?.params ? JSON.parse(latestModelC.value.params).model : '--';
    }
    return '';
  });
  const columnC = computed(() => {
    if ( props.pageType.value === MODEL_TYPE.CHAT.value ) {
      return DESCRIPTION_COLUMNS_CHAT;
    } else {
      return DESCRIPTION_COLUMNS_IMAGE;
    }
  });

  const dialogVisibleR = ref(false);
  const modelParamsR = ref({});

  const updateModelParams = () => {
    dialogVisibleR.value = true;
  }

  const handleSubmit = (modelParams: Model) => {
    modelStore.addModel({ ...modelParams, type: props.pageType.value}).then(() => {
      ElMessage.success('部署成功！');
      modelStore.getModels(defaultPage, defaultPageSize, props.pageType.value);
      handleClose();
    });
  }

  const handleClose = () => {
    modelParamsR.value = {};
    dialogVisibleR.value = false;
  }

  const handlePageChange = (page, pageSize) => {
    modelStore.getModels(page, pageSize, props.pageType.value);
  }

  const handleDownload = ({ version, params }) => {
    var blob = new Blob([params], {type: "text/plain;charset=utf-8"});
    var url = window.URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = `v${version}.txt`;
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }
</script>

<template>
  <div class="container-wrapper">
    <el-descriptions 
      title="基本信息"
      :column="columnC"
    >
      <el-descriptions-item label="模型">
        {{
          pageType.modelName
        }}
      </el-descriptions-item>
      <el-descriptions-item label="上次部署时间">
        {{
          latestModelC ? formatTime(latestModelC.updateTime) : '--'
        }}
      </el-descriptions-item>
      <el-descriptions-item 
        label="模型名称"
        v-if="pageType.value === MODEL_TYPE.CHAT.value"
      >
        {{ modelNameC }}
      </el-descriptions-item>
      <el-descriptions-item label="部署状态">
        <el-tag size="small" type="success">部署成功</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="部署版本">
        <el-tag size="small" type="info">
          {{
            latestModelC?.version || '--'
          }}
        </el-tag>
        <el-button size="small" type="primary" link @click="updateModelParams">
          更新
        </el-button>
      </el-descriptions-item>
    </el-descriptions>
    <div class="table-wrapper">
      <p class="table-title">历史版本</p>
      <el-table :data="modelListC" style="width: 100%">
        <el-table-column prop="version" label="版本号" width="150" />
        <el-table-column prop="params" label="模型参数" />
        <el-table-column prop="address" label="创建时间" width="180">
          <template #default="scope">
            <span>
              {{ formatTime(scope.row.updateTime) }}
            </span>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="120">
          <template #default="scope">
            <el-button link type="primary" size="small" @click="handleDownload(scope.row)">
              <el-icon><Download /></el-icon>
              下载
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <BasePagination
        :total="totalC"
        @onPageChange="handlePageChange"
      />
    </div>
  </div>
  <BaseDialog
    :schema="schema"
    :ui-schema="uiSchema"
    :operation-type="DIALOG_TITLE" 
    :dialog-visible="dialogVisibleR" 
    :form-data="modelParamsR"
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