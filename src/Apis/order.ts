/*
 * 严肃声明：
 * 开源版本请务必保留此注释头信息，若删除我方将保留所有法律责任追究！
 * 本系统已申请软件著作权，受国家版权局知识产权以及国家计算机软件著作权保护！
 * 可正常分享和学习源码，不得用于违法犯罪活动，违者必究！
 * Copyright (c) 2020 陈尼克 all rights reserved.
 * 版权所有，侵权必究！
 *
 */
import { ResponsePage } from './../@types/request.d'
import request from '@/utils/request'

export interface GoodsVosRes {
  goodsCount: number,
  goodsCoverImg: string,
  goodsId: number,
  goodsName: string,
  sellingPrice: number
}

export interface OrderRes {
  createTime?: string,
  newBeeMallOrderItemVOS?: GoodsVosRes[],
  orderId?: number,
  orderNo?: string,
  orderStatus?: number,
  orderStatusString?: string,
  payType?: number,
  totalPrice?: number
}

interface CreateOrderParams {
  addressId?: number,
  cartItemIds?: number[] | string []
}
export function createOrderApi (params: CreateOrderParams) {
  return request.post<string>('/saveOrder', params)
}

export interface GetOrderListParams {
  pageNumber?: number,
  status?: string

}
export function getOrderListApi (params: GetOrderListParams) {
  return request.get<ResponsePage<OrderRes>>('/order', { params })
}

export function getOrderDetailApi (id: string) {
  return request.get<OrderRes>(`/order/${id}`)
}

export function cancelOrderApi (id: string) {
  return request.put(`/order/${id}/cancel`)
}

export function confirmOrderApi (id: string) {
  return request.put(`/order/${id}/finish`)
}

interface PayOrderParams {
  orderNo?: string,
  payType?: number
}
export function payOrderApi (params: PayOrderParams) {
  return request.get('/paySuccess', { params })
}
