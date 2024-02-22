import axios from 'axios';
import { request } from '@/api/http';
import { User, Brand } from '@/types/type';

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

// 品牌管理
export function addBrandSnapshot(data: Brand) {
  return request({
    url: '/brand/snapshots',
    method: 'post',
    data
  })
}

export function getBrandSnapshotList(page: number, pageSize: number) {
  return request({
    url: `/brand/snapshots/${page}/${pageSize}`,
    method: 'get',
  })
}

export function deleteBrandSnapshot(bid: string) {
  return request({
    url: `/brand/snapshots/${bid}`,
    method: 'delete',
  })
}