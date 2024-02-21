import { computed, watch } from "vue";
import { useCategoryStore } from "@/store/admin/category";

const categoryStore = useCategoryStore();
categoryStore.getCategoriesOptions();
const categoryTreeOptionsC = computed(() => categoryStore.categoryTreeOptions);

watch(() => categoryStore.categoryTreeOptions, () => {
    Object.assign(BRAND_UI_SCHEMA.categoryId, {
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

export const BRAND_SCHEMA = {
    type: 'object',
    required: ['name', 'categoryId'],
    properties: {
        name: {
            title: '品牌名称',
            type: 'string',
        },
        categoryId: {
            title: '关联类目',
            type: 'array',
            items: {
                type: 'string'
            }
        },
    }
};

export const BRAND_UI_SCHEMA = {
    categoryId: {
        'ui:widget': 'el-cascader',
        'ui:options': {
            options: [],
        }
    },
};