import { request } from '@/api/http';
import { Brand } from '@/types/type';

// 品牌管理
export function addBrand(data: Brand) {
  return request({
    url: '/brand/snapshots',
    method: 'post',
    data
  })
}

export function getBrandList(page: number, pageSize: number, uid: string) {
  return request({
    url: `/brand/snapshots/${uid}/${page}/${pageSize}`,
    method: 'get',
  })
}

export function getBrandListByCategoryId(cid: string) {
  return request({
    url: `/brand/snapshots/${cid}`,
    method: 'get',
    loading: false,
  })
}

export function deleteBrand(bid: string) {
  return request({
    url: `/brand/snapshots/${bid}`,
    method: 'delete',
  })
}

// 订单管理
export function getOrderList() {
  return request({
    url: '/order/orders',
    method: 'get',
  })
}