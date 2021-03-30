<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">{{ isLogin ? "Sign in" : "Sign up" }}</h1>
          <p class="text-xs-center">
            <nuxt-link v-if="isLogin" to="/register"
              >Need an account?</nuxt-link
            >
            <nuxt-link v-else to="/login">Have an account?</nuxt-link>
          </p>

          <ul class="error-messages">
            <li>That email is already taken</li>
          </ul>

          <form @submit.prevent="submitHandle">
            <fieldset class="form-group" v-if="!isLogin">
              <input
                class="form-control form-control-lg"
                v-model="username"
                type="text"
                placeholder="Your Name"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                v-model="email"
                type="text"
                placeholder="Email"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                v-model="password"
                type="password"
                placeholder="Password"
              />
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right">
              {{ isLogin ? "Sign in" : "Sign up" }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import user from "@/api/user";
const Cookie = process.client ? require("js-cookie") : undefined;

export default {
  name: "LoginOrRegister",
  data() {
    return {
      username: "",
      email: "",
      password: "",
    };
  },
  computed: {
    isLogin() {
      return this.$route.name == "Login" ? true : false;
    },
  },
  methods: {
    /**
     * 登录
     */
    async submitHandle() {
      let params = {
        user: {
          username: this.username,
          email: this.email,
          password: this.password,
        }
      };

      const { status, data } = this.isLogin ? await user.login(params) : await user.register(params)

      // 登录或注册成功 跳转首页
      if (status === 200 && data) {
        // 将用户信息存入vuex
        this.$store.commit("SET_USER", data.user);
        // 将用户信息持久化
        Cookie.set("user", data.user);
        // 进入首页
        this.$router.push({
          name: "Home",
        });
      }
    },
  },
  components: {},
};
</script>

<style>
</style>
