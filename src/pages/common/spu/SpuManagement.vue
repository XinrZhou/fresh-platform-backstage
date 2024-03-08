<script setup lang='ts'>
  import { ref, computed, toRaw } from 'vue';
  import { ElMessage, ElMessageBox } from 'element-plus'
  import VueJsonPretty from 'vue-json-pretty';
  import 'vue-json-pretty/lib/styles.css';
  import {  DEFAULT_PAGE, DEFAULT_PAGESIZE, OPERATION_TYPE } from '@/constant/enums';
  import { useSpuStore } from '@/store/user/spu';
  import { Spu } from "@/types/type";
  import { mapStatus } from '@/utils';
  import BasePagination from '@/components/BasePagination.vue';
  import OperationDialog from './components/OperationDialog.vue';

  const spuStore = useSpuStore();
  const getDataList = (page, pageSize) => {
    if (page && pageSize) {
      spuStore.getSpuList(page, pageSize);
    } else {
      spuStore.getSpuList(DEFAULT_PAGE, DEFAULT_PAGESIZE);
    }
  }
  getDataList();
  const totalC = computed(() => spuStore.total);

  const spuListC = computed(() => spuStore.spuList);
  const dialogVisibleR = ref<Boolean>(false);
  const operationTypeR = ref<string>('');
  const spuDataR = ref({});

  const getJsonLength = (jsonStr) => {
    const jsonObj = jsonStr ? JSON.parse(jsonStr) : {};
    return Object.keys(jsonObj).length;
  }

  const handlePageChange = (page, pageSize) => {
    getDataList(page, pageSize);
  }

  const handleClose = () => {
    spuDataR.value = {};
    dialogVisibleR.value = false;
  }

  const handleEdit = (data: spu) => {
    dialogVisibleR.value = true;
    operationTypeR.value = OPERATION_TYPE.EDIT;
    spuDataR.value = data;
  }

  const handleAdd = () => {
    dialogVisibleR.value = true;
    operationTypeR.value = OPERATION_TYPE.ADD;
  }

  const handleDelete = (spu: Spu) => {
    ElMessageBox.confirm(
      `是否确认删除<span style="color:red">${spu.name}</span>SPU？`, 
      'Tips', 
      {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning',
        dangerouslyUseHTMLString: true
      }
    )
    .then(() => {
      spuStore.deleteSpu(spu.id);
    })
    .then(() => {
      handleClose();
      spuStore.getSpuList(DEFAULT_PAGE, DEFAULT_PAGESIZE);
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
        <el-table :data="spuListC" style="width: 100%" stripe border max-height="800">
          <el-table-column prop="id" label="id" width="200"/>
          <el-table-column prop="name" label="商品标题" width="200"/>
          <el-table-column prop="categoryName" label="关联类目" width="120"/>
          <el-table-column label="关联品牌" width="160">
            <template #default="scope">
              {{
                scope.row.brandName ?  scope.row.brandName : '---'
              }}
            </template>
          </el-table-column>
          <el-table-column label="商品主图" width="130">
            <template #default="scope">
              <el-image :src="scope.row.imageUrl"/>
            </template>
          </el-table-column>
          <el-table-column label="商品详情图" width="130">
            <template #default="scope">
              <el-scrollbar height="200px">
                <el-image :src="scope.row.detailImageUrl"/>
              </el-scrollbar>
            </template>
          </el-table-column>
          <el-table-column label="通用属性" width="180">
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
          <el-table-column label="特殊属性" width="180">
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
          <el-table-column label="是否上架" width="100">
            <template #default="scope">
              <el-tag 
                :type="mapStatus(scope.row.saleStatus)?.type"
              >
                {{ 
                  mapStatus(scope.row.saleStatus)?.name 
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
  <OperationDialog
    :operationType="operationTypeR" 
    :dialogVisible="dialogVisibleR" 
    :spuData="spuDataR"
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