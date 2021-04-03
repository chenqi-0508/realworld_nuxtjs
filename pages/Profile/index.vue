<template>
  <div class="profile-page">
    <div class="user-info">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <img :src="profile.image" class="user-img" />
            <h4>{{ profile.username }}</h4>
            <p>
              {{ profile.bio }}
            </p>
            <button
              class="btn btn-sm btn-outline-secondary action-btn"
              :class="{ active: profile.following }"
            >
              <i class="ion-plus-round"></i>
              &nbsp; Follow {{ profile.username }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="articles-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <nuxt-link
                  class="nav-link"
                  :class="{ active: tab == 'My_Articles' }"
                  :to="{
                    name: 'Profile',
                    params: {
                      username: $route.params.username,
                    },
                    query: {
                      username: $route.params.username,
                      tab: 'My_Articles',
                    },
                  }"
                >
                  My Articles
                </nuxt-link>
              </li>
              <li class="nav-item">
                <nuxt-link
                  class="nav-link"
                  :class="{ active: tab == 'Favorited_Articles' }"
                  :to="{
                    name: 'Profile',
                    params: {
                      username: $route.params.username,
                    },
                    query: {
                      username: $route.params.username,
                      tab: 'Favorited_Articles',
                    },
                  }"
                >
                  Favorited Articles
                </nuxt-link>
              </li>
            </ul>
          </div>

          <div
            class="article-preview"
            v-for="item in articles"
            :key="item.slug"
          >
            <div class="article-meta">
              <a href=""><img :src="item.author.image" /></a>
              <div class="info">
                <a href="" class="author">{{ item.author.username }}</a>
                <span class="date">{{
                  item.createdAt | date("MMM DD, YYYY")
                }}</span>
              </div>
              <button class="btn btn-outline-primary btn-sm pull-xs-right">
                <i class="ion-heart"></i> {{ item.favoritesCount }}
              </button>
            </div>
            <nuxt-link
              class="preview-link"
              :to="{
                name: 'Article',
                query: {
                  slug: item.slug
                }
              }"
            >
              <h1>{{ item.title }}</h1>
              <p>{{ item.body }}</p>
              <span>Read more...</span>
            </nuxt-link>
          </div>
        </div>
        <!-- 分页 -->
        <nav>
          <ul class="pagination">
            <li
              class="page-item"
              :class="{
                active: item === page,
              }"
              v-for="item in totalPage"
              :key="item"
            >
              <nuxt-link
                class="page-link"
                :to="{
                  name: 'Profile',
                  params: {
                    username: $route.params.username,
                  },
                  query: {
                    page: item,
                    username: $route.params.username,
                  },
                }"
                >{{ item }}</nuxt-link
              >
            </li>
          </ul>
        </nav>
        <!-- /分页 -->
      </div>
    </div>
  </div>
</template>

<script>
import profileApi from "@/api/profile.js";
import articleApi from "@/api/article.js";

export default {
  name: "Profile",
  middleware: ["auth"],
  async asyncData({ query }) {
    const limit = 10; // 每页条数
    const page = Number.parseInt(query.page || 1); // 页数
    const tab = query.tab || "My_Articles";

    // 获取作者个人信息
    const { data: profileData } = await profileApi.getProfile({
      username: query.username,
    });

    // 获取作者的或作者喜爱的文章列表
    const qryParam =
      tab == "My_Articles"
        ? { author: query.username }
        : { favorited: query.username };
    const { data: articleData } = await articleApi.articlesList({
      limit,
      offset: (page - 1) * limit,
      ...qryParam,
    });
    console.log(qryParam);
    const profile = profileData.profile;
    const articles = articleData.articles;
    const articlesCount = articleData.articlesCount;

    return {
      profile,
      articles,
      articlesCount,
      limit,
      page,
      tab,
    };
  },
  watchQuery: ["page", "tab"],
  data() {
    return {};
  },
  computed: {
    // 获取总页数
    totalPage() {
      return Math.ceil(this.articlesCount / this.limit);
    },
  },
  // watch: {
  //   async page(val) {
  //     // 获取作者的文章列表
  //     const { data: articleData } = await articleApi.articlesList({
  //       limit: this.limit,
  //       offset: (val - 1) * this.limit,
  //       author: this.profile.username
  //     })
  //     this.articles = articleData.articles
  //   }
  // },
  methods: {},
  components: {},
};
</script>

<style>
</style>
