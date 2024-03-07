<script setup lang='ts'>
  import { ref, computed, toRaw } from 'vue';
  import { ElMessage, ElMessageBox } from 'element-plus';
  import VueJsonPretty from 'vue-json-pretty';
  import 'vue-json-pretty/lib/styles.css';
  import { DEFAULT_PAGE, DEFAULT_PAGESIZE, OPERATION_TYPE } from '@/constant/enums';
  import { useSkuStore } from '@/store/user/sku';
  import { mapStatus } from '@/utils';
  import { Sku } from "@/types/type";
  import BasePagination from '@/components/BasePagination.vue';
  import OperationDialog from './components/OperationDialog.vue';

  const skuStore = useSkuStore();
  const getDataList = (page, pageSize) => {
    if (page && pageSize) {
      skuStore.getSkuList(page, pageSize);
    } else {
      skuStore.getSkuList(DEFAULT_PAGE, DEFAULT_PAGESIZE);
    }
  }
  getDataList();
  const skuListC = computed(() => skuStore.skuList);
  const totalC = computed(() => skuStore.total);

  let dialogVisibleR = ref<Boolean>(false);
  let operationTypeR = ref<string>('');
  let skuDataR = ref({});

  const getJsonLength = (jsonStr) => {
    const jsonArr = JSON.parse(jsonStr);
    return Object.keys(jsonArr).length;
  }

  const handlePageChange = (page, pageSize) => {
    skuStore.getSkuList(page, pageSize);
  }

  const handleClose = () => {
    skuDataR.value = {};
    dialogVisibleR.value = false;
  }

  const handleEdit = (data: spu) => {
    dialogVisibleR.value = true;
    operationTypeR.value = OPERATION_TYPE.EDIT;
    skuDataR.value = data;
  }

  const handleAdd = () => {
    dialogVisibleR.value = true;
    operationTypeR.value = OPERATION_TYPE.ADD;
  }

  const handleDelete = (sku: Sku) => {
    ElMessageBox.confirm(
      `是否确认删除<span style="color:red">${sku.name}</span>SKU？`, 
      'Tips', 
      {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning',
        dangerouslyUseHTMLString: true
      }
    )
    .then(() => {
      skuStore.deleteSku(sku.id);
    })
    .then(() => {
      handleClose();
      getDataList();
      ElMessage.success('删除成功！');
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
        <el-table :data="skuListC" stripe border max-height="600">
          <el-table-column prop="id" label="id" width="200" />
          <el-table-column prop="name" label="sku名称" width="120"/>
          <el-table-column prop="spuName" label="关联spu" width="120"/>
          <el-table-column prop="stock" label="库存" width="100"/>
          <el-table-column prop="originPrice" label="原价" width="100"/>
          <el-table-column prop="discountPrice" label="折扣价" width="100"/>
          <el-table-column label="通用属性" width="200">
            <template #default="scope">
              <span v-if="!getJsonLength(scope.row.genericSpec)">
                ---
              </span>
              <el-scrollbar height="100px" v-else>
                <vue-json-pretty 
                  :deep="1"
                  :data="JSON.parse(scope.row.genericSpec)" 
              />
              </el-scrollbar>
             
            </template>
          </el-table-column>
          <el-table-column label="特殊属性" width="200">
            <template #default="scope">
              <span v-if="!getJsonLength(scope.row.specialSpec)">
                ---
              </span>
              <el-scrollbar height="100px" v-else>
                <vue-json-pretty 
                  :deep="1"
                  :data="JSON.parse(scope.row.specialSpec)" 
              />
              </el-scrollbar>
             
            </template>
          </el-table-column>
          <el-table-column label="是否有效" width="100">
            <template #default="scope">
              <el-tag 
                :type="mapStatus(scope.row.enable)?.type"
              >
                {{ 
                  mapStatus(scope.row.enable)?.name
                }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="商品图片" width="130">
            <template #default="scope">
              <span v-if="!scope.row.imageUrl">---</span>
              <el-image v-else :src="scope.row.imageUrl"/>
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
  <OperationDialog
    :operationType="operationTypeR" 
    :dialogVisible="dialogVisibleR" 
    :skuData="skuDataR"
    @on-dialog-close="handleClose"
    @getDataList="getDataList"
  />
</template>

<style scoped>
  .operation-btn {
    float: right;
    margin-bottom: 10px;
    margin-right: 10px;
  }
</style>