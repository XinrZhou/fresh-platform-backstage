<script setup lang='ts'>
  import { ref, computed } from 'vue';
  import { ElMessage, ElMessageBox } from 'element-plus'
  import { OPERATION_TYPE } from '@/constant/enums';
  import { useAttributeStore } from '@/store/admin/attribute';
  import { Attribute } from "@/types/type";
  import OperationDialog from './components/OperationDialog.vue';

  const attributeStore = useAttributeStore();
  attributeStore.getAttributeList();

  const attributeListC = computed(() => attributeStore.attributeList);
  let dialogVisibleR = ref<Boolean>(false);
  let operationTypeR = ref<string>('');
  let attributeDataR = ref({});

  const handleClose = () => {
    attributeDataR.value = {};
    dialogVisibleR.value = false;
  }

  const handleEdit = (data: Rdc) => {
    dialogVisibleR.value = true;
    operationTypeR.value = OPERATION_TYPE.EDIT;
    attributeDataR.value = data;
  }

  const handleAdd = () => {
    dialogVisibleR.value = true;
    operationTypeR.value = OPERATION_TYPE.ADD;
  }

  const handleDelete = (attibute: Attribute) => {
    ElMessageBox.confirm(`是否确认删除${attibute.name}？`, 'Tips', {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      type: 'warning',
    })
    .then(() => {
      attributeStore.deleteAttribute(attribute.id);
    })
    .then(() => {
      handleClose();
      ElMessage.success('删除成功！');
    });
  }

  const handleSubmit = (attributeData: Attribute) => {
    attributeStore.addAttribute(attributeData).then(() => {
      ElMessage.success(`${operationTypeR.value.title}成功！`);
      handleClose();
    });
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
        <el-table :data="attributeListC" style="width: 100%" stripe border max-height="600">
          <el-table-column prop="id" label="id" />
          <el-table-column prop="name" label="属性名称" />
          <el-table-column prop="categoryName" label="关联类目"/>
          <el-table-column fixed="right" label="操作" width="120">
            <template #default="scope">
              <el-button link type="primary" size="small" @click="handleEdit(scope.row)">
                编辑
              </el-button>
              <el-button link type="primary" size="small" @click="handleDelete(scope.row)">
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>
  </el-row>
  <OperationDialog
    :operationType="operationTypeR" 
    :dialogVisible="dialogVisibleR" 
    :attributeData="attributeDataR"
    @on-dialog-close="handleClose"
  />
</template>

<style scoped>
  .operation-btn {
    float: right;
    margin-bottom: 10px;
    margin-right: 10px;
  }
</style>