<template>
  <view>
    <EInput v-model="value" />
  </view>
</template>

<script>
import EInput from '@/packages/input/EInput'

export default {
  components: {
    EInput
  },
  data() {
    return {
      value: ''
    }
  }
}
</script>
