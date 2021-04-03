/**
 * Nuxt.js 路由配置文件
 */
module.exports = {
    router: {
        linkExactActiveClass: 'active',
        extendRoutes(routes, resolve) {
            routes.splice(0)
            routes.push({
                name: 'Layout',
                path: '/',
                component: resolve(__dirname, 'pages/Layout/index.vue'),
                children: [{
                        name: 'Home',
                        path: '',
                        component: resolve(__dirname, 'pages/Home')
                    },
                    {
                        name: 'Login',
                        path: '/login',
                        component: resolve(__dirname, 'pages/LoginOrRegister')
                    },
                    {
                        name: 'Register',
                        path: '/register',
                        component: resolve(__dirname, 'pages/LoginOrRegister')
                    },
                    {
                        name: 'Profile',
                        path: '/profile/:username',
                        component: resolve(__dirname, 'pages/Profile')
                    },
                    {
                        name: 'Settings',
                        path: '/settings',
                        component: resolve(__dirname, 'pages/Settings')
                    },
                    {
                        name: 'Article',
                        path: '/article',
                        component: resolve(__dirname, 'pages/Article')
                    },
                    {
                        name: 'CreateOrEditArticle',
                        path: '/createOrEditArticle',
                        component: resolve(__dirname, 'pages/CreateOrEditArticle')
                    },
                ]
            })
        }
    },
    // 注册插件
    plugins: [
        '~/plugins/request.js',
        '~/plugins/dayjs.js'
    ]
}