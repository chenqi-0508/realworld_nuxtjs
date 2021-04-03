import { request } from '@/plugins/request'

export default {
    // 文章列表接口
    articlesList: params => {
        return request({
            method: 'GET',
            url: '/api/articles',
            params
        })
    },
    // 关注用户的文章列表接口
    feedArticle: params => {
        return request({
            method: 'GET',
            url: '/api/articles/feed',
            params
        })
    },
    // 获取文章详情
    getArticle: ({ slug }) => {
        return request({
            method: 'GET',
            url: `/api/articles/${slug}`
        })
    },
    // 点赞文章
    favoriteArticle: ({ slug }) => {
        return request({
            method: 'POST',
            url: `/api/articles/${slug}/favorite`
        })
    },
    // 删除点赞文章
    delFavoriteArticle: ({ slug }) => {
        return request({
            method: 'DELETE',
            url: `/api/articles/${slug}/favorite`
        })
    },
}