<template>
    <div class="layout-wrapper">
        <Topbar />
        <div class="layout-content">
            <Sidebar />
            <div class="container">
                <router-view />
            </div>
        </div>
    </div>
</template>

<script setup>
import Topbar from '/@/components/common/topbar.vue'
import Sidebar from '/@/components/common/sidebar.vue'


</script>

<style lang="scss" scoped>
.layout-wrapper {
    height: 100vh;
    .layout-content {
        height: calc(100% - 64px);
        display: flex;
        .container {
            flex: 1;
            padding: 16px;
            height: 1500px;
            overflow: auto;
        }
    }
}
</style>