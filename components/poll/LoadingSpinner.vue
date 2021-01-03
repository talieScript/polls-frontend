<template>
  <fa
    :icon="['fa', 'spinner']"
    class="animate-spin"
    :class="[`h-${size}`, `w-${size}`, `text-${color}`]"
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
    color: {
      type: String,
      required: false,
    },
  },
}
</script>

<style lang="scss" scoped>
</style>