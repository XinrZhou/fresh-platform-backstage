<script setup lang="ts">
  import { ref, computed } from 'vue';
  import { ElMessage, ElMessageBox } from 'element-plus';
  import { Resource } from '@/types/type';
  import { mapStatus } from '@/utils';
  import { RESOURCE_SCHEMA, RESOURCE_UI_SCHEMA } from './schema';
  import { OPERATION_TYPE, MODEL_LIST } from '@/constant/enums';
  import { useResoureStore } from '@/store/admin/resource';
  import BasePagination from '@/components/BasePagination.vue';
  import BaseDialog from '@/components/BaseDialog.vue';
  
  const defaultPage = 1;
  const defaultPageSize = 20;
  const FREE_PRICE = 0;
  
  const resourceTypeR = ref(MODEL_LIST[0]?.label);
  const selectedModelC = computed(() => {
    return resourceTypeR.value && MODEL_LIST.find(item => item.label === resourceTypeR.value);
  });
  const dialogVisibleR = ref(false);
  const operationTypeR = ref<Object>({});
  const resourceDataR = ref<Resource>({});
  
  const resourceStore = useResoureStore();
  const loadingC = computed(() => resourceStore.loading);
  const totalC = computed(() => resourceStore.total);
  const resourceListC = computed(() => resourceStore.resourceList);
  resourceStore.getResources(defaultPage, defaultPageSize, selectedModelC.value.value);
  
  const handleRadioChange = () => {
    resourceStore.getResources(defaultPage, defaultPageSize, selectedModelC.value.value);
  }
  
  const handleEdit = (data: Resource) => {
    dialogVisibleR.value = true;
    resourceDataR.value = data;
    operationTypeR.value = OPERATION_TYPE.EDIT;
  }
  
  const handleAdd = () => {
    operationTypeR.value = OPERATION_TYPE.ADD;
    dialogVisibleR.value = true;
    resourceDataR.value = { type: resourceTypeR.value };
  }
  
  const handleDelete = (resource: Resource) => {
    ElMessageBox.confirm(
      `是否确认删除<span style="color:red">${resource.name}</span>资源包？`, 
      'Tips', 
      { confirmButtonText: 'OK', cancelButtonText: 'Cancel', type: 'warning', dangerouslyUseHTMLString: true }
    )
    .then(() => resourceStore.deleteResource(resource.id))
    .then(() => {
      handleClose();
      resourceStore.getResources(defaultPage, defaultPageSize, selectedModelC.value.value);
      ElMessage.success('删除成功！');
    });
  }
  
  const handlePageChange = (page: number, pageSize: number) => {
    resourceStore.getResources(page, pageSize, selectedModelC.value.value);
  }
  
  const handleClose = () => {
    resourceDataR.value = {};
    dialogVisibleR.value = false;
  }
  
  const handleSubmit = (resourceData: Resource) => {
    resourceStore.addResource(resourceData).then(() => {
      ElMessage.success(`${OPERATION_TYPE.ADD.title}成功！`);
      resourceStore.getResources(defaultPage, defaultPageSize, resourceTypeR.value);
      handleClose();
    });
  }
  
  const mapPrice = ({ price, unit }) => ({
    price: price === FREE_PRICE ? `￥${price}` : `￥${price}/${unit}`,
    type: price === FREE_PRICE ? 'error' : 'info'
  });
  
  const mapResourceType = (type: number) => MODEL_LIST.find(item => item.value === type)?.label || '';
  </script>
  
  <template>
    <el-card v-loading="loadingC">
      <div class="toolbar-wrapper">
        <el-radio-group 
          v-model="resourceTypeR" 
          @change="handleRadioChange"
        > 
          <el-radio-button 
            v-for="item in MODEL_LIST" 
            :key="item.value" 
            :label="item.label" 
            :value="item.value" 
          />
        </el-radio-group>
        <el-button type="primary" class="tab-add" @click="handleAdd">
          添加
        </el-button>
      </div>
      <div class="table-wrapper">
        <el-table :data="resourceListC" style="width: 100%">
          <el-table-column prop="name" label="资源包名称" width="180" />
          <el-table-column label="资源类型" width="180" >
            <template #default="scope">
              {{ mapResourceType(scope.row.type) }}
            </template>
          </el-table-column>
          <el-table-column prop="description" label="描述" />
          <el-table-column label="价格" width="180" >
            <template #default="scope">
              <el-text :type="mapPrice(scope.row).type">
                {{ mapPrice(scope.row).price }}
              </el-text>
            </template>
          </el-table-column>
          <el-table-column label="是否有效" width="160" >
            <template #default="scope">
              <el-tag :type="mapStatus(scope.row.status)?.type">
                {{ mapStatus(scope.row.status)?.name }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="120">
            <template #default="scope">
              <el-button 
                v-for="btn in [
                  { text: '编辑', handler: handleEdit }, 
                  { text: '删除', handler: handleDelete }
                ]"
                @click="btn.handler(scope.row)"
                :key="btn.text"
                type="primary" 
                size="small" 
                link 
              >
                {{ btn.text }}
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <BasePagination 
          :total="totalC" 
          @onPageChange="handlePageChange" 
        />
      </div>
    </el-card>
    <BaseDialog 
      :schema='RESOURCE_SCHEMA'
      :ui-schema="RESOURCE_UI_SCHEMA"
      :operation-type="operationTypeR" 
      :dialog-visible="dialogVisibleR" 
      :form-data="resourceDataR"
      @on-data-submit="handleSubmit" 
      @on-dialog-close="handleClose" 
    />
  </template>
  
  <style scoped>
    .tab-add {
      float: right;
    }
    .table-wrapper {
      margin-top: 20px;
    }
  </style>
  