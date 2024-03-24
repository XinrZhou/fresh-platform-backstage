<script setup lang='ts'>
  import { ref, computed, toRaw } from 'vue';
  import VueJsonPretty from 'vue-json-pretty';
  import 'vue-json-pretty/lib/styles.css';
  import { ElMessage, ElMessageBox } from 'element-plus';
  import { useRouter } from 'vue-router';
  import { DEFAULT_PAGE, DEFAULT_PAGESIZE, OPERATION_TYPE } from '@/constant/enums';
  import { useSpuStore } from '@/store/user/spu';
  import { useSkuStore } from '@/store/user/sku';
  import { mapStatus } from '@/utils';
  import { Sku } from "@/types/type";
  import BasePagination from '@/components/BasePagination.vue';
  import OperationDialog from './components/OperationDialog.vue';

  const router = useRouter();
  const spuId = router.currentRoute.value.query.spuId;

  const spuStore = useSpuStore();
  spuStore.getSpuInfo(spuId);
  const spuInfoC = computed(() => spuStore.spuInfo);

  const skuStore = useSkuStore();
  const getDataList = (page, pageSize) => {
    if (page && pageSize) {
      skuStore.getSkuList(page, pageSize, spuId);
    } else {
      skuStore.getSkuList(DEFAULT_PAGE, DEFAULT_PAGESIZE, spuId);
    }
  }
  getDataList();
  const skuListC = computed(() => skuStore.skuList);
  const totalC = computed(() => skuStore.total);

  const dialogVisibleR = ref<Boolean>(false);
  const operationTypeR = ref<string>('');
  const skuDataR = ref({ 
    isDefault: 1,
    enable: 1, 
    name: '',
  });


  const handlePageChange = (page, pageSize) => {
    skuStore.getSkuList(page, pageSize);
  }

  const handleClose = () => {
    skuDataR.value = { 
      isDefault: 1,
      enable: 1, 
      name: '',
    };
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
  <el-descriptions title="SPU详情" class="description">
    <el-descriptions-item label="id">
      {{ spuInfoC.id }}
    </el-descriptions-item>
    <el-descriptions-item label="名称">
      {{ spuInfoC.name }}
    </el-descriptions-item>
    <el-descriptions-item label="关联类目">
      {{ spuInfoC.categoryName }}
    </el-descriptions-item>
    <el-descriptions-item label="品牌名称">
      {{ spuInfoC.brandName || '见产品外包装'}}
    </el-descriptions-item>
    <el-descriptions-item 
      v-for="(value, key) in JSON.parse(spuInfoC.genericSpec || '{}')" 
      :key="key"
      :label="key"
    >
      {{ value }}
    </el-descriptions-item>
  </el-descriptions>
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
        <el-table :data="skuListC" stripe border max-height="800">
          <el-table-column prop="id" label="id" width="200" />
          <el-table-column prop="name" label="sku名称" width="200" />
          <el-table-column prop="spuName" label="关联spu" width="180"/>
          <el-table-column prop="stock" label="库存" width="100"/>
          <el-table-column prop="originPrice" label="原价" width="80"/>
          <el-table-column prop="discountPrice" label="折扣价" width="80"/>
          <el-table-column prop="unit" label="单位" width="60"/>
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
          <el-table-column label="商品描述" width="200">
            <template #default="scope">
              {{
                scope.row.description ?  scope.row.description : '---'
              }}
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
  .description {
    margin-bottom: 16px;
  }

  /deep/.el-descriptions__body  {
    background-color: #f6f8f9;
  }

  .operation-btn {
    float: right;
    margin-bottom: 10px;
    margin-right: 10px;
  }
</style>