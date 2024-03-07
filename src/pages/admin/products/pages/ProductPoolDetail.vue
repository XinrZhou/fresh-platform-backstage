<script setup lang='ts'>
  import { ref, computed } from 'vue';
  import { RdcSpu} from '@/types/type';
  import { useRouter } from 'vue-router'
  import { ElMessage, ElMessageBox } from 'element-plus';
  import { useRdcSpuStore } from '@/store/admin/rdcSpu';
  import { DEFAULT_PAGE, DEFAULT_PAGESIZE } from '@/constant/enums';
  import { mapStatus } from '@/utils';
  import BasePagination from '@/components/BasePagination.vue';
  import OperationDialog from '../components/OperationDialog.vue';

  const router = useRouter();
  const rdcId = router.currentRoute.value.query.rdcId;

  const rdcSpuStore = useRdcSpuStore();
  rdcSpuStore.getRdcSpus(DEFAULT_PAGE, DEFAULT_PAGESIZE, rdcId);
  const totalC = computed(() => rdcSpuStore.total);
  const rdcSpuListC = computed(() => rdcSpuStore.rdcSpuList);

  const dialogVisibleR = ref(false);

  const handlePageChange = (page, pageSize) => {
    rdcSpuStore.getRdcSpus(page, pageSize, rdcId);
  }

  const handleSubmit = (formData) => {
    const rdcSpuList = formData.spuIds.map(spuId => {
      return { rdcId, spuId }
    })
    rdcSpuStore.addRdcSpus(rdcSpuList).then(() => {
      ElMessage.success('添加成功');
      rdcSpuStore.getRdcSpus(DEFAULT_PAGE, DEFAULT_PAGESIZE, rdcId);
      dialogVisibleR.value = false;
    });
  }

  const handleDelete = (rdcSpu: Attribute) => {
    ElMessageBox.confirm(`是否确认删除？`, 'Tips', {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      type: 'warning',
    })
    .then(() => {
      rdcSpuStore.deleteRdcSpu(rdcSpu.id);
    })
    .then(() => {
      handleClose();
      ElMessage.success('删除成功！');
      rdcSpuStore.getRdcSpus(DEFAULT_PAGE, DEFAULT_PAGESIZE, rdcId);
    });
  }

  const handleClose = () => dialogVisibleR.value = false;

</script>

<template>
  <el-card>
    <div class="header-wrapper">
        <h3>商品列表</h3>
        <el-button 
          type="primary" 
          link 
          @click="dialogVisibleR = true"
        >
          添加
        </el-button>
    </div>
    <el-table el-table :data="rdcSpuListC" style="width: 100%" stripe border max-height="600">
      <el-table-column label="rdcId">
        <template #default="scope">
          {{ router.currentRoute.value.query.rdcId }}
        </template>
      </el-table-column>
      <el-table-column label="rdc名称">
        <template #default="scope">
          {{ router.currentRoute.value.query.rdcName }}
        </template>
      </el-table-column>
      <el-table-column prop="spuId" label="spuId"/>
      <el-table-column prop="spuName" label="spu名称"/>
      <el-table-column label="是否上架" width="100">
        <template #default="scope">
          <el-tag 
            :type="mapStatus(scope.row.saleStatus)?.type"
          >
            {{ 
              mapStatus(scope.row.saleStatus)?.name 
            }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="120">
        <template #default="scope">
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
  <OperationDialog
    :dialogVisible="dialogVisibleR" 
    @on-dialog-close="handleClose"
    @on-submit="handleSubmit"
  />
</template>

<style scoped>
  .header-wrapper {
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
</style>