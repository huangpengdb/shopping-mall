<template>
    <div class="nav-breadcrumb-wrap">
        <div class="container">
            <nav class="nav-breadcrumb">
                <a href="/">Home</a>
                <span>{{ position }}</span>
            </nav>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        position: String
    },
    data() {
        return {};
    },
    computed: {},
    created() {},
    mounted() {},
    watch: {},
    methods: {},
    components: {}
};
</script>

<style scoped>
.nav-breadcrumb {
    text-align: left;
}
</style>
