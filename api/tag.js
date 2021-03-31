import request from '@/utils/request'

export default {
    getTags: () => {
        return request({
            method: 'GET',
            url: '/api/tags'
        })
    },
}