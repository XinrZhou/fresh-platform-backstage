<script setup lang='ts'>
  import { defineProps, computed, toRaw, ref, defineEmits, watch } from 'vue';
  import { useSpuStore } from '@/store/user/spu';
  import { useOssStore } from '@/store/user/oss';
  import { useSkuStore } from '@/store/user/sku';
  import { useAttributeStore } from '@/store/admin/attribute';
  import { ElMessage, ElMessageBox } from 'element-plus';
  import type { FormInstance} from 'element-plus';
  import { Sku } from '@/types/type';
  import { OPERATION_TYPE, CATEGORY_OPTIONS, CATEGORY_LEVEL } from '@/constant/enums';
  import BaseUpload from '@/components/BaseUpload.vue';

  const props = defineProps([
    'dialogVisible', 'skuData', 'operationType'
  ]);
  const emits = defineEmits(['onDialogClose',]);

  const STEP_LIST = {
    FIRST: 1,
    SECOND: 2,
  };
  let currentStep = ref<number>(STEP_LIST.FIRST);
  
  const skuStore = useSkuStore();
  let skuR = ref<Sku>({ 
    enable: 1, 
  });
  let specialSpecList = ref([])
  let genericSpecObj = {};
  const genericSpecList = ref([])
  watch(() => props.skuData, () => {
    skuR.value = props.skuData;
    if (Object.keys(skuR.value).length) {
      handleSelectSpu(props.skuData.spuId);
    }
  })

  const spuStore = useSpuStore();
  spuStore.getSpuList();
  const spuListC = computed(() => spuStore.spuList);
  
  const attributeStore = useAttributeStore();
  const attributeFormItemListC = computed(() => attributeStore.attributeFormItemList);
  const attributeValueListC = computed(() => attributeStore.attributeValueList);
  // 选择SPU后获取SPU关联类目属性列表
  const handleSelectSpu = (sid: string) => {
    return attributeStore.getAttributeListBySpuId(sid);
  }

  const ossStore = useOssStore();
  const handleImageUpload = (file) => {
    ossStore.uploadImage(file);
  }
  const handleImageRemove = () => {
    skuR.value.imageUrl = '';
  }
  watch(() => ossStore.imageUrl, () => {
    skuR.value.imageUrl = toRaw(ossStore.imageUrl);
  })


  const ruleFormRef = ref<FormInstance>(null);
  // 表单校验
  const handleNextStep = () => {
    const { FIRST, SECOND } = STEP_LIST;
    ruleFormRef.value.validate((valid, fields) => {
      if (valid) {
        currentStep.value = currentStep.value === FIRST ? SECOND : FIRST;
      } else {
        Elmessage.error('请填写必要表单项！');
      }
    });
  };
  const handleSelectAttributeValue = (attrItem, attrValue) => {
    const objectKey = attrItem.name;
    genericSpecObj[objectKey] = attrValue
  }
  const handleAddAttributeItem = () => {
    specialSpecList.value.push({
      name: '',
      value: ''
    })
  }
  const handeleDeleteAttributeItem = (index) => {
    specialSpecList.value.splice(index, 1);
  }
  const onCancel = () => {
    emits('onDialogClose');
    skuR.value = {};
  }
  const handleSubmit = () => {
    skuStore.addSku(
      toRaw(skuR.value), genericSpecObj, toRaw(specialSpecList.value)
    ).then(() => {
     ElMessage.success(`${props.operationType.title}成功！`);
      emits('onDialogClose'); 
    });
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
    <el-form label-width="100" ref="ruleFormRef" :model="skuR">
      <template v-if="currentStep === STEP_LIST.FIRST">
        <el-form-item label="SKU名称" prop="name" required >
          <el-input v-model="skuR.name" />
        </el-form-item>
        <el-form-item label="是否有效" prop="enable" required >
          <el-switch 
            v-model="skuR.enable"
            :active-value="1"
            :inactive-value="0"
          />
        </el-form-item>
        <el-form-item label="关联SPU" prop="spuId" required >
          <el-select
            v-model="skuR.spuId"
            @change="handleSelectSpu"
          >
            <el-option
              v-for="item in spuListC"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="库存" prop="stock" required >
          <el-input-number 
            v-model="skuR.stock" 
            :min="1" 
            :max="99999"
          />
        </el-form-item>
        <el-form-item label="原始价格" prop="originPrice" required >
          <el-input-number 
            v-model="skuR.originPrice" 
            :precision="2" 
            :step="0.1" 
            :max="999999" 
          />
        </el-form-item>
        <el-form-item label="折扣价格" prop="discountPrice" required >
          <el-input-number 
            v-model="skuR.discountPrice" 
            :precision="2" 
            :step="0.1" 
            :max="999999" 
          />
        </el-form-item>
        <el-form-item label="SKU图片" prop="imageUrl" >
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
            v-model="genericSpecList[index]"
            multiple
            filterable
            allow-create
            default-first-option
            :reserve-keyword="false"
            style="width: 240px"
            @change="handleSelectAttributeValue(item, $event)"
          >
            <el-option
              v-for="itemV in item.value"
              :key="itemV"
              :label="itemV"
              :value="itemV"
            />
          </el-select>
        </el-form-item>
        <template 
          v-for="(item, index) in specialSpecList" 
          :key="index"
        >
          <el-row>
            <el-col :span="11">
              <el-form-item :label="`参数名${index + 1}`">
                <el-input v-model="item.name" />
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item :label="`参数值${index + 1}`">
                <el-input 
                  v-model="item.value"
                  placeholder="多个值请以,分隔" 
                />
              </el-form-item>
            </el-col>
            <el-col :span="1">
              <el-icon @click="handeleDeleteAttributeItem(index)">
                <Delete />
              </el-icon>
            </el-col>
          </el-row>
        </template>
        <el-form-item >
          <el-button 
            type="primary" 
            link 
            @click="handleAddAttributeItem"
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
          @click="handleSubmit"
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