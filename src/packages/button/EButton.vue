<template>
  <button
    @click.stop="handleTap"
    :open-type="openType"
    :loading="loading && !disabled"
    :style="[buttonStyle]"
    :class="[{ 'e-disabled': disabled }, plain ? `e-${type}-button-plain` : '', `e-${type}-button`, `e-${size}-button`]"
    :hover-class="hoverClass"
    class="e-button"
  >
    <text v-if="loading && !disabled" class="e-button_loading-text">{{ loadingText }}</text>
    <slot v-else></slot>
  </button>
</template>

<script>
import mixin from '../_mixins'
import { addUnit } from '../_utils'

export default {
  name: 'EButton',
  mixins: [mixin],
  props: {
    type: {
      type: String,
      default: 'primary'
    }, // 按钮类型
    size: {
      type: String,
      default: 'default'
    }, // 按钮大小
    width: [String, Number], // 按钮宽度
    height: [String, Number], // 按钮高度
    fontSize: [String, Number], // 字体大小
    borderRadius: [String, Number], // 按钮圆角
    openType: String, // 开放能力 与uniapp官方相同
    color: String, // 字体颜色
    loadingText: String, // 加载文字
    plain: Boolean, // 镂空按钮
    disabled: Boolean, // 按钮失效
    loading: Boolean, // 按钮加载
    square: Boolean, // 方形按钮
    round: Boolean // 圆形按钮
  },
  data() {
    return {
      buttonHeight: 0
    }
  },
  computed: {
    // 按钮样式
    buttonStyle(vm) {
      const { borderRadius, color, customStyle, fontSize, height, round, square, width } = vm
      const buttonStyle = {
        color,
        fontSize: addUnit(fontSize)
      }
      if (width) buttonStyle.width = addUnit(width)
      if (height) {
        buttonStyle.height = addUnit(height)
        buttonStyle.lineHeight = addUnit(height)
      }
      if (square) buttonStyle.borderRadius = 0
      if (round) buttonStyle.borderRadius = this.buttonHeight + 'px'
      if (borderRadius) buttonStyle.borderRadius = addUnit(borderRadius)
      return { buttonStyle, ...customStyle }
    },
    // 按钮hover效果
    hoverClass(vm) {
      const { disabled, loading } = vm
      if (disabled || loading) return ''
      return 'e-hover'
    }
  },
  mounted() {
    this.getRect('.e-button').then((rect = {}) => {
      this.buttonHeight = rect.height
    })
  },
  methods: {
    handleTap(e) {
      const { disabled, loading } = this
      if (disabled || loading) return
      this.$emit('click', e)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../_styles/color.scss';
.e-button {
  box-sizing: border-box;
  font-weight: 500;
  font-size: 14px;
  &::after {
    width: 0;
    height: 0;
    border: none;
  }
  &_loading-text {
    margin-left: 8rpx;
  }
}

// 按钮类型
.e-primary-button {
  background: $e-primary-color;
  color: #fff;
}
.e-primary-button-plain {
  background: transparent;
  border: solid 1px $e-primary-color;
  color: $e-primary-color;
}
.e-success-button {
  background: $e-success-color;
  color: #fff;
}
.e-success-button-plain {
  background: transparent;
  border: solid 1px $e-success-color;
  color: $e-success-color;
}
.e-warning-button {
  background: $e-warning-color;
  color: #fff;
}
.e-warning-button-plain {
  background: transparent;
  border: solid 1px $e-warning-color;
  color: $e-warning-color;
}
.e-error-button {
  background: $e-error-color;
  color: #fff;
}
.e-error-button-plain {
  background: transparent;
  border: solid 1px $e-error-color;
  color: $e-error-color;
}

.e-disabled {
  background: $e-disabled-color;
  color: #fff;
}

// 按钮大小样式
.e-mini-button {
  @include e-mini-button;
}
.e-middle-button {
  @include e-middle-button;
}
.e-default-button {
  @include e-default-button;
}
</style>
