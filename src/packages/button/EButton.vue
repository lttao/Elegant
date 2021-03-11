<template>
  <button
    @click.stop="handleTap"
    :open-type="openType"
    :loading="loading && !disabled"
    :style="[buttonStyle]"
    :class="[{ 'e-disabled': disabled }, plain ? `e-${type}-button-plain` : '', `e-${type}-button`, `e-${size}-button`]"
    :hover-class="hoverClass"
    class="e-button"
  >
    <text v-if="loading && !disabled" class="e-button_loading-text">{{ loadingText }}</text>
    <slot v-else></slot>
  </button>
</template>

<script>
export default {
    name: 'EButton',
    props: {
        type: {
            type: String,
            default: 'primary'
        },
        
    }
}
</script>