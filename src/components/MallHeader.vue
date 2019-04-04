<template>
    <header class="header">
        <symbol id="icon-cart" viewBox="0 0 38 32">
            <title>cart</title>
            <path
                class="path1"
                d="M37.759 0h-4.133c-0.733 0.004-1.337 0.549-1.434 1.255l-0.546 4.342c-0.081 0.484-0.496 0.849-0.997 0.849-0.005 0-0.009-0-0.014-0h-27.604c-0.003 0-0.007-0-0.011-0-1.674 0-3.031 1.357-3.031 3.031 0 0.34 0.056 0.666 0.159 0.971l2.52 8.062c0.385 1.194 1.486 2.043 2.785 2.043 0.126 0 0.25-0.008 0.372-0.023l22.983 0.002c0.515 0.131 0.626 0.768 0.626 1.283 0.005 0.044 0.009 0.095 0.009 0.146 0 0.501-0.294 0.933-0.718 1.134l-22.439 0.003c-0.354 0-0.642 0.287-0.642 0.642s0.287 0.642 0.642 0.642h22.745l0.131-0.071c0.919-0.392 1.551-1.287 1.551-2.33 0-0.058-0.002-0.116-0.006-0.173 0.021-0.108 0.033-0.24 0.033-0.376 0-1.072-0.732-1.973-1.724-2.23l-23.357-0.004c-0.063 0.008-0.135 0.013-0.209 0.013-0.719 0-1.332-0.455-1.566-1.093l-2.53-8.095c-0.048-0.154-0.076-0.332-0.076-0.515 0-0.973 0.782-1.764 1.752-1.778h27.657c1.159-0.004 2.112-0.883 2.232-2.011l0.547-4.345c0.010-0.083 0.078-0.147 0.161-0.152l4.133-0c0.354 0 0.642-0.287 0.642-0.642s-0.287-0.642-0.642-0.642z"
            ></path>
            <path
                class="path2"
                d="M31.323 9.69c-0.022-0.003-0.048-0.004-0.074-0.004-0.328 0-0.598 0.248-0.633 0.567l-0.809 7.268c-0.003 0.022-0.004 0.048-0.004 0.074 0 0.328 0.248 0.598 0.567 0.633l0.074 0c0.001 0 0.003 0 0.004 0 0.327 0 0.596-0.246 0.632-0.563l0.809-7.268c0.003-0.022 0.004-0.048 0.004-0.074 0-0.328-0.248-0.598-0.567-0.633z"
            ></path>
            <path
                class="path3"
                d="M27.514 25.594c-1.769 0-3.203 1.434-3.203 3.203s1.434 3.203 3.203 3.203c1.769 0 3.203-1.434 3.203-3.203s-1.434-3.203-3.203-3.203zM27.514 30.717c-1.060 0-1.92-0.86-1.92-1.92s0.86-1.92 1.92-1.92c1.060 0 1.92 0.86 1.92 1.92s-0.86 1.92-1.92 1.92z"
            ></path>
            <path
                class="path4"
                d="M9.599 25.594c-1.769 0-3.203 1.434-3.203 3.203s1.434 3.203 3.203 3.203c1.769 0 3.203-1.434 3.203-3.203s-1.434-3.203-3.203-3.203zM9.599 30.717c-1.060 0-1.92-0.86-1.92-1.92s0.86-1.92 1.92-1.92c1.060 0 1.92 0.86 1.92 1.92s-0.86 1.92-1.92 1.92z"
            ></path>
        </symbol>
        <div class="navbar">
            <div class="navbar-left-container">
                <a href="/">
                    <img
                        class="navbar-brand-logo"
                        src="../assets/static/logo.png"
                /></a>
            </div>
            <div class="navbar-right-container">
                <span class="navbar-link"></span>
                <a
                    href="javascript:void(0)"
                    class="navbar-link"
                    @click="showLoginMoal"
                    v-if="noLogin"
                    >Login</a
                >
                <span v-if="!noLogin">{{ user }}</span>
                <a
                    href="javascript:void(0)"
                    class="navbar-link"
                    @click="logOut"
                    v-show="loginOut"
                    >Logout</a
                >
                <div class="navbar-cart-container">
                    <span class="navbar-cart-count"></span>
                    <a class="navbar-link navbar-cart-link" href="/#/cart">
                        <svg class="navbar-cart-logo">
                            <use
                                xmlns:xlink="http://www.w3.org/1999/xlink"
                                xlink:href="#icon-cart"
                            ></use>
                        </svg>
                    </a>
                </div>
            </div>
        </div>

        <div
            class="md-modal modal-msg md-modal-transition"
            :class="{ 'md-show': mdShow }"
        >
            <div class="md-modal-inner">
                <div class="md-top">
                    <div class="md-title">Login in</div>
                    <button class="md-close" @click="closeLoginModal">
                        Close
                    </button>
                </div>
                <div class="md-content">
                    <div class="confirm-tips">
                        <div class="error-wrap">
                            <span class="error error-show" v-show="errTip"
                                >用户名或者密码错误</span
                            >
                        </div>
                        <ul>
                            <li class="regi_form_input">
                                <i class="icon IconPeople"></i>
                                <input
                                    type="text"
                                    tabindex="1"
                                    name="loginname"
                                    class="regi_login_input regi_login_input_left"
                                    placeholder="User Name"
                                    data-type="loginname"
                                    v-model="username"
                                />
                            </li>
                            <li class="regi_form_input noMargin">
                                <i class="icon IconPwd"></i>
                                <input
                                    type="password"
                                    tabindex="2"
                                    name="password"
                                    class="regi_login_input regi_login_input_left login-input-no input_text"
                                    placeholder="Password"
                                    v-model="password"
                                    @keydown.enter="login"
                                />
                            </li>
                        </ul>
                    </div>
                    <div class="login-wrap">
                        <a href="javascript:;" class="btn-login" @click="login"
                            >登 录</a
                        >
                    </div>
                </div>
            </div>
        </div>
        <div class="md-overlay" v-show="loginModal"></div>
    </header>
</template>

<script>
import "../assets/css/login.css";
import { constants } from "crypto";
export default {
    props: {},
    data() {
        return {
            loginModal: false,
            mdShow: false,
            username: "",
            password: "",
            errTip: false,
            noLogin: true,
            loginOut: false,
            user: ""
        };
    },
    computed: {},
    created() {},
    mounted() {},
    watch: {},
    methods: {
        showLoginMoal() {
            this.loginModal = true;
            this.mdShow = true;
        },
        closeLoginModal() {
            this.loginModal = false;
            this.mdShow = false;
        },
        login() {
            if (!this.username || !this.password) {
                this.errTip = true;
                return;
            }
            this.axios
                .post("/users/login", {
                    username: this.username,
                    password: this.password
                })
                .then(result => {
                    let res = result.data;
                    if (res.status === "0") {
                        this.errTip = false;
                        this.closeLoginModal();
                        this.noLogin = false;
                        this.loginOut = true;
                        this.user = res.result;
                    } else {
                        this.errTip = true;
                    }
                })
                .catch(err => {});
        },
        logOut() {
            this.axios
                .post("/users/logout")
                .then(result => {
                    let res = result.data;
                    if(res.status === "0"){
                        this.loginOut = false;
                        this.noLogin = true
                    }
                });
        }
    },
    components: {}
};
</script>

<style scoped>
.navbar {
    display: flex;
    justify-content: space-between;
}
.navbar-cart-logo {
    width: 25px;
    height: 25px;
    -webkit-transform: scaleX(-1);
    transform: scaleX(-1);
}

.navbar-right-container,
.navbar-left-container {
    display: flex;
    width: 18vw;
    justify-content: space-between;
    align-items: center;
    margin-right: 18px;
}
</style>
