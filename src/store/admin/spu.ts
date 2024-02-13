import { defineStore } from "pinia";
import { Spu } from "@/types/type";
import { ElMessage } from 'element-plus';
import { 
  addSpu,
  getSpuList, 
  deleteSpu,
} from "@/api/admin";

interface State {
  spuList: Spu[],
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
      console.log('spu===', spu)
      // const len = brand.categoryId.length;
      // const brandData = {
      //   id: brand.id,
      //   name: brand.name,
      //   categoryId: brand.categoryId[len - 1]
      // }
      // const res = await addBrand(brandData);
      // this.getBrands();
    },
    // 获取SPU列表
    async getSpuList() {
      const res = await getSpuList();
      this.spuList = res.data.data.sup;
    },
    // 删除SPU
    async deleteSpu(sid: string) {
      const res = await deleteSpu(sid);
      this.getSpuList();
    }
  }
})