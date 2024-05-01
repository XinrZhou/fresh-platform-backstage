import { REGION_LIST, STYLE_LIST, RESOLUTION_LIST } from "@/constant/common";
import TheDynamicTag from "@/components/TheDynamicTag.vue";

export const IMAGE_MODEL_SCHEMA = {
  type: 'object',
  required: ['version', 'checkpoint', 'defaultParams'],
  properties: {
      version: {
          title: '版本号',
          type: 'string',
      },
      checkpoint: {
        title: '基础模型',
        type: 'array',
        items: {
          type: 'string'
        }
      },
      defaultParams: {
          title: '默认参数',
          type: 'string',
      },
      lora: {
          title: 'LoRA模型',
          type: 'array',
          items: {
            type: 'string'
          }
      },
  }
};

export const IMAGE_MODEL_UI_SCHEMA = {
  checkpoint: {
    'ui:widget': TheDynamicTag,
  },
  defaultParams: {
    'ui:widget': 'el-input',
    'ui:options': {
        type: 'textarea',
        rows: 5
    }
  },
  lora: {
    'ui:widget': TheDynamicTag,
  }
};