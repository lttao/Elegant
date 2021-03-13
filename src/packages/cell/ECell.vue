<template>
  <button @click="handleTap" :style="[cellStyle]" class="e-cell">
    <view class="e-cell_left">
      <EIcon v-if="iconName" :name="iconName" class="e-cell_left-icon" />
      <view class="e-cell_label">{{ label }}</view>
    </view>
    <view class="e-cell_right">
      <view class="e-cell_value">{{ value }}</view>
      <view v-if="arrow" class="e-arrow"></view>
    </view>
  </button>
</template>

<script>
import EIcon from '../icon/EIcon'
import { addUnit } from '../_utils'

export default {
  name: 'ECell',
  components: { EIcon },
  props: {
    url: String,
    label: String,
    value: String,
    iconName: String,
    arrow: Boolean
  },
  data() {
    return {
      gap: 0
    }
  },
  computed: {
    cellStyle({ gap }) {
      const cellStyle = {}
      if (gap) cellStyle.marginTop = addUnit(gap)
      return cellStyle
    }
  },
  mounted() {
    const { gap = 0 } = this.findParent(this) || {}
    gap && (this.gap = gap)
  },
  methods: {
    handleTap(e) {
      const { url } = this
      if (url) return uni.navigateTo({ url })
      this.$emit('click', e)
    },
    findParent(origin) {
      let parent = null
      // #ifdef H5
      if (origin.$parent.$el.className === 'e-cell-group') parent = origin.$parent.$parent
      else parent = this.findParent(origin.$parent)
      // #endif
      // #ifdef MP-WEIXIN
      parent = origin.$parent
      // #endif
      return parent
    }
  }
}
</script>

<style lang="scss" scoped>
.e-cell {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 88rpx;
  background: #fff;
  border-radius: 0;
  font-weight: 400;
  font-size: 14px;
  &::after {
    width: 0;
    height: 0;
    border: none;
  }
  &_left,
  &_right {
    display: flex;
    align-items: center;
  }
  &_left {
    &-icon {
      margin-right: 16rpx;
    }
  }
  &_label {
    font-weight: 500;
    font-size: 16px;
  }
  &_value {
    color: #999;
  }
}
.e-arrow {
  margin-left: 16rpx;
  width: 24rpx;
  height: 24rpx;
  background-size: 100%;
  background-image: url('data:image/png;base64,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');
}
</style>
