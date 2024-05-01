<script setup lang='ts'>
  import { ref, computed } from 'vue';
  import dayjs from "dayjs";
  import { useMarketingStore } from '@/store/admin/marketing';
  import { mapStatus } from '@/utils';
  import { MarketingActivity } from "@/types/type";
  import { ElMessage, ElMessageBox } from 'element-plus';
  import { DEFAULT_PAGE, DEFAULT_PAGESIZE, OPERATION_TYPE } from '@/constant/enums';
  import { ACTIVITY_SCHEMA, ACTIVITY_UI_SCHEMA } from './schema';
  import BaseDialog from '@/components/BaseDialog.vue';
  import BasePagination from '@/components/BasePagination.vue';

  const marketingStore = useMarketingStore();
  marketingStore.getActivities();
  const activityListC = computed(() => marketingStore.activityList);

  const dialogVisibleR = ref<Boolean>(false);
  const operationTypeR = ref<string>('');
  const marketingDataR = ref<MarketingActivity>({});

  const handleClose = () => {
    marketingDataR.value = {};
    dialogVisibleR.value = false;
  }

  const handleSubmit = (activity: MarketingActivity) => {
    ElMessageBox.confirm(
      `是否确认报名<span style="color:red">${activity.title}</span>活动？`, 
      'Tips', 
      {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning',
        dangerouslyUseHTMLString: true
      }
    )
    .then(() =>  ElMessage.success('删除成功！'));
  }
</script>

<template>
  <div>
    <el-row gutter="24">
      <el-col :span="24">
        <el-card>
          <el-table :data="activityListC" style="width: 100%" stripe border max-height="600">
            <el-table-column prop="id" label="活动id" width="200"/>
            <el-table-column prop="title" label="标题" width="200"/>
            <el-table-column label="标签" width="100">
              <template #default="scope">
                <el-tag type="success">
                  {{ scope.row.tag }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="content" label="内容"/>
            <el-table-column prop="startTime" label="开始时间" width="180" />
            <el-table-column prop="endTime" label="结束时间" width="180" />
            <el-table-column fixed="right" label="操作" width="80">
              <template #default="scope">
                <el-button link type="primary" size="small" @click="handleSubmit(scope.row)">
                  报名
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <BasePagination
            :total="10"
            @onPageChange="handlePageChange"
          />
        </el-card>
      </el-col>
    </el-row>
    <BaseDialog
      :schema='ACTIVITY_SCHEMA'
      :ui-schema="ACTIVITY_UI_SCHEMA"
      :operation-type="operationTypeR" 
      :dialog-visible="dialogVisibleR" 
      :form-data="marketingDataR"
      @on-data-submit="handleSubmit"
      @on-dialog-close="handleClose"
    />
  </div>
</template>

<style scoped>
  .operation-btn {
    float: right;
    margin-bottom: 10px;
    margin-right: 10px;
  }
</style>