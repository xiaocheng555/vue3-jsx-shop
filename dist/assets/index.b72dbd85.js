import{g as a}from"./good.9f30feb0.js";import{m as e,r as t,v as s,f as c,x as o,y as r}from"./vendor.6c8c2553.js";/* empty css              *//* empty css              *//* empty css              *//* empty css              */import"./request.324758d0.js";import"./index.57763f1b.js";var d={name:"category",setup(){const d=e(),i=t([]),l=t({}),n=a=>{a&&(l.value=a,console.log(a.categoryId===l.value.categoryId,"ssd"))},m=()=>{d.push("/product/list")};return s((()=>{(async()=>{try{const e=await a();i.value=e.data||[],n(i.value[0])}catch(e){console.error("获取分类失败",e)}})()})),()=>{const a=l.value.secondLevelCategoryVOS||[];return c("div",{class:"cate-page"},[c(o,{class:"cate-search","show-":!0,placeholder:"请输入搜索关键词",readonly:!0,onClick:m},null),c("section",{class:"cate-content"},[c("aside",{class:"cate-side"},[i.value.map((a=>c("div",{class:["cate-nav",a.categoryId===l.value.categoryId?"active":""],key:a.categoryId,onClick:()=>n(a)},[a.categoryName])))]),c("main",{class:"cate-main"},[a.map((a=>c("div",{class:"cate-item"},[c("h3",{class:"cate-list-title"},[a.categoryName]),c("div",{class:"cate-subitem",key:a.categoryId},[((null==a?void 0:a.thirdLevelCategoryVOS)||[]).map((a=>c(r,{class:"cate-item-tag",type:"primary",key:a.categoryId,onClick:()=>{return e=a,void d.push(`/product/list?categoryId=${e.categoryId}`);var e}},{default:()=>[a.categoryName]})))])])))])])])}}};d.__scopeId="data-v-77e5ce32";export{d as default};