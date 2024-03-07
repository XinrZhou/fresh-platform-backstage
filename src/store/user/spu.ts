import { defineStore } from "pinia";
import { Spu } from "@/types/type";
import { ElMessage } from 'element-plus';
import { 
  addSpu, 
  getSpuList, 
  getSpuOptionsList,
  getSpuListByCategoryId, 
  deleteSpu, 
} from "@/api/user";

interface State {
  total: number,
  spuList: object[],
  spuOptionsList: object[]
}

export const useSpuStore = defineStore('spu', {
  state: (): State => {
    return {
      total: 1,
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
    async getSpuOptionsList() {
      const res = await getSpuOptionsList();
      this.spuOptionsList = res.data.data.spus;
    },
    // 获取SPU列表 -- 分页
    async getSpuList(page: number, pageSize: number) {
      const res = await getSpuList(page, pageSize);
      this.spuList = res.data.data.spus;
      this.total = this.spuList.length;
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