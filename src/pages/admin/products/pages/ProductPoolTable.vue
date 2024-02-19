<script setup lang='ts'>
  import { ref, computed } from 'vue';
  import { useRdcStore } from '@/store/admin/rdc';
  import { Rdc } from "@/types/type";
  import router from '@/router';

  const rdcStore = useRdcStore();
  rdcStore.getRdcs();

  const rdcListC = computed(() => rdcStore.rdcList);

  const goDeatilPage = (rowData) => {
    router.push({
      path: '/admin/product/detail',
      query: { rdcId: rowData.id }
    })
  } 
</script>

<template>
  <el-row gutter="24">
    <el-col :span="24">
      <el-card>
        <el-button
          class="operation-btn"
          type="primary"
          :underline="false"
          @click="handleAdd"
        >
          添加
        </el-button>
        <el-table :data="rdcListC" style="width: 100%" stripe border max-height="600">
          <el-table-column prop="name" label="关联RDC" width="150"/>
          <el-table-column prop="province" label="仓库地址">
            <template #default="scope">
              {{ scope.row.province }} {{ scope.row.city }} {{ scope.row.district }} {{ scope.row.detail }}
            </template>
          </el-table-column>
          <el-table-column prop="productCount" label="商品数量" width="120" />
          <el-table-column fixed="right" label="操作" width="100">
            <template #default="scope">
              <el-button link type="primary" size="small" @click="goDeatilPage(scope.row)">
                详情
              </el-button>
              <el-button link type="primary" size="small" @click="handleDelete(scope.row)">
                配置
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>
  </el-row>
</template>

<style scoped>
  .operation-btn {
    float: right;
    margin-bottom: 10px;
    margin-right: 10px;
  }
</style>