
<script lang="tsx">
import { getAddressDetailApi, getDefaultAddressApi } from "@/Apis/address"
import { CartItemRes, getByCartItemIdsApi } from "@/Apis/cart"
import NavBar from "@/components/NavBar"
import { handleImg } from "@/utils"
import { computed, ref, onBeforeMount } from "vue"
import { AddressListAddress, Button, Card, Icon, Popup, Toast } from "vant"
import { useRoute, useRouter } from "vue-router"
import Address from '@/views/user/address'
import { createOrderApi, payOrderApi } from "@/Apis/order"

interface OrderAddress {
  addressId?: number | string,
  address?: string,
  userPhone?: string | number,
}

export default {
  name: 'OrderCreate',
  setup () {
    const route = useRoute()
    const router = useRouter()
    const cartList = ref<CartItemRes []>([])
    const orderAddress = ref({} as OrderAddress)
    const totalPrice = ref(0)
    const creating = ref(false)
    const payPopupVisible = ref(false)
    const cartItemIds = computed(() => {
      return String(route.query.cartItemIds || '')
    })
    const addressId = computed(() => {
      return String(route.query.orderAddressId || '')
    })
    const showAddressPage = computed(() => {
      return String(route.query.page) === 'address'
    })


    let orderNo: string | undefined

    const fetchCartList = async () => {
      try {
        const res = await getByCartItemIdsApi({
          cartItemIds: cartItemIds.value
        })
        cartList.value = res.data || []
        calcTotalPrice()
      } catch(err) {
        console.error('获取购物车商品失败', err)
      }
    }

    const calcTotalPrice = () => {
      let price: number = 0
      cartList.value.forEach(cart => {
        price = price + (cart.sellingPrice || 0) * (cart.goodsCount || 0)
      })
      totalPrice.value = price
    }

    const fetchOrderAddress = async () => {
      try {
        let res
        if (addressId.value) {
           res = await getAddressDetailApi(addressId.value)
        } else {
          res = await getDefaultAddressApi()
        }

        const { regionName, provinceName, cityName, detailAddress, addressId: id, userPhone } = res.data || {}
        orderAddress.value = {
          addressId: id,
          userPhone: userPhone,
          address: [provinceName, cityName, regionName, detailAddress].join(' ')
        }
      } catch (err) {
        console.error('获取默认地址失败', err)
      }
    }

    const openAddressPage = () => {
      router.replace({
        query: {
          ...route.query,
          page: 'address'
        }
      })
    }

    const onAddressBack = () => {
      router.replace({
        query: {
          ...route.query,
          page: undefined
        }
      })
    }

    const onAddressSelect = (address: AddressListAddress) => {
      orderAddress.value = {
        addressId: address.id,
        userPhone: address.tel,
        address: address.address
      }
      router.replace({
        query: {
          ...route.query,
          page: undefined,
          orderAddressId: address.id
        }
      })
    }

    const createOrder = async () => {
      try {
        creating.value = true
        const res = await createOrderApi({
          addressId: orderAddress.value.addressId as number,
          cartItemIds: cartItemIds.value.split(',')
        })
        orderNo = res.data
        payPopupVisible.value = true
      } catch (err) {
        console.error('创建订单失败', err)
      } finally {
        creating.value = false
      }
    }

    const payOrder = async () => {
      const toast = Toast.loading('支付中...')
      try {
        await payOrderApi({
          orderNo: orderNo,
          payType: 1
        })
        Toast.success('支付成功')
        gotoOrderList()
      } catch (err) {
        toast.clear()
        console.error('支付失败', err)
      } finally {
        gotoOrderList()
      }
    }

    const gotoOrderList = () => {
      router.replace('/order/list')
    }

    const initData = () => {
      fetchOrderAddress()
      fetchCartList()
    }

    onBeforeMount(() => {
      initData()
    })

    return () => (
      <>
        {
          showAddressPage.value ?
          (
            <Address
              navBack={onAddressBack}
              switchable={true}
              defaultId={Number(addressId.value || orderAddress.value.addressId)}
              onSelect={onAddressSelect}>
            </Address>
          ) : (
          <div>
            <NavBar title="生成订单" leftArrow></NavBar>
            <div class="order-address" onClick={openAddressPage}>
              <div class="order-address-main">
                <p>{orderAddress.value.userPhone}</p>
                <p>{ orderAddress.value.address }</p>
              </div>
              <div class="order-address-right">
                <Icon name="arrow"></Icon>
              </div>
            </div>
            {
              cartList.value.map(cart => (
                <Card
                  num={cart.goodsCount}
                  price={cart.sellingPrice}
                  title={cart.goodsName}
                  thumb={handleImg(cart.goodsCoverImg)}
                />
              ))
            }
            <div class="order-footer-wrap">
              <div class="order-footer">
                <div class="order-footer-content">
                  <span>商品金额</span>
                  <span class="order-price">¥{totalPrice.value}</span>
                </div>
                <Button type="primary" round block loading={creating.value} onClick={createOrder}>生成订单</Button>
              </div>
            </div>
            <Popup
              class="order-pay-popup"
              closeOnClickOverlay={false}
              closeable={true}
              show={payPopupVisible.value}
              position="bottom"
              onUpdate:show={() => payPopupVisible.value = !payPopupVisible.value}
              teleport="body"
              onClose={gotoOrderList}>
              <Button type="primary" block onClick={payOrder}>支付宝支付</Button>
              <Button type="success" block onClick={payOrder}>微信支付</Button>
            </Popup>
          </div>)
        }
      </>
    )
  }
}
</script>

<style lang="less">
.order-pay-popup {
  padding: 50px 10px 15px;
  box-sizing: border-box;
  border-radius: 6px;

  .van-button {
    margin-bottom: 5px;
  }
}
</style>

<style lang="less" scoped>
.order-footer-wrap {
  height: 150px;
}
.order-address {
  display: flex;
  align-items: center;
  position: relative;
  padding: 15px 15px;
  margin-bottom: 20px;
  &:after {
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    height: 2px;
    background: -webkit-repeating-linear-gradient(
135deg, #ff6c6c 0, #ff6c6c 20%, transparent 0, transparent 25%, #1989fa 0, #1989fa 45%, transparent 0, transparent 50%);
    background: repeating-linear-gradient(
-45deg, #ff6c6c 0, #ff6c6c 20%, transparent 0, transparent 25%, #1989fa 0, #1989fa 45%, transparent 0, transparent 50%);
    background-size: 80px;
    content: '';
  }
}
.order-address-main {
  flex: 1;
  font-size: 14px;
  color: #6C7880;
  line-height: 30px;
}
.order-address-tel {
  font-size: 16px;
}
.order-address-desc {
  font-size: 16px;
}
.order-address-right {
  font-size: 20px;
  font-weight: 600;
}
.order-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 15px 15px 5px;
  border-top: 1px solid #eeeeee;
  background: #ffffff;
}
.order-footer-content {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  align-items: center;

  .order-price {
    font-size: 18px;
    color: red;
  }
}
</style>
