<script setup lang='ts'>
  import { ref, computed } from 'vue';
  import { RDC_SCHEMA, RDC_UI_SCHEMA } from './schema';
  import { ElMessage, ElMessageBox } from 'element-plus';
  import { DEFAULT_PAGE, DEFAULT_PAGESIZE } from '@/constant/enums';
  import { OPERATION_TYPE } from '@/constant/enums';
  import { useRdcStore } from '@/store/admin/rdc';
  import { Rdc } from "@/types/type";
  import BasePagination from '@/components/BasePagination.vue';
  import BaseDialog from '@/components/BaseDialog.vue';

  const rdcStore = useRdcStore();
  rdcStore.getRdcs(DEFAULT_PAGE, DEFAULT_PAGESIZE);
  const totalC = computed(() => rdcStore.total);

  const rdcList = computed(() => rdcStore.rdcList);
  let dialogVisibleR = ref<Boolean>(false);
  let operationTypeR = ref<Object>({});
  let rdcDataR = ref<Rdc>({});
    
  const handlePageChange = (page, pageSize) => {
    rdcStore.getRdcs(page, pageSize);
  }

  const handleClose = () => {
    rdcDataR.value = {};
    dialogVisibleR.value = false;
  }

  const handleEdit = (data: Rdc) => {
    dialogVisibleR.value = true;
    operationTypeR.value = OPERATION_TYPE.EDIT;
    rdcDataR.value = data;
  }

  const handleAdd = () => {
    dialogVisibleR.value = true;
    operationTypeR.value = OPERATION_TYPE.ADD;
  }

  const handleDelete = (rdc: Rdc) => {
    ElMessageBox.confirm(
      `是否确认删除<span style="color:red">${rdc.name}</span>RDC？`, 
      'Tips', 
      {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning',
        dangerouslyUseHTMLString: true
      }
    )
    .then(() => {
      rdcStore.deleteRdc(rdc.id).then(() => {
        handleClose();
        ElMessage.success('删除成功！');
        rdcStore.getRdcs(DEFAULT_PAGE, DEFAULT_PAGESIZE);
      });
    });
  }

  const handleSubmit = (rdcData: Rdc) => {
    rdcStore.addRdc(rdcData).then(() => {
      ElMessage.success(`${operationTypeR.value.title}成功！`);
      rdcStore.getRdcs(DEFAULT_PAGE, DEFAULT_PAGESIZE);
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
        <el-table :data="rdcList" style="width: 100%" stripe border max-height="600">
          <el-table-column prop="id" label="id" width="200"/>
          <el-table-column prop="name" label="RDC名称" width="150"/>
          <el-table-column prop="province" label="省份" width="100"/>
          <el-table-column prop="city" label="城市" width="100"/>
          <el-table-column prop="district" label="区" width="100"/>
          <el-table-column prop="detail" label="详细地址"/>
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
        <BasePagination
          :total="totalC"
          @onPageChange="handlePageChange"
        />
      </el-card>
    </el-col>
  </el-row>
  <BaseDialog
    :schema='RDC_SCHEMA'
    :ui-schema="RDC_UI_SCHEMA"
    :operation-type="operationTypeR" 
    :dialog-visible="dialogVisibleR" 
    :form-data="rdcDataR"
    @on-data-submit="handleSubmit"
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