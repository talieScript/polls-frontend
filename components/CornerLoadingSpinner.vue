<template>
  <transition name="fade" tag="div">
    <LoadingSpinner
      v-if="value"
      size="8"
      class="fixed bottom-0 right-0 mr-2 mb-3 sm:mr-3 sm:mb-4"
      color="primary"
    />
  </transition>
</template>

<script>
export default {
  name: 'CornerLoadingSpinner',
  props: {
    value: {
      type: Boolean,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>