<!--
 * 严肃声明：
 * 开源版本请务必保留此注释头信息，若删除我方将保留所有法律责任追究！
 * 本系统已申请软件著作权，受国家版权局知识产权以及国家计算机软件著作权保护！
 * 可正常分享和学习源码，不得用于违法犯罪活动，违者必究！
 * Copyright (c) 2020 陈尼克 all rights reserved.
 * 版权所有，侵权必究！
 *-->
<script lang="tsx">
import { CateItemRes, getCategoryApi } from "@/Apis/good"
import { Search, Tag } from "vant"
import { onBeforeMount, ref } from "vue"
import { useRouter } from "vue-router"

export default {
  name: 'category',
  setup () {
    const router = useRouter()
    const cateList = ref<CateItemRes[]>([])
    const activeCate = ref<CateItemRes>({} as CateItemRes)

    const fetchCateList = async () => {
      try {
        const res = await getCategoryApi()
        cateList.value = res.data || []
        onCateChange(cateList.value[0])
      } catch (err) {
        console.error('获取分类失败', err)
      }
    }

    const onCateChange = (cate: CateItemRes) => {
      if (cate) {
        activeCate.value = cate
        console.log(cate.categoryId === activeCate.value.categoryId, 'ssd')
      }
    }

    const onChildCateChange = (childCate: CateItemRes) => {
      router.push(`/product/list?categoryId=${childCate.categoryId}`)
    }

    const gotoProductList = () => {
      router.push('/product/list')
      // categoryId
    }

    onBeforeMount(() => {
      fetchCateList()
    })

    return () => {
      const subCaeList = activeCate.value.secondLevelCategoryVOS || []

      return (
        <div class="cate-page">
          <Search
            class="cate-search"
            show-
            placeholder="请输入搜索关键词"
            readonly
            onClick={gotoProductList} />
            <section class="cate-content">
              <aside class="cate-side">
                {
                  cateList.value.map(cate => (
                    <div
                      class={
                        ['cate-nav', cate.categoryId === activeCate.value.categoryId ? 'active' : '']
                      }
                      key={cate.categoryId}
                      onClick={() => onCateChange(cate)}>
                      {cate.categoryName}
                    </div>
                  ))
                }
              </aside>
              <main class="cate-main">
                {
                  subCaeList.map(subCate => (
                    <div class="cate-item">
                      <h3 class="cate-list-title">{subCate.categoryName}</h3>
                      <div class="cate-subitem" key={subCate.categoryId} >
                        {
                          (subCate?.thirdLevelCategoryVOS || []).map(thirdCate => (
                            <Tag
                              class="cate-item-tag"
                              type="primary"
                              key={thirdCate.categoryId}
                              onClick={() => onChildCateChange(thirdCate)}>
                              {thirdCate.categoryName}
                            </Tag>
                          ))
                        }
                      </div>
                    </div>
                  ))
                }
              </main>
            </section>
        </div>
      )
    }
  }
}

</script>

<style lang='less' scoped>
.cate-search {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
}
.cate-content {
  position: absolute;
  top: 50px;
  bottom: 50px;
  left: 0;
  display: flex;
  overflow: hidden;
}
.cate-side {
  width: 120px;
  height: 100%;
  overflow: auto;
  background: #F8F8F8;
}
.cate-nav {
  padding: 0 10px;
  font-size: 14px;
  line-height: 55px;
  color: #666666;
  &.active {
    color: #1baeae;
    background: #fff;
  }
}
.cate-main {
  flex: 1;
  padding: 10px 15px;
  height: 100%;
  box-sizing: border-box;
  overflow: auto;
  background: #ffffff;
}
.cate-list-title {
  margin: 20px 0;
  font-size: 16px;
}
.cate-item-tag {
  margin: 5px 12px;
}
</style>
