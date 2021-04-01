<template>
  <div class="home-page">
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">conduit</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>

    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item" v-if="user">
                <nuxt-link
                  class="nav-link"
                  :class="{ active: tab == 'Your_Feed' }"
                  :to="{
                    name: 'Home',
                    query: {
                      tab: 'Your_Feed',
                    },
                  }"
                >
                  Your Feed
                </nuxt-link>
              </li>
              <li class="nav-item">
                <nuxt-link
                  class="nav-link"
                  :class="{ active: tab == 'Global_Feed' }"
                  :to="{
                    name: 'Home',
                    query: {
                      tab: 'Global_Feed',
                    },
                  }"
                >
                  Global Feed
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
              <a href="profile.html"><img :src="item.author.image" /></a>
              <div class="info">
                <a href="" class="author">{{ item.author.username }}</a>
                <span class="date">{{ item.createdAt }}</span>
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
                  slug: item.slug,
                },
              }"
            >
              <h1>{{ item.title }}</h1>
              <p>{{ item.body }}</p>
              <span>Read more...</span>
            </nuxt-link>
          </div>
        </div>

        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>
            <div class="tag-list">
              <nuxt-link
                :to="{
                  name: 'Home',
                  query: {
                    page: 1,
                    tag: item,
                  },
                }"
                v-for="(item, index) in tags"
                :key="index"
                class="tag-pill tag-default"
                >{{ item }}</nuxt-link
              >
            </div>
          </div>
        </div>

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
                  name: 'Home',
                  query: {
                    page: item,
                    tag: $route.query.tag,
                  },
                }"
                >{{ item }}</nuxt-link
              >
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
import article from "@/api/article.js";
import tag from "@/api/tag.js";
import { mapState } from "vuex";

export default {
  name: "Home",
  watchQuery: ["page", "tag", "tab"],
  async asyncData({ query }) {
    const limit = 10; // 每页条数
    const page = Number.parseInt(query.page || 1); // 页数
    const tab = query.tab || "Global_Feed";

    // 根据tab决定查询全部文章还是我喜欢的文章
    const loadArticle =
      tab == "Global_Feed" ? article.articlesList : article.feedArticle;
    // 获取文章列表、标签列表
    const [{ data: articleData }, { data: tagsData }] = await Promise.all([
      loadArticle({
        limit,
        offset: (page - 1) * limit,
        tag: query.tag,
      }),
      tag.getTags(),
    ]);

    return {
      articles: articleData.articles,
      articlesCount: articleData.articlesCount,
      tags: tagsData.tags,
      limit,
      page,
      tab,
    };
  },
  data() {
    return {};
  },
  computed: {
    // 获取总页数
    totalPage() {
      return Math.ceil(this.articlesCount / this.limit);
    },
    ...mapState(["user"]),
  },
  methods: {},
  components: {},
};
</script>

<style>
</style>
