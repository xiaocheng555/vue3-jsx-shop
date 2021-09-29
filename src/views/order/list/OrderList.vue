
<script lang="tsx">
import { getOrderListApi, OrderRes } from '@/Apis/order'
import OrderItem from '@/components/OrderItem/index.vue'
import { ref, defineComponent } from 'vue'
import { List, PullRefresh } from "vant"
import { useRouter } from 'vue-router'

const OrderList = defineComponent({
  name: 'OrderList',
  props: {
    status: {
      type: String,
      require: true
    }
  },
  setup (props) {
    const router = useRouter()
    const orderList = ref<OrderRes[]>([])
    const pageNumber = ref(0)
    const listLoading = ref(false)
    const listError= ref(false)
    const listFinish= ref(false)
    const refreshing= ref(false)


    const loadOrderList = async (isRefresh = false) => {
      pageNumber.value++
      listLoading.value = true
      try {
        const res = await getOrderListApi({
          pageNumber: pageNumber.value,
          status: props.status
        })
        if (res.data) {
          const data = res.data
          const list = res.data?.list || []
          isRefresh && (orderList.value = [])
          orderList.value.push(...list)

          listFinish.value = data.currPage >= data.totalPage
        } else {
          listFinish.value = true
        }
      } catch (err) {
        listError.value = true
        console.error('获取订单数据失败', err)
      } finally {
        listLoading.value = false
        refreshing.value = false
      }
    }

    const onRefresh = () => {
      pageNumber.value = 0
      listError.value = false
      listFinish.value = false
      loadOrderList(true)
    }

    const onOrderClick = (order: OrderRes) => {
      console.log(order, 'order')
      router.push(`/order/detail?orderNo=${order.orderNo}`)
    }

    return () => (
      <div>
        <PullRefresh v-model={refreshing.value} onRefresh={onRefresh}>
          <List
            class="search-list"
            loading={listLoading.value}
            error={listError.value}
            error-text="请求失败，点击重新加载"
            finished={listFinish.value}
            finished-text="没有更多了"
            onUpdate:error={(val: boolean) => listError.value = val}
            onUpdate:loading={(val: boolean) => listLoading.value = val}
            onLoad={loadOrderList}>
            {
              orderList.value.map(order => (
                <OrderItem key={order.orderId} data={order} onClick={() => onOrderClick(order)}></OrderItem>
              ))
            }
          </List>
        </PullRefresh>
      </div>
    )
  }
})

export default OrderList
</script>

<style lang="less" scoped>
</style>
