import axios from 'axios';
import { request } from '@/api/http';
import { User, Brand, Image, TextToImage, Resource } from '@/types/type';
import { method } from 'lodash';

// 登录
export function login(data: User) {
  return request({
    url: '/users/login',
    data,
    method:'post',
    loading: false,
  })
}

// 获取用户信息
export function getUserInfo() {
  return request({
    url: '/users/info',
    method:'get',
    loading: false,
  })
}

// 品牌管理
export function addBrandSnapshot(data: Brand) {
  return request({
    url: '/brand/snapshots',
    method: 'post',
    data,
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

// 素材管理
export function generateImages(data: TextToImage) {
  return request({
    url: '/ai/images',
    method: 'post',
    data,
  })
}

export function collectImage(data: Image) {
  return request({
    url: '/image/images',
    method: 'post',
    data,
    loading: false,
  })
}

export function getImages(page: number, pageSize: number) {
  return request({
    url: `/image/images/${page}/${pageSize}`,
    method: 'get',
  })
}

export function deleteImage(id: string) {
  return request({
    url: `/image/images/${id}`,
    method: 'delete',
  })
}

export function getModelParams() {
  return request({
    url: '/model/models',
    method: 'get',
  })
}

// SPU管理
export function addSpu(data: Spu) {
  return request({
    url: '/spu/spus',
    method: 'post',
    data,
  })
}

export function getSpuOptionsList() {
  return request({
    url: '/spu/spus',
    method: 'get',
    loading: false,
  })
}

export function getSpuList(page: number, pageSize: number) {
  return request({
    url: `/spu/spus/${page}/${pageSize}`,
    method: 'get',
  })
}

export function getSpuListByCategoryId(cid: string) {
  return request({
    url: `/spu/spus/${cid}`,
    method: 'get',
    loading: false,
  })
}

export function deleteSpu(sid: string) {
  return request({
    url: `/spu/spus/${sid}`,
    method: 'delete',
  })
}

// SKU管理
export function addSku(data: Sku) {
  return request({
    url: '/sku/skus',
    method: 'post',
    data
  })
}

export function getSkuList(page: number, pageSize: number) {
  return request({
    url: `/sku/skus/${page}/${pageSize}`,
    method: 'get',
  })
}

export function deleteSku(sid: string) {
  return request({
    url: `/sku/skus/${sid}`,
    method: 'delete',
  })
}
