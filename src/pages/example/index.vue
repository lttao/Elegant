<template>
  <view class="content">
    <!-- <ELoadingIcon />
    <ESwitch v-model="showSwitch" />
    <e-button @click="showModal = true" round>按钮</e-button>
    <EModal v-model="showModal" async content="你确定吗" /> -->
    <ECellGroup gap="1px">
      <view>
        <ECell />
      </view>
      <ECell arrow label="按钮" url="/pages/example/button" />
      <ECell />
      <ECell />
    </ECellGroup>
  </view>
</template>

<script>
import EButton from '@/packages/button/EButton'
import ELoadingIcon from '@/packages/icon/ELoadingIcon'
import EModal from '@/packages/modal/EModal'
import ESwitch from '@/packages/switch/ESwitch'
import ECellGroup from '@/packages/cell/ECellGroup'
import ECell from '@/packages/cell/ECell'
export default {
  components: {
    EButton,
    ELoadingIcon,
    EModal,
    ESwitch,
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
.content {
  // padding: 0 20rpx;
}
</style>
