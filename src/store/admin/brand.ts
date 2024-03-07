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
  total: number,
  brandList: Brand[],
}

export const useBrandStore = defineStore('brand', {
  state: (): State => {
    return {
      total: 1,
      brandList: [],
      brandListOptions: [],
    }
  },
  actions: {
    // 添加品牌
    async addBrand(brand: Brand) {
      const len = brand.categoryId?.length;
      const categoryId = Array.isArray(brand.categoryId) ? brand.categoryId[len - 1] :brand.categoryId;
      const brandData = {
        ...brand,
        categoryId,
      }
      const res = await addBrand(brandData);
    },
    // 获取品牌列表
    async getBrands(page: number, pageSize: number) {
      const res = await getBrandList(page, pageSize);
      this.brandList = res.data.data.brands;
      this.total = res.data.data.total;
    },
    // 通过类目id获取品牌列表
    async getBrandsByCategoryId(cid: string) {
      const res = await getBrandListByCategoryId(cid);
      this.brandListOptions = res.data.data.brands;
    },
    // 删除品牌
    async deleteBrand(bid: string) {
      const res = await deleteBrand(bid);
    }
  }
})