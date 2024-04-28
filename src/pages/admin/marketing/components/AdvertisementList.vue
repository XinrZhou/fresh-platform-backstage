<script setup lang='ts'>
  import { ref, computed } from 'vue';
  import dayjs from "dayjs";
  import { useMarketingStore } from '@/store/admin/marketing';
  import { mapStatus } from '@/utils';
  import { MarketingAdvertisement } from "@/types/type";
  import { ElMessage, ElMessageBox } from 'element-plus';
  import { DEFAULT_PAGE, DEFAULT_PAGESIZE } from '@/constant/enums';
  import { ADVERTISEMENT_SCHEMA, ADVERTISEMENT_UI_SCHEMA } from './schema1';
  import BaseDialog from '@/components/BaseDialog.vue';
  import BasePagination from '@/components/BasePagination.vue';

  const props = defineProps([
    'dialogVisible', 'operationType'
  ]);
  const emits = defineEmits([
    'onDialogClose', 'onDialogOpen', 'onEdit'
  ]);

  const marketingStore = useMarketingStore();
  marketingStore.getAdvertisements();
  const advertisementListC = computed(() => marketingStore.advertisementList);

  const marketingDataR = ref<MarketingAdvertisement>({});

  const handleClose = () => {
    marketingDataR.value = {};
    emits('onDialogClose');
  }

  const handleEdit = (data: MarketingAdvertisement) => {
    emits('onEdit');
    marketingDataR.value = data;
  }

  const handleDelete = (addAdvertisement: MarketingAdvertisement) => {
    ElMessageBox.confirm(
      `是否确认删除<span style="color:red">${addAdvertisement.title}</span>价格规则？`, 
      'Tips', 
      {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning',
        dangerouslyUseHTMLString: true
      }
    )
    .then(() => {
      marketingStore.deleteAdvertisement(addAdvertisement.id).then(() => {
        marketingStore.getAdvertisements();
        emits('onDialogClose');
      ElMessage.success('删除成功！');
      });
    });
  }

  const handleSubmit = (marketingData: MarketingAdvertisement) => {
    marketingStore
      .addAdvertisement(marketingData)
      .then(() => {
        marketingStore.getAdvertisements();
        ElMessage.success(`${props.operationType.title}成功！`)
        emits('onDialogClose');
      });
  }

  const handleUpdate = (page: number, pageSize: number) => {
    supplierStore.getSuppliers(page, pageSize);
  }
</script>

<template>
  <div style="width: 100%;">
    <el-table :data="advertisementListC" stripe border max-height="300">
      <el-table-column prop="id" label="活动id" width="200"/>
      <el-table-column prop="title" label="名称" width="160"/>
      <el-table-column prop="description" label="详情" />
      <el-table-column label="价格" width="160">
        <template #default="scope">
          <el-text type="success">
            {{ scope.row.price }} / {{ scope.row.unit }}
          </el-text>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="150">
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
      :total="10"
      @onPageChange="handlePageChange"
    />
  </div>
  <BaseDialog
    :schema='ADVERTISEMENT_SCHEMA'
    :ui-schema="ADVERTISEMENT_UI_SCHEMA"
    :operation-type="operationType" 
    :dialog-visible="dialogVisible" 
    :form-data="marketingDataR"
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