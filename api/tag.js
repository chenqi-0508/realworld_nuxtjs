import { request } from '@/plugins/request'

export default {
    getTags: () => {
        return request({
            method: 'GET',
            url: '/api/tags'
        })
    },
}