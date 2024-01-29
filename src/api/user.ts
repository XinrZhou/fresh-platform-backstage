import axios from 'axios';
import { request } from '@/api/http';
import { User } from '@/types/type';

// 登录
export function goLogin(data: User) {
  return request({
    url: '/users/login',
    data,
    method:'post',
  })
}