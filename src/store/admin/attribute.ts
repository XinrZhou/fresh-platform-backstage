import { defineStore } from "pinia";
import { Attribute, AttributeValue } from "@/types/type";
import { ElMessage } from 'element-plus';
import { 
  addAttribute,
  getAttributeList,
  getAttributeListBySpuId, 
  deleteAttribute,
} from "@/api/admin";

interface State {
  attributeList: Attribute[],
  attributeFormItemList: Attribute[],
}

export const useAttributeStore = defineStore('attribute', {
  state: (): State => {
    return {
      attributeList: [],
      attributeFormItemList: [],
    }
  },
  actions: {
    // 添加属性
    async addAttribute(attribute: Attribute) {
      const len = attribute.categoryId.length;
      const attributeData = {
        ...attribute,
        categoryId: attribute.categoryId[len - 1],
        value: JSON.stringify(attribute.value),
      }
      const res = await addAttribute(attributeData);
      this.getAttributes();
    },
    // 获取属性列表
    async getAttributes() {
      const res = await getAttributeList();
      const attributes = res.data.data.attributes;
      this.attributeList = attributes.map((item: Attribute) => {
        return {
          ...item,
          value: item.value && JSON.parse(item.value) || null
        }
      })
    },
    // 根据SPU获取属性列表
    async getAttributeListBySpuId(sid: string) {
      const res = await getAttributeListBySpuId(sid);
      this.attributeFormItemList = res.data.data.attributes;
    },
    // 删除属性
    async deleteAttribute(aid: string) {
      const res = await deleteAttribute(aid);
      this.getAttributes();
    }
  }
})