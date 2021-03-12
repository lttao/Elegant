<template>
  <e-popup @input="handleChange" :value="value" position="center" :z-index="zIndex" :close-on-tap-overlay="closeOnTapOverlay" :mask-style="maskStyle" :margin-top="marginTop">
    <view :style="[modalStyle]" class="e-modal">
      <view v-if="title" :style="[titleStyle]" class="e-modal_title e-border-bottom">{{ title }}</view>
      <view :style="[contentStyle]" class="e-modal_content">
        <text>{{ content }}</text>
      </view>
      <view class="e-modal_actions e-border-top">
        <view @click="handleCancel" :style="[cancelStyle]" class="e-modal_cancel e-modal_button e-border-right" hover-class="e-hover">{{ cancelText }}</view>
        <view @click="handleConfirm" :style="[confirmStyle]" class="e-modal_confirm e-modal_button" :hover-class="confirmLoading ? 'none' : 'e-hover'">
          <e-loading-icon v-if="confirmLoading" :size="40" />
          <text v-else>{{ confirmText }}</text>
        </view>
      </view>
    </view>
  </e-popup>
</template>

<script>
import EPopup from '../popup/EPopup'
import ELoadingIcon from '../icon/ELoadingIcon'
import { addUnit } from '../_utils'

export default {
  name: 'EModal',
  components: { EPopup, ELoadingIcon },
  props: {
    value: {
      type: Boolean,
      default: false
    }, // 推荐使用v-model 控制显隐
    async: {
      type: Boolean,
      default: false
    }, // 是否异步
    closeOnTapOverlay: {
      type: Boolean,
      default: false
    }, // 是否触发蒙层事件
    zIndex: {
      type: [Number, String],
      default: 88
    },
    width: {
      type: [Number, String],
      default: 650
    },
    minHeight: {
      type: [Number, String],
      default: 400
    },
    maxHeight: {
      type: [Number, String],
      default: 'auto'
    },
    borderRadius: {
      type: [Number, String],
      default: 20
    },
    marginTop: {
      type: [Number, String],
      default: '-10vh'
    }, // 调整垂直位置(center生效)
    title: String,
    content: String,
    cancelText: {
      type: String,
      default: '取消'
    },
    confirmText: {
      type: String,
      default: '确认'
    },
    titleStyle: {
      type: Object,
      default: () => ({})
    },
    contentStyle: {
      type: Object,
      default: () => ({})
    },
    cancelStyle: {
      type: Object,
      default: () => ({})
    },
    confirmStyle: {
      type: Object,
      default: () => ({})
    },
    maskStyle: {
      type: Object,
      default: () => ({})
    } // 蒙层样式
  },
  data() {
    return {
      confirmLoading: false
    }
  },
  computed: {
    modalStyle(vm) {
      const { width, minHeight, maxHeight, borderRadius } = vm
      return {
        width: addUnit(width),
        minHeight: addUnit(minHeight),
        maxHeight: addUnit(maxHeight),
        borderRadius: addUnit(borderRadius)
      }
    }
  },
  watch: {
    value(n, o) {
      if (this.async && n) this.confirmLoading = false
    }
  },
  methods: {
    handleConfirm() {
      const { async, confirmLoading, handleCancel } = this
      if (confirmLoading) return
      if (async) this.confirmLoading = true
      else handleCancel()
      this.$emit('confirm')
    },
    handleCancel() {
      this.handleChange(false)
    },
    handleChange(status) {
      this.$emit('input', status)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../_styles/color.scss';
@import '../_styles/layout.scss';
.e-modal {
  background: #fff;
  display: flex;
  flex-direction: column;
  &_title {
    height: 88rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 16px;
  }
  &_content {
    flex: 1;
    padding: 20rpx 30rpx 40rpx 30rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    color: #666;
    box-sizing: border-box;
  }
  &_actions {
    height: 100rpx;
    display: flex;
    align-items: center;
  }
  &_button {
    flex: 1;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 500;
    font-size: 16px;
  }
  &_cancel {
    color: $e-disabled-color;
  }
  &_confirm {
    color: $e-primary-color;
  }
}
</style>
