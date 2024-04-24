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
    'dialogVisible' 
  ]);
  const emits = defineEmits([
    'onDialogClose', 'onDialogOpen'
  ]);

  const marketingStore = useMarketingStore();
  marketingStore.getAdvertisements();
  const advertisementListC = computed(() => marketingStore.advertisementList);

  const clickAdvTitle = ref<MarketingAdvertisement>({});

  const handleClose = () => emits('onDialogClose');

  const handleOpen = (data: MarketingAdvertisement) => {
    emits('onDialogOpen');
    clickAdvTitle.value = data.title;
  };

  const handleConfirm = () => {
    setTimeout(() => {
      ElMessage.success('购买成功');
      handleClose();
    }, 1000);
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
            {{ scope.row.price }} 
          </el-text>
          <el-text type="info">
            / {{ scope.row.unit }}
          </el-text>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="80">
        <template #default="scope">
          <el-button link type="primary" size="small" @click="handleOpen(scope.row)">
            购买
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <BasePagination
      :total="10"
      @onPageChange="handlePageChange"
    />
  </div>
  <el-dialog 
    title="确认" 
    width="360"
    v-model="props.dialogVisible" 
    @close="handleClose"
  >
   <span>
     确认购买
     <span style="color:red">{{ clickAdvTitle }}</span>
     广告资源？
   </span>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="handleConfirm">
          确认
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style scoped>
  .operation-btn {
    float: right;
    margin-bottom: 10px;
    margin-right: 10px;
  }
</style>