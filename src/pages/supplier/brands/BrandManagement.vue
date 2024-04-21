<script setup lang='ts'>
  import { ref, computed, toRaw, watch } from 'vue';
  import { Brand } from '@/types/type';
  import { ElMessage, ElMessageBox } from 'element-plus';
  import { DEFAULT_PAGE, DEFAULT_PAGESIZE, OPERATION_TYPE } from '@/constant/enums';
  import { formatTime, mapApprovalStatus } from '@/utils'
  import { useUserStore } from '@/store/user/user';
  import { useBrandSnapshotStore } from '@/store/supplier/brandSnapshot';
  import { BRAND_SCHEMA, BRAND_UI_SCHEMA } from './schema';
  import BaseDialog from '@/components/BaseDialog.vue';
  import BasePagination from '@/components/BasePagination.vue';

  const brandDataR = ref<Brand>({});
  const dialogVisibleR = ref<Boolean>(false);
  const operationTypeR = ref<string>('');

  const userStore = useUserStore();
  let userId;
  const userInfoC = computed(() => userStore.userInfo);

  const brandSnapshotStore = useBrandSnapshotStore();
  watch(() => userStore.userInfo, (newValue, oldValue) => {
    userId = userInfoC.value.id;
    brandSnapshotStore.getBrandSnapshots(DEFAULT_PAGE, DEFAULT_PAGESIZE, userId);
  })
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
    brandSnapshotStore.addBrandSnapshot(toRaw(brandData), userId)
    .then(() => {
      brandSnapshotStore.getBrandSnapshots(DEFAULT_PAGE, DEFAULT_PAGESIZE, userId);
      ElMessage.success(`${operationTypeR.value.title}成功！`);
      handleClose();
    });
  }

  const handleEdit = (data: brand) => {
    dialogVisibleR.value = true;
    operationTypeR.value = OPERATION_TYPE.EDIT;
    brandDataR.value = data;
  }

  const handleDelete = (brand: Brand) => {
    ElMessageBox.confirm(
      `是否确认撤销<span style="color:red">${brand.name}</span>品牌申请？`, 
      'Tips', 
      {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning',
        dangerouslyUseHTMLString: true
      }
    )
    .then(() => {
      brandSnapshotStore.deleteBrandSnapshot(brand.id);
    })
    .then(() => {
      handleClose();
      brandSnapshotStore.getBrandSnapshots(DEFAULT_PAGE, DEFAULT_PAGESIZE, userId);
      ElMessage.success('撤销成功！');
    });
  }

  const handlePageChange = (page, pageSize) => {
    brandSnapshotStore.getBrandSnapshots(page, pageSize, userId);
  }

</script>

<template>
  <el-row>
    <el-col :span="24">
      <el-card>
        <h3 class="table-title">品牌列表</h3>
        <el-row  align="middle" class="header-wrapper">
          <el-col :span="23">
            <div class="tips-wrapper">
              <el-icon><StarFilled /></el-icon>
              <el-text class="tips-text" type="primary">
                若品牌库中没有您想要的品牌，可在此处申请，审核通过后即可使用！
              </el-text>
            </div>
          </el-col>
          <el-col :span="1">
            <el-button 
              type="primary" 
              class="tips-button"
              @click="handleAdd"
            >
              申请
            </el-button>
          </el-col>
        </el-row>
        <el-table :data="brandListC" style="width: 100%" stripe border max-height="600">
          <el-table-column prop="id" label="id" width="200"/>
          <el-table-column prop="name" label="品牌名称" width="120"/>
          <el-table-column prop="categoryName" label="关联类目" width="120"/>
          <el-table-column label="审核状态" width="100">
            <template #default="scope">
              <el-tag 
                :type="mapApprovalStatus(scope.row.status)?.renderType"
              >
                {{ mapApprovalStatus(scope.row.status)?.label }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="驳回原因" width="240">
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
              <template v-if="!scope.row.status">
                <el-button link type="primary" size="small" @click="handleEdit(scope.row)" >
                  编辑
                </el-button>
                <el-button link type="primary" size="small" @click="handleDelete(scope.row)" >
                  撤销
                </el-button>
              </template>
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
    :schema='BRAND_SCHEMA'
    :ui-schema="BRAND_UI_SCHEMA"
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
    color: #409eff;
  }
  .tips-text {
    margin-left: 6px;
  }
  .tips-button {
    float: right;
  }
  .table-title {
    margin-bottom: 10px;
  }
</style>@/store/supplier/brandSnapshot