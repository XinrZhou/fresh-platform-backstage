import axios from 'axios';
import { request } from '@/api/http';
import { User } from '@/types/type';

// 登录
export function login(data: User) {
  return request({
    url: '/users/login',
    data,
    method:'post',
  })
}

// 获取用户信息
export function getUserInfo() {
  return request({
    url: '/users/info',
    method:'get',
  })
}