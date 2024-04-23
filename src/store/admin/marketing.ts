import { defineStore } from "pinia";
import { MarketingActivity } from "@/types/type";
import { 
  addMarketingActivity,
  getMarketingActivityList,
  deleteMarketingActivity,
} from "@/api/admin";
import dayjs from "dayjs";

interface State {
  activityList: MarketingActivity[];
}

export const useMarketingStore = defineStore('marketing', {
  state: (): State => {
    return {
      activityList: [],
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
    }
  }
})