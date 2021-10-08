<script lang="tsx">
import { addCartApi, getCartApi } from '@/Apis/cart'
import { getGoodsApi, GoodsDetailRes, GoodsRes } from '@/Apis/good'
import NavBar from '@/components/NavBar'
import { ActionBar, ActionBarButton, ActionBarIcon, Badge, Divider, Toast } from 'vant'
import { computed, onBeforeMount, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { handleImg } from "@/utils"
import { resolveResError } from '@/utils/http'
import useCartCount from '@/use/useCartCount'

export default {
  name: 'ProductDetail',
  setup () {
    const router = useRouter()
    const route = useRoute()
    const { cartCount, refreshCartCount, increaseCartCount } = useCartCount()
    const goodsData = ref<GoodsDetailRes>({} as GoodsDetailRes)
    const adding = ref(false)
    const goodsId = computed(() => {
      return route.params.id
    })

    const fetchGoodsData = async () => {
      const toast = Toast.loading('加载中...')
      try {
        const res = await getGoodsApi(Number(goodsId.value))
        goodsData.value = res.data || {}
      } catch (err) {
        console.error('获取商品失败', err)
      } finally {
        toast.clear()
      }
    }

    const addCart = async () => {
      try {
        adding.value = true
        const { goodsId } = goodsData.value
        await addCartApi({
          goodsCount: 1,
          goodsId: goodsId
        })
        Toast.success('添加成功')
        increaseCartCount()
      } catch (err) {
        const res = resolveResError(err)
        console.log(res?.message, res?.resultCode, 'message, resultCod')
        console.error('商品添加到购物车失败', err)
      } finally {
        adding.value = false
      }
    }

    const gotoCart = () => {
      router.push('/cart')
    }

    onBeforeMount(() => {
      refreshCartCount()
      fetchGoodsData()
    })

    return () => {
      const { goodsCoverImg, goodsName, sellingPrice, goodsDetailContent } = goodsData.value
      return (
        <div class="goods-detail">
          <NavBar title="商品详情" leftArrow></NavBar>
          <img class="goods-detail-img" src={handleImg(goodsCoverImg)} />
          <div class="goods-detail-card">
            <h2 class="goods-detail-title">{goodsName}</h2>
            <p class="goods-detail-post">免邮费 顺丰快递</p>
            <div class="goods-detail-price">¥{sellingPrice}</div>
          </div>
          <Divider>
            <h3 class="goods-detail-subtitle">商品介绍</h3>
          </Divider>
          <div class="goods-detail-content">
            <div v-html={goodsDetailContent}></div>
          </div>
          <div style="height: 50px;">
            <ActionBar>
              <ActionBarIcon icon="chat-o" text="客服" color="#ee0a24" />
              <Badge content={cartCount.value} offset={[-14, 0]}>
                <ActionBarIcon icon="cart-o" text="购物车" onClick={gotoCart} />
              </Badge>
              <ActionBarButton type="warning" text="加入购物车" loading={adding.value} onClick={addCart} />
              <ActionBarButton type="danger" text="立即购买" />
            </ActionBar>
          </div>
        </div>
      )
    }
  }
}
</script>

<style lang='less' scoped>
.goods-detail {
  padding-bottom: 20px;
}
.goods-detail-img {
  display: inline-block;
  width: 100%;
}
.goods-detail-card {
  padding: 0 16px;
  margin-bottom: 30px;
}
.goods-detail-title {
  margin-bottom: 5px;
  font-size: 16px;
  color: #333333;
  line-height: 1.5;
}
.goods-detail-post {
  margin-bottom: 10px;
  font-size: 14px;
  color: #aaa;
}
.goods-detail-price {
  font-size: 22px;
  color: red;
  font-weight: 300;
}
.goods-detail-content {
  padding: 0 15px;
  /deep/ img {
    display: inline-block;
    max-width: 100%;
  }
}
.goods-detail-subtitle {
  font-size: 14px;
  font-weight: 600;
  color: #333333;
}
</style>
