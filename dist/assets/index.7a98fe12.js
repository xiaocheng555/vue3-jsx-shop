import{d as e,m as a,f as t,n as l,r as s,F as o,I as n,S as c,p as m,i as r,G as i,q as g,s as u}from"./vendor.6c8c2553.js";/* empty css              */import{r as d}from"./request.324758d0.js";import{N as p}from"./index.c77fe791.js";import"./index.57763f1b.js";/* empty css              */var h=e({name:"GoodsItem",props:{data:{default:()=>({})}},setup(e){const s=a();return()=>{const a=e.data;let o=a.goodsCoverImg;return"string"==typeof o&&-1===o.indexOf("http")&&(o="http://backend-api-01.newbee.ltd"+o),t("div",{class:"goods-item",onClick:()=>{return e=a,void s.push({path:`/product/${e.goodsId}`});var e}},[t("img",{class:"goods-item-img",src:o},null),t("p",{class:"goods-item-name ell2"},[a.goodsName]),t("p",{class:"goods-item-price"},[l("¥"),a.sellingPrice])])}}});function y(e){return"function"==typeof e||"[object Object]"===Object.prototype.toString.call(e)&&!r(e)}var f={name:"home",setup(){const e=a(),r=s([]),f=s([]),E=s([]),v=s([]),x=[{name:"新蜂超市",imgUrl:"https://s.yezgea02.com/1604041127880/%E8%B6%85%E5%B8%82%402x.png",categoryId:100001},{name:"新蜂服饰",imgUrl:"https://s.yezgea02.com/1604041127880/%E6%9C%8D%E9%A5%B0%402x.png",categoryId:100003},{name:"全球购",imgUrl:"https://s.yezgea02.com/1604041127880/%E5%85%A8%E7%90%83%E8%B4%AD%402x.png",categoryId:100002},{name:"新蜂生鲜",imgUrl:"https://s.yezgea02.com/1604041127880/%E7%94%9F%E9%B2%9C%402x.png",categoryId:100004},{name:"新蜂到家",imgUrl:"https://s.yezgea02.com/1604041127880/%E5%88%B0%E5%AE%B6%402x.png",categoryId:100005},{name:"充值缴费",imgUrl:"https://s.yezgea02.com/1604041127880/%E5%85%85%E5%80%BC%402x.png",categoryId:100006},{name:"9.9元拼",imgUrl:"https://s.yezgea02.com/1604041127880/9.9%402x.png",categoryId:100007},{name:"领劵",imgUrl:"https://s.yezgea02.com/1604041127880/%E9%A2%86%E5%88%B8%402x.png",categoryId:100008},{name:"省钱",imgUrl:"https://s.yezgea02.com/1604041127880/%E7%9C%81%E9%92%B1%402x.png",categoryId:100009},{name:"全部",imgUrl:"https://s.yezgea02.com/1604041127880/%E5%85%A8%E9%83%A8%402x.png",categoryId:100010}],I=()=>{e.push("/user")},b=()=>{e.push("/product/list")};return(async()=>{const e=u.loading("加载中...");try{const a=(await d.get("/index-infos")).data||{};r.value=a.carousels||[],f.value=a.hotGoodses||[],E.value=a.newGoodses||[],v.value=a.recommendGoodses||[]}catch(a){console.error("首页数据获取失败",a)}finally{e.clear()}})(),()=>{let e,a,s,u;return t("div",{class:"home-page"},[t(p,{title:"新蜂商城"},{right:()=>t(o,null,[t(n,{name:"contact",size:"18",onClick:I},null),l("   "),t(n,{name:"search",size:"18",onClick:b},null)])}),t(c,{class:"home-banner",autoplay:3e3},y(e=r.value.map(((e,a)=>t(m,{key:a},{default:()=>[t("a",{class:"home-banner-link",href:e.redirectUrl,target:"_blank"},[t("img",{class:"home-banner-img",src:e.carouselUrl},null)])]}))))?e:{default:()=>[e]}),t("ul",{class:"home-cate-list"},[x.map((e=>t("li",{class:"cate-item",key:e.categoryId},[t("img",{class:"cate-item-img",src:e.imgUrl},null),t("p",{class:"cate-item-text ell"},[e.name])])))]),E.value.length?t("section",null,[t("h2",{class:"home-title"},[l("新品上线")]),t(i,{columnNum:2},y(a=E.value.map((e=>t(g,null,{default:()=>[t(h,{data:e},null)]}))))?a:{default:()=>[a]})]):null,f.value.length?t("section",null,[t("h2",{class:"home-title"},[l("热门商品")]),t(i,{columnNum:2},y(s=f.value.map((e=>t(g,null,{default:()=>[t(h,{data:e},null)]}))))?s:{default:()=>[s]})]):null,v.value.length?t("section",null,[t("h2",{class:"home-title"},[l("最新推荐")]),t(i,{columnNum:2},y(u=v.value.map((e=>t(g,null,{default:()=>[t(h,{data:e},null)]}))))?u:{default:()=>[u]})]):null])}}};export{f as default};
