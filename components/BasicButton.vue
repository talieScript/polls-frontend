<template>
  <button
    class="block px-2 py-1 border outline-none focus:shadow-outline w-auto uppercase"
    :class="[
      `text-${color}`,
      `border-${color}`,
      `text-${textSize}`,
      `rounded-${rounded}`,
      { 'pointer-events-none': loading },
    ]"
    @click="$emit('click')"
    :aria-label="ariaLabel"
  >
    <LoadingSpinner v-if="loading" />
    <span v-else-if="text">
      {{ text }}
    </span>
    <slot v-else name="default"></slot>
  </button>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'Button',
  props: {
    text: {
      type: String,
    },
    color: {
      type: String,
      default: 'primary',
    },
    textSize: {
      type: String,
      default: 'base',
    },
    rounded: {
      type: String,
      default: '2xl',
    },
    ariaLabel: {
      type: String,
      required: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
})
</script>

<style scoped>
</style>