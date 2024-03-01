import { defineStore } from "pinia";
import { Resource } from "@/types/type";
import { getResources } from "@/api/user";

interface State {
  resources: Resource[],
}

export const useResoureStore = defineStore('resource', {
  state: (): State => {
    return {
      resources: []
    }
  },
  actions: {
    async getResources() {
      const res = await getResources();
      this.resources = res.data.data.resources;
    }
  }
})