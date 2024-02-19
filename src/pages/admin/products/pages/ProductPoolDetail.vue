<script setup lang='ts'>
  import { ref, computed } from 'vue';
  import { useRouter } from 'vue-router'
  import { useRdcSpuStore } from '@/store/admin/rdcSpu';
  import OperationDialog from '../components/OperationDialog.vue';

  const router = useRouter();
  const rdcSpuStore = useRdcSpuStore();

  let dialogVisibleR = ref(false);

  const handleSubmit = (formData) => {
    const rdcId = router.currentRoute.value.query.rdcId;
    const rdcSpuList = formData.spuIds.map(spuId => {
      return {
        rdcId,
        spuId
      }
    })
    rdcSpuStore.addRdcSpus(rdcSpuList);
  }

  const handleClose = () => dialogVisibleR.value = false;

</script>

<template>
  <el-row >
    <el-col :span="24">
      test
    </el-col>
  </el-row>
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
    <el-table border >
      <el-table-column label="test"></el-table-column>
      <el-table-column label="hhh"></el-table-column>
    </el-table>
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