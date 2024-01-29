import axios from 'axios';
import { request } from '@/api/http';
import { Category } from '@/types/type';

// 添加类目
export function addCategpry(data: Category) {
  return request({
    url: '/category',
    method: 'post',
    data
  })
}