import { request } from '@/plugins/request'

export default {
    login: data => {
        return request({
            method: 'POST',
            url: '/api/users/login',
            data
        })
    },
    register: data => {
        return request({
            method: 'POST',
            url: '/api/users',
            data
        })
    },
}