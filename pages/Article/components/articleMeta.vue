<template>
  <div class="article-meta">
    <nuxt-link
      class="author"
      :to="{
        name: 'Profile',
        params: {
          username: articleDetail.author.username,
        },
        query: {
          username: articleDetail.author.username,
        },
      }"
    >
      <img :src="articleDetail.author.image" />
    </nuxt-link>
    <div class="info">
      <nuxt-link
        class="author"
        :to="{
          name: 'Profile',
          params: {
            username: articleDetail.author.username,
          },
          query: {
            username: articleDetail.author.username,
          },
        }"
        >{{ articleDetail.author.username }}
      </nuxt-link>
      <span class="date">{{
        articleDetail.createdAt | date("MMM DD, YYYY")
      }}</span>
    </div>
    <button class="btn btn-sm btn-outline-secondary">
      <i class="ion-plus-round"></i>
      &nbsp; Follow {{ articleDetail.author.username }}
      <span class="counter">(10)</span>
    </button>
    &nbsp;&nbsp;
    <button class="btn btn-sm btn-outline-primary">
      <i class="ion-heart"></i>
      &nbsp; Favorite Post
      <span class="counter">({{ articleDetail.favoritesCount }})</span>
    </button>
  </div>
</template>

<script>
export default {
  name: "ArticleMeta",
  props: {
    articleDetail: {
      type: Object,
      default: null
    }
  },
  data() {
    return {};
  },
  methods: {},
  components: {},
};
</script>

<style>
</style>
