import { computed, ref, toRaw, watch } from "vue";
import { useAttributeStore } from "@/store/admin/Attribute";
import { useCategoryStore } from "@/store/admin/category";
import { options } from "node_modules/axios/index.d.cts";

const categoryStore = useCategoryStore();
categoryStore.getCategories();
const categoryTreeOptionsC = computed(() => categoryStore.categoryTreeOptions);

watch(() => categoryStore.categoryTreeOptions, () => {
    Object.assign(ATTRIBUTE_UI_SCHEMA.categoryId, {
        'ui:options': {
            props: {
                label: 'name',
                value: 'id', 
                checkStrictly: true
            },
            options: categoryTreeOptionsC.value
        }
    });
})

export const ATTRIBUTE_SCHEMA = {
    type: 'object',
    required: ['name', 'categoryId', 'isNumeric', 'isGeneric'],
    properties: {
        name: {
            title: '名称',
            type: 'string',
        },
        categoryId: {
            title: '关联类目',
            type: 'array',
            items: {
                type: 'string'
            }
        },
        isNumeric: {
            title: '数字类型',
            type: 'number'
        },
        unit: {
            title: '单位',
            type: 'string',
        },
        isGeneric: {
            title: '通用属性',
            type: 'number'
        }
    }
};

export const ATTRIBUTE_UI_SCHEMA = {
    categoryId: {
        'ui:widget': 'el-cascader',
        'ui:options': {
            options: [],
        }
    },
    isNumeric: {
        'ui:widget': 'el-switch',
        'ui:options': {
            activeValue: 1,
            inactiveValue: 0
        }
    },
    isGeneric: {
        'ui:widget': 'el-switch',
        'ui:options': {
            activeValue: 1,
            inactiveValue: 0
        }
    },

};