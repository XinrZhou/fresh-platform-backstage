import { defineStore } from "pinia";
import { Resource, ResourceUsage } from "@/types/type";
import { 
  getResourceUsage,
  addResource, 
  getResources,
  deleteResource 
} from "@/api/admin";

interface State {
  total: number;
  resourceList: Resource[],
  usageList: ResourceUsage[],
}

export const useResoureStore = defineStore('resource', {
  state: (): State => {
    return {
      total: 1,
      resourceList: [],
      usageList: []
    }
  },
  actions: {
    async getResourceUsage() {
      const res = await getResourceUsage();
      this.usageList = res.data.data.cdps;
    },

    async addResource(resourceData: Resource) {
      const res = await addResource(resourceData);
    },

    async getResources(page: number, pageSize: number, type: number) {
      const res = await getResources(page, pageSize, type);
      this.resourceList = res.data.data.resources;
      this.total = res.data.data.total;
    },

    async deleteResource(rid: string) {
      const res = await deleteResource(rid);
    }
  }
})