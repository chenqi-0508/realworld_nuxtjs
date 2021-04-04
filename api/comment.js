import {
    request
} from '@/plugins/request'

export default {
    // 获取文章评论
    getComments: ({
        slug
    }) => {
        return request({
            method: 'GET',
            url: `/api/articles/${slug}/comments`
        })
    },
    // 删除文章评论
    delComment: ({
        slug,
        id
    }) => {
        return request({
            method: 'DELETE',
            url: `/api/articles/${slug}/comments/${id}`
        })
    },
    // 添加文章评论
    addComment: ({
        slug,
        body
    }) => {
        return request({
            method: 'POST',
            url: `/api/articles/${slug}/comments`,
            data: {
                "comment": {
                    "body": body
                }
            }
        })
    },
}