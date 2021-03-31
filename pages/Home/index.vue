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
              <li class="nav-item">
                <a class="nav-link disabled" href="">Your Feed</a>
              </li>
              <li class="nav-item">
                <a class="nav-link active" href="">Global Feed</a>
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
            <a href="" class="preview-link">
              <h1>{{ item.title }}</h1>
              <p>{{ item.body }}</p>
              <span>Read more...</span>
            </a>
          </div>
        </div>

        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>
            <div class="tag-list">
              <a
                href=""
                v-for="(item, index) in tags"
                :key="index"
                class="tag-pill tag-default"
                >{{ item }}</a
              >
            </div>
          </div>
        </div>

        <nav>
          <ul class="pagination">
            <li
              class="page-item"
              v-for="item in totalPage"
              :key="item"
            >
              <nuxt-link
                class="page-link"
                :class="{active: item == page}"
                :to="{
                name: 'Home',
                query: {
                  page: item
                }
              }">{{ item }}</nuxt-link>
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

export default {
  name: "Home",
  async asyncData({ query }) {
    const limit = 10; // 每页条数
    const page = Number.parseInt(query.page || 1) // 页数
    // 获取文章列表、标签列表
    const [{ data: articleData }, { data: tagsData }] = await Promise.all([
      article.articlesList({
        limit,
        offset: (page - 1) * limit,
      }),
      tag.getTags(),
    ]);

    return {
      articles: articleData.articles,
      articlesCount: articleData.articlesCount,
      tags: tagsData.tags,
      limit,
      page
    };
  },
  data() {
    return {};
  },
  computed: {
    // 获取总页数
    totalPage() {
      return Math.ceil(this.articlesCount / this.limit)
    }
  },
  methods: {},
  components: {
  },
};
</script>

<style>
</style>
