<template>
  <view class="e-image" @click="handleTap" :style="[wrapStyle]">
    <image v-if="!isError" :src="src" :mode="mode" @error="onErrorHandler" @load="onLoadHandler" :lazy-load="lazyLoad" class="e-image-image"></image>
    <view v-if="showLoading && loading" class="e-image-loading">
      <slot v-if="$slots.loading" name="loading" />
      <e-icon v-else :name="loadingIcon" :width="iconWidth" :height="iconHeight"></e-icon>
    </view>
    <view v-if="showError && isError && !loading" class="e-image-error">
      <slot v-if="$slots.error" name="error" />
      <e-icon v-else :name="errorIcon" :width="iconWidth" :height="iconHeight" color="#ccc"></e-icon>
    </view>
  </view>
</template>

<script>
import EIcon from '../icon/EIcon'
import { addUnit } from '../_utils'

export default {
  name: 'EImage',
  components: { EIcon },
  props: {
    src: String, // 图片地址
    mode: {
      type: String,
      default: 'aspectFill'
    }, // 裁剪模式
    loadingIcon: {
      type: String,
      default: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3597053314,364663418&fm=26&gp=0.jpg'
    }, // 加载中的图标/图片
    errorIcon: {
      type: String,
      default: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2478530818,3372969471&fm=26&gp=0.jpg'
    }, // 加载失败的图标/图片
    width: {
      type: [Number, String],
      default: 200
    }, // 图片宽度
    height: {
      type: [Number, String],
      default: 200
    }, // 图片高度
    borderRadius: [Number, String], // 图片圆角
    circle: Boolean, // 圆形图片
    lazyLoad: {
      type: Boolean,
      default: true
    }, // 图片懒加载
    showMenuByLongpress: {
      type: Boolean,
      default: false
    }, // 是否开启长按图片显示识别微信小程序码菜单
    showLoading: {
      type: Boolean,
      default: true
    }, // 是否显示加载中的图标或者自定义的slot
    showError: {
      type: Boolean,
      default: true
    }, // 是否显示加载错误的图标或者自定义的slot
    webp: {
      type: Boolean,
      default: false
    } // 只支持网络资源，只对微信小程序有效
  },
  data() {
    return {
      isError: false, // 图片错误状态
      loading: true // 图片加载状态
    }
  },
  computed: {
    wrapStyle(vm) {
      const { borderRadius, circle, width, height } = vm
      const wrapStyle = {
        width: addUnit(width),
        height: addUnit(height),
        borderRadius: circle ? '50%' : addUnit(borderRadius || 0),
        overflow: borderRadius || circle ? 'hidden' : 'visible',
        zIndex: borderRadius || circle ? 1 : 0 // 解决Ios端borderRadius闪动问题
      }
      return wrapStyle
    },
    iconWidth(vm) {
      const { addScaleUnit, width } = vm
      return addScaleUnit(width, 0.6)
    },
    iconHeight(vm) {
      const { addScaleUnit, height } = vm
      return addScaleUnit(height, 0.6)
    }
  },
  watch: {
    src(n) {
      if (!n) this.isError = true
      else this.isError = false
    }
  },
  methods: {
    //  添加百分比单位
    addScaleUnit(value, scale = 1) {
      if (typeof value === 'number') return addUnit(+value * scale)
      const num = value.replace(/(\d+)\w+/, '$1')
      const unit = value.replace(/\d+(\w+)/, '$1')
      return addUnit(+num * scale + unit)
    },
    // 图片加载完成，标记loading结束
    onLoadHandler() {
      this.loading = false
      this.isError = false
      this.$emit('load')
    },

    // 图片加载失败
    onErrorHandler() {
      this.loading = false
      this.isError = true
      this.$emit('error')
    },
    // 事件
    handleTap(e) {
      this.$emit('click', e)
    }
  }
}
</script>

<style scoped lang="scss">
@import '../_styles/color.scss';
.e-image {
  position: relative;
  &-image {
    width: 100%;
    height: 100%;
  }

  &-loading,
  &-error {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: $e-module-bg-color;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 46rpx;
  }
}
</style>
