import request from '@/utils/request'

export default {
    articlesList: data => {
        return request({
            method: 'GET',
            url: '/api/articles',
            data
        })
    },
}