<!-- @format -->

<template>
  <view @click="handleTap" @touchmove.stop.prevent hover-stop-propagation :style="[maskStyle]" class="e-mask">
    <slot />
  </view>
</template>

<script>
export default {
  name: 'EMask',
  props: {
    show: Boolean, // 控制显隐
    maskClickAble: {
      type: Boolean,
      default: true
    }, // 是否可以通过点击遮罩进行关闭
    zIndex: {
      type: [Number, String],
      default: 98
    }, // 样式层级
    duration: {
      type: [Number, String],
      default: 300
    }, // 动画的过渡时间（单位为ms）
    background: String, // 颜色
    customStyle: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    maskStyle(vm) {
      const { background, customStyle, duration, show, zIndex } = vm
      const maskStyle = {}
      if (show) {
        maskStyle.zIndex = zIndex
        maskStyle.opacity = 1
      } else {
        maskStyle.zIndex = -1
        maskStyle.opacity = 0
      }
      background && (maskStyle.background = background)
      maskStyle.transition = `all ${+duration / 1000}s ease-in-out`
      if (Object.keys(customStyle).length) return { ...maskStyle, customStyle }
      return maskStyle
    }
  },
  methods: {
    handleTap(e) {
      if (!this.maskClickAble) return
      this.$emit('click', e)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../_styles/var.scss';

.e-mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0;
  background: $e-mask-color;
}
</style>
