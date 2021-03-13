<template>
  <view :style="[groupStyle]" class="e-cell-group">
    <slot />
  </view>
</template>

<script>
import { addUnit } from '../_utils'

export default {
  name: 'ECellGroup',
  props: {
    gap: [Number, String],
    padding: [Number, String],
    paddingRow: [Number, String],
    paddingCol: [Number, String],
    background: String
  },
  computed: {
    groupStyle(vm) {
      const { background, gap, padding, paddingRow, paddingCol } = vm
      const groupStyle = {}
      background && (groupStyle.background = background)
      gap && (groupStyle.marginTop = `-${addUnit(gap)}`)
      padding && (groupStyle.padding = addUnit(padding))
      if (paddingRow) {
        groupStyle.paddingLeft = addUnit(paddingRow)
        groupStyle.paddingRight = addUnit(paddingRow)
      }
      if (paddingCol) {
        groupStyle.paddingTop = addUnit(paddingCol)
        groupStyle.paddingBottom = addUnit(paddingCol)
      }
      return groupStyle
    }
  },
  mounted() {
    console.log(this.$children, 'children')
  }
}
</script>

<style lang="scss" scoped>
.e-cell-group {
  background: #f6f6f6;
}
</style>
