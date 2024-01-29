<script setup lang='ts'>
  import { ref } from 'vue';
  import { Category } from '@/types/type';
  import CardHeader from './CardHeader.vue';
  import OperationDialog from './OperationDialog.vue';

  const dialogVisible = ref<Boolean>(false);
  const categoryData = ref<Category>({});

</script>

<template>
  <div>
    <el-button
      type="text" 
      primary
      @click="dialogVisible = true"
    >
      添加
    </el-button>
    <el-row gutter="24">
      <el-col :span="12">
        <el-card>
          <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="date" label="类目名称" width="100" />
            <el-table-column prop="updateTime" label="修改时间" />
            <el-table-column fixed="right" label="Operations" width="120">
              <template #default>
                <el-button link type="primary" size="small">
                  编辑
                </el-button>
                <el-button link type="primary" size="small">
                  删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <h3>二级类目</h3>
          <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="date" label="Date" width="180" />
            <el-table-column prop="name" label="Name" width="180" />
            <el-table-column prop="address" label="Address" />
          </el-table>
        </el-card>
      </el-col>
    </el-row>
    <el-row gutter="24">
      <el-col :span="24">
        <el-card>
          三级类目
          <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="date" label="Date" width="180" />
            <el-table-column prop="name" label="Name" width="180" />
            <el-table-column prop="address" label="Address" />
          </el-table>
        </el-card>
        
      </el-col>
    </el-row>
    <OperationDialog 
      :dialogVisible="dialogVisible" 
      :categoryData="categoryData"
    />
  </div>
</template>

<style scoped>
  .el-row {
    width: 100%;
  }
</style>