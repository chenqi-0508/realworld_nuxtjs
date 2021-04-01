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
    // 我喜欢的文章列表接口
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
    }
}