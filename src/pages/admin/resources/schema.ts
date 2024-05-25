import { MODEL_LIST } from "@/constant/enums";

export const RESOURCE_SCHEMA = {
    type: 'object',
    required: ['name', 'type', 'price'],
    properties: {
        name: {
            title: '资源包名称',
            type: 'string',
        },
        type: {
            title: '资源类型',
            type: 'number',
        },
        description: {
            title: '描述',
            type: 'string',
        },
        price: {
            title: '价格',
            type: 'number',
        },
        unit: {
            title: '单位',
            type: 'string'
        }
    }
};

export const RESOURCE_UI_SCHEMA = {
    type: {
        'ui:widget': 'SelectWidget',
        'ui:enumOptions': MODEL_LIST,
        // 'ui:options': {
        //     disabled: true
        // }
    },
    description: {
        'ui:widget': 'el-input',
        'ui:options': {
            type: 'textarea'
        }
    },    
    price: {
        'ui:options': {
            min: 0,
            max: 99999,
            precision: 2,
            controls: false
        }
    },
};