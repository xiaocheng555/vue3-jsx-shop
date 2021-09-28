
<script lang="tsx">
import { GoodsRes, searchGoodsApi, SearchGoodsParams } from "@/Apis/good"
import { Card, Empty, Icon, List, PullRefresh, Search, Tab, Tabs } from "vant"
import { computed, onBeforeMount, ref } from 'vue'
import { useRoute, useRouter } from "vue-router"
import { handleImg } from "@/utils"
import { ResponsePage } from "@/@types/request"

const enum SearchStatus {
  READY = 'ready', // 未搜索
  LOADING = 'loading', // 搜索中
  DONE = 'done', // 搜索完成，有数据
  NODATA = 'noData', // 没有搜索数据
  FAIL = 'fail', // 搜索失败
  REFRESH = 'refresh' // 刷新
}

const tabList = [
  {
    label: '推荐',
    value: ''
  },
  {
    label: '新品',
    value: 'new'
  },
  {
    label: '价格',
    value: 'price'
  }
]

export default {
  name: 'ProductList',
  setup () {
    const router = useRouter()
    const route = useRoute()
    const searchStatus = ref<SearchStatus>(SearchStatus.READY)
    const goodsParams = ref<SearchGoodsParams>({
      pageNumber: 1,
      keyword: '',
      orderBy: '',
      goodsCategoryId: undefined
    })
    const refreshing = ref(false)
    const goodsList = ref<GoodsRes []>([])
    const goodsLoading = ref(false)
    const goodsError = ref(false)
    const goodsFinish = ref(false)
    const keyword = computed(() => {
      return goodsParams.value.keyword?.trim() || ''
    })

    const onSearch = async () => {
      if (!keyword.value && !goodsParams.value.goodsCategoryId) {
        searchStatus.value = SearchStatus.READY
        return
      }

      resetData()
      if (refreshing.value) {
        searchStatus.value = SearchStatus.REFRESH
      } else {
        searchStatus.value = SearchStatus.LOADING
      }
      try {
        const res = await searchGoodsApi({
          ...goodsParams.value,
          keyword: keyword.value
        })
        goodsList.value = res.data?.list || []
        searchStatus.value = goodsList.value.length ? SearchStatus.DONE : SearchStatus.NODATA
      } catch (err) {
        searchStatus.value = SearchStatus.FAIL
        console.error('搜索商品失败', err)
      } finally {
        refreshing.value = false
      }
    }

    const resetData = () => {
      goodsParams.value.pageNumber = 1
      goodsFinish.value = false
      goodsError.value = false
    }

    const onTabChange = (value: string) => {
      goodsParams.value.orderBy = value
      onSearch()
    }

    const loadGoodsList = async () => {
      if (typeof goodsParams.value.pageNumber === 'number') {
        goodsParams.value.pageNumber++
      } else {
        goodsError.value = true
        return
      }
      goodsLoading.value = true

      try {
        const res = await searchGoodsApi({
          ...goodsParams.value,
          keyword: keyword.value
        })
        const data: ResponsePage<GoodsRes> = res.data || {}
        const list = res.data?.list || []
        goodsList.value.push(...list)

        // set done
        goodsFinish.value = data.currPage <= data.totalPage
      } catch (err) {
        goodsError.value = true
        console.error('获取商品失败', err)
      } finally {
        goodsLoading.value = false
      }
    }

    const onRefresh = () => {
      onSearch()
    }

    const gotoGoodsDetail = (goods: GoodsRes) => {
      router.push({
        path: `/product/${goods.goodsId}`
      })
    }

    const goBack = () => {
      router.back()
    }

    onBeforeMount(() => {
      goodsParams.value.goodsCategoryId = String(route.query.categoryId || '')
      onSearch()
    })

    return () => {
      const NotSearch = <Empty image="search" description="搜索想要的商品" />
      const NoData = <Empty image="search" description="抱歉，没有找到商品" />
      const Searching = <Empty image="search" description="正在搜索" />
      const SearchFail = <Empty image="search" description="搜索失败" />
      const SearchList = (
        <PullRefresh v-model={refreshing.value} onRefresh={onRefresh}>
          <List
            class="search-list"
            loading={goodsLoading.value}
            error={goodsError.value}
            error-text="请求失败，点击重新加载"
            finished={goodsFinish.value}
            finished-text="没有更多了"
            onUpdate:error={(val: boolean) => goodsError.value = val}
            onUpdate:loading={(val: boolean) => goodsLoading.value = val}
            onLoad={loadGoodsList}>
            {
              goodsList.value.map(goods => (
                <Card
                  price={goods.sellingPrice}
                  desc={goods.goodsIntro}
                  title={goods.goodsName}
                  thumb={handleImg(goods.goodsCoverImg)}
                  onClick={() => gotoGoodsDetail(goods)}
                />
              ))
            }
          </List>
        </PullRefresh>
      )

      let Content: any = ''
      switch (searchStatus.value) {
        case SearchStatus.READY:
          Content = NotSearch
          break
        case SearchStatus.NODATA:
          Content = NoData
          break
        case SearchStatus.LOADING:
          Content = Searching
          break
        case SearchStatus.FAIL:
          Content = SearchFail
          break
        case SearchStatus.DONE:
        case SearchStatus.REFRESH:
          Content = SearchList
      }

      return (
        <div class="product-list">
          <div class="product-list-top">
            <div class="product-list-top-fixed">
              <Search
                v-model={goodsParams.value.keyword}
                show-action
                placeholder="请输入搜索关键词"
                onSearch={onSearch}>
              {{
                left: () => <span class="back-icon" onClick={goBack}><Icon name="arrow-left" /></span>,
                action: () => <div onClick={onSearch}>搜索</div>
              }}
              </Search>
              <Tabs type="card" onChange={onTabChange}>
                {
                  tabList.map(tab => (
                    <Tab  name={tab.value} title={tab.label}></Tab>
                  ))
                }
              </Tabs>
            </div>
          </div>
          {Content}
        </div>
      )
    }
  }
}
</script>

<style lang="less" scoped>
.product-list {
  .back-icon {
    padding-right: 10px;
    font-size: 18px;
  }
}
.product-list-top {
  height: 84px;
}
.product-list-top-fixed {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 5;
}
.search-list {
  margin-top: 10px;
}
</style>
