export default function({ redirect, store }) {
    const isAuthenticated = store.state.user ? true : false
    // 未授权 跳转登录页
    if (!isAuthenticated) {
        redirect('/login')
    }
}