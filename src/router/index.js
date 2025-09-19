import { createRouter, createWebHistory } from 'vue-router'
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
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

// TODO：全局路由守卫

export default router