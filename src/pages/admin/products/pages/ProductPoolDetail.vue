<script setup lang='ts'>
  import { ref, computed } from 'vue';

  const handleAddProduct = () => {
    console.log('添加商品');
  }

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
        <el-button type="primary" link @click="handleAddProduct">
          添加
        </el-button>
    </div>
    <el-table border >
      <el-table-column label="test"></el-table-column>
      <el-table-column label="hhh"></el-table-column>
    </el-table>
  </el-card>
</template>

<style scoped>
  .header-wrapper {
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
</style>