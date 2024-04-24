import { defineStore } from "pinia";
import { MarketingActivity, MarketingAdvertisement } from "@/types/type";
import { 
  addMarketingActivity,
  getMarketingActivityList,
  deleteMarketingActivity,
  addMarketingAdvertisement,
  getMarketingAdvertisementList,
  deleteMarketingAdvertisement,
} from "@/api/admin";
import dayjs from "dayjs";

interface State {
  activityList: MarketingActivity[];
  advertisementList: MarketingAdvertisement[];
}

export const useMarketingStore = defineStore('marketing', {
  state: (): State => {
    return {
      activityList: [],
      advertisementList: [],
    }
  },
  actions: {
    async addActivity(activity: MarketingActivity) {
      const { time, ...rest } = activity;
      const res = await addMarketingActivity({
        ...rest,
        startTime: dayjs(time[0]).format('YYYY-MM-DD HH:mm:ss'),
        endTime: dayjs(time[1]).format('YYYY-MM-DD HH:mm:ss'),
      });
    },

    async getActivities() {
      const res = await getMarketingActivityList();
      this.activityList = res.data.data.activities;
      return res;
    },

    async deleteActivity(aid: number) {
      const res = await deleteMarketingActivity(aid);
      return res;  
    },

    async addAdvertisement(advertisement: MarketingAdvertisement) {
      const res = await addMarketingAdvertisement(advertisement);
      return res;
    },

    async getAdvertisements() {
      const res = await getMarketingAdvertisementList();
      this.advertisementList = res.data.data.advertisements;
      return res;
    },

    async deleteAdvertisement(aid: number) {
      const res = await deleteMarketingAdvertisement(aid);
      return res;  
    }
  }
})