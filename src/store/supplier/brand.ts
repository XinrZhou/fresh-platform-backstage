import { defineStore } from "pinia";
import { Brand } from "@/types/type";
import { ElMessage } from 'element-plus';
import { 
  addBrand,
  getBrandList,
  getBrandListByCategoryId,
  deleteBrand,
} from "@/api/admin";

interface State {
  brandList: Brand[],
}

export const useBrandStore = defineStore('brand', {
  state: (): State => {
    return {
      brandList: [],
      brandListOptions: [],
    }
  },
  actions: {
    // 添加品牌
    async addBrand(brand: Brand, userId: string) {
      const len = brand.categoryId?.length;
      const categoryId = Array.isArray(brand.categoryId) ? brand.categoryId[len - 1] :brand.categoryId;
      const brandData = {
        ...brand,
        userId,
        categoryId,
      }
      const res = await addBrand(brandData);
      this.getBrands();
    },
    // 获取品牌列表
    async getBrands() {
      const res = await getBrandList();
      this.brandList = res.data.data.brands;
    },
    // 通过类目id获取品牌列表
    async getBrandsByCategoryId(cid: string) {
      const res = await getBrandListByCategoryId(cid);
      this.brandListOptions = res.data.data.brands;
    },
    // 删除品牌
    async deleteBrand(bid: string) {
      const res = await deleteBrand(bid);
      this.getBrands();
    }
  }
})