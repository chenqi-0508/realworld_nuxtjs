<template>
  <div class="article-page">
    <div class="banner">
      <div class="container">
        <h1>{{ articleDetail.title }}</h1>

        <article-meta :articleDetail="articleDetail" />
      </div>
    </div>

    <div class="container page">
      <div class="row article-content">
        <div class="col-md-12">
          <p>
            {{ articleDetail.description }}
          </p>
          <h2 id="introducing-ionic">{{ articleDetail.title }}</h2>
          <p>{{ articleDetail.body }}</p>
        </div>
      </div>

      <hr />

      <div class="article-actions">
        <article-meta :articleDetail="articleDetail" />
      </div>

      <div class="row">
        <div class="col-xs-12 col-md-8 offset-md-2">
          <!-- 我的评论 -->
          <form class="card comment-form" @submit.prevent="postCommentHandle">
            <div class="card-block">
              <textarea
                class="form-control"
                placeholder="Write a comment..."
                rows="3"
                v-model="myComment"
              ></textarea>
            </div>
            <div class="card-footer">
              <img :src="user.image" class="comment-author-img" />
              <button class="btn btn-sm btn-primary">Post Comment</button>
            </div>
          </form>
          <!-- /我的评论 -->
          <!-- 所有评论 -->
          <div class="card" v-for="comment in comments" :key="comment.id">
            <div class="card-block">
              <p class="card-text">
                {{ comment.body }}
              </p>
            </div>
            <div class="card-footer">
              <nuxt-link
                class="comment-author"
                :to="{
                  name: 'Profile',
                  params: {
                    username: comment.author.username,
                  },
                  query: {
                    username: comment.author.username,
                  },
                }"
              >
                <img :src="comment.author.image" class="comment-author-img" />
              </nuxt-link>
              &nbsp;
              <nuxt-link
                class="comment-author"
                :to="{
                  name: 'Profile',
                  params: {
                    username: comment.author.username,
                  },
                  query: {
                    username: comment.author.username,
                  },
                }"
                >{{ comment.author.username }}</nuxt-link
              >
              <span class="date-posted">{{
                comment.createdAt | date("MMM DD, YYYY")
              }}</span>
            </div>
          </div>
          <!-- /所有评论 -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import articleApi from "@/api/article.js";
import commentApi from "@/api/comment.js";
import articleMeta from "./components/articleMeta";
import { mapState } from "vuex";

export default {
  name: "Article",
  middleware: ["auth"],
  async asyncData({
    isDev,
    route,
    store,
    env,
    params,
    query,
    req,
    res,
    redirect,
    error,
  }) {
    // 获取文章详情
    const { data } = await articleApi.getArticle({
      slug: query.slug,
    });
    // 获取评论信息
    const { data: commentsData } = await commentApi.getComments({
      slug: query.slug,
    });

    return {
      articleDetail: data.article,
      comments: commentsData.comments,
    };
  },
  data() {
    return {
      myComment: "",
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    // 提交评论
    async postCommentHandle() {
      if (!this.myComment) return;
      // 添加评论
      const { data } = await commentApi.addComment({
        slug: this.$route.query.slug,
        body: this.myComment,
      });
      // 获取评论信息
      const { data: commentsData } = await commentApi.getComments({
        slug: this.$route.query.slug,
      });
      this.comments = commentsData.comments;
      this.myComment = "";
    },
  },
  components: {
    articleMeta,
  },
};
</script>

<style>
</style>
