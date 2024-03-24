<script setup lang='ts'>
  import { computed, toRaw, ref, watch } from 'vue';
  import router from '@/router';
  import { useUserStore } from '@/store/user/user';
  import { useSpuStore } from '@/store/user/spu';
  import { useOssStore } from '@/store/user/oss';
  import { useBrandStore } from '@/store/admin/brand';
  import { useAttributeStore } from '@/store/admin/attribute';
  import { useCategoryStore } from '@/store/admin/category';
  import { ElMessage, ElMessageBox } from 'element-plus';
  import type { FormInstance} from 'element-plus';
  import { Spu } from '@/types/type';
  import { ROLE } from '@/constant/enums';
  import { IMAGE_TYPE, OPERATION_TYPE } from '@/constant/enums'; 
  import BaseDynamicTag from '@/components/BaseDynamicTag.vue';
  import BaseUpload from '@/components/BaseUpload.vue';

  const props = defineProps([
    'dialogVisible', 'spuData', 'operationType'
  ]);
  const emits = defineEmits(['onDialogClose', 'getDataList']);

  const STEP_LIST = {
    FIRST: 1,
    SECOND: 2,
  };
  const currentStep = ref<number>(STEP_LIST.FIRST);

  const categoryStore = useCategoryStore();
  categoryStore.getCategoriesOptions();
  const categoryTreeOptionsC = computed(() => categoryStore.categoryTreeOptions);
  
  const brandStore = useBrandStore();
  const brandListOptionsC = computed(() => brandStore.brandListOptions);

  const ossStore = useOssStore();
  const spuStore = useSpuStore();
  const userStore = useUserStore();
  const roleC = computed(() => userStore.role);

  const attributeStore = useAttributeStore();
  const attributeFormItemListC = computed(() => attributeStore.attributeFormItemList);
  const attributeValueListC = computed(() => attributeStore.attributeValueList);

  const spuR = ref<Spu>({saleStatus: 1});
  const imageTypeR = ref<String>('');
  const specialSpecList = ref([]);
  const genericSpecList = ref([]);
  let genericSpecObj = {};

  const cascaderProps = {
    label: 'name',
    value: 'id',
  }

  watch(() => ossStore.imageUrl, () => {
    spuR.value.imageUrl = toRaw(ossStore.imageUrl);
  })

  watch(() => props.spuData, () => {
    spuR.value = props.spuData;
    if (spuR.value.categoryId) {
      attributeStore.getAttributeListByCategoryId(spuR.value.categoryId);
    }
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
  // 添加属性项
  const handleAddAttributeItem = () => {
    specialSpecList.value.push({
      name: '',
      value: ''
    })
  }
  // 删除属性项
  const handeleDeleteAttributeItem = (index) => {
    specialSpecList.value.splice(index, 1);
  }

  const handleCascaderChange = (cids: string[]) => {
    const cid = cids[cids.length - 1];
    brandStore.getBrandsByCategoryId(cid);
    attributeStore.getAttributeListByCategoryId(cid);
  }

  const onDialogOpen = () => {
    if (props.operationType.name === OPERATION_TYPE.EDIT.name) {
      brandStore.getBrandsByCategoryId(props.spuData.categoryId);
    }
  }

  const onCancel = () => {
    emits('onDialogClose');
    currentStep.value = STEP_LIST.FIRST;
    spuR.value = {};
    specialSpecList.value = [];
    genericSpecList.value = [];
    genericSpecObj = {};
  }

  const handleSubmit = () => {
    ruleFormRef.value.validate((valid, fields) => {
      if (valid) {
        spuStore.addSpu(
          toRaw(spuR.value), genericSpecObj, toRaw(specialSpecList.value)
        ).then(() => {
          currentStep.value = STEP_LIST.FIRST;
          spuR.value = {};
          ElMessage.success(`${props.operationType.title}成功！`);
          emits('getDataList');
          emits('onDialogClose'); 
        });
      } else {
        Elmessage.error('请填写必要表单项！');
      }
    });
  }

  const handleImageUpload = (file) => {
    ossStore.uploadImage(file);
  }

  const handleImageRemove = () => {
    if (imageTypeR.value === IMAGE_TYPE.MAIN) {
      spuR.value.imageUrl = ''; 
    } else {
      spuR.value.detailImageUrl = ''; 
    }
  }

  const handleTagsInput = (tagValues) => {
    spuR.value.tags = tagValues;
  }

  const addBrand = () => {
    router.push("/supplier/brand");
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
    <el-form label-width="100" ref="ruleFormRef" :model="spuR">
      <template v-if="currentStep === STEP_LIST.FIRST">
        <el-form-item label="SPU名称" prop="name" required >
          <el-input type="textarea" v-model="spuR.name" />
        </el-form-item>
        <el-form-item label="关联类目" prop="categoryId" required >
          <el-cascader
            v-model="spuR.categoryId"
            :options="categoryTreeOptionsC"
            :props="cascaderProps"
            @change="handleCascaderChange"
          />
        </el-form-item>
        <el-form-item label="关联品牌" prop="brandId">
          <el-row style="width: 100%;">
            <el-col :span="16">
              <el-select
                v-model="spuR.brandId"
              >
                <el-option
                  v-for="item in brandListOptionsC"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-col>
            <el-col 
              :span="6" 
              v-if="roleC !== ROLE.ADMIN">
              <el-button
                @click="addBrand" 
                type="primary" 
                link
              >
                +申请新品牌
              </el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="是否上架" prop="saleStatus" required >
          <el-switch 
            v-model="spuR.saleStatus"
            :active-value="1"
            :inactive-value="0"
          />
        </el-form-item>
        <el-form-item label="商品标签" prop="tags">
          <BaseDynamicTag
            :tags-value="spuR.tags"
            @on-input="handleTagsInput" 
          />
        </el-form-item>
        <el-form-item label="SPU图片" prop="imageUrl">
          <BaseUpload 
            :image-url="spuR.imageUrl" 
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