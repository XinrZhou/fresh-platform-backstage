import { defineStore } from "pinia";
import { Rdc } from "@/types/type";
import { ElMessage } from 'element-plus';
import { 
  getRdcs, 
  addRdc, 
  deleteRdc,
  getRdcOptionsList 
} from "@/api/admin";
import { transformAddressFormat, transformToOptionsFormat } from "@/utils";

interface State {
  total: number,
  rdcList: Rdc[],
  rdcOptionsList: Rdc[],
}

export const useRdcStore = defineStore('rdc', {
  state: (): State => {
    return {
      total: 1,
      rdcList: [],
      rdcOptionsList: []
    }
  },
  actions: {
    async getRdcs(page: number, pageSize: number) {
      const res = await getRdcs(page, pageSize);
      this.rdcList = res.data.data.rdcs;
      this.total = res.data.data.total;
    },

    async getRdcOptionsList() {
      const res = await getRdcOptionsList();
      this.rdcOptionsList = transformToOptionsFormat(res.data.data.rdcs);
    },

    async addRdc(rdc: Rdc) {
      const newRdcObj = transformAddressFormat(rdc);
      const res = await addRdc(newRdcObj);
    },

    async deleteRdc(rid: string) {
      const res = await deleteRdc(rid);
    }
  }
})