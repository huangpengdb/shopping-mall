<template>
    <div>
        <div>
            购物车
            {{ $route.query.id }}
        </div>
        <div>
            <button @click="getData">Get</button>
            <button>Post</button>
            <button>Http</button>
        </div>
        <div>
            {{ rData }}
        </div>
    </div>
</template>

<script>
export default {
    props: {},
    data() {
        return {
            rData: ""
        };
    },
    computed: {},
    created() {},
    mounted() {
        // this.getData();
    },
    watch: {},
    methods: {
        getData() {
            this.axios
                .get("/goods")
                .then(result => {
                    let res = result.data;
                    this.rData = res.goods;
                    console.log(this.rData);
                })
                .catch(err => {});
        }
    },
    components: {}
};
</script>

<style scoped lang="">
</style>
