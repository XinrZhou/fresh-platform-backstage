<script setup lang='ts'>
  import { defineProps, computed, toRaw, ref, defineEmits, watch } from 'vue';
  import { useSpuStore } from '@/store/admin/spu';
  import { useOssStore } from '@/store/user/oss';
  import { useSkuStore } from '@/store/admin/sku';
  import { useAttributeStore } from '@/store/admin/attribute';
  import { ElMessage, ElMessageBox } from 'element-plus';
  import { Sku } from '@/types/type';
  import { OPERATION_TYPE, CATEGORY_OPTIONS, CATEGORY_LEVEL } from '@/constant/enums';
  import BaseUpload from '@/components/BaseUpload.vue';

  const props = defineProps([
    'dialogVisible', 'skuData', 'operationType'
  ]);
  const emits = defineEmits(['onDialogClose',]);
  
  const spuStore = useSpuStore();
  spuStore.getSpuList();
  const spuListC = computed(() => spuStore.spuList);
  
  const attributeStore = useAttributeStore();
  const attributeFormItemListC = computed(() => attributeStore.attributeFormItemList);
  const attributeValueListC = computed(() => attributeStore.attributeValueList);

  const ossStore = useOssStore();
  const skuStore = useSkuStore();

  const STEP_LIST = {
    FIRST: 1,
    SECOND: 2,
  };
  let skuR = ref<Sku>({ enable: 1, genericSpec: [] });
  let currentStep = ref<number>(STEP_LIST.FIRST);
  let extendedAttributeList = ref([])
  let genericSpecObj = {};

  watch(() => ossStore.imageUrl, () => {
    skuR.value.imageUrl = toRaw(ossStore.imageUrl);
  })

  watch(() => props.skuData, () => {
    skuR.value = props.spuData;
  })

  const handleSpuChange = (sid: string) => {
    return attributeStore.getAttributeListBySpuId(sid);
  }

  const onCancel = () => {
    emits('onDialogClose');
    skuR.value = {};
  }

  const handleImageUpload = (file) => {
    ossStore.uploadImage(file);
  }

  const handleImageRemove = () => {
    skuR.value.imageUrl = '';
  }

  const handleNextStep = () => {
    if (currentStep.value === STEP_LIST.FIRST) {
      currentStep.value = STEP_LIST.SECOND;
    } else {
      currentStep.value = STEP_LIST.FIRST;
    }
  }

  const handleSelectChange = (attrItem, attrValue) => {
    const objectKey = attrItem.name;
    genericSpecObj[objectKey] = attrValue
  }

  const handleAddAttribute = () => {
    extendedAttributeList.value.push({
      name: '',
      value: ''
    })
  }

  const handeleDeleteAttribute = (index) => {
    extendedAttributeList.value.splice(index, 1);
  }

</script>

<template>
  <el-dialog 
    :model-value="props.dialogVisible"
    :title=props.operationType.title
    width="600"
    @close="onCancel"
    @open="onDialogOpen"
  >
    <el-form label-width="100">
      <template v-if="currentStep === STEP_LIST.FIRST">
        <el-form-item label="SKU名称" required >
          <el-input v-model="skuR.name" />
        </el-form-item>
        <el-form-item label="是否有效" required >
          <el-switch 
            v-model="skuR.enable"
            :active-value="1"
            :inactive-value="0"
          />
        </el-form-item>
        <el-form-item label="关联SPU" required >
          <el-select
            v-model="skuR.spuId"
            @change="handleSpuChange"
          >
            <el-option
              v-for="item in spuListC"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="库存" required >
          <el-input-number 
            v-model="skuR.stock" 
            :min="1" 
            :max="99999"
          />
        </el-form-item>
        <el-form-item label="原始价格" required >
          <el-input
            v-model="skuR.originPrice" 
          />
        </el-form-item>
        <el-form-item label="折扣价格" required >
          <el-input
            v-model="skuR.discountPrice" 
          />
        </el-form-item>
        <el-form-item label="SKU图片" required>
          <BaseUpload 
            :image-url="skuR.imageUrl" 
            @on-upload="handleImageUpload"
            @on-remove="handleImageRemove"
          />
        </el-form-item>
      </template>
      <template v-else>
        <el-form-item 
          v-for="(item, index) in attributeFormItemListC"
          :label="item.name"
          :key="item.id"
        >
          <el-select
            v-model="skuR.genericSpec[index]"
            multiple
            filterable
            allow-create
            default-first-option
            :reserve-keyword="false"
            style="width: 240px"
            @change="handleSelectChange(item, $event)"
          >
            <el-option
              v-for="itemV in item.value"
              :key="itemV"
              :label="itemV"
              :value="itemV"
            />
          </el-select>
        </el-form-item>
        <template v-for="(item, index) in extendedAttributeList" :key="index">
          <el-row>
            <el-col :span="11">
              <el-form-item :label="`参数名${index + 1}`">
                <el-input v-model="item.name" />
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item :label="`参数值${index + 1}`">
                <el-input v-model="item.value" />
              </el-form-item>
            </el-col>
            <el-col :span="1">
              <el-icon @click="handeleDeleteAttribute(index)">
                <Delete />
              </el-icon>
            </el-col>
          </el-row>
        </template>
        <el-form-item >
          <el-button 
            type="primary" 
            link 
            @click="handleAddAttribute"
          >
            +新增属性
          </el-button>
        </el-form-item>
      </template>
      <el-form-item>
        <el-button type="primary" @click="handleNextStep">
          {{
            currentStep === STEP_LIST.FIRST ? '下一步' : '上一步'
          }}
        </el-button>
        <el-button 
          type="primary" 
          v-show = "currentStep === STEP_LIST.SECOND"
        >
          提交
        </el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<style scoped>
  .el-icon {
    margin-top: 8px;
    margin-left: 16px;
    cursor: pointer;
  }
</style>