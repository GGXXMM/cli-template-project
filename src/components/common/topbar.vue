<template>
  <!-- 顶部 topBar -->
  <div class="top-wrapper">
    <div class="top-left">
      <div class="title flex items-center">
        <img src="//p3-armor.byteimg.com/tos-cn-i-49unhts6dw/dfdba5317c0c20ce20e64fac803d52bc.svg~tplv-49unhts6dw-image.image" alt="">
        <span>toB 管理后台</span>
      </div>
    </div>
    <ul class="top-right">
      <!-- <li> 
        <a-badge dot>
        <BellOutlined />
      </a-badge>
      </li> -->
      <li>
        <Avatar />
      </li>
    </ul>
  </div>
</template>

<script setup>
import { BellOutlined } from '@ant-design/icons-vue'
import Avatar from '/@/components/common/avator.vue'
</script>

<style lang="scss" scoped>
@import '/@/styles/flexbox.scss';

.top-wrapper {
  display: flex;
  justify-content: space-between;
  padding: 16px 20px;
  height: 64px;
  background-color: #fff;
  box-sizing: border-box;
  .top-left {
    .title {
      font-size: 18px;
    }
  }
  .top-right {
    display: flex;
    li {
      margin: 0 10px;
    }
    &:deep(.ant-badge) {
      width: 32px;
      height: 32px;
      line-height: 32px;
      border: 1px solid #f5f5f5;
      border-radius: 50%;
      .anticon {
        display: block;
        margin: 7px auto;
      }
    }
  }
}
</style>