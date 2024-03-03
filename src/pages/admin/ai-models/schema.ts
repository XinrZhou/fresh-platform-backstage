export const CHAT_MODEL_SCHEMA = {
    type: 'object',
    required: ['version', 'model'],
    properties: {
        version: {
            title: '版本号',
            type: 'string',
        },
        model: {
            title: '模型',
            type: 'string',
            width: 50
        },
        seed: {
            title: '随机种子',
            type: 'number'
        },
        topP: {
            title: '概率阈值',
            type: 'number'
        },
        topK: {
            title: '采样大小',
            type: 'number'
        },
        repetitionPenalty: {
            title: '重复惩罚参数',
            type: 'number'
        },
        enableSearch: {
            title: '互联网搜索',
            type: 'number'
        }
    }
};

export const CHAT_MODEL_UI_SCHEMA = {
    model: {
        'ui:widget': 'SelectWidget',
        'ui:enumOptions': [
            {value: 'qwen-turbo',  label: 'qwen-turbo'}, 
            {value: 'qwen-plus',  label: 'qwen-plus'},
            {value: 'qwen-max',  label: 'qwen-max'},
            {value: 'qwen-max-1201',  label: 'qwen-max-1201'},
            {value: 'qwen-max-longcontext',  label: 'qwen-max-longcontext'}
        ],
    },
    seed: {
        'ui:options': {
            controls: false,
            precision: 0,
            min: 0,
        }
    },
    topP: {
        'ui:options': {
            min: 0.01,
            max: 0.99,
            precision: 2,
            controls: false
        }
    },
    topK: {
        'ui:options': {
            min: 1,
            precision: 0,
            controls: false
        }
    },
    repetitionPenalty: {
        'ui:options': {
            min: 1.0,
            precision: 1,
            controls: false
        }
    },
    enableSearch: {
        'ui:widget': 'el-switch',
        'ui:options': {
            activeValue: 1,
            inactiveValue: 0
        }
    }
};