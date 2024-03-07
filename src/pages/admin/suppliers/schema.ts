import { computed, ref, toRaw, watch } from "vue";
import { useRdcStore } from "@/store/admin/rdc";

const rdcStore = useRdcStore();
rdcStore.getRdcOptionsList();

watch(() => rdcStore.rdcOptionsList, () => {
    Object.assign(SUPPLIER_UI_SCHEMA.rdcId, {
        'ui:enumOptions': rdcStore.rdcOptionsList
    });
})

export const SUPPLIER_SCHEMA = {
    type: 'object',
    required: ['name', 'number', 'rdcId', 'shopStatus'],
    properties: {
        name: {
            title: '名称',
            type: 'string',
        },
        number: {
            title: '手机号',
            type: 'string',
        },
        rdcId: {
            title: '供应区域',
            type: 'string'
        },
        shopStatus: {
            title: '店铺状态',
            type: 'number',
        }
    }
};

export const SUPPLIER_UI_SCHEMA = {
    rdcId: {
        'ui:widget': 'SelectWidget',
        'ui:enumPotions':[],
    },
    shopStatus: {
        'ui:widget': 'SelectWidget',
        'ui:enumOptions': [
            {value: 0,  label: '审核中'}, 
            {value: 1,  label: '营业中'}, 
            {value: 2,  label: '已关闭'}
        ],
    }
};