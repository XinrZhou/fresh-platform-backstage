import { ElLoading } from 'element-plus';

let loadingInstance: any = null;
let loadingRequestCount: number = 0;

export const showLoading = (target: string = 'body') => {
   if (loadingRequestCount === 0 ) {
    loadingInstance = ElLoading.service({
      target,
    });
   }
   loadingRequestCount++;
};

export const hideLoading = () => {
    if (loadingRequestCount <= 0) return;
    loadingRequestCount--;
    if (loadingRequestCount === 0) {
      loadingInstance.close();
    }
};
