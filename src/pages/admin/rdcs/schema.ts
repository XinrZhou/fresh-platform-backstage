import { pcaTextArr } from "element-china-area-data";
export const RDC_SCHEMA = {
    type: 'object',
    required: ['name', 'address', 'detail'],
    properties: {
        name: {
            title: '名称',
            type: 'string',
            width: 50
        },
        address: {
            title: '省市区',
            type: 'array',
            items: {
                type: 'string'
            }
        },
        detail: {
            title: '详细地址',
            type: 'string'
        }
    }
};

export const RDC_UI_SCHEMA = {
    address: {
        // 配置组件构造函数或者直接配置全局组件名，比如 'el-input'
        'ui:widget': 'el-cascader',
        'ui:options': {
            options: pcaTextArr
        },
    },
    detail: {
        'ui:options': {
            type: 'textarea',
            rows: 2
        }
    }
};