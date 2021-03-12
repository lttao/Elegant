<template>
  <view @click.stop="onChange" :style="[switchStyle]" class="e-switch">
    <view class="e-switch_inner">
      <view :style="[nodeStyle, nodeStatusStyle]" class="e-switch_node">
        <e-loading-icon :show="loading" class="e-switch-loading" :size="loadingSize" />
      </view>
    </view>
  </view>
</template>

<script>
import mixin from '../_mixins'
import ELoadingIcon from '../icon/ELoadingIcon'
import { addUnit } from '../_utils'

export default {
  name: 'ESwitch',
  mixins: [mixin],
  components: { ELoadingIcon },
  props: {
    value: Boolean, // 推荐使用v-model 控制状态
    width: {
      type: [Number, String],
      default: 80
    }, // 宽
    height: {
      type: [Number, String],
      default: 44
    }, // 高
    padding: {
      type: [Number, String],
      default: 4
    }, // 开关距离边缘的距离
    duration: {
      type: [Number, String],
      default: 300
    }, // 动画时长
    activeColor: {
      type: String,
      default: '#1890ff'
    }, // 打开时的背景颜色
    inactiveColor: {
      type: String,
      default: '#f2f2f2'
    }, // 关闭时的背景颜色
    nodeColor: {
      type: String,
      default: '#fff'
    }, // 开关背景颜色
    vibrateShort: {
      type: Boolean,
      default: true
    }, // 是否使手机发生短促震动
    disabled: Boolean, // 是否为禁用状态
    loading: Boolean // 是否为加载中状态
  },
  data() {
    return {
      nodeInfo: {},
      loadingSize: 0
    }
  },
  computed: {
    switchStyle(vm) {
      const { activeColor, duration, value, inactiveColor, width, height, padding } = vm
      return {
        width: addUnit(width),
        height: addUnit(height),
        borderRadius: addUnit(height),
        background: value ? activeColor : inactiveColor,
        padding: addUnit(padding),
        transition: `background-color ${duration}ms`
      }
    },
    nodeStyle(vm) {
      const {
        duration,
        nodeColor,
        nodeInfo: { width, height }
      } = vm
      return {
        width: `${width}px`,
        height: `${height}px`,
        transitionDuration: `${duration}ms`,
        background: nodeColor
      }
    },

    nodeStatusStyle(vm) {
      const { value, nodeInfo } = vm
      const style = {}
      if (value) style.transform = `translate3d(${nodeInfo.translate}px, 0, 0)`
      else style.transform = `translate3d(0, 0, 0)`
      return style
    }
  },
  mounted() {
    this.getRect('.e-switch_inner').then((rect) => {
      this.nodeInfo = {
        width: rect.height,
        height: rect.height,
        translate: rect.width - rect.height
      }
      this.loadingSize = `${rect.height * 0.6}px`
    })
  },
  methods: {
    onChange() {
      const { disabled, loading } = this
      if (disabled || loading) return
      const { vibrateShort } = this

      this.$emit('input', !this.value)

      // 使手机产生短促震动
      if (vibrateShort) uni.vibrateShort({})
    }
  }
}
</script>

<style lang="scss" scoped>
.e-switch {
  box-sizing: border-box;
  &_inner {
    position: relative;
    width: 100%;
    height: 100%;
  }
  &_node {
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 50%;
    box-shadow: 0 3px 1px 0 rgba(0, 0, 0, 0.05), 0 2px 2px 0 rgba(0, 0, 0, 0.1), 0 3px 3px 0 rgba(0, 0, 0, 0.05);
    display: flex;
    align-items: center;
    justify-content: center;
    transition-property: transform;
    transition-timing-function: cubic-bezier(0.3, 1.05, 0.4, 1.05);
  }
}
</style>
