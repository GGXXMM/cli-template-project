// 工作台相关路由
export default [
    {
        path: '/workbench',
        name: 'workbench',
        component: () => import('/@/views/workbench/index.vue'),
        meta: {
            title: '工作台'
        }
    }
]