<template>
    <div class="server-error">
      <Image :imgSrc="Icon_500" :width="500" :alt="alt" />
    </div>
</template>
  
<script setup lang="ts">
  import Icon_500 from '/@/assets/img/500.png'
  import Image from '/@/components/common/image.vue'
  import { ref } from 'vue'

  const alt = ref('Not Found')
</script>
  
<style lang="scss" scoped>
  .server-error {
    text-align: center;
    height: 100%;
  }
</style>