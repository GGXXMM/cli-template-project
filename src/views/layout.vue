<template>
    <div class="layout-wrapper">
        <Topbar />
        <Sidebar />
        <div class="layout-content">
            <router-view />
        </div>
    </div>
</template>

<script setup>
import Topbar from '/@/components/common/topbar.vue'
import Sidebar from '/@/components/common/sidebar.vue'
</script>

<style lang="scss" scoped>
.layout-wrapper {
    height: 100%;
    .layout-content {
        height: calc(100% - 60px);
    }
}
</style>