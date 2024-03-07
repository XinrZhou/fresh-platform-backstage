import { computed, watch } from "vue";
import { useCategoryStore } from "@/store/admin/category";
import TheDynamicTag from "@/components/TheDynamicTag.vue";

const categoryStore = useCategoryStore();
categoryStore.getCategoriesOptions();
const categoryTreeOptionsC = computed(() => categoryStore.categoryTreeOptions);

watch(() => categoryStore.categoryTreeOptions, () => {
    Object.assign(ATTRIBUTE_UI_SCHEMA.categoryId, {
        'ui:options': {
            props: {
                label: 'name',
                value: 'id', 
                multiple: true,
                checkStrictly: true,
            },
            clearable: true,
            collapseTags: true,
            collapseTagsTooltip: true,
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
        },
        value: {
            title: '属性值',
            type: 'array',
            items: {
                type: 'string'
            }
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
    value: {
        'ui:widget': TheDynamicTag,
    }
};