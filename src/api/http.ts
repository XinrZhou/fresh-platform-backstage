import axios from 'axios';
import { ElMessage} from 'element-plus';
import { showLoading, hideLoading } from '@/utils/loading';

export const request = (options: any) => {
  return new Promise((resolve, reject) => {
    axios.defaults.baseURL = '/api';

    const service = axios.create({
      timeout: 40000
    });

    // request interceptor
    service.interceptors.request.use((config: any) => {
      showLoading();
      const token: string | null = sessionStorage.getItem('TOKEN');
      if (token) {
        config.headers['token'] = token;
      }
      return config;
    }, error => {
      Promise.reject(error);
    });

    // response interceptor
    service.interceptors.response.use((response: any) => {
      setTimeout(() => {
        hideLoading();
      }, 200);
      if (response.data.code === 200) {
        return response;
      } else {
        ElMessage.error(response.data.message);
        return Promise.reject(new Error(response.data.message));
      }
    }, error => {
      setTimeout(() => {
        hideLoading();
      }, 200);
      return Promise.reject(error);
    });

    // request handler
    service (options)
      .then ((res) => {
        resolve(res);
      })
      .catch ((error) => {
        reject(error);
      });
  })
}

export default request;