<template>
  <view class="content">
    <e-button @click="showModal = true" round>按钮</e-button>
    <ELoadingIcon />
    <EModal v-model="showModal" async content="你确定吗" />
    <ESwitch v-model="showSwitch" />
  </view>
</template>

<script>
import EButton from '@/packages/button/EButton'
import ELoadingIcon from '@/packages/icon/ELoadingIcon'
import EModal from '@/packages/modal/EModal'
import ESwitch from '@/packages/switch/ESwitch'
export default {
  components: {
    EButton,
    ELoadingIcon,
    EModal,
    ESwitch
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
  padding: 0 20rpx;
}
</style>
