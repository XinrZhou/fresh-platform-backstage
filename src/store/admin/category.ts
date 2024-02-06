import { defineStore } from "pinia";
import { Category } from "@/types/type";
import { ElMessage } from 'element-plus';
import { transformToOptionsFormat } from "@/utils";
import { 
  addCategory, 
  getParentCategories, 
  getCategories,
  uploadImage, 
  deleteCategory,
} from "@/api/admin";


interface State {
  categoryList: Category[];
  parentCategoryList: Category[];
  parentCategoryListM: Category[];
  categoryImageUrl: string;
}

export const useCategoryStore = defineStore('category', {
  state: (): State => {
    return {
      categoryList: [],
      parentCategoryList: [],
      imageUrl: '',
    }
  },
  actions: {
    async addCategory(category: Category) {
      const res = await addCategory(category);
      this.getCategories();
      return res;
    },

    async getParentCategories() {
      const res = await getParentCategories();
      this.parentCategoryList = res.data.data.categories;
      this.parentCategoryListM = transformToOptionsFormat(res.data.data.categories);
    },

    async getCategories() {
      const res = await getCategories();
      this.categoryList = res.data.data.categories;
    },

    async uoloadImage(file: File) {
      const data = new FormData();
      data.append('file', file);
      const res = await uploadImage(data);

      this.imageUrl = res.data.data.url;
    },

    async deleteCategory(cid: string) {
      const res = await deleteCategory(cid);
      this.getCategories();
      ElMessage.success("删除成功！");
    }
  }
})