import { defineStore } from "pinia";
import { Rdc } from "@/types/type";
import { ElMessage } from 'element-plus';
import { getRdcs, addRdc, deleteRdc } from "@/api/admin";
import { transformAddressFormat, transformToOptionsFormat } from "@/utils";

interface State {
  rdcList: Rdc[],
  rdcListM: Rdc[],
}

export const useRdcStore = defineStore('rdc', {
  state: (): State => {
    return {
      rdcList: [],
      rdcListM: []
    }
  },
  actions: {
    async getRdcs() {
      const res = await getRdcs();
      this.rdcList = res.data.data.rdcs;
      this.rdcListM = transformToOptionsFormat(res.data.data.rdcs);
    },

    async addRdc(rdc: Rdc) {
      const newRdcObj = transformAddressFormat(rdc);
      const res = await addRdc(newRdcObj);
      this.getRdcs();
    },

    async deleteRdc(rid: string) {
      const res = await deleteRdc(rid);
      this.getRdcs();
    }
  }
})