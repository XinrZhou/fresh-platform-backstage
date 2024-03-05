<script setup lang='ts'>
  import { ref } from 'vue';
  import { getInterfaceCount } from '@/utils';

  const props = defineProps(['resources'])

</script>

<template>
  <el-card class="header-wrapper">
    <el-row>
      <el-col :span="8" class="header-item">
        <el-text>开通AI服务用户数</el-text><br />
        <div class="item-bottom">
          <el-text class="count-text">
            4
          </el-text>
          <el-text>个</el-text>
        </div>
      </el-col>
      <el-col :span="8">
        <el-text>AI绘画调用总量</el-text><br />
        <el-text class="count-text">
          {{ 
            getInterfaceCount(resources).imageCount 
          }}
        </el-text>
        <el-text>次</el-text>
      </el-col>
      <el-col :span="8">
        <el-text>AI写作调用总量</el-text><br />
        <el-text class="count-text">
          {{ 
            getInterfaceCount(resources).chatCount 
          }}
        </el-text>
        <el-text>次</el-text>
      </el-col>
    </el-row>
  </el-card>
  <el-card class="table-wrapper">
    <el-table :data="resources">
      <el-table-column prop="userId" label="用户id"/>
      <el-table-column prop="path" label="请求路径" />
      <el-table-column label="调用成功次数">
        <template #default="scope">
          {{ scope.row.values.success }}
        </template>
      </el-table-column>
      <el-table-column label="调用失败次数">
        <template #default="scope">
          {{ scope.row.values.failure || 0 }}
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<style scoped>
  .header-wrapper {
    margin: 8px 0;
  }
  .count-text {
    font-size: 20px;
    margin-right: 6px;
  }
  .table-wrapper {
    margin-top: 12px;
  }
</style>