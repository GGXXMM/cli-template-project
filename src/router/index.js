import { createRouter, createWebHistory } from 'vue-router'
import { ERouterName } from '/@/constants/router'
import Layout from '/@/views/layout.vue'
import workbenchRoutes from './module/workbench'

// 子路由集合
const childrenRoutes = [
    ...workbenchRoutes
]

// 定义路由
const routes = [
    {
        path: '/',
        redirect: '/workbench',
        component: Layout,
        children: childrenRoutes
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('/@/views/login.vue'),
    },
    {
        path: '/500',
        name: '500',
        component: () => import('/@/views/500.vue'),
    },
    {
        path: '/:pathMatch(.*)*',
        name: '404',
        component: () => import('/@/views/404.vue'),
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

// 全局路由守卫
router.beforeEach((to, from, next) => {
    // 注册登录页、错误页 404 / 500 直接放行
    if (to.name === ERouterName.LOGIN ||
        to.name === ERouterName.REGISTER ||
        to.name === ERouterName.NOT_FOUND ||
        to.name === ERouterName.SERVER_ERROR
    ) {
        next()
    } else {
        // TODO：token校验
        // const token = localStorage.getItem(ELocalStorageKey.TOKEN)
        // if (!token) {
        //     next(ERouterName.LOGIN) // 未登录，跳转登录页
        // }
    }
    next()
})
export default router