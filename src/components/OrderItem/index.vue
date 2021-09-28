
/*
 * 严肃声明：
 * 开源版本请务必保留此注释头信息，若删除我方将保留所有法律责任追究！
 * 本系统已申请软件著作权，受国家版权局知识产权以及国家计算机软件著作权保护！
 * 可正常分享和学习源码，不得用于违法犯罪活动，违者必究！
 * Copyright (c) 2020 陈尼克 all rights reserved.
 * 版权所有，侵权必究！
 *
 */
 <script lang="tsx">
import { OrderRes } from "@/Apis/order"
import { handleImg } from "@/utils"
import { Card } from "vant"
import { defineComponent } from 'vue'

export interface OrderItemProps {
  data: OrderRes
}

export default defineComponent({
  name: 'OrderItem',
  props: {
    data: {
      default: () => {}
    }
  },
  setup (props: OrderItemProps) {
    const { data } = props
    const goodsList = data.newBeeMallOrderItemVOS || []
    return () => (
      <div class="order-item">
        <div class="order-item-top">
          <div>订单时间：{data.createTime}</div>
          <div>{data.orderStatusString}</div>
        </div>
        {
          goodsList.map(goods => (
            <Card
              key={goods.goodsId}
              num={goods.goodsCount}
              price={goods.sellingPrice}
              title={goods.goodsName}
              thumb={handleImg(goods.goodsCoverImg)}
            />
          ))
        }
      </div>
    )
  }
})
</script>

<style lang="less" scoped>
.order-item {
  margin-top: 30px;
  &:first-child {
    margin-top: 10px;
  }
}
.order-item-top {
  margin-top: 10px;
  display: flex;
  padding: 0 20px;
  justify-content: space-between;
  font-size: 12px;
  color: #646566;
}
/deep/ .van-card {
  margin-top: 0;
  background: #ffffff;
}
</style>
