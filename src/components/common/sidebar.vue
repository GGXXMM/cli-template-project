<template>
  <!-- 侧边栏导航 -->
  <div class="sidebar-wrapper">
    <a-menu
      v-model:openKeys="state.openKeys"
      v-model:selectedKeys="state.selectedKeys"
      mode="inline"
      :inline-collapsed="state.collapsed"
      :items="items"
      @click="handleClick"
    >
    </a-menu>
    <div class="ant-menu-collapse-wrapper">
      <div @click="toggleCollapsed">
        <MenuUnfoldOutlined v-if="state.collapsed"/>
        <MenuFoldOutlined v-else/>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, watch, h } from 'vue'
import {
  AppstoreOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  // CalendarOutlined,
  // SettingOutlined
} from '@ant-design/icons-vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const state = reactive({
  collapsed: false,
  selectedKeys: [route.path], // 当前选中的菜单项 key 数组
  openKeys: [], // 默认展开的 SubMenu
  preOpenKeys: [],
})
// 菜单内容
const items = reactive([
  {
    key: '/workbench',
    icon: () => h(AppstoreOutlined),
    label: '工作台'
  },
  // {
  //   key: 'system',
  //   icon: () => h(AppstoreOutlined),
  //   label: '系统管理',
  //   children: [
  //     {
  //       key: '/user',
  //       label: '用户管理',
  //     }
  //   ]
  // }
])
// 监听菜单展开状态变化，记录展开前的状态
watch(
  () => state.openKeys, 
  (_val, oldVal) => {
    state.preOpenKeys = oldVal
  }
)
// 监听路由变化，更新选中菜单导航
watch(
  () => route.path,
  (val) => {
    if(val) {
      state.selectedKeys = [val]
      updateMenuDisabled(val)
    }
  },
  { deep: true }
)
// 导航菜单折叠展开
const toggleCollapsed = () => {
  state.collapsed = !state.collapsed;
  state.openKeys = state.collapsed ? [] : state.preOpenKeys;
}

const handleClick = (item) => {
  if (item.key) {
    router.push(item.key)
  }
}

// 更新菜单是否禁用状态
const updateMenuDisabled = (key) => {
  if (key === '/media') {
    items[1].disabled = true
  } else if (key === '/layer') {
    items[1].disabled = false
  }
}
</script>

<style lang="scss" scoped>
.sidebar-wrapper {
  position: relative;
  max-width: 150px;
  height: 100%;
  &:deep(.ant-menu) {
    height: 100%;
  }
  &:deep(.ant-menu-inline-collapsed) {
    width: 50px;
  }
}
.ant-menu-collapse-wrapper {
  position: absolute;
  bottom: 0;
  div {
    padding: 10px 16px;
  }
}
</style>
