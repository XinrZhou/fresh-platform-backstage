import { REGION_LIST, STYLE_LIST, RESOLUTION_LIST } from "@/constant/common";

export const IMAGE_MODEL_SCHEMA = {
  type: 'object',
  required: ['version', 'region', 'styles', 'resolutions'],
  properties: {
      version: {
          title: '版本号',
          type: 'string',
      },
      region: {
          title: '地域',
          type: 'string',
      },
      styles: {
          title: '支持风格',
          type: 'array',
          items: {
            type: 'string',
          }
      },
      resolutions: {
          title: '支持分辨率',
          type: 'array',
          items: {
            type: 'string'
          }
      },
  }
};

export const IMAGE_MODEL_UI_SCHEMA = {
  region: {
    'ui:widget': 'SelectWidget',
    'ui:options': {
      clearable: true,
    },
    'ui:enumOptions': REGION_LIST
  },
  styles: {
    'ui:widget': 'SelectWidget',
    'ui:options': {
      multiple: true,
      clearable: true,
      collapseTags: true,
      collapseTagsTooltip: true
    },
    'ui:enumOptions': STYLE_LIST
  },
  resolutions: {
    'ui:widget': 'SelectWidget',
    'ui:options': {
      multiple: true,
      clearable: true,
      collapseTags: true,
      collapseTagsTooltip: true
    },
    'ui:enumOptions': RESOLUTION_LIST
  }
};