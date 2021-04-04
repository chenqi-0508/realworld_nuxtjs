import { request } from '@/plugins/request'

export default {
    updateUser: ({ user }) => {
        return request({
            method: 'PUT',
            url: `/api/user`,
            data: { user }
        })
    },
}