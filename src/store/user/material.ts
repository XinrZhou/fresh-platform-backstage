import { defineStore } from "pinia";
import { fetchEventSource } from '@microsoft/fetch-event-source';
import { mapModelParams } from "@/utils";
import { TextToImage, Image } from "@/types/type";
import { 
  generateImages, 
  collectImage, 
  getImages,
  deleteImage,
  getModelParams
} from "@/api/user";

interface State {
  imageBase64: string,
  imageList: Image[],
  total: number,
  modelParams: object
}

export const useMaterialStore = defineStore('material', {
  state: (): State => {
    return {
      imageBase64: '',
      imageList: [],
      total: 1,
      modelParams: {}
    }
  },
  actions: {
    // 生成图片
    async generateImages(data: TextToImage) {
      const params = {
        ...data,
        styles: [data.styles],
        resultConfig: {
          resolution: data.resultConfig
        },
        logoAdd: 0
      }
      try {
        const res = await generateImages(params);
        this.imageBase64 = res.data.data.images.resultImage;
      } catch (error) {
      }
    },

    // 收藏图片
    async collectImage(data: Image) {
      const res = await collectImage(data);
    },

    // 已收藏图片列表
    async getImages(page: number, pageSize: number) {
      const res = await getImages(page, pageSize);
      this.imageList = res.data.data.images;
      this.total = res.data.data.total;
    },

    // 删除图片
    async deleteImage(id: string) {
      const res = await deleteImage(id);
    },

    // 获取参数列表
    async getModelParams() {
      const res = await getModelParams();
      const model = res.data.data.models;
      this.modelParams = mapModelParams(model[0]?.params);
    }
  }
})