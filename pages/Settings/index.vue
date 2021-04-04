<template>
  <div class="settings-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Your Settings</h1>

          <form @submit.prevent="updateUserHandle">
            <fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control"
                  type="text"
                  placeholder="URL of profile picture"
                  v-model="userInfo.image"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Your Name"
                  v-model="userInfo.username"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  class="form-control form-control-lg"
                  rows="8"
                  placeholder="Short bio about you"
                  v-model="userInfo.bio"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Email"
                  v-model="userInfo.email"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="password"
                  placeholder="Password"
                  v-model="userInfo.password"
                />
              </fieldset>
              <button class="btn btn-lg btn-primary pull-xs-right">
                Update Settings
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import settings from "@/api/settings.js";
const Cookie = process.client ? require("js-cookie") : undefined;

export default {
  name: "Settings",
  middleware: ["auth"],
  data() {
    return {
      userInfo: {}
    };
  },
  mounted() {
    this.userInfo = Object.assign({}, this.user)
  },
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    // 获取用户信息
    async getUserInfo() {

    },
    // 更新用户信息
    async updateUserHandle() {
      console.log('updateUserHandle')
      const { data } = await settings.updateUser({
        user: this.userInfo
      })
      console.log(data)
      if(data && data.user) {
        this.userInfo = Object.assign({}, data.user)
        // 将用户信息存入vuex
        this.$store.commit("SET_USER", data.user);
        // 将用户信息持久化
        Cookie.set("user", data.user);
        alert("更新成功！")
      }
    },
  },
  components: {},
};
</script>

<style>
</style>
