import { defineStore } from "pinia";
import { Attribute, AttributeValue } from "@/types/type";
import { ElMessage } from 'element-plus';
import _ from 'lodash';
import { 
  addAttribute,
  getAttributeList,
  getAttributeListBySpuId, 
  deleteAttribute,
} from "@/api/admin";

interface State {
  total: number,
  attributeList: Attribute[],
  attributeFormItemList: Attribute[],
}

export const useAttributeStore = defineStore('attribute', {
  state: (): State => {
    return {
      total: 1,
      attributeList: [],
      attributeFormItemList: [],
    }
  },
  actions: {
    // 添加属性
    async addAttribute(attribute: Attribute) {
      const categoryIds = attribute?.categoryId.map(item => item.at(-1));
      const { categoryId, ...attributeParams } = attribute;
      const res = await addAttribute({
        ...attributeParams,
        categoryIds: JSON.stringify(categoryIds),
        value: JSON.stringify(attribute.value)
      });
    },
    // 获取属性列表
    async getAttributes(page: number, pageSize: number) {
      const res = await getAttributeList(page, pageSize);
      this.total = res.data.data.total;
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
      const attributes = res.data.data.attributes;
      this.attributeFormItemList = attributes.map((item: Attribute) => {
        return {
          ...item,
          value: item.value && JSON.parse(item.value) || null
        }
      })
    },
    // 删除属性
    async deleteAttribute(aid: string) {
      const res = await deleteAttribute(aid);
    }
  }
})