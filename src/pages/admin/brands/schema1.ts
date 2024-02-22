export const BRANDSNAPSHOT_SCHEMA = {
    type: 'object',
    required: ['status'],
    properties: {
        status: {
            title: '审核意见',
            type: 'number',
        },
        reason: {
            title: '原因',
            type: 'string'
        }
    }
};

export const BRANDSNAPSHOT_UI_SCHEMA = {
    status: {
        'ui:widget': 'SelectWidget',
        'ui:enumOptions': [
            {value: 1,  label: '审核通过'}, 
            {value: 2,  label: '审核驳回'}
        ],
    },
    reason: {
        'ui:widget': 'el-input',
        'ui:options': {
            type: 'textarea'
        }
    }
};