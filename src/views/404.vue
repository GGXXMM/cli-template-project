<template>
    <div class="not-found">
      <Image :imgSrc="Icon_404" :width="500" :alt="alt" />
    </div>
</template>
  
<script setup lang="ts">
  import Icon_404 from '/@/assets/img/404.png'
  import Image from '/@/components/common/image.vue'
  import { ref } from 'vue'

  const alt = ref('Not Found')
</script>
  
<style lang="scss" scoped>
  .not-found {
    text-align: center;
    height: 100%;
  }
</style>