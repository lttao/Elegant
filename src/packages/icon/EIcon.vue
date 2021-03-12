<template>
  <view @click="handleTap" :style="[sizeStyle, wrapStyle]" class="e-icon">
    <image v-if="isImage" :src="name" :mode="mode" :style="[sizeStyle]" class="e-icon_img"></image>
    <text v-else :style="[iconStyle]" :class="customClass" class="iconfont"></text>
  </view>
</template>

<script>
import { addUnit } from '../_utils'

export default {
  name: 'EIcon',
  props: {
    name: String, // 图标类名
    color: String, // 图标颜色（字体图标生效）
    customPrefix: String, // 自定义扩展前缀，方便用户扩展自己的图标库（字体图标生效）
    mode: {
      type: String,
      default: 'aspectFit'
    }, // 图片的mode（图片图标生效）
    width: [String, Number], // 图标边缘宽度
    height: [String, Number], // 图标边缘高度
    size: {
      type: [String, Number],
      default: 40
    }, // 图标大小
    bold: Boolean // 图标加粗（字体图标生效）
  },
  computed: {
    customClass({ customPrefix, name }) {
      return customPrefix + name
    },
    isImage({ name }) {
      return name.indexOf('/') !== -1
    },
    iconStyle(vm) {
      const { bold, color, size } = vm
      return {
        fontSize: addUnit(size),
        color,
        fontWeight: bold ? 'bold' : '400'
      }
    },
    wrapStyle({ name }) {
      return {
        backgroundColor: name ? '' : '#f6f6f6'
      }
    },
    sizeStyle(vm) {
      const { height, size, width } = vm
      const style = {}
      // 优先使用width和height属性，否则使用size属性
      style.width = width ? addUnit(width) : addUnit(size)
      style.height = height ? addUnit(height) : addUnit(size)
      return style
    }
  },
  methods: {
    handleTap(e) {
      this.$emit('click', e)
    }
  }
}
</script>
