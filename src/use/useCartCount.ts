import { CartItemRes, getCartApi } from "@/Apis/cart"
import { readonly, ref } from "vue"

const cartCount = ref(0)

export default function useCartCount () {
  const refreshCartCount = async () => {
    const res = await getCartApi()
    const cartList = (res.data || []).map((item: CartItemRes) => {
      return {
        ...item
      }
    })
    cartCount.value = cartList.length
  }

  const increaseCartCount = () => {
    cartCount.value++
  }

  return {
    cartCount: readonly(cartCount),
    refreshCartCount,
    increaseCartCount
  }
}
