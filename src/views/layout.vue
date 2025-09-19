<template>
    <div class="layout-wrapper">
        <Topbar />
        <div class="layout-content">
            <router-view />
        </div>
    </div>
</template>

<script setup>
import Topbar from '/@/components/common/topbar.vue'
</script>

<style lang="scss" scoped>
.layout-wrapper {
    height: 100%;
    .layout-content {
        height: calc(100% - 60px);
    }
}
</style>