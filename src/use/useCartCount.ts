import { CartItemRes, getCartApi } from "@/Apis/cart"
import { computed, ref } from "vue"

const count = ref(0)

export default function useCartCount () {
  const cartCount = computed(() => {
    return count.value
  })

  const refreshCartCount = async () => {
    const res = await getCartApi()
    const cartList = (res.data || []).map((item: CartItemRes) => {
      return {
        ...item
      }
    })
    count.value = cartList.length
  }

  const increaseCartCount = () => {
    count.value++
  }

  return {
    cartCount,
    refreshCartCount,
    increaseCartCount
  }
}
