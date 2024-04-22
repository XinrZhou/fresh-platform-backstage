<script setup lang='ts'>
  import { ref, computed, toRaw } from 'vue';
  import { ElMessage, ElMessageBox } from 'element-plus';
  import { User } from '@/types/type';
  import { DEFAULT_PAGE, DEFAULT_PAGESIZE, OPERATION_TYPE, SHOP_STATUS } from '@/constant/enums';
  import { useSupplierStore } from '@/store/admin/supplier';
  import { SUPPLIER_SCHEMA, SUPPLIER_UI_SCHEMA } from './schema';
  import { formatSupplierData } from '@/utils/index';
  import BaseDialog from '@/components/BaseDialog.vue';
  import BasePagination from '@/components/BasePagination.vue';

  const supplierStore = useSupplierStore();
  supplierStore.getSuppliers(DEFAULT_PAGE, DEFAULT_PAGESIZE);
  const totalC = computed(() => supplierStore.total);
  const supplierList = computed(() => supplierStore.supplierList);

  const dialogVisibleR = ref<Boolean>(false);
  const operationTypeR = ref<string>('');
  const supplierDataR = ref({});

  // 店铺状态映射
  const renderStatus = (status: number) => {
    return {...SHOP_STATUS[status]}
  }

  const handleClose = () => {
    supplierDataR.value = {};
    dialogVisibleR.value = false;
  }

  const handleEdit = (data: User) => {
    dialogVisibleR.value = true;
    operationTypeR.value = OPERATION_TYPE.EDIT;
    supplierDataR.value = data;
  }

  const handleAdd = () => {
    dialogVisibleR.value = true;
    operationTypeR.value = OPERATION_TYPE.ADD;
  }

  const handleDelete = (supplier: User) => {
    ElMessageBox.confirm(
      `是否确认删除<span style="color:red">${supplier.name}</span>商家？`, 
      'Tips', 
      {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning',
        dangerouslyUseHTMLString: true
      }
    )
    .then(() => {
      supplierStore.deleteSuppiler(supplier.id).then(() => {
        supplierStore.getSuppliers(DEFAULT_PAGE, DEFAULT_PAGESIZE);
        handleClose();
      ElMessage.success('删除成功！');
      });
    });
  }

  const handleSubmit = (supplierData: User) => {
    supplierStore
      .addSupplier(formatSupplierData(supplierData))
      .then(() => {
        supplierStore.getSuppliers(DEFAULT_PAGE, DEFAULT_PAGESIZE);
        ElMessage.success(`${operationTypeR.value.title}成功！`)
        handleClose();
      });
  }

  const handleUpdate = (page: number, pageSize: number) => {
    supplierStore.getSuppliers(page, pageSize);
  }
</script>

<template>
  <div>
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
          <el-table :data="supplierList" style="width: 100%" stripe border max-height="600">
            <el-table-column prop="id" label="类目id"/>
            <el-table-column prop="name" label="商家名称"/>
            <el-table-column prop="number" label="手机号"/>
            <el-table-column prop="rdcName" label="供应区域"/>
            <el-table-column label="店铺状态" width="100">
              <template #default="scope">
                <el-tag 
                  :type="renderStatus(scope.row.shopStatus).renderType"
                >
                  {{ 
                    renderStatus(scope.row.shopStatus).label 
                  }}
                </el-tag>
              </template>
            </el-table-column>
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
      :schema='SUPPLIER_SCHEMA'
      :ui-schema="SUPPLIER_UI_SCHEMA"
      :operation-type="operationTypeR" 
      :dialog-visible="dialogVisibleR" 
      :form-data="supplierDataR"
      @on-data-submit="handleSubmit"
      @on-dialog-close="handleClose"
    />
  </div>
</template>

<style scoped>
  .operation-btn {
    float: right;
    margin-bottom: 10px;
    margin-right: 10px;
  }
  .el-row {
    width: 100%;
  }
  .el-image {
    width: 100px;
    height: 100px;
  }
</style>