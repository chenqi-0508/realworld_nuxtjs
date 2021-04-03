<template>
  <div class="article-page">
    <div class="banner">
      <div class="container">
        <h1>{{ articleDetail.title }}</h1>

        <article-meta :articleDetail="articleDetail"/>
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
        <article-meta :articleDetail="articleDetail"/>
      </div>

      <div class="row">
        <div class="col-xs-12 col-md-8 offset-md-2">
          <form class="card comment-form">
            <div class="card-block">
              <textarea
                class="form-control"
                placeholder="Write a comment..."
                rows="3"
              ></textarea>
            </div>
            <div class="card-footer">
              <img
                src="http://i.imgur.com/Qr71crq.jpg"
                class="comment-author-img"
              />
              <button class="btn btn-sm btn-primary">Post Comment</button>
            </div>
          </form>

          <div class="card">
            <div class="card-block">
              <p class="card-text">
                With supporting text below as a natural lead-in to additional
                content.
              </p>
            </div>
            <div class="card-footer">
              <a href="" class="comment-author">
                <img
                  src="http://i.imgur.com/Qr71crq.jpg"
                  class="comment-author-img"
                />
              </a>
              &nbsp;
              <a href="" class="comment-author">Jacob Schmidt</a>
              <span class="date-posted">Dec 29th</span>
            </div>
          </div>

          <div class="card">
            <div class="card-block">
              <p class="card-text">
                With supporting text below as a natural lead-in to additional
                content.
              </p>
            </div>
            <div class="card-footer">
              <a href="" class="comment-author">
                <img
                  src="http://i.imgur.com/Qr71crq.jpg"
                  class="comment-author-img"
                />
              </a>
              &nbsp;
              <a href="" class="comment-author">Jacob Schmidt</a>
              <span class="date-posted">Dec 29th</span>
              <span class="mod-options">
                <i class="ion-edit"></i>
                <i class="ion-trash-a"></i>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import articleApi from "@/api/article.js";
import articleMeta from './components/articleMeta'

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
    const { data } = await articleApi.getArticle({
      slug: query.slug,
    });
    return {
      articleDetail: data.article,
    };
  },
  data() {
    return {};
  },
  methods: {},
  components: {
    articleMeta
  },
};
</script>

<style>
</style>
