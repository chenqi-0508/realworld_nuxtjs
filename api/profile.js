import { request } from '@/plugins/request'

export default {
    getProfile: ({ username }) => {
        return request({
            method: 'GET',
            url: `/api/profiles/${username}`
        })
    },
}