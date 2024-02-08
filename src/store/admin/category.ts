import { defineStore } from "pinia";
import { Category } from "@/types/type";
import { CATEGORY_LEVEL } from "@/constant/enums";
import { ElMessage } from 'element-plus';
import { 
  flatMapCategories, 
  formatToAddRoot,
} from "@/utils";
import { 
  addCategory, 
  getCategoriesByParentId,
  getParentLevelOptions,
  getCategories,
  uploadImage, 
  deleteCategory,
} from "@/api/admin";


interface State {
  categoryList: Category[];
  parentCategoryList: Category[];
  imageUrl: string;
}

export const useCategoryStore = defineStore('category', {
  state: (): State => {
    return {
      categoryList: [],
      categoryTreeList: [],
      parentCategoryList: [],
      parentLevelOptions: [],
      imageUrl: '',
    }
  },
  actions: {
    // 添加类目
    async addCategory(category: Category) {
      const res = await addCategory(category);
      this.getCategories();
      return res;
    },

    // 获取所有类目
    async getCategories() {
      const res = await getCategories();
      const categories = res.data.data.categories;
      this.categoryTreeList = formatToAddRoot(categories);
      this.categoryList = flatMapCategories(categories);
    },

    // 根据父类目id获取子类目
    async getCategoriesByParentId(pid: string) {
      const res = await getCategoriesByParentId(pid);
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
      this.getCategories();
      ElMessage.success("删除成功！");
    },

    // 上传图片
    async uoloadImage(file: File) {
      const data = new FormData();
      data.append('file', file);
      const res = await uploadImage(data);

      this.imageUrl = res.data.data.url;
    },
  }
})