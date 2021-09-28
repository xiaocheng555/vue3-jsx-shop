/*
 * 严肃声明：
 * 开源版本请务必保留此注释头信息，若删除我方将保留所有法律责任追究！
 * 本系统已申请软件著作权，受国家版权局知识产权以及国家计算机软件著作权保护！
 * 可正常分享和学习源码，不得用于违法犯罪活动，违者必究！
 * Copyright (c) 2020 陈尼克 all rights reserved.
 * 版权所有，侵权必究！
 *
 */
import './index.less'
import { GoodsRes } from '@/Apis/good'
import { useRouter } from 'vue-router'
import { defineComponent } from 'vue'

export interface GoodsItemProps {
  data: GoodsRes
}

export default defineComponent({
  name: 'GoodsItem',
  props: {
    data: {
      default: () => ({} as GoodsRes)
    }
  },
  setup (props: GoodsItemProps) {
    const router = useRouter()

    const onClick = (goods: GoodsRes) => {
      router.push({
        path: `/product/${goods.goodsId}`
      })
    }

    return () => {
      const goodsItem = props.data
      let imgSrc = goodsItem.goodsCoverImg
      if (typeof imgSrc === 'string') {
        if (imgSrc.indexOf('http') === -1) {
          imgSrc = 'http://backend-api-01.newbee.ltd' + imgSrc
        }
      }
      return (
        <div class="goods-item" onClick={() => onClick(goodsItem)}>
          <img class="goods-item-img" src={imgSrc}></img>
          <p class="goods-item-name ell2">{goodsItem.goodsName}</p>
          <p class="goods-item-price">¥{goodsItem.sellingPrice}</p>
        </div>
      )
    }
  }
})
