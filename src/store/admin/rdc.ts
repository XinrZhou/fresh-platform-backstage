import { defineStore } from "pinia";
import { Rdc } from "@/types/type";
import { ElMessage } from 'element-plus'
import { 
  addRdc
} from "@/api/admin";


interface State {
}

export const useRdcStore = defineStore('rdc', {
  state: (): State => {
    return {
    }
  },
  actions: {
    async addRdc(rdc: Rdc) {
      const res = await addRdc(rdc);
      // this.getRdcs();
      ElMessage.success("添加成功！");
      return res;
    },
  }
})