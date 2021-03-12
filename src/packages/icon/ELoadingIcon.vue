<template>
  <view v-show="show" :style="[iconStyle]" class="e-loading-icon">
    <view v-if="type === 'spinner'" class="e-loading-icon_spinner">
      <view v-for="(item, index) in 12" :key="index" class="e-loading-icon_spinner-dot" />
    </view>

    <view v-else class="e-loading-icon_circular">
      <text class="e-loading-icon_circular-dot"></text>
    </view>
  </view>
</template>

<script>
import { addUnit } from '../_utils'

export default {
  name: 'ELoadingIcon',
  props: {
    type: {
      type: String,
      default: 'circular' // spinner
    },
    size: {
      type: [String, Number],
      default: '24px'
    },
    color: {
      type: String,
      default: '#1890ff'
    },
    show: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    iconStyle({ size, color }) {
      return {
        width: addUnit(size),
        height: addUnit(size),
        color
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../_styles/var.scss';

.e-loading-icon {
  position: relative;
  box-sizing: border-box;
  animation: e-loading-rotate 0.8s linear infinite;
  &_spinner {
    animation-timing-function: steps(12);
    &-dot {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      &::before {
        content: ' ';
        margin: 0 auto;
        display: block;
        width: 8%;
        max-width: 2px;
        height: 25%;
        border-radius: 2px;
        background-color: currentColor;
      }
      &:first-of-type {
        transform: rotate(30deg);
        opacity: 1;
      }
      &:nth-of-type(2) {
        transform: rotate(60deg);
        opacity: 0.9375;
      }
      &:nth-of-type(3) {
        transform: rotate(90deg);
        opacity: 0.875;
      }
      &:nth-of-type(4) {
        transform: rotate(120deg);
        opacity: 0.8125;
      }
      &:nth-of-type(5) {
        transform: rotate(150deg);
        opacity: 0.75;
      }
      &:nth-of-type(6) {
        transform: rotate(180deg);
        opacity: 0.6875;
      }
      &:nth-of-type(7) {
        transform: rotate(210deg);
        opacity: 0.625;
      }
      &:nth-of-type(8) {
        transform: rotate(240deg);
        opacity: 0.5625;
      }
      &:nth-of-type(9) {
        transform: rotate(270deg);
        opacity: 0.5;
      }
      &:nth-of-type(10) {
        transform: rotate(300deg);
        opacity: 0.4375;
      }
      &:nth-of-type(11) {
        transform: rotate(330deg);
        opacity: 0.375;
      }
      &:nth-of-type(12) {
        transform: rotate(1turn);
        opacity: 0.3125;
      }
    }
  }
  &_circular {
    position: relative;
    width: 100%;
    height: 100%;
    display: inline-flex;
    &::before {
      content: '';
      display: block;
      width: 50%;
      height: 100%;
      box-sizing: border-box;
      border: 2px solid;
      border-color: currentColor;
      border-right-width: 0;
      border-top-left-radius: 1em;
      border-bottom-left-radius: 1em;
      -webkit-mask-image: -webkit-linear-gradient(top, #000000 8%, rgba(0, 0, 0, 0.3) 95%);
    }
    &::after {
      content: '';
      display: block;
      width: 50%;
      height: 100%;
      box-sizing: border-box;
      border: 2px solid;
      border-color: currentColor;
      border-left-width: 0;
      border-top-right-radius: 1em;
      border-bottom-right-radius: 1em;
      -webkit-mask-image: -webkit-linear-gradient(top, rgba(0, 0, 0, 0) 8%, rgba(0, 0, 0, 0.3) 95%);
    }
    &-dot {
      position: absolute;
      top: 0;
      left: 50%;
      margin-left: -0.0625em;
      width: 0.125em;
      height: 0.125em;
      border-top-right-radius: 0.125em;
      border-bottom-right-radius: 0.125em;
      background: currentColor;
    }
  }
}
@keyframes e-loading-rotate {
  0% {
    // transform: rotate3d(0, 0, 1, 0deg);
    transform: rotate(0deg);
  }
  to {
    // transform: rotate3d(0, 0, 1, 360deg);
    transform: rotate(1turn);
  }
}
</style>
