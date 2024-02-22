import { defineStore } from "pinia";
import { Brand } from "@/types/type";
import { ElMessage } from 'element-plus';
import { 
  addBrandSnapshot, 
  getBrandSnapshotList, 
  deleteBrandSnapshot 
} from "@/api/user";

interface State {
  total: number,
  brandList: Brand[],
}

export const useBrandSnapshotStore = defineStore('brandSnapshot', {
  state: (): State => {
    return {
      total: 1,
      brandList: [],
      brandListOptions: [],
    }
  },
  actions: {
    // 添加品牌
    async addBrandSnapshot(brand: Brand, uid: string) {
      const userId = uid || brand.userId;
      const len = brand.categoryId?.length;
      const categoryId = Array.isArray(brand.categoryId) ? brand.categoryId[len - 1] :brand.categoryId;
      const brandData = {
        ...brand,
        userId ,
        categoryId,
      }
      const res = await addBrandSnapshot(brandData);
    },
    // 获取品牌列表
    async getBrandSnapshots(page: number, pageSize: number, uid: string) {
      const res = await getBrandSnapshotList(page, pageSize, uid);
      this.total = res.data.data.total;
      this.brandList = res.data.data.brands;
    },
    // 删除品牌
    async deleteBrandSnapshot(bid: string) {
      const res = await deleteBrandSnapshot(bid);
    }
  }
})