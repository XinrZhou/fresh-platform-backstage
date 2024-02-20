import { defineStore } from "pinia";
import { RdcSpu } from "@/types/type";
import { ElMessage } from 'element-plus';
import { getRdcSpuList, addRdcSpus, deleteRdcSpu } from "@/api/admin";

interface State {
  rdcSpuList: RdcSpu[],
}

export const useRdcSpuStore = defineStore('rdcspu', {
  state: (): State => {
    return {
      rdcSpuList: [],
    }
  },
  actions: {
    async getRdcSpus() {
      const res = await getRdcSpuList();
      this.rdcSpuList = res.data.data.rdcSpus;
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