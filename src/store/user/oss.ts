import { defineStore } from "pinia";
import { uploadImage } from "@/api/admin";

interface State {
  imageUrl: string,
}

export const useOssStore = defineStore('oss', {
  state: (): State => {
    return {
      imageUrl: '',
    }
  },
  actions: {
    // 上传图片
    async uploadImage(file: File) {
      const data = new FormData();
      data.append('file', file);
      const res = await uploadImage(data);

      this.imageUrl = res.data.data.url;
      data.delete('file');
      return { url: res.data.data.url };
    },
  }
})