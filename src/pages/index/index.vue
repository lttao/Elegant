<template>
  <view class="content">
    <e-button @click="showModal = true" round>按钮</e-button>
    <ELoadingIcon />
    <EModal v-model="showModal" async />
  </view>
</template>

<script>
import EButton from '@/packages/button/EButton'
import ELoadingIcon from '@/packages/icon/ELoadingIcon'
import EModal from '@/packages/modal/EModal'
export default {
  components: {
    EButton,
    ELoadingIcon,
    EModal
  },
  data() {
    return {
      showModal: false
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
