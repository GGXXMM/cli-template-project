<template>
    <div class="sidebar-wrapper">
        <!-- 导航菜单 -->
        <el-menu
            :default-active="currentRoute"
            :collapse="isCollapse"
            class="el-menu-vertical"
            router
            @open="handleOpen"
            @close="handleClose"
            >
            <!-- 递归菜单项 -->
            <template v-for="(item, index) in menuItems" :key="item.key">
                <!-- 有子菜单的项 -->
                <el-sub-menu 
                    v-if="item.children && item.children.length" 
                    :index="item.path" 
                    :default-opened="isMenuOpened(item.path)"
                    >
                    <template #title>
                        <el-icon :size="18"><component :is="item.icon" /></el-icon>
                        <span>{{ item.label }}</span>
                    </template>
                    <!-- 渲染子菜单 -->
                    <el-menu-item 
                        v-for="(child, childIndex) in item.children" 
                        :key="child.key"
                        :index="child.path"
                        >
                        <template #title>{{ child.label }}</template>
                    </el-menu-item>
                </el-sub-menu>
                <!-- 无子菜单的项 -->
                <el-menu-item v-else :index="item.index">
                    <el-icon :size="18"><component :is="item.icon" /></el-icon>
                    <span>{{ item.label }}</span>
                </el-menu-item>
            </template>
            <!-- 折叠按钮 -->
            <div class="sidebar-footer">
                <div class="toggle-btn" @click="toggleCollapse">
                    <el-icon :size="18" color="#666">
                    <Expand v-if="isCollapse" />
                    <Fold v-else />
                    </el-icon>
                </div>
            </div>
        </el-menu>
    </div>
</template>

<script setup>
import { ref, shallowRef, watch, computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { 
  Menu,
  Ticket, 
  Expand, 
  Fold 
} from '@element-plus/icons-vue'
import { pa } from 'element-plus/es/locales.mjs'

// 路由相关
const route = useRoute()
const currentRoute = computed(() => route.path)

const isCollapse = ref(false) // 是否折叠
// 记录展开的菜单
const openMenus = ref([])
// 导航菜单数据（shallowRef 避免深层递归响应式）
const menuItems = shallowRef([
    {
        key: 'workbench',
        path: '/workbench',
        label: '工作台',
        icon: Menu,
        children: null
    },
    {
        key: 'goods',
        path: '/goods',
        label: '商品',
        icon: Expand,
        children: [
            { key: 'goods-list', path: '/goods/list', label: '商品列表' },
            { key: 'goods-detail', path: '/goods/detail', label: '商品详情' }
        ]
    },
    {
        key: 'order',
        path: '/order',
        label: '订单',
        icon: Ticket,
        children: [
            { key: 'order-list', path: '/order/list', label: '订单列表' },
            { key: 'order-detail', path: '/order/detail', label: '订单详情' }
        ]
    }
])
// 整个侧边栏菜单，切换收缩/展开状态
const toggleCollapse = ()=> {
    isCollapse.value = !isCollapse.value
}
// 判断菜单是否需要展开
const isMenuOpened = (path) => {
    // 检查当前路由是否是子路由
    const isChildRoute = route.path.startsWith(path) && route.path !== path
    // 检查是否在已展开列表中
    const isOpened = openMenus.value.includes(path)
    
    return isChildRoute || isOpened
}
// 处理菜单展开
const handleOpen = (key) => {
    if (!openMenus.value.includes(key)) {
        openMenus.value = [...openMenus.value, key]
    }
}
// 处理菜单关闭
const handleClose = (key) => {
    openMenus.value = openMenus.value.filter(item => item !== key)
}
// 窗口缩小，自动收缩
const handleResize = () => {
    if (window.innerWidth < 768 && !isCollapse.value) {
        isCollapse.value = true
    }
}

// 监听路由变化，保持菜单状态
watch(
    () => route.path,
    (newPath) => {
        // 自动展开当前路由对应的父菜单
        const parentMenu = menuItems.value.find(item => 
            item.children && item.children.some(child => child.path === newPath)
        )
        if (parentMenu && !openMenus.value.includes(parentMenu.path)) {
            handleOpen(parentMenu.path)
        }
    }
)

onMounted(() => {
    window.addEventListener('resize', handleResize)
    handleResize() // 初始化时检查窗口大小
})

onUnmounted(() => {
    // 组件卸载前，清除事件监听
    window.removeEventListener('resize', handleResize)
})
</script>

<style lang="scss" scoped>
.sidebar-wrapper {
    position: relative;
    width: 200px;
    height: 100vh;
}
.el-menu-vertical {
  height: calc(100% - 60px);
  padding-top: 16px;
}
:deep(.el-menu) {
    border-right: none;
    box-shadow: 5px 0px 5px -2px rgba(0, 0, 0, 0.08);
    transition: width 0.3s ease-in-out;
}
.el-menu-item svg,.el-sub-menu__title svg {
    margin-right: 12px;
    width: 18px;
    height: 18px;
    color: #666;
}
.sidebar-footer {
    position: absolute;
    bottom: 0;
    height: 50px;
    .toggle-btn {
        padding-left: 16px;
        cursor: pointer;
    }
}
/* 响应式调整 */
@media (max-width: 768px) {
  .sidebar:not(.sidebar-collapsed) {
    width: 100% !important;
    z-index: 1000;
  }
}
</style>