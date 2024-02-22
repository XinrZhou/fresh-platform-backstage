<script setup lang='ts'>
  import { ref, computed, toRaw, watch } from 'vue';
  import { Brand } from '@/types/type';
  import _ from 'lodash';
  import { ElMessage, ElMessageBox } from 'element-plus';
  import { OPERATION_TYPE, APPROVAL_STATUS } from '@/constant/enums';
  import { formatTime, mapApprovalStatus } from '@/utils';
  import { useBrandStore } from '@/store/admin/brand';
  import { useBrandSnapshotStore } from '@/store/user/brandSnapshot';
  import { BRANDSNAPSHOT_SCHEMA, BRANDSNAPSHOT_UI_SCHEMA } from './schema1';
  import BaseDialog from '@/components/BaseDialog.vue';
  import BasePagination from '@/components/BasePagination.vue';

  const brandDataR = ref<Brand>({});
  const dialogVisibleR = ref<Boolean>(false);
  let operationTypeR = ref<string>('');
  const defaultPage = 1;
  const defaultPageSize = 20;

  const brandStore = useBrandStore();

  const brandSnapshotStore = useBrandSnapshotStore();
  brandSnapshotStore.getBrandSnapshots(defaultPage, defaultPageSize);
  const totalC = computed(() => brandSnapshotStore.total);
  const brandListC = computed(() => brandSnapshotStore.brandList);

  const handleAdd = () => {
    dialogVisibleR.value = true;
    operationTypeR.value = OPERATION_TYPE.ADD;
  }

  const handleClose = () => {
    brandDataR.value = {};
    dialogVisibleR.value = false;
  }

  const handleSubmit = (brandData: Brand) => {
    brandSnapshotStore.addBrandSnapshot(toRaw(brandData))
    .then(() => {
      brandStore.addBrand(_.omit(toRaw(brandData), ['id', 'createTime', 'updateTime', 'status']));
      brandSnapshotStore.getBrandSnapshots(defaultPage, defaultPageSize);
      ElMessage.success(`审核成功！`);
      handleClose();
    });
  }

  const handleApproval = (data: brand) => {
    dialogVisibleR.value = true;
    operationTypeR.value = OPERATION_TYPE.EDIT;
    brandDataR.value = data;
  }

  const handlePageChange = (page, pageSize) => {
    brandSnapshotStore.getBrandSnapshots(defaultPage, defaultPageSize);
  }

</script>

<template>
  <el-row>
    <el-col :span="24">
      <el-card>
        <h3 class="table-title">申请列表</h3>
        <el-table :data="brandListC" style="width: 100%" stripe border max-height="600">
          <el-table-column prop="id" label="id" width="200"/>
          <el-table-column prop="name" label="品牌名称" width="120"/>
          <el-table-column prop="userName" label="申请人" width="120"/>
          <el-table-column prop="categoryName" label="关联类目" width="100"/>
          <el-table-column label="审核状态" width="100">
            <template #default="scope">
              <el-tag 
                :type="mapApprovalStatus(scope.row.status)?.type"
              >
                {{ mapApprovalStatus(scope.row.status)?.label }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="驳回原因" width="180">
            <template #default="scope">
              {{
                scope.row.reason || '--'
              }}
            </template>
          </el-table-column>
          <el-table-column label="创建时间" width="180">
            <template #default="scope">
              <span>
                {{ formatTime(scope.row.insertTime) }}
              </span>
            </template>
          </el-table-column>
          <el-table-column label="修改时间" width="180">
            <template #default="scope">
              <span>
                {{ formatTime(scope.row.updateTime) }}
              </span>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="120">
            <template #default="scope">
              <el-button
                v-if="scope.row.status === APPROVAL_STATUS.PENDING" 
                link 
                type="primary" 
                size="small" 
                @click="handleApproval(scope.row)"
              >
                审核
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
    :schema='BRANDSNAPSHOT_SCHEMA'
    :ui-schema="BRANDSNAPSHOT_UI_SCHEMA"
    :operation-type="operationTypeR" 
    :dialog-visible="dialogVisibleR" 
    :form-data="brandDataR"
    @on-data-submit="handleSubmit"
    @on-dialog-close="handleClose"
  />
</template>

<style scoped>
  .header-wrapper {
    margin-bottom: 8px;
  }
  .tips-wrapper {
    display: flex;
    align-items: center;
  }
  .el-icon {
    color: #41B58E;
  }
  .tips-text {
    color: #41B58E;
    margin-left: 6px;
  }
  .tips-button {
    float: right;
    background-color: #41B58E;
  }
  .table-title {
    margin-bottom: 10px;
  }
</style>