export const state = () => {
    return {
      // 当前登录用户的登录状态
      user: null
    }
  }

export const mutations = {
    SET_USER(state, payload) {
        state.user = payload
    }
}

export const actions = {

}