<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <form @submit.prevent="createArticleHandle">
            <fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control form-control-lg"
                  placeholder="Article Title"
                  v-model="myArticle.title"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="What's this article about?"
                  v-model="myArticle.description"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  class="form-control"
                  rows="8"
                  placeholder="Write your article (in markdown)"
                  v-model="myArticle.body"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter tags"
                  v-model="myArticle.tagList"
                />
                <div class="tag-list"></div>
              </fieldset>
              <button class="btn btn-lg pull-xs-right btn-primary">
                Publish Article
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import articleApi from "@/api/article.js";

export default {
  name: "CreateOrEditArticle",
  middleware: ["auth"],
  data() {
    return {
      myArticle: {
        title: "",
        description: "",
        body: "",
        tagList: "",
      },
    };
  },
  methods: {
    async createArticleHandle() {
      this.myArticle.tagList = this.myArticle.tagList.split(",");
      // 发布文章
      const { data } = await articleApi.createArticle(this.myArticle);
      this.$router.push({
        name: "Article",
        query: {
          slug: data.article.slug,
        },
      });
    },
  },
  components: {},
};
</script>

<style>
</style>
