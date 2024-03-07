import { defineStore } from "pinia";
import { RdcSpu } from "@/types/type";
import { ElMessage } from 'element-plus';
import { getRdcSpuList, addRdcSpus, deleteRdcSpu } from "@/api/admin";

interface State {
  total: number,
  rdcSpuList: RdcSpu[],
}

export const useRdcSpuStore = defineStore('rdcspu', {
  state: (): State => {
    return {
      total: 1,
      rdcSpuList: [],
    }
  },
  actions: {
    async getRdcSpus(page: number, pageSize: number, rid: string) {
      const res = await getRdcSpuList(page, pageSize, rid);
      this.rdcSpuList = res.data.data.rdcSpus;
      this.total = res.data.data.total;
    },

    async addRdcSpus(rdcSpuList: RdcSpu[]) {
      const res = await addRdcSpus(rdcSpuList);
    },

    async deleteRdcSpu(rid: string) {
      const res = await deleteRdcSpu(rid);
      this.getRdcSpus();
    }
  }
})