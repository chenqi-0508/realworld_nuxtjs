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
import request from '@/utils/request'
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
      let url = '/api/users/login'
      let params = {
        email: this.email,
        password: this.password,
      }
      // 注册页面
      if(!this.isLogin) {
        params.username = this.username
        url = '/api/users'
      }
      const { status, data } = await request({
        method: 'POST',
        url: url, 
        data: {
          user: params
        }
      })
      // 登录或注册成功 跳转首页
      if(status === 200 && data) {
        console.log('success')
        window.localStorage.setItem('userid', data.user.id)
        window.localStorage.setItem('username', data.user.username)
        window.localStorage.setItem('token', data.user.token)
        this.$router.push({
          name: 'Home'
        })
      }
    },
  },
  components: {},
};
</script>

<style>
</style>
