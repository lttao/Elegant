<template>
  <view class="content">
    <!-- <ELoadingIcon />
    <ESwitch v-model="showSwitch" />
    <e-button @click="showModal = true" round>按钮</e-button>
    <EModal v-model="showModal" async content="你确定吗" /> -->
    <ECellGroup gap="1px">
      <ECell arrow label="按钮" url="/pages/example/button" />
      <ECell arrow label="日历" url="/pages/example/calendar" />
    </ECellGroup>
  </view>
</template>

<script>
import ECellGroup from '@/packages/cell/ECellGroup'
import ECell from '@/packages/cell/ECell'
export default {
  components: {
    ECellGroup,
    ECell
  },
  data() {
    return {
      showModal: false,
      showSwitch: false
    }
  },
  onLoad() {},
  methods: {}
}
</script>

<style lang="scss" scoped>
// .content {
//   // padding: 0 20rpx;
// }
</style>
