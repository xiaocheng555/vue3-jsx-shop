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

export interface GoodsRes {
  goodsCoverImg?: string,
  goodsId?: number,
  goodsIntro?: string,
  goodsName?: string,
  sellingPrice?: number,
  tag?: string,
}

export interface GoodsDetailRes extends GoodsRes {
  goodsCarouselList?: string[],
  goodsDetailContent?: string,
  originalPrice: string
}
export function getGoodsApi (id: number) {
  return http.get(`/goods/detail/${id}`)
}

export interface CateItemRes {
  parentId?: number,
  categoryId?: number,
  categoryLevel?: number,
  categoryName?: string,
  secondLevelCategoryVOS?: CateItemRes[],
  thirdLevelCategoryVOS?: CateItemRes[],
}
export function getCategoryApi () {
  return http.get('/categories')
}

export interface SearchGoodsParams {
  pageNumber?: number,
  keyword?: string,
  orderBy?: string,
  goodsCategoryId?: number | string
}
export function searchGoodsApi (params: SearchGoodsParams) {
  return http.get<Response.Page<GoodsRes>>('/search', { params })
}
