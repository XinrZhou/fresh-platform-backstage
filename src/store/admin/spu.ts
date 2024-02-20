import { defineStore } from "pinia";
import { Spu } from "@/types/type";
import { ElMessage } from 'element-plus';
import { 
  addSpu, 
  getSpuList, 
  getSpuListByCategoryId, 
  deleteSpu 
} from "@/api/admin";

interface State {
  spuList: object[],
}

export const useSpuStore = defineStore('spu', {
  state: (): State => {
    return {
      spuList: [],
      spuOptionsList: [],
    }
  },
  actions: {
    // 添加SPU
    async addSpu(spu: Spu) {
      const len = spu.categoryId?.length;
      const categoryId = Array.isArray(spu.categoryId) ? spu.categoryId[len - 1] : spu.categoryId;
        
      const spuData = {
        ...spu, 
        categoryId,
      }
      const res = await addSpu(spuData);
      this.getSpuList();
    },
    // 获取SPU列表
    async getSpuList() {
      const res = await getSpuList();
      this.spuList = res.data.data.spus;
    },
    // 获取当前类目及子类目SPU列表
    async getSpuListByCategoryId(categoryId: string) {
      const res = await getSpuListByCategoryId(categoryId);
      this.spuOptionsList = res.data.data.spus;
    },
    // 删除SPU
    async deleteSpu(sid: string) {
      const res = await deleteSpu(sid);
      this.getSpuList();
    }
  }
})