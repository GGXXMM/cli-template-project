<template>
  <div>
    <a-avatar src="//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp" style="width: 32px;height: 32px;"/>
    <!-- 下拉菜单 -->
    <a-dropdown>
      <a class="ant-dropdown-link" @click.prevent>
        {{ userName }}
        <DownOutlined />
      </a>
      <template #overlay>
        <a-menu>
          <!-- <a-menu-item>
            <a href="javascript:;" @click="gotoUserCenter"><UserOutlined/>用户中心</a>
          </a-menu-item> -->
          <a-menu-item>
            <a href="javascript:;" @click="layout"><ExportOutlined/> 退出登录</a>
          </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { DownOutlined, UserOutlined, ExportOutlined } from '@ant-design/icons-vue'
import { useRouter } from 'vue-router'
import { ERouterName } from '/@/constants/router'
import { ELocalStorageKey } from '/@/constants/localStorage'

const router = useRouter()
const userName = ref(localStorage.getItem(ELocalStorageKey.USERNAME))

// 跳转用户中心
const gotoUserCenter = () => {
  router.push(ERouterName.USER)
}
// 退出：清除用户数据
const layout = () => {
  window.localStorage.clear()
  router.push(ERouterName.LOGIN)
}
</script>

<style lang="scss" scoped>
.ant-dropdown-link {
  margin-left: 8px;
  color: rgba(0, 0, 0, 0.85);
  cursor: pointer;
}
</style>