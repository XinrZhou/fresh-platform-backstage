<script setup lang='ts'>
  import { defineProps } from 'vue';

  const props = defineProps(['dialogVisible', 'categoryData']);

</script>

<template>
  <el-dialog 
    v-model="props.dialogVisible"
    title="添加类目"
    width="500"
  >
    <el-form label-width="100">
      <el-form-item label="根类目">
        <el-switch v-model="props.categoryData.isParent" />
      </el-form-item>
      <el-form-item label="上级类目">
        <el-select 
          :disabled="props.categoryData.isParent"
        >
          <el-option>测试</el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="类目名称" label-width="100px">
        <el-input v-model="props.categoryData.categoryName" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Create</el-button>
        <el-button>Cancel</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<style scoped>

</style>