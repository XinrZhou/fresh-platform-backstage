import { defineStore } from "pinia";
import { Spu } from "@/types/type";
import { ElMessage } from 'element-plus';
import { addSpu, getSpuList, deleteSpu } from "@/api/admin";

interface State {
  spuList: object[],
}

export const useSpuStore = defineStore('spu', {
  state: (): State => {
    return {
      spuList: [],
    }
  },
  actions: {
    // 添加SPU
    async addSpu(spu: Spu) {
      const len = spu.categoryId?.length;
      const spuData = {
        ...spu, 
        categoryId: spu.categoryId[len - 1]
      }
      const res = await addSpu(spuData);
      this.getSpuList();
    },
    // 获取SPU列表
    async getSpuList() {
      const res = await getSpuList();
      this.spuList = res.data.data.spus;
    },
    // 删除SPU
    async deleteSpu(sid: string) {
      const res = await deleteSpu(sid);
      this.getSpuList();
    }
  }
})