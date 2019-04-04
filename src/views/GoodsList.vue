<template>
    <div>
        <mall-header></mall-header>
        <div class="nav-breadcrumb-wrap">
            <div class="container">
                <nav class="nav-breadcrumb">
                    <a href="/">Home</a>
                    <span>Goods</span>
                </nav>
            </div>
        </div>
        <div
            class="
         accessory-page"
        >
            <div class="container">
                <div class="filter-nav">
                    <span class="sortby">Sort by:</span>
                    <a href="javascript:void(0)" class="default cur">Default</a>
                    <a
                        href="javascript:void(0)"
                        @click="sortByPrice"
                        class="price"
                        >Price{{ sortType ? 1 : -1 }}
                    </a>
                    <a
                        href="javascript:void(0)"
                        @click="showPriceInterval"
                        class="filterby stopPop"
                        >Filter by</a
                    >
                </div>
                <div class="accessory-result">
                    <!-- filter -->
                    <div
                        id="filter"
                        :class="{ 'filterby-show': showFilter }"
                        class="filter stopPop"
                    >
                        <dl class="filter-price">
                            <dt>Price:</dt>
                            <dd @click="pickAll">
                                <a
                                    :class="{ cur: pricePicked == 'All' }"
                                    href="javascript:void(0)"
                                    >All</a
                                >
                            </dd>
                            <dd
                                @click="pick(index)"
                                v-for="(item, index) in priceInterval"
                                :key="index"
                            >
                                <a
                                    :class="{ cur: pricePicked == index }"
                                    href="javascript:void(0)"
                                    >{{ item.startPrice }} -
                                    {{ item.endPrice }}</a
                                >
                            </dd>
                            <dd @click="pickLast">
                                <a
                                    :class="{ cur: pricePicked == 'Last' }"
                                    href="javascript:void(0)"
                                    >{{
                                        priceInterval[priceInterval.length - 1].endPrice
                                    }}以上</a
                                >
                            </dd>
                        </dl>
                    </div>

                    <!-- search result accessories list -->
                    <div class="accessory-list-wrap">
                        <div class="accessory-list col-4">
                            <ul>
                                <li
                                    v-for="(product, index) in goods"
                                    :key="index"
                                >
                                    <div class="pic">
                                        <a href="#">
                                            <img
                                                v-lazy="
                                                    imgUrl(product.productImg)
                                                "
                                            />
                                        </a>
                                    </div>
                                    <div class="main">
                                        <div class="name">
                                            {{ product.productName }}
                                        </div>
                                        <div class="price">
                                            {{ product.salePrice }}
                                        </div>
                                        <div class="btn-area">
                                            <a
                                                href="javascript:;"
                                                class="btn btn-m"
                                                @click="addCart(product)"
                                                >加入购物车</a
                                            >
                                        </div>
                                    </div>
                                </li>
                            </ul>
                            <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="20">
                                <img src="../assets/static/loading-svg/loading-balls.svg" alt="" v-show="loading">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div
            class="md-overlay"
            @click="closeOverlay"
            v-show="overlayFlag"
        ></div>
        <mall-footer></mall-footer>
    </div>
</template>

<script>
import MallHeader from "../components/MallHeader.vue";
import MallFooter from "../components/MallFooter.vue";
import "../assets/css/base.css";
import "../assets/css/product.css";
import { constants } from "fs";
export default {
    props: {},
    data() {
        return {
            goods: [],
            priceInterval: [
                { startPrice: 0.0, endPrice: 100.0 },
                { startPrice: 100.0, endPrice: 500.0 },
                { startPrice: 500.0, endPrice: 1000.0 },
                { startPrice: 1000.0, endPrice: 2000.0 }
            ],
            pricePicked: "All",
            showFilter: false,
            overlayFlag: false,
            sortType: true,
            page: "1",
            pageSize: "6",
            busy: false,
            flag: true,
            loading:false
        };
    },
    computed: {
        imgUrl() {
            return productImg => {
                return require("../assets/static/" + productImg);
            };
        }
    },
    created() {},
    mounted() {
        this.sortByPrice()
    },
    watch: {},
    methods: {
        getGoods(params, flag) {
            this.loading = true
            this.axios
                .get("/goods", {
                    params
                })
                .then(result => {
                    if (flag) {
                        this.goods.push(...result.data.goods);
                        this.loading =false
                        if (result.data.count === 0) {
                            this.busy = true;
                        } else {
                            this.busy = false;
                        }
                    } else {
                        this.goods = result.data.goods;
                    }
                    
                })
                .catch(err => {});
        },
        pickAll() {
            this.pricePicked = "All";
            this.getGoods();
        },
        pickLast() {
            this.pricePicked = "Last";
            let minPrice = this.priceInterval[this.priceInterval.length - 1].endPrice;
            let params = {minPrice};
            this.getGoods(params);
        },
        pick(index) {
            this.pricePicked = index;
            this.closeOverlay();
            let minPrice = this.priceInterval[index].startPrice;
            let maxPrice = this.priceInterval[index].endPrice;
            let params ={
                minPrice,
                maxPrice
            }
            this.getGoods(params);
        },
        showPriceInterval() {
            this.showFilter = true;
            this.overlayFlag = true;
        },
        closeOverlay() {
            this.showFilter = false;
            this.overlayFlag = false;
        },
        sortByPrice(flag) {
            // this.sortType = !this.sortType;
            let sort = this.sortType ? 1 : -1;
            let page = this.page;
            let pageSize = this.pageSize;
            let params = {
                page,
                pageSize,
                sort
            };
            this.getGoods(params, flag)
        },
        loadMore() {
            this.busy = true;            
            setTimeout(() => {                
                this.page++;
                this.sortByPrice(this.flag);
            }, 100);
        },
        addCart(product) {
            this.axios.post('/goods/addCart', {
                productId: product.productId
            }).then((result)=>{
                let res = result.data;
                console.log(res.result)
            }).catch((err)=>{
                
            })
        }
    },
    components: {
        MallHeader,
        MallFooter
    }
};
</script>

<style scoped>
.nav-breadcrumb {
    text-align: left;
}
</style>


