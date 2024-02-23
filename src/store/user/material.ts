import { defineStore } from "pinia";
import { getAiPicture } from "@/api/user";
import { TextToImage } from "@/types/type";

interface State {
  imageUrl: string,
}

export const useMaterialStore = defineStore('material', {
  state: (): State => {
    return {
    }
  },
  actions: {
    // 上传图片
    async getAiPicture(data: TextToImage) {
      console.log('data', data);
      const res = await getAiPicture(data);
    },
  }
})