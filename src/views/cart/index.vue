<!--
 * 严肃声明：
 * 开源版本请务必保留此注释头信息，若删除我方将保留所有法律责任追究！
 * 本系统已申请软件著作权，受国家版权局知识产权以及国家计算机软件著作权保护！
 * 可正常分享和学习源码，不得用于违法犯罪活动，违者必究！
 * Copyright (c) 2020 陈尼克 all rights reserved.
 * 版权所有，侵权必究！
 *-->
 <script lang="tsx">
import { CartItemRes, deleteCartItemApi, getCartApi, modifyCartApi } from "@/Apis/cart"
import NavBar from "@/components/NavBar"
import { handleImg } from "@/utils"
import { Button, Card, Checkbox, Empty, Stepper, SubmitBar, SwipeCell, Toast } from "vant"
import { computed, onBeforeMount, ref } from 'vue'
import { useRouter } from "vue-router"

interface CartItem extends CartItemRes {
  _originCount?: number,
  _isCheck: boolean,
}

export default {
  name: 'Cart',
  setup () {
    const router = useRouter()
    const totalPrice = ref(0)
    const cartList = ref<CartItem[]>([])
    const checkedAll = computed({
      get () {
        if (!cartList.value.length) return false
        return cartList.value.every(cart => cart._isCheck)
      },
      set (val: boolean) {
        cartList.value.forEach(cart => {
          cart._isCheck = !!val
        })
      }
    })

    const fetchCartList = async () => {
      const toast = Toast.loading('加载中...')
      try {
        const res = await getCartApi()
        cartList.value = (res.data || []).map((item: CartItemRes) => {
          return {
            ...item,
            _isCheck: true,
            _originCount: item.goodsCount
          }
        })
        updateTotalPrice()
      } catch (err) {
        console.error('获取购物车数据失败', err)
      } finally {
        toast.clear()
      }
    }

    const modifyCartItem = async (cart: CartItem) => {
      const toast = Toast.loading('加载中...')
      try {
        await modifyCartApi({
          cartItemId: cart.cartItemId,
          goodsCount: cart.goodsCount
        })
        cart._originCount = cart.goodsCount
        updateTotalPrice()
      } catch (err) {
        cart.goodsCount = cart._originCount
        console.error('修改购物车商品失败', err)
      } finally {
        toast.clear()
      }
    }

    const deleteCartItem = async (cart: CartItem, index: number) => {
      const toast = Toast.loading('加载中...')
      try {
        await deleteCartItemApi(cart.cartItemId as number)
        if (typeof index === 'number') {
          cartList.value.splice(index, 1)
        }
        updateTotalPrice()
      } catch (err) {
        console.error('删除购物车商品失败', err)
      } finally {
        toast.clear()
      }
    }

    const updateTotalPrice = () => {
      let price: number = 0
      cartList.value.forEach(cart => {
        if (cart._isCheck) {
          price = price + (cart.sellingPrice || 0) * (cart.goodsCount || 0)
        }
      })
      totalPrice.value = price
    }

    const onCheckboxChange = () => {
      updateTotalPrice()
    }

    const onSubmit = () => {
      const cartItemIds = cartList.value.map(cart => cart.cartItemId).join(',')
      router.push({
        path: '/order/create',
        query: {
          cartItemIds: cartItemIds
        }
      })
    }

    const gotoShop = () => {
      router.push('/home')
    }

    onBeforeMount(() => {
      fetchCartList()
    })

    return () => (
      <div class="cart-page">
        <NavBar title="购物车"></NavBar>
        {
          cartList.value.map((cart, index) => (
            <SwipeCell key={cart.cartItemId}>
              {{
                default: () => (
                  <div class="cart-item">
                    <Checkbox class="cart-item-checkbox" v-model={cart._isCheck} onChange={onCheckboxChange}></Checkbox>
                    <Card
                      class="cart-item-card"
                      title={cart.goodsName}
                      thumb={ typeof cart.goodsCoverImg === 'string' ? handleImg(cart.goodsCoverImg) : ''}>
                    {{
                      price: () => <span class="cart-item-price">¥{cart.sellingPrice}</span>,
                      num: () => <Stepper v-model={cart.goodsCount} onChange={() => modifyCartItem(cart)}></Stepper>
                    }}
                    </Card>
                  </div>
                ),
                right: () => (
                  <Button
                    class="delete-button"
                    square
                    text="删除"
                    type="danger"
                    onClick={() => deleteCartItem(cart, index)} />
                )
              }}
            </SwipeCell>
          ))
        }
        {
          cartList.value.length ? (
            <div class="submit-bar-wrap">
              <SubmitBar price={totalPrice.value * 100} button-text="提交订单" onSubmit={onSubmit}>
                <Checkbox v-model={checkedAll.value}>全选</Checkbox>
              </SubmitBar>
            </div>
          ) : (
            <Empty description="购物车空空如也">
              <Button round type="danger" class="bottom-button" onClick={gotoShop}>前往选购</Button>
            </Empty>
          )
        }

      </div>
    )
  }
}
</script>

<style lang="less" scoped>
.submit-bar-wrap {
  height: 50px;
  /deep/ .van-submit-bar {
    bottom: 50px;
  }
}
.cart-item {
  display: flex;
}
.cart-item-checkbox {
  padding: 0 10px;
}
.cart-item-card {
  flex: 1;
  background: #ffffff;
}
.delete-button {
  height: 100%;
}
.cart-item-price {
  font-size: 16px;
  font-weight: 300;
  color: red;
}
</style>
