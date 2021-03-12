<template>
  <view class="e-popup-wrapper" @touchmove.stop.prevent>
    <e-mask @click="maskTap" :show="overlay && value" :custom-style="maskStyle" :z-index="zIndex - 1" />

    <template v-if="display">
      <template v-if="position === 'center'">
        <view @click="maskTap" :style="[mergeStyle]" :class="[customClass, `e-popup-${position}`, classes]" class="e-popup">
          <view @click.stop class="e-popup_content" :style="[customStyle, { marginTop: addUnit(marginTop) }]">
            <slot />
          </view>
        </view>
      </template>
      <template v-else>
        <view :style="[mergeStyle]" :class="[customClass, `e-popup-${position}`, classes]" class="e-popup">
          <slot />
        </view>
      </template>
    </template>
  </view>
</template>

<script>
import { addUnit } from '../_utils'
import EMask from '../mask/EMask.vue'

export default {
  name: 'EPopup',
  components: { EMask },
  props: {
    value: {
      type: Boolean,
      default: false
    }, // 推荐使用v-model 控制显隐
    overlay: {
      type: Boolean,
      default: true
    }, // 是否展示蒙层
    closeOnTapOverlay: {
      type: Boolean,
      default: true
    }, // 是否触发蒙层事件
    position: {
      type: String,
      default: 'bottom' // top right bottom left center
    }, // 弹出位置
    zIndex: {
      type: [Number, String],
      default: 98
    }, // 样式层级
    maskStyle: {
      type: Object,
      default: () => ({})
    }, // 蒙层样式
    customStyle: {
      type: Object,
      default: () => ({})
    }, // 自定义样式
    customClass: {
      type: String,
      default: ''
    }, // 自定义类
    duration: {
      type: [Number, String],
      default: 300
    }, // 动画时长
    marginTop: {
      type: [Number, String],
      default: 0
    } // postion="center"时，调整垂直位置
  },
  data() {
    return {
      systemInfo: uni.getSystemInfoSync(),
      overlayShow: false, // 是否显示蒙层
      status: '', // 动画状态
      display: false, // 组件是否渲染
      classes: '',
      transitionEnded: false
    }
  },
  computed: {
    mergeStyle(vm) {
      const { duration, zIndex, customStyle } = vm
      return {
        zIndex: zIndex,
        transitionDuration: `${duration}ms`,
        ...customStyle // 避免自定义样式影响到动画属性
      }
    }
  },
  watch: {
    showChange(n, o) {
      if (n === o) return
      n ? this.enter() : this.leave()
    }
  },

  mounted() {
    this.value && this.enter()
  },
  methods: {
    addUnit,
    maskTap() {
      this.$emit('click-overlay')
      if (this.closeOnTapOverlay) {
        this.$emit('close', false)
        this.$emit('input', false)
      }
    },
    enter() {
      const { position, getClassNames, requestAnimationFrame } = this
      const classNames = getClassNames(position)
      this.status = 'enter'
      this.$emit('before-enter')
      requestAnimationFrame(() => {
        this.$emit('enter')
        this.display = true
        this.classes = classNames.enter
        requestAnimationFrame(() => {
          this.$emit('after-enter')
          this.transitionEnded = false
          this.classes = classNames['enter-to']
        })
      })
    },
    leave() {
      if (!this.display) return
      const { duration, position, getClassNames, requestAnimationFrame } = this
      const classNames = getClassNames(position)
      this.status = 'leave'
      this.$emit('before-leave')
      requestAnimationFrame(() => {
        this.$emit('leave')
        this.classes = classNames.leave
        requestAnimationFrame(() => {
          this.transitionEnded = false
          setTimeout(() => this.onTransitionEnd(), +duration)
          this.classes = classNames['leave-to']
        })
      })
    },
    // 完成过渡后触发
    onTransitionEnd() {
      if (this.transitionEnded) return
      this.transitionEnded = true
      this.$emit(`after-${this.status}`)
      const { value, display } = this
      if (!value && display) this.display = false
    },
    getClassNames(name) {
      return {
        enter: `e-${name}-enter e-${name}-enter-active`,
        'enter-to': `e-${name}-enter-to e-${name}-enter-active`,
        leave: `e-${name}-leave e-${name}-leave-active`,
        'leave-to': `e-${name}-leave-to e-${name}-leave-active`
      }
    },

    requestAnimationFrame(cb) {
      if (this.systemInfo.platform === 'devtools') {
        return setTimeout(() => cb(), 1000 / 30)
      }
      // #ifdef H5
      setTimeout(() => cb(), 1000 / 30)
      // #endif
      // #ifdef APP-PLUS
      this.$nextTick(() => cb())
      // #endif
      // #ifdef MP-WEIXIN
      uni
        .createSelectorQuery()
        .selectViewport()
        .boundingClientRect(() => {})
        .exec(() => {
          cb()
        })
      // #endif
    }
  }
}
</script>

<style lang="scss" scoped>
.e-popup {
  position: fixed;
  transition-timing-function: ease;

  &-center {
    top: 0;
    left: 0;
    bottom: 0;
    width: 750rpx;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &-top {
    top: 0;
    left: 0;
    width: 750rpx;
  }

  &-bottom {
    bottom: 0;
    left: 0;
    width: 750rpx;
  }

  &-left {
    top: 0;
    left: 0;
    height: 100%;
  }

  &-right {
    top: 0;
    right: 0;
    height: 100%;
  }
}

.e-center-enter-active,
.e-center-leave-active {
  transition-property: all;
  transform: scale(1);
}

.e-center-enter,
.e-center-leave-to {
  opacity: 0;
  transform: scale(0.8);
}

.e-bottom-enter-active,
.e-bottom-leave-active,
.e-left-enter-active,
.e-left-leave-active,
.e-right-enter-active,
.e-right-leave-active,
.e-top-enter-active,
.e-top-leave-active {
  transition-property: transform;
}

.e-top-enter,
.e-top-leave-to {
  transform: translate3d(0, -100%, 0);
}

.e-bottom-enter,
.e-bottom-leave-to {
  transform: translate3d(0, 100%, 0);
}

.e-left-enter,
.e-left-leave-to {
  transform: translate3d(-100%, 0, 0);
}

.e-right-enter,
.e-right-leave-to {
  transform: translate3d(100%, 0, 0);
}
</style>
