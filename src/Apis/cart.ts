/*
 * 严肃声明：
 * 开源版本请务必保留此注释头信息，若删除我方将保留所有法律责任追究！
 * 本系统已申请软件著作权，受国家版权局知识产权以及国家计算机软件著作权保护！
 * 可正常分享和学习源码，不得用于违法犯罪活动，违者必究！
 * Copyright (c) 2020 陈尼克 all rights reserved.
 * 版权所有，侵权必究！
 *
 */
import http from '@/utils/http'

export interface CartItemRes {
  cartItemId?: number,
  goodsCount?: number,
  goodsCoverImg?: string,
  goodsId?: number,
  goodsName?: string,
  sellingPrice?: number,
}

export interface AddCartParams extends CartItemRes {}
export function addCartApi (params: AddCartParams) {
  return http.post('/shop-cart', params)
}

export interface ModifyCartParams extends CartItemRes {}
export function modifyCartApi (params: ModifyCartParams) {
  return http.put('/shop-cart', params)
}

export function getCartApi () {
  return http.get<CartItemRes []>('/shop-cart')
}

export function deleteCartItemApi (id: number) {
  return http.delete(`/shop-cart/${id}`)
}

export interface GetCartItemsParams {
  cartItemIds?: string
}
export function getByCartItemIdsApi (params: GetCartItemsParams) {
  return http.get<CartItemRes[]>('/shop-cart/settle', { params })
}
