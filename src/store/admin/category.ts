import { defineStore } from "pinia";
import { Category } from "@/types/type";
import { CATEGORY_LEVEL } from "@/constant/enums";
import { ElMessage } from 'element-plus';
import { flatMapCategories, formatToAddRoot } from "@/utils";
import { 
  addCategory, 
  getCategoriesByParentId,
  getParentLevelOptions,
  getCategories,
  getCategoriesTree,
  getCategoriesOptions,
  uploadImage, 
  deleteCategory,
} from "@/api/admin";


interface State {
  categoryList: Category[],
  parentCategoryList: Category[],
  imageUrl: string,
}

export const useCategoryStore = defineStore('category', {
  state: (): State => {
    return {
      total: 1,
      categoryList: [],
      categoryTreeList: [],
      categoryTreeOptions: [],
      parentCategoryList: [],
      parentLevelOptions: [],
      imageUrl: '',
    }
  },
  actions: {
    // 添加类目
    async addCategory(category: Category) {
      const res = await addCategory(category);
    },

    // 获取所有类目
    async getCategories(page: number, pageSize: number) {
      console.log('page===', page, pageSize)
      const res = await getCategories(page, pageSize);
      const categories = res.data.data.categories;
      this.total = res.data.data.total;
      this.categoryList = flatMapCategories(categories);
    },

    // 获取类目选项
    async getCategoriesOptions() {
      const res = await getCategoriesOptions();
      this.categoryTreeOptions = res.data.data.categories;
    },

    // 获取类目树
    async getCategoriesTree() {
      const res = await getCategoriesTree();
      const categories = res.data.data.categories;

      this.categoryTreeList = formatToAddRoot(categories);
    },

    // 根据父类目id获取子类目
    async getCategoriesByParentId(pid: string, page: numer, pageSize: number) {
      const res = await getCategoriesByParentId(pid, page, pageSize);
      this.total = res.data.data.total;
      this.categoryList = res.data.data.categories;
    },

    // 获取n级类目列表
    async getParentLevelOptions(level: number) {
      const res = await getParentLevelOptions(level);
      this.parentLevelOptions = res.data.data.categories;
    },

    // 删除类目
    async deleteCategory(cid: string) {
      const res = await deleteCategory(cid);
    },

    // 上传图片
    async uploadImage(file: File) {
      const data = new FormData();
      data.append('file', file);
      const res = await uploadImage(data);

      this.imageUrl = res.data.data.url;
    },
  }
})