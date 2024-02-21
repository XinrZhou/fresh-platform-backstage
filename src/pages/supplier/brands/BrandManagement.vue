<script setup lang='ts'>
  import { ref, computed, toRaw } from 'vue';
  import { Brand } from '@/types/type';
  import { ElMessage, ElMessageBox } from 'element-plus';
  import { OPERATION_TYPE } from '@/constant/enums';
  import { useUserStore } from '@/store/user/user';
  import { useBrandStore } from '@/store/supplier/brand';
  import { BRAND_SCHEMA, BRAND_UI_SCHEMA } from './schema';
  import BaseDialog from '@/components/BaseDialog.vue';

  const brandDataR = ref<Brand>({});
  const dialogVisibleR = ref<Boolean>(false);
  let operationTypeR = ref<string>('');

  const brandStore = useBrandStore();

  const userStore = useUserStore();
  const userInfoC = computed(() => userStore.userInfo);

  const handleAdd = () => {
    dialogVisibleR.value = true;
    operationTypeR.value = OPERATION_TYPE.ADD;
  }

  const handleClose = () => {
    brandDataR.value = {};
    dialogVisibleR.value = false;
  }

  const handleSubmit = (brandData: Brand) => {
    brandStore.addBrand(toRaw(brandData), userInfoC.value.id)
    .then(() => {
      ElMessage.success(`${operationTypeR.value.title}成功！`);
      handleClose();
    });
  }

</script>

<template>
  <el-row>
    <el-col :span="24">
      <el-card>
        <el-row  align="middle">
          <el-col :span="23">
            <div class="tips-wrapper">
              <el-icon><StarFilled /></el-icon>
              <el-text class="tips-text">
                若品牌库中没有您想要的品牌，可在此处申请，审核通过后即可使用！
              </el-text>
            </div>
          </el-col>
          <el-col :span="1">
            <el-button 
              type="primary" 
              class="tips-button"
              @click="handleAdd"
            >
              申请
            </el-button>
          </el-col>
        </el-row>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="date" label="Date" width="180" />
          <el-table-column prop="name" label="Name" width="180" />
          <el-table-column prop="address" label="Address" />
        </el-table>
      </el-card>
    </el-col>
  </el-row>
  <BaseDialog
    :schema='BRAND_SCHEMA'
    :ui-schema="BRAND_UI_SCHEMA"
    :operation-type="operationTypeR" 
    :dialog-visible="dialogVisibleR" 
    :form-data="brandDataR"
    @on-data-submit="handleSubmit"
    @on-dialog-close="handleClose"
  />
</template>

<style scoped>
  .tips-wrapper {
    display: flex;
    align-items: center;
  }
  .el-icon {
    color: #41B58E;
  }
  .tips-text {
    color: #41B58E;
    margin-left: 6px;
  }
  .tips-button {
    float: right;
    background-color: #41B58E;
  }
</style>