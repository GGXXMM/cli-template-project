<template>
  <img :src="imgSrc" :width="width" alt="{{ alt }}" />
</template>

<script setup>
const props = defineProps({
  imgSrc: {
    type: String,
    required: true
  },
  width: {
    type: String,
    required: true
  },
  alt: {
    type: String,
    default: ''
  }
})
</script>