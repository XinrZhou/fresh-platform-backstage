import { defineStore } from "pinia";
import { Spu } from "@/types/type";
import { ElMessage } from 'element-plus';
import { 
  addSpu, 
  getSpuInfo,
  getSpuList, 
  getSpuOptionsList,
  getSpuListByCategoryId, 
  deleteSpu, 
} from "@/api/user";

interface State {
  total: number,
  spuList: object[],
  spuOptionsList: object[],
  spuInfo: Spu
}

export const useSpuStore = defineStore('spu', {
  state: (): State => {
    return {
      total: 1,
      spuList: [],
      spuOptionsList: [],
      spuInfo: {},
    }
  },
  actions: {
    // 添加SPU
    async addSpu(spu: Spu,  genericSpecObj, specialSpecList) {
      const len = spu.categoryId?.length;
      const categoryId = Array.isArray(spu.categoryId) ? spu.categoryId[len - 1] : spu.categoryId;
      const specialSpecObj = {};
      specialSpecList.forEach(item => {
        specialSpecObj[item.name] = item.value.split(',');
      })

      const spuData = {
        ...spu, 
        categoryId,
        tags: JSON.stringify(spu.tags),
        genericSpec: JSON.stringify(genericSpecObj),
        specialSpec: JSON.stringify(specialSpecObj),
      }
      const res = await addSpu(spuData);
    },

    // 获取SPU详情
    async getSpuInfo(sid: string) {
      const res = await getSpuInfo(sid);
      this.spuInfo = res.data.data.spus;
    },

    // 根据类目id获取SPU列表
    async getSpuOptionsList(cid: string) {
      const res = await getSpuOptionsList(cid);
      this.spuOptionsList = res.data.data.spus;
    },

    // 获取SPU列表 -- 分页
    async getSpuList(page: number, pageSize: number) {
      const res = await getSpuList(page, pageSize);
      const spus = res.data.data.spus
      this.spuList = spus.map((item: Spu) => {
        return {
          ...item,
          tags: item.tags && JSON.parse(item.tags) || null
        }
      })
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
    }
  }
})