<script setup lang='ts'>
  import { ref, computed } from 'vue';
  import { ElMessage, ElMessageBox } from 'element-plus';
  import { useOrderStore } from '@/store/supplier/order';
  import { formatTime, mapStatus } from '@/utils';
  import BasePagination from '@/components/BasePagination.vue';

  const orderStore = useOrderStore();
  orderStore.getOrders();
  const orderListC = computed(() => orderStore.orderList);

  const dialogVisibleR = ref<Boolean>(false);
  const orderDataR = ref({});
  const expressDataR = ref({});

  const handleClose = () => {
    orderDataR.value = {};
    dialogVisibleR.value = false;
  }

  const handleEdit = (orderData) => {
    dialogVisibleR.value = true;
    orderDataR.value = orderData;
  }

  const handleSubmit = () => {
    ElMessage.success('操作成功！');
    orderStore.getOrders();
    handleClose();
  }
</script>

<template>
  <el-card>
    <h3 class="table-title">订单管理</h3>
    <el-table :data="orderListC" style="width: 100%" stripe border max-height="600">
      <el-table-column prop="orderId" label="订单id" width="200"/>
      <el-table-column prop="skuId" label="skuId" width="200"/>
      <el-table-column prop="skuName" label="sku名称" width="200"/>
      <el-table-column label="sku图片" width="130">
        <template #default="scope">
          <el-image :src="scope.row.imageUrl"/>
        </template>
      </el-table-column>
      <el-table-column label="数量" width="80">
        <template #default="scope">
          <el-text>
            {{ scope.row.count }}{{ scope.row.unit}}
          </el-text>
        </template>
      </el-table-column>
      <el-table-column label="是否发货" width="100">
        <template #default="scope">
          <el-tag :type="mapStatus(scope.row.status).type">
            {{ mapStatus(scope.row.status).name }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="联系人" width="120"/>
      <el-table-column prop="phone" label="手机号" width="150"/>
      <el-table-column prop="address" label="收货地址" width="200"/>
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
          <el-button link type="primary" size="small" @click="handleEdit(scope.row)">
            编辑
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <BasePagination :total="10" />
  </el-card>
  <el-dialog v-model="dialogVisibleR" title="发货清单" width="400">
    <el-form :model="expressDataR">
      <el-form-item label="运单号" required >
        <el-input v-model="expressDataR.expressId" />
      </el-form-item>
    </el-form>
    <el-form-item>
      <el-button type="primary" @click="handleSubmit">
        确定
      </el-button>
    </el-form-item>
  </el-dialog>
</template>

<style scoped>
  .table-title {
    margin-bottom: 10px;
  }
</style>