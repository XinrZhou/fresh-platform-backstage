import { defineStore } from "pinia";
import { Model } from "@/types/type";
import { getModels, addModel } from "@/api/admin";
import _ from 'lodash';

interface State {
  modelList: Model[],
  latestModel: Model,
  loading: boolean,
  total: number,
}

export const useModelStore = defineStore('model', {
  state: (): State => {
    return {
      modelList: [],
      latestModel: {},
      loading: false,
      total: 1,
    }
  },
  actions: {
    async getModels(page: number, pageSize: number, type: number) {
      this.loading = true;
      const res = await getModels(page, pageSize, type);
      const models = res.data.data.models;
      this.modelList = models;
      this.latestModel = _.find(models, m => m.status === 1);
      this.total = res.data.data.total;
      this.loading = false;
    },

    async addModel(model: Model) {
      this.loading = true;
      const modelParams = {
        version: model.version,
        type: model.type,
        params: JSON.stringify(
          {
            ..._.omit(model, ['version', 'type'])
          }
        )
      }
      const res = await addModel(modelParams);
      this.loading = false;
    },
  }
})