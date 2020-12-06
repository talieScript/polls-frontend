<template>
  <fa
    :icon="['fa', 'spinner']"
    class="animate-spin"
    :class="[`h-${size}`, `w-${size}`]"
  />
</template>

<script>
export default {
  name: 'LoadingSpinner',
  props: {
    size: {
      type: String,
      default: '5',
    },
  },
}
</script>

<style lang="scss" scoped>
</style>