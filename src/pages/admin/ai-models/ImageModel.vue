<script setup lang='ts'>

</script>

<template>
  <div class="container-wrapper">
    <el-descriptions title="基本信息">
      <el-descriptions-item label="模型">
        腾讯AI绘画模型
      </el-descriptions-item>
      <el-descriptions-item label="地域">
        华东地区（上海）
      </el-descriptions-item>
      <el-descriptions-item label="状态">
        <el-tag size="small" type="success">运行中</el-tag>
      </el-descriptions-item>
    </el-descriptions>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="date" label="版本号" width="180" />
      <el-table-column prop="name" label="时间" width="180" />
      <el-table-column prop="address" label="详细信息" />
      <el-table-column fixed="right" label="操作" width="120">
        <template #default="scope">
          <el-button link type="primary" size="small" @click="handleEdit(scope.row)">
            应用
          </el-button>
          <el-button link type="primary" size="small" @click="handleDelete(scope.row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<style scoped>
  .container-wrapper {
    margin-top: 16px;
  }
</style>