import Vue from 'vue'
import user from './user'

Vue.prototype.$request = (name, data) => {
    const apiArray = {
        ...user
    }
    return apiArray[name](data)
}