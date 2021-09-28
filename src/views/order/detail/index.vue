
<script lang="tsx">
import { Button, Card, Dialog, Popup, Toast } from "vant"
import NavBar from '@/components/NavBar'
import { cancelOrderApi, getOrderDetailApi, OrderRes, payOrderApi } from "@/Apis/order"
import { computed, ref, onBeforeMount } from "vue"
import { useRoute, useRouter } from "vue-router"
import { handleImg } from "@/utils"

export default {
  name: 'OrderDetail',
  setup () {
    const route = useRoute()
    const router = useRouter()
    const payPopupVisible = ref(false)
    const orderData = ref<OrderRes>({} as OrderRes)
    const orderNo = computed(() => {
      return String(route.query.orderNo)
    })

    const fetchOrderDetail = async () => {
      const toast = Toast.loading('加载中...')
      try {
        const res = await getOrderDetailApi(orderNo.value)
        orderData.value = res.data || {}
        console.log(orderData, 'orderData')
      } catch (err) {
        console.error('获取订单详情失败', err)
      } finally {
        toast.clear()
      }
    }

    const openPayPopup = () => {
      payPopupVisible.value = true
    }

    const payOrder = async () => {
      Toast.loading('支付中...')
      try {
        await payOrderApi({
          orderNo: orderNo.value,
          payType: 1
        })
        Toast.success('支付成功')
        orderData.value.orderStatus = 1
        payPopupVisible.value = false
        fetchOrderDetail()
      } catch (err) {
        Toast.fail('支付失败')
      }
    }

    const onCancelOrder = () => {
      Dialog.confirm({
        title: '确定取消订单？'
      }).then(() => {
        cancalOrder()
      })
    }

    const cancalOrder = async () => {
      const toast = Toast.loading('正在取消...')
      try {
        await cancelOrderApi(orderNo.value)
        orderData.value.orderStatus = -1
        fetchOrderDetail()
      } catch (err) {
        console.error('取消订单失败', err)
      } finally {
        toast.clear()
      }
    }

    onBeforeMount(() => {
      fetchOrderDetail()
    })

    return () => {
      const { newBeeMallOrderItemVOS, totalPrice, orderNo, createTime, orderStatusString, orderStatus  } = orderData.value
      const goodsList = newBeeMallOrderItemVOS || []
      orderStatus

      let Action: any
      if (orderStatus === 0) {
        Action = (
          <>
            <Button block type="primary" onClick={openPayPopup}>去支付</Button>
            <Button block onClick={onCancelOrder}>取消订单</Button>
          </>
        )
      } else if (orderStatus === 1) {
        Action = (
          <>
            <Button block onClick={onCancelOrder}>取消订单</Button>
          </>
        )
      }

      return (
        <div class="order-detail">
          <NavBar title="订单详情" leftArrow></NavBar>
          <div class="order-content">
            <p>订单状态：<b>{orderStatusString}</b></p>
            <p>订单编号：<b>{orderNo}</b></p>
            <p>下单时间：<b>{createTime}</b></p>
            { Action}
          </div>
          <div class="order-content">
            <p>商品金额：{totalPrice}</p>
            <p>配送方式：普通快递</p>
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
          <Popup
            class="order-pay-popup2"
            closeOnClickOverlay={false}
            closeable={true}
            show={payPopupVisible.value}
            position="bottom"
            onUpdate:show={() => payPopupVisible.value = !payPopupVisible.value}
            teleport="body">
            <Button type="primary" block onClick={payOrder}>支付宝支付</Button>
            <Button type="success" block onClick={payOrder}>微信支付</Button>
          </Popup>
        </div>
      )
    }
  }
}
</script>

<style lang="less">
.order-pay-popup2 {
  padding: 50px 10px 15px;
  box-sizing: border-box;
  border-radius: 6px;

  .van-button {
    margin-bottom: 5px;
  }
}
</style>

<style lang="less" scoped>
.order-detail {
  min-height: 100%;
  background: #f7f7f7;
}
.order-content {
  margin-bottom: 20px;
  padding: 15px;
  font-size: 14px;
  color: #999999;
  line-height: 40px;
  background: #ffffff;
  b {
    font-weight: 400;
    color: #333333;
  }
  /deep/ .van-button {
    margin-top: 10px;
  }
}
</style>
